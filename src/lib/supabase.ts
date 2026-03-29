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

  const { error } = await client.from('leads').insert([{
    name:               data.name,
    email:              data.email,
    phone:              data.phone || null,
    country:            data.country || 'us',
    state:              data.state || null,
    industry:           data.industry || null,
    injury_type:        data.injuryType || null,
    body_part:          data.bodyPart || null,
    weekly_wage:        data.weeklyWage || null,
    employment_months:  data.employmentMonths || null,
    impairment_rating:  data.impairmentRating || null,
    treatment_weeks:    data.treatmentWeeks || null,
    employment_status:  data.employmentStatus || null,
    mmr_reached:        data.mmiReached ?? null,
    ttd_estimate:       data.ttdEstimate || null,
    ppd_estimate:       data.ppdEstimate || null,
    medical_estimate:   data.medicalEstimate || null,
    total_low:          data.totalLow || null,
    total_high:         data.totalHigh || null,
    case_strength:      data.caseStrength || null,
    consent:            data.consent,
    source_url:         data.sourceUrl || null,
    utm_source:         data.utmSource || null,
    utm_medium:         data.utmMedium || null,
    utm_campaign:       data.utmCampaign || null,
    status:             'new',
  }])

  if (error) return { success: false, error: error.message }
  return { success: true }
}
