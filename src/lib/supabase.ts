import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { LeadFormData } from '@/types'

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  if (!_client) _client = createClient(url, key)
  return _client
}

export async function saveLead(data: LeadFormData): Promise<{ success: boolean; error?: string }> {
  const client = getClient()
  if (!client) {
    console.warn('Supabase not configured — lead not saved')
    return { success: true }
  }

  try {
    const { error } = await client.from('leads').insert([{
      name:                 data.name,
      email:                data.email,
      phone:                data.phone || null,
      country:              data.country || 'us',
      state:                data.state || null,
      industry:             data.industry || null,
      injury_type:          data.injuryType || null,
      body_part:            data.bodyPart || null,
      weekly_wage:          data.weeklyWage || null,
      employment_months:    data.employmentMonths || null,
      impairment_rating:    data.impairmentRating || null,
      treatment_weeks:      data.treatmentWeeks || null,
      employment_status:    data.employmentStatus || null,
      employer_control:     data.employerControl || null,
      severity_level:       data.severityLevel || null,
      treatment_status:     data.treatmentStatus || null,
      claim_status:         data.claimStatus || null,
      company_offer:        data.companyOffer ?? null,
      is_estimated_rating:  data.isEstimatedRating ?? null,
      mmi_reached:          data.mmiReached ?? null,
      ttd_estimate:         data.ttdEstimate || null,
      ppd_estimate:         data.ppdEstimate || null,
      medical_estimate:     data.medicalEstimate || null,
      total_low:            data.totalLow || null,
      total_high:           data.totalHigh || null,
      case_strength:        data.caseStrength || null,
      case_strength_score:  data.caseStrengthScore || null,
      consent:              data.consent,
      source_url:           data.sourceUrl || null,
      utm_source:           data.utmSource || null,
      utm_medium:           data.utmMedium || null,
      utm_campaign:         data.utmCampaign || null,
      status:               'new',
    }])
    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}

export async function trackCallClick({
  state, injury, estimatedTotal, sourceUrl,
}: {
  state?: string
  injury?: string
  estimatedTotal?: number
  sourceUrl?: string
}): Promise<void> {
  const client = getClient()
  if (!client) return
  await client.from('call_clicks').insert([{
    state:           state || null,
    injury:          injury || null,
    estimated_total: estimatedTotal || null,
    source_url:      sourceUrl || null,
  }])
}
