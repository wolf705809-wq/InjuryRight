import { US_STATES, INJURY_TYPES, INDUSTRIES } from '@/lib/pseo-data'
import { CalculatorInput, CalculationResult, CaseStrength } from '@/types'

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
