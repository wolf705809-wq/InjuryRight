// State-specific introductions (150+ words each)
export const stateIntros: Record<string, string> = {
  california: `California operates one of the most comprehensive workers' compensation systems in the United States, covering nearly all employees from day one of employment. Administered by the Division of Workers' Compensation (DWC), California processed over 400,000 new claims in 2023. The state uses a unique Permanent Disability Rating Schedule (PDRS) that differs significantly from the AMA Guides used in most other states. California also provides injured workers with the right to select their own treating physician after 30 days, one of the most worker-protective provisions in the country. The state's maximum weekly TTD benefit of $1,619 is among the highest in the nation, and its average settlement of $42,000 reflects both the complexity of its claims and the strength of worker protections under the California Labor Code.`,

  texas: `Texas is the only US state where private employers are not legally required to carry workers' compensation insurance. Approximately 80% of Texas employers subscribe voluntarily, but the remaining 20% are non-subscribers. If your employer is a non-subscriber, you retain the right to sue them directly for negligence — often resulting in significantly higher recoveries than the workers' comp system would provide. For subscribing employers, the Texas DWC administers claims under Labor Code Chapter 408, with a maximum weekly benefit of $1,066 as of 2024. Before filing any claim, verify whether your employer is a subscriber by checking the Texas DWC online employer lookup at tdi.texas.gov.`,

  florida: `Florida's workers' compensation system was substantially reformed in 2003, making it one of the more employer-friendly systems in the southeast. Key features include a strict 104-week cap on Temporary Total Disability benefits and a requirement that injured workers select from an employer-provided panel of physicians. Despite these restrictions, Florida workers with permanent impairment ratings can receive Impairment Income Benefits (IIB) and, in some cases, Supplemental Benefits if their post-injury earnings fall below 80% of pre-injury wages. The Florida Division of Workers' Compensation oversees all claims, and the maximum weekly benefit of $1,323 applies to injuries occurring after January 1, 2023.`,

  'new-york': `New York's workers' compensation system distinguishes between scheduled injuries (specific body parts assigned fixed week values by statute) and non-scheduled injuries (spine, head, and systemic conditions valued on wage-earning capacity loss). Administered by the Workers' Compensation Board (WCB), New York provides one of the longer statutes of limitations at 2 years from injury or last treatment, and allows lump-sum settlements under both Section 20 (full and final) and Section 32 (open award that can be reopened). New York's maximum weekly benefit of $1,145 applies to dates of injury in 2024, with annual adjustments tied to the state average weekly wage.`,

  illinois: `Illinois consistently ranks among the most worker-friendly states for compensation. The state uses a percentage-of-person system for non-scheduled injuries, allowing up to 500 weeks of permanent partial disability benefits — one of the highest caps in the nation. Illinois also permits wage differential awards when injured workers cannot return to their prior occupation, and imposes penalties of up to 50% on employers who unreasonably delay payment. The Illinois Workers' Compensation Commission (IWCC) oversees all claims and hearings. With a maximum weekly benefit of $1,897 and average settlements exceeding $44,000, Illinois is among the most generous states for injured workers with permanent disability.`,

  pennsylvania: `Pennsylvania's workers' compensation system includes an important provision called the Impairment Rating Evaluation (IRE): after 104 weeks of total disability benefits, employers can request an IRE. If the rating is below 35% whole person impairment, benefits automatically convert from total to partial disability, which has a 500-week cap. Workers who reach MMI with significant impairment should seek legal counsel before this evaluation occurs, as it can significantly affect the long-term value of their claim. Pennsylvania's Bureau of Workers' Compensation administers all claims, and injured workers must report injuries to their employer within 21 days to preserve full benefits.`,

  georgia: `Georgia operates a relatively employer-friendly workers' compensation system with a maximum weekly benefit of $800 — one of the lowest caps among major states. Employers maintain control over medical treatment through a posted panel of physicians; injured workers must select from this panel or risk losing benefits. However, workers retain the right to one change of physician from within the panel, and can seek an independent medical examination if they disagree with the panel physician's assessment. The Georgia State Board of Workers' Compensation oversees all claims, with an average settlement of approximately $24,000 reflecting the system's more limited benefit structure.`,

  'new-jersey': `New Jersey's Division of Workers' Compensation handles claims, with formal hearings before Workers' Compensation Judges. New Jersey uses a scheduled-loss system for extremity injuries and a percentage-of-total-disability system for non-scheduled injuries. PPD awards are expressed as a percentage of partial total (35 weeks of compensation per 1% disability). The New Jersey Supreme Court has consistently interpreted the Workers' Compensation Act broadly in favor of injured workers. Injured workers must report their injury to their employer within 14 days to preserve full benefits, and claims must be filed within 2 years of injury or last payment of compensation.`,

  michigan: `Michigan's workers' compensation system uses an 80% wage replacement rate — the highest in the nation — for Temporary Total Disability benefits. However, the system is wage-loss based for permanent partial disability, meaning workers must demonstrate ongoing actual wage loss to continue receiving PPD benefits, rather than receiving a fixed lump sum based on impairment rating alone. The Michigan Workers' Disability Compensation Agency (WDCA) administers all claims. Michigan also permits redemption of liability (lump-sum settlement) agreements that must be approved by a magistrate. Injured workers have 2 years from injury or last payment of compensation to file a claim.`,

  colorado: `Colorado's Division of Workers' Compensation (DOWC) administers the system with a focus on medical management and early return to work. Colorado requires employers to maintain an authorized treating physician and uses Division-Designated Medical Examinations (DIME) to resolve disputes over MMI and impairment ratings. Permanent impairment is rated under AMA Guides, 3rd Edition (revised) — unique to Colorado and generally yielding lower ratings than the 6th Edition used elsewhere. Colorado's maximum weekly benefit of $1,325 applies to injuries in 2024, with injured workers required to report injuries to their employer within 10 days.`,

  arizona: `The Arizona Industrial Commission (AIC) administers workers' compensation in Arizona, a no-fault system covering all work-related injuries. Arizona uses AMA Guides for permanent impairment ratings and has specific scheduled-injury benefits for extremity losses. Claims must be filed with the AIC within 1 year of the injury date. Arizona employers must carry workers' compensation insurance through a licensed carrier or be approved self-insurers. Average settlements in Arizona range from $8,000 to $65,000 depending on injury severity and impairment rating.`,

  'north-carolina': `The North Carolina Industrial Commission (NCIC) administers workers' compensation. North Carolina provides scheduled benefits for extremity injuries and wage-replacement benefits for total disability. The employer controls the selection of the authorized treating physician. Claimants who reach MMI with permanent impairment may receive compensation for a fixed number of weeks (scheduled) or negotiate a clincher agreement (lump-sum settlement) approved by the NCIC. Claims must be filed within 2 years of injury or last payment of compensation.`,

  virginia: `The Virginia Workers' Compensation Commission (VWC) operates as an independent state agency with exclusive jurisdiction over workers' compensation claims. Virginia uses a scheduled-loss system for extremity injuries and an indemnity system for spinal and whole-body injuries. Workers must report injuries within 30 days and file a claim within 2 years. Virginia's two-tier appellate review allows appeals first to the full Commission, then to the Court of Appeals, providing strong procedural protections for both parties.`,

  tennessee: `Tennessee's Division of Workers' Compensation significantly reformed its system in 2014, creating a new administrative court system — the Court of Workers' Compensation Claims — to handle disputed cases. Tennessee now uses a benefit review conference process before formal hearings. The maximum weekly benefit of $1,116 applies to 2024 injuries, and the 1-year statute of limitations is among the shortest in the nation. Workers must report injuries within 15 days of discovery.`,

  minnesota: `Minnesota's Department of Labor and Industry administers one of the more balanced state workers' compensation systems. Minnesota uses medical evidence and functional capacity evaluations extensively in determining PPD benefits. The state's maximum weekly benefit of $1,500 and average settlements of $11,000–$82,000 reflect a system that provides meaningful benefits while maintaining employer cost controls. Injured workers have 3 years from injury to file a claim.`,
}

