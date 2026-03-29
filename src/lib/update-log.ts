export interface UpdateEntry {
  date: string
  state: string
  stateName: string
  change: string
  source: string
  sourceUrl: string
}

export const UPDATE_LOG: UpdateEntry[] = [
  {
    date: '2025-01',
    state: 'california',
    stateName: 'California',
    change: 'Maximum weekly TTD benefit updated to $1,619.15',
    source: 'CA DWC Administrative Director Order 2025',
    sourceUrl: 'https://www.dir.ca.gov/dwc/',
  },
  {
    date: '2025-01',
    state: 'florida',
    stateName: 'Florida',
    change: 'Maximum weekly benefit updated to $1,323',
    source: 'FL DFS Annual Rate Update 2025',
    sourceUrl: 'https://www.myfloridacfo.com/division/wc/',
  },
  {
    date: '2024-10',
    state: 'new-york',
    stateName: 'New York',
    change: 'Maximum weekly benefit updated to $1,145.43',
    source: 'NY WCB Annual Benefit Update 2024',
    sourceUrl: 'https://www.wcb.ny.gov/',
  },
  {
    date: '2024-10',
    state: 'illinois',
    stateName: 'Illinois',
    change: 'Maximum weekly benefit updated to $1,897.52',
    source: 'IL WCC Rate Update Q4 2024',
    sourceUrl: 'https://www2.illinois.gov/sites/iwcc/',
  },
  {
    date: '2024-07',
    state: 'texas',
    stateName: 'Texas',
    change: 'Maximum weekly benefit updated to $1,066',
    source: 'TX DWC Biennial Rate Review 2024',
    sourceUrl: 'https://www.tdi.texas.gov/wc/',
  },
  {
    date: '2024-01',
    state: 'pennsylvania',
    stateName: 'Pennsylvania',
    change: 'Maximum weekly benefit updated to $1,325',
    source: 'PA BWC Annual Rate Update 2024',
    sourceUrl: 'https://www.dli.pa.gov/Individuals/Workers-Compensation/',
  },
  {
    date: '2024-01',
    state: 'michigan',
    stateName: 'Michigan',
    change: 'Maximum weekly benefit updated to $1,120',
    source: 'MI WDCA Annual Rate Update 2024',
    sourceUrl: 'https://www.michigan.gov/leo/bureaus-agencies/wdca',
  },
  {
    date: '2024-01',
    state: 'colorado',
    stateName: 'Colorado',
    change: 'Maximum weekly benefit updated to $1,325',
    source: 'CO DOWC Annual Rate Update 2024',
    sourceUrl: 'https://cdle.colorado.gov/dwc',
  },
  {
    date: '2023-10',
    state: 'new-jersey',
    stateName: 'New Jersey',
    change: 'Maximum weekly benefit updated to $1,131',
    source: 'NJ Division of WC Rate Notice 2023',
    sourceUrl: 'https://www.nj.gov/labor/wc/',
  },
  {
    date: '2023-07',
    state: 'georgia',
    stateName: 'Georgia',
    change: 'Maximum weekly benefit remains $800 (no change)',
    source: 'GA SBWC Rate Review 2023',
    sourceUrl: 'https://sbwc.georgia.gov/',
  },
]
