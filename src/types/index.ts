export type CompSystem = 'pdrs' | 'ama' | 'scheduled' | 'percentage-of-person' | 'wage-loss'
export type RiskLevel  = 'low' | 'medium' | 'high' | 'very-high'
export type InjuryCategory = 'body-part' | 'accident' | 'occupational'
export type EmploymentStatus = 'full-time' | 'part-time' | 'contractor'
export type MmiStatus = 'still-treating' | 'mmi-reached' | 'not-sure'
export type CaseStrength = 'Weak' | 'Moderate' | 'Strong' | 'Very Strong'

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
  // E-E-A-T legal fields
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
  mmiReached?: boolean
  ttdEstimate?: number
  ppdEstimate?: number
  medicalEstimate?: number
  totalLow?: number
  totalHigh?: number
  caseStrength?: string
  consent: boolean
  sourceUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}
