import { US_STATES, INJURY_TYPES, INDUSTRIES } from '@/lib/pseo-data'
import { CalculatorInput, CalculationResult, CaseStrength, WorkersCompInput, WorkersCompResult } from '@/types'

export function calculateWorkersComp(input: CalculatorInput): CalculationResult {
  const stateData  = US_STATES.find(s => s.slug === input.state)
  const injuryData = INJURY_TYPES.find(i => i.slug === input.injurySlug)
  const industryData = INDUSTRIES.find(i => i.slug === input.industry)

  if (!stateData || !injuryData || !industryData) {
    return { ttd: 0, ppd: 0, medicalEstimate: 0, totalLow: 0, totalHigh: 0, weeklyBenefit: 0, caseStrength: 'Weak', stateNotes: [] }
  }

  const aww = input.weeklyWage
  const rating = input.hasImpairmentRating ? input.impairmentRating : injuryData.avgImpairmentRating

  const wageFactor = input.employmentStatus === 'part-time' ? 0.85
    : input.employmentStatus === 'contractor' ? 0.75 : 1.0
  const adjustedAWW = aww * wageFactor

  // 1. TTD
  const weeklyTTD = Math.min(adjustedAWW * stateData.ttdRate, stateData.maxWeeklyBenefit)
  const ttdTotal  = weeklyTTD * Math.min(input.treatmentWeeks, 104)

  // 2. PPD — per state system
  let ppdTotal = 0
  const { system } = stateData

  if (system === 'pdrs') {
    // California PDRS
    const pdWeeks = rating <= 14.75 ? rating * 4
      : rating <= 24.75 ? rating * 5
      : rating <= 49.75 ? rating * 6
      : rating * 8
    ppdTotal = pdWeeks * 290

  } else if (system === 'scheduled' && injuryData.scheduledWeeks) {
    const baseWeeks = input.state === 'new-york'
      ? (injuryData.nyWeeks ?? injuryData.scheduledWeeks)
      : (injuryData.njWeeks ?? injuryData.scheduledWeeks)
    ppdTotal = baseWeeks * (rating / 100) * weeklyTTD

  } else if (system === 'percentage-of-person') {
    ppdTotal = (rating / 100) * 500 * (adjustedAWW * 0.60)

  } else if (system === 'wage-loss') {
    if (injuryData.scheduledWeeks) {
      ppdTotal = injuryData.scheduledWeeks * weeklyTTD
    } else {
      ppdTotal = adjustedAWW * 52 * 2
    }

  } else {
    // AMA-based (most states)
    switch (input.state) {
      case 'texas':
        ppdTotal = (rating / 100) * 3 * 400 * weeklyTTD; break
      case 'florida':
        ppdTotal = rating * 2 * (adjustedAWW * 0.75); break
      case 'georgia':
        ppdTotal = (rating / 100) * 400 * weeklyTTD; break
      case 'colorado':
        ppdTotal = (rating / 100) * 402 * weeklyTTD; break
      default:
        ppdTotal = (rating / 100) * 350 * weeklyTTD
    }
  }

  // 3. Medical estimate
  const medicalEstimate = injuryData.avgMedicalCost * (1 + rating / 200)

  // 4. Apply industry multiplier
  const base = (ttdTotal + ppdTotal + medicalEstimate) * industryData.riskMultiplier

  // 5. Settlement range
  const { low: multLow, high: multHigh } = stateData.settlementMultiplier ?? { low: 1.1, high: 1.8 }
  const totalLow  = Math.round(base * multLow)
  const totalHigh = Math.round(base * multHigh)

  // 6. Case strength
  let caseStrength: CaseStrength
  if (rating >= 30 || input.injurySlug === 'mesothelioma') caseStrength = 'Very Strong'
  else if (rating >= 15 || industryData.riskLevel === 'very-high') caseStrength = 'Strong'
  else if (input.employmentMonths >= 24) caseStrength = 'Moderate'
  else caseStrength = 'Weak'

  // 7. State-specific notes
  const stateNotes = [
    `In ${stateData.name}, TTD is capped at $${stateData.maxWeeklyBenefit.toLocaleString()}/week.`,
    `Statute of limitations: ${stateData.sol}.`,
    `Average attorney fee: ${(stateData.attorneyFeeRate * 100).toFixed(0)}% of settlement (contingency).`,
  ]

  return {
    ttd:             Math.round(ttdTotal),
    ppd:             Math.round(ppdTotal),
    medicalEstimate: Math.round(medicalEstimate),
    totalLow,
    totalHigh,
    weeklyBenefit:   Math.round(weeklyTTD),
    caseStrength,
    stateNotes,
  }
}