// Injury-specific detailed content
export interface InjuryDetail {
  description: string
  treatments: string
  timeline: string
  documentation: string[]
  commonTreatments: string[]
}

export const injuryDetails: Record<string, InjuryDetail> = {
  'back-injury': {
    description: `Back and spine injuries are the single most expensive workers' compensation claim category in the US, accounting for over 20% of all lost workday cases per BLS data. Lumbar strain, herniated discs (most commonly at L4-L5 or L5-S1), and spinal stenosis are the three most frequent diagnoses. Workers in construction, warehouse, and transportation face back injury rates 2–3x the national average due to heavy lifting, prolonged awkward postures, and whole-body vibration. The settlement value of a back injury claim depends primarily on whether surgery is involved, the resulting impairment rating, and the extent of work restrictions at Maximum Medical Improvement.`,
    treatments: `Treatment progresses through three phases: conservative care (physical therapy, NSAIDs, activity modification) for weeks 1–12; interventional care (epidural steroid injections, nerve blocks) for months 3–6 if conservative care fails; and surgical intervention for approximately 15–20% of cases. Common surgeries include microdiscectomy, laminectomy, and spinal fusion (TLIF or PLIF). Surgical cases significantly increase total claim value due to extended recovery periods and higher impairment ratings.`,
    timeline: `Conservative cases typically reach MMI within 6–12 months. Surgical cases average 18–24 months from injury to MMI. Impairment ratings under AMA Guides 6th Edition typically range from 5% to 35% whole person impairment for back injuries, depending on the diagnosis, surgery performed, and remaining functional limitations.`,
    documentation: [
      'MRI or CT scan reports (essential)',
      'Treating physician progress notes',
      'Incident report filed with employer',
      'Witness statements if available',
      'Wage statements for prior 52 weeks',
      'Physical therapy discharge summary',
      'AMA impairment rating report',
    ],
    commonTreatments: [
      'Physical therapy (8–16 weeks)',
      'Epidural steroid injections',
      'Microdiscectomy or laminectomy',
      'Spinal fusion (TLIF/PLIF)',
      'Pain management program',
    ],
  },

  'knee-injury': {
    description: `Knee injuries are among the most common scheduled injuries in US workers' compensation, particularly affecting workers in construction, manufacturing, and healthcare. The most common diagnoses include meniscal tears, ACL/PCL ligament injuries, patellar tendinopathy, and degenerative joint disease accelerated by occupational kneeling, squatting, or heavy load bearing. In scheduled states (NY, NJ), compensation is calculated based on a fixed number of weeks assigned to the knee or leg, which can yield significantly higher awards than AMA Guides-based systems for moderate impairment ratings.`,
    treatments: `Initial conservative treatment includes RICE protocol, physical therapy, and corticosteroid or hyaluronic acid injections. Surgical options include arthroscopic meniscectomy or repair (3–6 months recovery), ACL reconstruction (9–12 months recovery), and total knee replacement for severe degenerative cases (12–18 months recovery). Each surgical intervention increases both the claim duration and the final impairment rating assigned at MMI.`,
    timeline: `Uncomplicated soft tissue knee injuries resolve in 3–6 months. Meniscal surgery cases average 6–9 months. ACL reconstruction requires 9–12 months. Total knee replacement cases can take 18–24 months to reach MMI. Impairment ratings typically range from 5–25% of the lower extremity.`,
    documentation: [
      'MRI report confirming structural damage',
      'Orthopedic surgeon evaluation notes',
      'Physical therapy records',
      'Pre-injury job description',
      'Employer incident report',
      'Operative report (if surgery performed)',
    ],
    commonTreatments: [
      'Physical therapy and bracing',
      'Arthroscopic meniscectomy/repair',
      'ACL reconstruction',
      'Total knee arthroplasty',
      'Corticosteroid injections',
    ],
  },

  'shoulder-injury': {
    description: `Shoulder injuries — rotator cuff tears, labral tears, and glenohumeral dislocations — are particularly common among construction workers, painters, electricians, and warehouse staff performing overhead work. Rotator cuff repairs are among the costliest outpatient orthopedic procedures, with average surgical costs exceeding $25,000. In scheduled-injury states, the shoulder is assigned significant week values (NY: 312 weeks, NJ: 330 weeks), yielding substantial awards for even moderate impairment ratings. The causation of shoulder injuries is frequently disputed, making documentation of a specific work incident critical.`,
    treatments: `Conservative management includes rest, sling immobilization, physical therapy, and corticosteroid injections. Surgical options range from arthroscopic rotator cuff repair (4–6 months recovery) to SLAP repair and shoulder replacement for severe glenohumeral arthritis (12–18 months recovery). Post-operative physical therapy is essential and typically required for 4–6 months to restore range of motion and strength.`,
    timeline: `Conservative shoulder injury cases typically reach MMI in 4–8 months. Surgical cases involving rotator cuff repair average 8–14 months. Shoulder replacement cases may take 18–24 months. Impairment ratings range from 5–30% of the upper extremity depending on the repair performed and remaining functional limitations.`,
    documentation: [
      'MRI arthrogram or standard MRI',
      'Orthopedic surgeon evaluation notes',
      'Job description documenting overhead duties',
      'Employer incident report',
      'Physical therapy progress notes',
      'AMA impairment rating',
    ],
    commonTreatments: [
      'Physical therapy (rotator cuff strengthening)',
      'Corticosteroid injections',
      'Arthroscopic rotator cuff repair',
      'SLAP repair or labral reconstruction',
      'Shoulder replacement (severe cases)',
    ],
  },

  'carpal-tunnel': {
    description: `Carpal tunnel syndrome (CTS) is the most common occupational nerve disorder, caused by compression of the median nerve at the wrist. It predominantly affects workers who perform repetitive hand motions, sustained awkward wrist postures, or use vibrating hand tools. Assembly line workers, office workers, and healthcare workers are disproportionately affected. CTS is classified as a scheduled injury in most states and typically results in moderate impairment ratings that are fully compensable. Bilateral CTS (both hands) claims are more complex and typically result in higher total awards.`,
    treatments: `Conservative treatment includes wrist splinting, corticosteroid injections, and activity modification. Surgical carpal tunnel release — one of the most commonly performed outpatient procedures — is required when conservative measures fail after 3–6 months. Recovery from surgery averages 3–6 months, with most workers able to return to modified duty within 4–6 weeks post-operatively.`,
    timeline: `CTS claims typically resolve within 6–12 months. Impairment ratings range from 2–13% of the upper extremity under AMA Guides. Bilateral CTS claims each receive individual assessments, and the combined whole person impairment can exceed 10–15%.`,
    documentation: [
      'Nerve conduction study (NCS/EMG) results',
      'Treating physician notes',
      'Job description with task analysis',
      'Employer incident report',
      'Prior treatment records',
    ],
    commonTreatments: [
      'Wrist splinting (nocturnal)',
      'Corticosteroid injection',
      'Carpal tunnel release surgery',
      'Post-surgical occupational therapy',
    ],
  },

  'mesothelioma': {
    description: `Mesothelioma is a rare but aggressive cancer caused almost exclusively by asbestos exposure, with a latency period of 20–50 years. Workers in construction, shipbuilding, insulation, and manufacturing prior to the 1980s face the highest risk. Mesothelioma workers' comp claims are among the highest-value claims in the system, often combined with separate asbestos trust fund claims and personal injury lawsuits against asbestos manufacturers. The average settlement of $310,000 in California reflects the catastrophic nature of this disease. Workers diagnosed with mesothelioma should immediately consult both a workers' comp attorney and a personal injury attorney specializing in asbestos litigation.`,
    treatments: `Treatment typically includes surgery (pleurectomy or extrapleural pneumonectomy), chemotherapy (pemetrexed and cisplatin), and radiation therapy. Immunotherapy (nivolumab/ipilimumab) has shown promise in recent trials. Palliative care is often the primary approach for late-stage diagnosis. Medical costs routinely exceed $150,000–$300,000.`,
    timeline: `Due to the severity and terminal nature of mesothelioma, claims are prioritized for expedited resolution in most states. Impairment ratings are typically at or near 100% whole person impairment, resulting in maximum available benefits under the applicable state system.`,
    documentation: [
      'Pathology report confirming diagnosis',
      'Occupational history documenting asbestos exposure',
      'Employment records from relevant employers',
      'Medical records including imaging',
      'Expert report on asbestos exposure sources',
    ],
    commonTreatments: [
      'Pleurectomy/decortication or EPP surgery',
      'Chemotherapy (pemetrexed + cisplatin)',
      'Immunotherapy (nivolumab/ipilimumab)',
      'Palliative/supportive care',
      'Radiation therapy',
    ],
  },

  'head-injury': {
    description: `Traumatic brain injuries (TBI) from workplace accidents are among the most complex and highest-value workers' compensation claims. Falls from height, struck-by incidents, and vehicle accidents are the leading causes. TBI severity ranges from mild concussion (typically resolving in 3–6 months) to severe TBI requiring long-term neurological care. Even mild TBI can result in post-concussive syndrome — persistent headaches, cognitive difficulties, and emotional changes — that affects work capacity for months or years. Workers with moderate to severe TBI often require permanent work restrictions and vocational retraining, substantially increasing settlement values.`,
    treatments: `Treatment depends on severity. Mild TBI: cognitive rest, graduated return to activity, symptom management. Moderate/severe TBI: intensive neurocritical care, neurosurgery if indicated, followed by inpatient neurorehabilitation, occupational therapy, speech-language pathology, and neuropsychological treatment. Long-term follow-up with neuropsychology is standard for moderate and severe TBI.`,
    timeline: `Mild TBI (concussion) typically reaches MMI within 6–12 months. Moderate TBI may require 18–36 months. Severe TBI with permanent neurological deficits may never reach full MMI. Whole person impairment ratings range from 5% (mild persistent symptoms) to 100% (severe permanent disability).`,
    documentation: [
      'CT scan or MRI of brain',
      'Emergency room and neurology records',
      'Neuropsychological evaluation',
      'Incident report and witness statements',
      'OSHA investigation report (if applicable)',
      'Cognitive and functional capacity evaluation',
    ],
    commonTreatments: [
      'Acute neurocritical care',
      'Inpatient neurorehabilitation',
      'Neuropsychological therapy',
      'Occupational and speech therapy',
      'Long-term neurological follow-up',
    ],
  },

  'amputation': {
    description: `Amputation injuries represent some of the highest-value workers' compensation claims, particularly in manufacturing and construction. The most common work-related amputations involve fingers (power tools, press machines), followed by hands, arms, toes, and feet. Most states treat amputations as scheduled injuries with fixed week values assigned per digit and body part. New York assigns 312 weeks for loss of a hand; New Jersey assigns 330 weeks. Even partial amputations and amputations of single fingers carry significant compensable week values that, multiplied by weekly wage, yield substantial awards.`,
    treatments: `Initial treatment includes emergency wound management, potentially replantation surgery (only viable within hours of injury), or revision amputation for proper stump closure. Prosthetic fitting begins 4–8 weeks post-operatively. Advanced prosthetics (myoelectric devices for upper extremity) can cost $50,000–$100,000+ and must be covered by workers' comp indefinitely as medical benefits.`,
    timeline: `Physical recovery from amputation surgery typically takes 3–6 months. Psychological adjustment and prosthetic training add additional time. Most amputation claims are resolved by settlement rather than continuing periodic payments, given the permanency and high impairment ratings (typically 50–100% of the affected limb).`,
    documentation: [
      'Surgical operative report',
      'Pathology or photography of amputation level',
      'Incident report and OSHA investigation',
      'Prosthetics assessment and cost documentation',
      'Vocational rehabilitation assessment',
      'AMA impairment rating',
    ],
    commonTreatments: [
      'Emergency wound care / replantation attempt',
      'Revision amputation surgery',
      'Prosthetic fitting and training',
      'Physical and occupational therapy',
      'Psychological counseling',
    ],
  },

  'fall-injury': {
    description: `Falls are the leading cause of fatal workplace injuries in construction and a top-five cause across all industries. Non-fatal fall injuries cover a wide spectrum, from soft tissue sprains to catastrophic spinal cord injuries. In construction, falls from elevation (ladders, scaffolding, roofs) produce the highest severity. In other industries, same-level falls (slip and trip) are more common. The value of a fall injury claim depends primarily on the body parts injured and the resulting impairment rating — a fall resulting in a herniated disc carries different value than one causing only a sprain.`,
    treatments: `Treatment depends on the injuries sustained. Soft tissue falls: physical therapy, anti-inflammatory medication. Falls with fractures: surgical fixation or immobilization. Falls causing spinal injury: potentially emergency neurosurgery. Falls with TBI: as described in head injury section. Recovery times range from 2–3 months (minor fractures) to 18–36 months (spinal cord injury).`,
    timeline: `Simple soft tissue fall injuries reach MMI in 3–6 months. Falls with fractures requiring surgery: 6–12 months. Falls with spinal cord injury or TBI: potentially never reaching full MMI. Impairment ratings range widely based on the injuries sustained.`,
    documentation: [
      'Incident report with fall description',
      'Emergency room records',
      'X-ray, CT, or MRI reports',
      'OSHA incident report (if applicable)',
      'Witness statements',
      'Safety inspection records',
    ],
    commonTreatments: [
      'Emergency trauma care',
      'Fracture management (surgical or conservative)',
      'Physical therapy and rehabilitation',
      'Pain management',
      'Vocational rehabilitation (severe cases)',
    ],
  },

  'repetitive-strain': {
    description: `Repetitive strain injuries (RSI) develop from cumulative microtrauma to tendons, muscles, and nerves. Common RSI diagnoses include lateral epicondylitis (tennis elbow), de Quervain's tenosynovitis, trigger finger, and rotator cuff tendinopathy. Assembly-line workers, data entry clerks, and healthcare workers are among the most affected. RSI claims are frequently disputed by employers who argue the conditions are idiopathic. Strong documentation — including an ergonomic workstation analysis — is essential to establish occupational causation under the applicable state standard.`,
    treatments: `Conservative: activity modification, ergonomic restructuring, NSAIDs, corticosteroid injections, occupational therapy with splinting and stretching programs. Surgical: tendon or ligament release procedures when conservative measures fail after 3–6 months. Vocational rehabilitation may be required if the worker's job duties cannot be modified to eliminate the causative repetitive tasks.`,
    timeline: `Most RSI claims reach MMI within 6–18 months. Impairment ratings are typically moderate (5–15% of the affected extremity) unless surgical complications arise. Claims often settle by agreement once MMI is established.`,
    documentation: [
      'Physician diagnosis with occupational causation opinion',
      'Ergonomic analysis of workstation and tasks',
      'Job description listing repetitive duties',
      'Duration of employment and task volume',
      'EMG/NCS for nerve involvement',
    ],
    commonTreatments: [
      'Activity modification and ergonomic restructuring',
      'NSAIDs and corticosteroid injections',
      'Occupational therapy and splinting',
      'Surgical release (tendon or ligament)',
      'Vocational rehabilitation if needed',
    ],
  },

  'vehicle-accident': {
    description: `Work-related motor vehicle accidents — delivery drivers, truckers, sales representatives, and construction equipment operators — produce some of the highest-value workers' compensation claims because injuries often involve multiple body parts and may include head and spinal trauma. When the at-fault driver was a third party, you may pursue both a workers' comp claim and a separate personal injury lawsuit, potentially recovering amounts that exceed workers' comp limits. Commercial vehicle accidents involving large trucks may involve FMCSA regulatory violations that support additional liability claims.`,
    treatments: `Treatment depends entirely on injuries sustained. Vehicle accidents causing soft tissue injuries: physical therapy, 4–12 weeks. Accidents causing fractures or spinal injury: surgical intervention, 6–24 months of rehabilitation. TBI from vehicle impact: neurological rehabilitation as described above. Multiple-trauma cases may require coordinated care from orthopedic, neurological, and pain management specialists.`,
    timeline: `Soft tissue vehicle accident cases: MMI in 3–6 months. Fractures and spinal injuries: 6–18 months. Severe multiple-trauma: 18–36 months or longer. Third-party claims run on separate timelines and statutes of limitations, typically 2–3 years from the accident date.`,
    documentation: [
      'Police accident report',
      'Employer vehicle use policy and trip records',
      'GPS or electronic logging device records',
      'Third-party insurance information',
      'Hospital and ER records',
      'Photos of vehicle damage and scene',
    ],
    commonTreatments: [
      'Emergency trauma care',
      'Orthopedic surgery (fractures)',
      'Spinal surgery if indicated',
      'Neurological rehabilitation',
      'Physical and occupational therapy',
    ],
  },
}

