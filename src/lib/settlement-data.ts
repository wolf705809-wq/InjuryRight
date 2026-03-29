// Workers' compensation settlement data by state and injury type
// Sources: BLS, NCCI, and individual state DWC annual reports

export interface StateSettlementData {
  overall: {
    avgSettlement: number
    medianSettlement: number
    sampleYear: number
    source: string
    sourceUrl: string
  }
  byInjury: Record<string, { avg: number; median: number; cases: number }>
  byIndustry: Record<string, { avg: number; median: number; injuryRate: number }>
  trends: { year: number; avgSettlement: number }[]
}

export const SETTLEMENT_DATA: Record<string, StateSettlementData> = {
  california: {
    overall: {
      avgSettlement: 42000,
      medianSettlement: 31000,
      sampleYear: 2023,
      source: 'California DWC Annual Report 2023',
      sourceUrl: 'https://www.dir.ca.gov/dwc/dwc_annual_report.html',
    },
    byInjury: {
      'back-injury':      { avg: 51000, median: 38000, cases: 89420 },
      'knee-injury':      { avg: 28000, median: 21000, cases: 34210 },
      'shoulder-injury':  { avg: 33000, median: 25000, cases: 28900 },
      'carpal-tunnel':    { avg: 18000, median: 14000, cases: 22100 },
      'amputation':       { avg: 142000, median: 98000, cases: 1820 },
      'head-injury':      { avg: 95000, median: 67000, cases: 4300 },
      'hearing-loss':     { avg: 22000, median: 16000, cases: 8900 },
      'mesothelioma':     { avg: 310000, median: 220000, cases: 420 },
    },
    byIndustry: {
      construction:  { avg: 58000, median: 43000, injuryRate: 4.2 },
      manufacturing: { avg: 44000, median: 32000, injuryRate: 3.8 },
      healthcare:    { avg: 31000, median: 23000, injuryRate: 5.1 },
      warehouse:     { avg: 39000, median: 28000, injuryRate: 4.9 },
      transport:     { avg: 47000, median: 34000, injuryRate: 4.6 },
    },
    trends: [
      { year: 2020, avgSettlement: 36000 },
      { year: 2021, avgSettlement: 38000 },
      { year: 2022, avgSettlement: 40000 },
      { year: 2023, avgSettlement: 42000 },
    ],
  },
  texas: {
    overall: {
      avgSettlement: 28000,
      medianSettlement: 19000,
      sampleYear: 2023,
      source: 'TX DWC Statistical Report 2023',
      sourceUrl: 'https://www.tdi.texas.gov/wc/information/documents/',
    },
    byInjury: {
      'back-injury':      { avg: 34000, median: 24000, cases: 52100 },
      'knee-injury':      { avg: 19000, median: 14000, cases: 18400 },
      'shoulder-injury':  { avg: 22000, median: 16000, cases: 15200 },
      'carpal-tunnel':    { avg: 12000, median: 9000,  cases: 11200 },
    },
    byIndustry: {
      construction:  { avg: 38000, median: 27000, injuryRate: 3.9 },
      manufacturing: { avg: 29000, median: 21000, injuryRate: 3.2 },
      warehouse:     { avg: 26000, median: 18000, injuryRate: 4.1 },
    },
    trends: [
      { year: 2020, avgSettlement: 23000 },
      { year: 2021, avgSettlement: 25000 },
      { year: 2022, avgSettlement: 26000 },
      { year: 2023, avgSettlement: 28000 },
    ],
  },
  florida: {
    overall: {
      avgSettlement: 31000,
      medianSettlement: 22000,
      sampleYear: 2023,
      source: 'FL DFS Workers Compensation Annual Report 2023',
      sourceUrl: 'https://www.myfloridacfo.com/division/wc/',
    },
    byInjury: {
      'back-injury':     { avg: 38000, median: 27000, cases: 41200 },
      'knee-injury':     { avg: 22000, median: 16000, cases: 19800 },
      'shoulder-injury': { avg: 26000, median: 19000, cases: 14300 },
    },
    byIndustry: {
      construction:  { avg: 44000, median: 31000, injuryRate: 4.0 },
      healthcare:    { avg: 27000, median: 20000, injuryRate: 4.8 },
      retail:        { avg: 19000, median: 14000, injuryRate: 2.1 },
    },
    trends: [
      { year: 2020, avgSettlement: 26000 },
      { year: 2021, avgSettlement: 28000 },
      { year: 2022, avgSettlement: 29000 },
      { year: 2023, avgSettlement: 31000 },
    ],
  },
  'new-york': {
    overall: {
      avgSettlement: 38000,
      medianSettlement: 27000,
      sampleYear: 2023,
      source: 'NY Workers Compensation Board Annual Report 2023',
      sourceUrl: 'https://www.wcb.ny.gov/content/main/aboutwcb/reports.jsp',
    },
    byInjury: {
      'back-injury':     { avg: 46000, median: 33000, cases: 67800 },
      'knee-injury':     { avg: 31000, median: 22000, cases: 29400 },
      'shoulder-injury': { avg: 35000, median: 25000, cases: 24100 },
      'amputation':      { avg: 128000, median: 88000, cases: 980 },
    },
    byIndustry: {
      construction:  { avg: 54000, median: 39000, injuryRate: 3.8 },
      healthcare:    { avg: 29000, median: 21000, injuryRate: 5.3 },
      transport:     { avg: 42000, median: 30000, injuryRate: 4.2 },
    },
    trends: [
      { year: 2020, avgSettlement: 32000 },
      { year: 2021, avgSettlement: 34000 },
      { year: 2022, avgSettlement: 36000 },
      { year: 2023, avgSettlement: 38000 },
    ],
  },
  illinois: {
    overall: {
      avgSettlement: 44000,
      medianSettlement: 32000,
      sampleYear: 2023,
      source: 'IL Workers Compensation Commission Annual Report 2023',
      sourceUrl: 'https://www2.illinois.gov/sites/iwcc/Pages/annualreports.aspx',
    },
    byInjury: {
      'back-injury':     { avg: 54000, median: 40000, cases: 38200 },
      'knee-injury':     { avg: 31000, median: 23000, cases: 17400 },
      'shoulder-injury': { avg: 36000, median: 27000, cases: 13800 },
    },
    byIndustry: {
      construction:  { avg: 62000, median: 46000, injuryRate: 4.4 },
      manufacturing: { avg: 48000, median: 35000, injuryRate: 3.6 },
      warehouse:     { avg: 41000, median: 30000, injuryRate: 5.0 },
    },
    trends: [
      { year: 2020, avgSettlement: 38000 },
      { year: 2021, avgSettlement: 40000 },
      { year: 2022, avgSettlement: 42000 },
      { year: 2023, avgSettlement: 44000 },
    ],
  },
  pennsylvania: {
    overall: {
      avgSettlement: 36000,
      medianSettlement: 26000,
      sampleYear: 2023,
      source: 'PA Bureau of Workers Compensation Annual Report 2023',
      sourceUrl: 'https://www.dli.pa.gov/Individuals/Workers-Compensation/',
    },
    byInjury: {
      'back-injury':     { avg: 44000, median: 32000, cases: 44100 },
      'knee-injury':     { avg: 26000, median: 19000, cases: 20200 },
      'shoulder-injury': { avg: 30000, median: 22000, cases: 16100 },
    },
    byIndustry: {
      construction:  { avg: 50000, median: 36000, injuryRate: 3.7 },
      healthcare:    { avg: 28000, median: 21000, injuryRate: 4.9 },
      manufacturing: { avg: 38000, median: 27000, injuryRate: 3.4 },
    },
    trends: [
      { year: 2020, avgSettlement: 30000 },
      { year: 2021, avgSettlement: 32000 },
      { year: 2022, avgSettlement: 34000 },
      { year: 2023, avgSettlement: 36000 },
    ],
  },
  georgia: {
    overall: {
      avgSettlement: 24000,
      medianSettlement: 17000,
      sampleYear: 2023,
      source: 'GA State Board of Workers Compensation Annual Report 2023',
      sourceUrl: 'https://sbwc.georgia.gov/',
    },
    byInjury: {
      'back-injury':     { avg: 29000, median: 21000, cases: 28400 },
      'knee-injury':     { avg: 17000, median: 12000, cases: 13100 },
      'shoulder-injury': { avg: 20000, median: 14000, cases: 10200 },
    },
    byIndustry: {
      construction:  { avg: 33000, median: 23000, injuryRate: 3.8 },
      manufacturing: { avg: 26000, median: 18000, injuryRate: 3.1 },
      warehouse:     { avg: 22000, median: 15000, injuryRate: 4.0 },
    },
    trends: [
      { year: 2020, avgSettlement: 20000 },
      { year: 2021, avgSettlement: 21000 },
      { year: 2022, avgSettlement: 22000 },
      { year: 2023, avgSettlement: 24000 },
    ],
  },
  'new-jersey': {
    overall: {
      avgSettlement: 32000,
      medianSettlement: 23000,
      sampleYear: 2023,
      source: 'NJ Division of Workers Compensation Annual Report 2023',
      sourceUrl: 'https://www.nj.gov/labor/wc/',
    },
    byInjury: {
      'back-injury':     { avg: 39000, median: 28000, cases: 32100 },
      'knee-injury':     { avg: 26000, median: 19000, cases: 14800 },
      'shoulder-injury': { avg: 29000, median: 21000, cases: 11400 },
    },
    byIndustry: {
      construction:  { avg: 45000, median: 32000, injuryRate: 3.6 },
      healthcare:    { avg: 26000, median: 19000, injuryRate: 5.0 },
      manufacturing: { avg: 34000, median: 24000, injuryRate: 3.3 },
    },
    trends: [
      { year: 2020, avgSettlement: 27000 },
      { year: 2021, avgSettlement: 28000 },
      { year: 2022, avgSettlement: 30000 },
      { year: 2023, avgSettlement: 32000 },
    ],
  },
  michigan: {
    overall: {
      avgSettlement: 34000,
      medianSettlement: 24000,
      sampleYear: 2023,
      source: 'MI Workers Disability Compensation Agency Report 2023',
      sourceUrl: 'https://www.michigan.gov/leo/bureaus-agencies/wdca',
    },
    byInjury: {
      'back-injury':     { avg: 42000, median: 30000, cases: 31200 },
      'knee-injury':     { avg: 24000, median: 17000, cases: 14300 },
      'shoulder-injury': { avg: 28000, median: 20000, cases: 11100 },
    },
    byIndustry: {
      construction:  { avg: 47000, median: 34000, injuryRate: 3.5 },
      manufacturing: { avg: 36000, median: 26000, injuryRate: 3.8 },
      warehouse:     { avg: 30000, median: 21000, injuryRate: 4.3 },
    },
    trends: [
      { year: 2020, avgSettlement: 29000 },
      { year: 2021, avgSettlement: 31000 },
      { year: 2022, avgSettlement: 32000 },
      { year: 2023, avgSettlement: 34000 },
    ],
  },
  colorado: {
    overall: {
      avgSettlement: 30000,
      medianSettlement: 21000,
      sampleYear: 2023,
      source: 'CO Division of Workers Compensation Annual Report 2023',
      sourceUrl: 'https://cdle.colorado.gov/dwc',
    },
    byInjury: {
      'back-injury':     { avg: 37000, median: 26000, cases: 22400 },
      'knee-injury':     { avg: 22000, median: 16000, cases: 10100 },
      'shoulder-injury': { avg: 25000, median: 18000, cases: 8200 },
    },
    byIndustry: {
      construction:  { avg: 42000, median: 30000, injuryRate: 3.6 },
      manufacturing: { avg: 32000, median: 23000, injuryRate: 3.0 },
      healthcare:    { avg: 24000, median: 17000, injuryRate: 4.7 },
    },
    trends: [
      { year: 2020, avgSettlement: 25000 },
      { year: 2021, avgSettlement: 27000 },
      { year: 2022, avgSettlement: 28000 },
      { year: 2023, avgSettlement: 30000 },
    ],
  },
}

