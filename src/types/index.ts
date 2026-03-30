export type CompSystem = 'pdrs' | 'ama' | 'scheduled' | 'percentage-of-person' | 'wage-loss'
export type RiskLevel  = 'low' | 'medium' | 'high' | 'very-high'
export type InjuryCategory = 'body-part' | 'accident' | 'occupational'
export type EmploymentStatus = 'full-time' | 'part-time' | 'contractor' | 'gig'
export type MmiStatus = 'still-treating' | 'mmi-reached' | 'not-sure'
export type CaseStrength = 'Weak' | 'Moderate' | 'Strong' | 'Very Strong'
export type SeverityLevel = 'minor' | 'moderate' | 'severe' | 'catastrophic'
export type TreatmentStatus = 'treating' | 'mmi' | 'full-duty' | 'light-duty' | 'not-yet'
export type ClaimStatus = 'accepted' | 'denied' | 'pending' | 'not-filed'
export type EmployerControl = 'yes' | 'no' | 'partially'

export interface USState {
  slug: string
  name: string
  abbr: string
  maxWeeklyBenefit: number
  ttdRate: number
  system: CompSystem
  avgSettlement: { low: number; high: number }
  sol: string
  attorneyFeeRate: number
  settlementMultiplier?: { low: number; high: number }
  statute?: string
  statLink?: string
  regulator?: string
  regulatorLink?: string
  reportingDays?: number
  filingDeadlineDays?: number
}

export interface Industry {
  slug: string
  name: string
  riskLevel: RiskLevel
  riskMultiplier: number
  commonInjuries: string[]
}

export interface InjuryType {
  slug: string
  name: string
  category: InjuryCategory
  bodyPart: string
  scheduledWeeks: number | null
  avgImpairmentRating: number
  avgMedicalCost: number
  nyWeeks: number | null
  njWeeks: number | null
}

// ── Legacy (used by pSEO pages) ────────────────────────────────────────────

export interface CalculatorInput {
  state: string
  industry: string
  injurySlug: string
  bodyPart: string
  weeklyWage: number
  employmentMonths: number
  impairmentRating: number
  treatmentWeeks: number
  hasImpairmentRating: boolean
  employmentStatus: EmploymentStatus
  mmiStatus: MmiStatus
}

export interface CalculationResult {
  ttd: number
  ppd: number
  medicalEstimate: number
  totalLow: number
  totalHigh: number
  weeklyBenefit: number
  caseStrength: CaseStrength
  stateNotes: string[]
}

// ── New V2 (used by calculator + results) ─────────────────────────────────

export interface WorkersCompInput {
  state: string
  industry: string
  injurySlug: string
  employmentStatus: EmploymentStatus
  employerControl: EmployerControl | null
  severityLevel: SeverityLevel
  weeklyWage: number
  employmentMonths: number
  treatmentStatus: TreatmentStatus
  claimStatus: ClaimStatus
  companyOffer: number | null
  hasImpairmentRating: boolean
  impairmentRating: number
}

export interface WorkersCompResult {
  scenarios: {
    conservative: { total: number; label: string; description: string }
    expected:     { total: number; label: string; description: string }
    bestCase:     { total: number; label: string; description: string }
  }
  breakdown: {
    ttd: number
    ppd: number
    medicalEstimate: number
    weeklyBenefit: number
    impairmentRatingUsed: number
    isEstimatedRating: boolean
  }
  companyOfferAnalysis: {
    offerAmount: number | null
    offerPct: number | null
    message: string | null
  }
  caseStrength: CaseStrength
  caseStrengthScore: number
  urgencyFlags: string[]
  stateNotes: string[]
  whyThisNumber: {
    ttdExplanation: string
    ppdExplanation: string
    rangeExplanation: string
    keyFactors: string[]
  }
  filingDeadline: { sol: string; urgency: 'low' | 'medium' | 'high' }
  coverageNote: string | null
}

export interface LeadFormData {
  name: string
  email: string
  phone?: string
  country: string
  state?: string
  industry?: string
  injuryType?: string
  bodyPart?: string
  weeklyWage?: number
  employmentMonths?: number
  impairmentRating?: number
  treatmentWeeks?: number
  employmentStatus?: string
  employerControl?: string
  severityLevel?: string
  treatmentStatus?: string
  claimStatus?: string
  companyOffer?: number | null
  isEstimatedRating?: boolean
  mmiReached?: boolean
  ttdEstimate?: number
  ppdEstimate?: number
  medicalEstimate?: number
  totalLow?: number
  totalHigh?: number
  caseStrength?: string
  caseStrengthScore?: number
  consent: boolean
  sourceUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}