// Industry-specific context text
export const industryContexts: Record<string, string> = {
  construction: `Construction workers face injury rates more than twice the national average. OSHA's "Fatal Four" — falls, struck-by incidents, electrocution, and caught-in/between hazards — account for over 60% of construction fatalities annually. Non-fatal injuries predominantly involve the back, knees, and shoulders from heavy lifting, repetitive motion, and physically demanding postures. Construction workers are also at elevated risk for occupational diseases including silicosis (from concrete/masonry dust) and asbestos-related conditions in renovation and demolition work. The construction industry's high injury rate and average settlement of $58,000 in California (the highest of any industry) reflect both the frequency and severity of construction-related claims.`,

  manufacturing: `Manufacturing workers face elevated risks from machinery and equipment, repetitive motion tasks, chemical exposures, and noise-induced hearing loss. The sector has seen significant improvement in injury rates over the past two decades, but still exceeds the private sector average. Amputation injuries — among the most severe and highest-value workers' comp claims — occur at rates 3x higher in manufacturing than in other industries. Machine guarding deficiencies remain the leading OSHA citation in manufacturing facilities. Workers in food processing, metal fabrication, and plastics manufacturing face particularly elevated risk profiles.`,

  warehouse: `Warehouse and logistics workers — including those at major e-commerce fulfillment centers — face injury rates significantly above the private sector average. OSHA has increasingly scrutinized ergonomic hazards in fulfillment center operations. Primary injury causes include forklift and material handling equipment accidents, repetitive lifting and reaching, conveyor system hazards, and slip-and-fall incidents. Back injuries account for approximately 35% of all warehouse workers' comp claims. The rapid growth of e-commerce has dramatically increased the warehouse workforce, making this one of the fastest-growing categories of workers' comp claims.`,

  transport: `Transportation workers — including truck drivers, delivery drivers, and platform-based gig workers — face a complex workers' comp landscape. Vehicle accidents are the leading cause of work-related fatalities across all industries, and transportation workers bear disproportionate exposure. Back injuries from prolonged driving and loading/unloading are also prevalent. Workers classified as independent contractors by platform companies (Uber, DoorDash, etc.) may face classification disputes affecting their coverage — several states have passed legislation specifically addressing gig worker coverage.`,

  healthcare: `Healthcare workers file workers' compensation claims at significantly higher rates than general private industry. Nursing assistants and orderlies have among the highest injury rates of any US occupation due to patient handling demands. The three leading cause categories are: musculoskeletal injuries from patient lifting (accounting for 40%+ of healthcare claims); needlestick and blood-borne pathogen exposures; and workplace violence injuries, which have increased substantially in hospital and long-term care settings. Healthcare workers filing workers' comp claims for COVID-19 exposure face state-specific presumption laws that vary widely.`,

  agriculture: `Agricultural workers face some of the highest occupational fatality rates of any US industry, driven by equipment rollovers, machinery incidents, and heat-related illness. Federal OSHA coverage of agricultural workers is limited compared to other industries, and small farm exemptions mean many workers lack full regulatory protections. Pesticide exposure claims are a unique category in agricultural workers' comp, requiring specialized medical evaluation. Heat illness claims have increased significantly in western states as climate-related temperatures rise, and several states have enacted specific heat illness prevention standards.`,

  retail: `Retail workers face lower overall injury rates than high-risk industries, but the large workforce size makes retail one of the highest-volume workers' comp categories. Slip and fall injuries on wet or uneven surfaces are the most common cause of workers' comp claims in retail. Lifting and overexertion injuries from stocking, unloading, and material handling are also prevalent. Customer interaction creates exposure to workplace violence, particularly in convenience store and pharmacy settings. The holiday season produces a notable spike in retail workers' comp claims from new, undertrained temporary workers.`,

  'food-service': `Food service workers face a combination of injury risks including burns from cooking surfaces and hot liquids, slip and fall incidents on wet kitchen floors, and repetitive stress from extended standing and repetitive motions. The restaurant industry's high employee turnover and prevalence of younger workers contribute to elevated injury rates among new, less experienced employees. Workers' comp for food service workers is frequently complicated by undocumented immigration status — all workers are covered by workers' comp regardless of immigration status, but fear of status-based retaliation may deter claims.`,

  mining: `Mining remains one of the most hazardous industries in the United States despite decades of safety improvements. Underground coal mining, surface mining, and quarrying all carry significantly elevated injury and fatality rates. The Federal Mine Safety and Health Act (MSHA) provides additional protections beyond OSHA for miners. Occupational lung diseases — including black lung (coal workers' pneumoconiosis), silicosis, and asbestosis — are a major workers' comp category unique to mining. Miners with black lung may be eligible for both state workers' comp and federal Black Lung Benefits under Title IV of the Federal Mine Safety and Health Act.`,

  utilities: `Utilities workers — in electric, gas, water, and telecommunications — face elevated risk from electrical hazards, working at height, and equipment incidents. Electrical arc flash injuries are particularly severe and can cause catastrophic burns, neurological damage, and death. OSHA's electrical safety standards (29 CFR 1910.302–308) and lockout/tagout standard (29 CFR 1910.147) govern employer obligations. Compliance failures with these standards are both OSHA violations and evidence supporting workers' comp claims. Utility line work is consistently ranked among the most dangerous occupations in the US.`,

  office: `Office workers face lower injury rates than physical labor industries, but repetitive stress injuries (particularly carpal tunnel syndrome), ergonomic back injuries, and slip-and-fall accidents within office environments produce a meaningful volume of workers' comp claims. Remote work has introduced new questions about home office workers' comp coverage — most states cover remote work injuries that occur in the course of employment, but the boundaries of coverage are still being defined through case law. Mental health workers' comp claims, including stress and PTSD, are an emerging category in office environments.`,

  education: `Education workers — teachers, administrators, custodians, and support staff — face a mix of injury risks including physical assault (particularly in special education and alternative school settings), ergonomic injuries from awkward postures and equipment use, and slip-and-fall incidents. Work-related stress and psychological injuries are increasingly recognized in education workers' comp, particularly following the COVID-19 pandemic's impact on school environments. School custodians and maintenance staff face injury profiles more similar to facilities and construction workers.`,
}