export function formatUSD(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

export function calculateWorkersCompV2(input: WorkersCompInput): WorkersCompResult {
  const state    = US_STATES.find(s => s.slug === input.state)
  const injury   = INJURY_TYPES.find(i => i.slug === input.injurySlug)
  const industry = INDUSTRIES.find(i => i.slug === input.industry)

  const emptyResult: WorkersCompResult = {
    scenarios: {
      conservative: { total: 0, label: 'Conservative estimate', description: '' },
      expected:     { total: 0, label: 'Expected settlement', description: '' },
      bestCase:     { total: 0, label: 'Best case', description: '' },
    },
    breakdown: { ttd: 0, ppd: 0, medicalEstimate: 0, weeklyBenefit: 0, impairmentRatingUsed: 0, isEstimatedRating: true },
    companyOfferAnalysis: { offerAmount: null, offerPct: null, message: null },
    caseStrength: 'Weak',
    caseStrengthScore: 0,
    urgencyFlags: [],
    stateNotes: [],
    whyThisNumber: { ttdExplanation: '', ppdExplanation: '', rangeExplanation: '', keyFactors: [] },
    filingDeadline: { sol: '', urgency: 'low' },
    coverageNote: null,
  }

  if (!state || !injury) return emptyResult

  const riskMultiplier = industry?.riskMultiplier ?? 1.0
  const riskLevel      = industry?.riskLevel ?? 'medium'

  // 1. AWW correction
  const wageFactor =
    input.employmentStatus === 'part-time'  ? 0.85 :
    input.employmentStatus === 'contractor' ? 0.75 :
    input.employmentStatus === 'gig'        ? 0.70 : 1.0

  const misclassBonus =
    (input.employmentStatus === 'contractor' || input.employmentStatus === 'gig') &&
    input.employerControl === 'yes' ? 1.3 : 1.0

  const aww       = input.weeklyWage * wageFactor
  const weeklyTTD = Math.min(aww * state.ttdRate, state.maxWeeklyBenefit)

  // 2. TTD — MMI/full-duty = 0
  let ttdTotal = 0
  if (input.treatmentStatus !== 'mmi' && input.treatmentStatus !== 'full-duty') {
    const treatmentWeeks =
      input.severityLevel === 'minor'    ?  4 :
      input.severityLevel === 'moderate' ? 12 :
      input.severityLevel === 'severe'   ? 26 : 12
    ttdTotal = weeklyTTD * treatmentWeeks
  }

  // 3. Impairment rating
  const isEstimatedRating = !input.hasImpairmentRating
  const severityRatingMult =
    input.severityLevel === 'minor'    ? 0.5 :
    input.severityLevel === 'moderate' ? 1.0 :
    input.severityLevel === 'severe'   ? 1.6 : 1.0

  const impairmentRating = input.hasImpairmentRating
    ? input.impairmentRating
    : Math.min(injury.avgImpairmentRating * severityRatingMult, 99)

  // 4. PPD — state system
  let ppdBase = 0
  const { system } = state

  if (system === 'pdrs') {
    const pdWeeks = impairmentRating <= 14.75 ? impairmentRating * 4
      : impairmentRating <= 24.75 ? impairmentRating * 5
      : impairmentRating <= 49.75 ? impairmentRating * 6
      : impairmentRating * 8
    ppdBase = pdWeeks * 290
  } else if (system === 'scheduled' && injury.scheduledWeeks) {
    const baseWeeks = input.state === 'new-york'
      ? (injury.nyWeeks ?? injury.scheduledWeeks)
      : (injury.njWeeks ?? injury.scheduledWeeks)
    ppdBase = baseWeeks * (impairmentRating / 100) * weeklyTTD
  } else if (system === 'percentage-of-person') {
    ppdBase = (impairmentRating / 100) * 500 * (aww * 0.60)
  } else if (system === 'wage-loss') {
    ppdBase = injury.scheduledWeeks ? injury.scheduledWeeks * weeklyTTD : aww * 52 * 2
  } else {
    switch (input.state) {
      case 'texas':    ppdBase = (impairmentRating / 100) * 3 * 400 * weeklyTTD; break
      case 'florida':  ppdBase = impairmentRating * 2 * (aww * 0.75); break
      case 'georgia':  ppdBase = (impairmentRating / 100) * 400 * weeklyTTD; break
      case 'colorado': ppdBase = (impairmentRating / 100) * 402 * weeklyTTD; break
      default:         ppdBase = (impairmentRating / 100) * 350 * weeklyTTD
    }
  }

  // 5. Medical estimate
  const medMult =
    input.severityLevel === 'minor'    ? 0.4 :
    input.severityLevel === 'moderate' ? 1.0 :
    input.severityLevel === 'severe'   ? 1.8 : 1.0
  const medicalEstimate = injury.avgMedicalCost * medMult

  // 6. Multipliers
  const severityMult =
    input.severityLevel === 'minor'    ? 0.7 :
    input.severityLevel === 'moderate' ? 1.0 :
    input.severityLevel === 'severe'   ? 1.4 : 1.0

  const claimMult =
    input.claimStatus === 'denied'    ? 1.2 :
    input.claimStatus === 'accepted'  ? 1.0 :
    input.claimStatus === 'pending'   ? 0.95 :
    input.claimStatus === 'not-filed' ? 0.9  : 1.0

  const mmiBonus = input.treatmentStatus === 'mmi' ? 1.1 : 1.0

  // 7. Base
  const base =
    (ttdTotal + ppdBase + medicalEstimate)
    * severityMult
    * claimMult
    * mmiBonus
    * riskMultiplier
    * misclassBonus

  // 8. Scenarios
  const scenarios: WorkersCompResult['scenarios'] = {
    conservative: {
      total: Math.round(base * 0.65),
      label: 'Conservative estimate',
      description: 'If claim is disputed, partially denied, or settled without attorney',
    },
    expected: {
      total: Math.round(base * 1.0),
      label: 'Expected settlement',
      description: `Based on similar cases in ${state.name} (2024)`,
    },
    bestCase: {
      total: Math.round(base * 1.55),
      label: 'Best case',
      description: "With experienced workers' comp attorney and strong case documentation",
    },
  }

  // 9. Company offer analysis
  let companyOfferAnalysis: WorkersCompResult['companyOfferAnalysis'] = {
    offerAmount: null, offerPct: null, message: null,
  }
  if (input.companyOffer && input.companyOffer > 0 && scenarios.expected.total > 0) {
    const pct = Math.round((input.companyOffer / scenarios.expected.total) * 100)
    companyOfferAnalysis = {
      offerAmount: input.companyOffer,
      offerPct: pct,
      message: pct < 50
        ? `Their offer represents ~${pct}% of the expected range. Based on similar cases, this appears below typical settlements. Only a licensed attorney can confirm whether this is fair for your specific case.`
        : `Their offer represents ~${pct}% of the expected range. An attorney can help determine if there's room to negotiate.`,
    }
  }

  // 10. Case strength
  let score = 50
  if (impairmentRating >= 20)          score += 20
  if (input.severityLevel === 'severe') score += 15
  if (input.claimStatus === 'denied')   score += 15
  if (input.treatmentStatus === 'mmi')  score += 10
  if (input.employmentMonths >= 24)     score += 10
  if (misclassBonus > 1)                score += 15
  if (input.companyOffer && scenarios.expected.total > 0 &&
      input.companyOffer < scenarios.expected.total * 0.5) score += 10
  score = Math.min(score, 100)

  const caseStrength: CaseStrength =
    score >= 80 ? 'Very Strong' :
    score >= 60 ? 'Strong' :
    score >= 40 ? 'Moderate' : 'Weak'

  // 11. Urgency flags
  const urgencyFlags: string[] = []
  if (input.claimStatus === 'not-filed')
    urgencyFlags.push(`You haven't filed yet — deadline in ${state.name}: ${state.sol}`)
  if (input.claimStatus === 'denied')
    urgencyFlags.push('Claim denied — appeal deadlines may apply')
  if (input.companyOffer && scenarios.expected.total > 0 &&
      input.companyOffer < scenarios.expected.total * 0.5)
    urgencyFlags.push('Do not sign any settlement agreement before attorney review')

  // 12. WhyThisNumber
  const whyThisNumber: WorkersCompResult['whyThisNumber'] = {
    ttdExplanation: input.treatmentStatus === 'mmi'
      ? 'TTD benefits end at MMI. Your claim now focuses on permanent disability compensation.'
      : `TTD = ${(state.ttdRate * 100).toFixed(0)}% of your $${input.weeklyWage.toLocaleString()}/week wage = $${Math.round(weeklyTTD).toLocaleString()}/week, capped at ${state.name}'s maximum of $${state.maxWeeklyBenefit.toLocaleString()}/week.`,
    ppdExplanation: `Based on an estimated ${impairmentRating.toFixed(0)}% impairment rating${isEstimatedRating ? ' (estimated from injury type and severity)' : ''}, calculated under ${state.name}'s ${state.system} system.`,
    rangeExplanation: "The range reflects three scenarios: without attorney representation (conservative), typical settlement outcome (expected), and with experienced legal representation (best case). Attorney-represented workers receive 2.4× more on average.",
    keyFactors: [
      `State: ${state.name} (${(state.ttdRate * 100).toFixed(0)}% TTD rate)`,
      `Severity: ${input.severityLevel} (${severityMult}× multiplier)`,
      `Impairment: ${impairmentRating.toFixed(0)}%${isEstimatedRating ? ' (estimated)' : ''}`,
      input.claimStatus === 'denied'
        ? 'Claim denied — increases negotiation leverage'
        : `Claim status: ${input.claimStatus}`,
      misclassBonus > 1
        ? 'Possible misclassification — additional claim value'
        : `Industry risk: ${riskLevel}`,
    ],
  }

  // 13. Coverage note
  const coverageNote =
    (input.employmentStatus === 'contractor' || input.employmentStatus === 'gig')
      ? `Coverage for ${input.employmentStatus} workers must be verified by an attorney. Estimates assume coverage is confirmed.`
      : null

  return {
    scenarios,
    breakdown: {
      ttd: Math.round(ttdTotal),
      ppd: Math.round(ppdBase),
      medicalEstimate: Math.round(medicalEstimate),
      weeklyBenefit: Math.round(weeklyTTD),
      impairmentRatingUsed: Math.round(impairmentRating),
      isEstimatedRating,
    },
    companyOfferAnalysis,
    caseStrength,
    caseStrengthScore: score,
    urgencyFlags,
    stateNotes: [
      `${state.name} TTD cap: $${state.maxWeeklyBenefit.toLocaleString()}/week`,
      `Statute of limitations: ${state.sol}`,
      `System: ${state.system.toUpperCase()}`,
    ],
    whyThisNumber,
    filingDeadline: {
      sol: state.sol,
      urgency: input.claimStatus === 'not-filed' ? 'high' : 'low',
    },
    coverageNote,
  }
}