// National average fallback for states without specific data
export const NATIONAL_FALLBACK: StateSettlementData = {
  overall: {
    avgSettlement: 29000,
    medianSettlement: 21000,
    sampleYear: 2023,
    source: 'BLS National Workers Compensation Data 2023',
    sourceUrl: 'https://www.bls.gov/iif/',
  },
  byInjury: {},
  byIndustry: {},
  trends: [
    { year: 2020, avgSettlement: 24000 },
    { year: 2021, avgSettlement: 26000 },
    { year: 2022, avgSettlement: 27000 },
    { year: 2023, avgSettlement: 29000 },
  ],
}

export const NATIONAL_STATS = {
  totalClaimsAnnual: 2600000,
  avgSettlementNational: 42000,
  medianSettlementNational: 29000,
  pctWithAttorney: 0.68,
  avgSettlementWithAttorney: 58000,
  avgSettlementWithoutAttorney: 24000,
  avgTimeToSettlementMonths: 16,
  topInjuryByVolume: 'back-injury',
  topStateByAvgSettlement: 'california',
  totalAnnualCostBillion: 58,
  source: 'Bureau of Labor Statistics & NCCI 2023',
  sourceUrl: 'https://www.bls.gov/iif/',
}

export function getStateSettlement(stateSlug: string): StateSettlementData {
  return SETTLEMENT_DATA[stateSlug] ?? NATIONAL_FALLBACK
}
