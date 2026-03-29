// E-E-A-T content: injury-specific and state-specific descriptions
// Used by copy-generator.ts and InjuryPageTemplate to build substantive page content

export interface InjuryContent {
  description: string
  commonTreatments: string[]
  documentationNeeded: string[]
  returnToWork: string
}

export interface StateContent {
  overview: string
  statute: string
  reportingDays: number
  uniqueFeatures: string[]
}

export const INJURY_CONTENT: Record<string, InjuryContent> = {
  'back-injury': {
    description: `Back and spine injuries are the single most frequent and costly category of workers' compensation claims in the United States, accounting for roughly one in five lost-time injuries. They range from soft-tissue sprains and disc herniations to fractures and paralysis. Workers in physically demanding roles — construction, warehouse, nursing — face disproportionate risk, but even sedentary office workers suffer cumulative lumbar strain. The L4–L5 and L5–S1 disc levels are most often affected, and even moderate herniations can cause radiating leg pain (sciatica) that prevents any meaningful work activity for months. Settlement values climb steeply when surgery is involved, because post-operative functional limitations are often permanent and verifiable through AMA impairment ratings.`,
    commonTreatments: [
      'Physical therapy (8–26 weeks)',
      'Epidural steroid injections (ESI)',
      'MRI and diagnostic imaging',
      'Chiropractic care',
      'Surgery: discectomy, laminectomy, or spinal fusion',
      'Pain management / opioid protocols',
    ],
    documentationNeeded: [
      'MRI and X-ray reports (pre- and post-injury if available)',
      'Treating physician and specialist notes',
      'Incident report filed with employer',
      'Wage statements for 52 weeks prior to injury',
      'Physical therapy discharge summary',
      'AMA impairment rating from an independent medical evaluator',
    ],
    returnToWork: 'Average return-to-work time is 8–26 weeks for non-surgical cases; 6–18 months when spinal fusion is required.',
  },

  'knee-injury': {
    description: `Knee injuries rank among the most common occupational injuries for workers who kneel, squat, climb, or operate heavy equipment. The most prevalent diagnoses are ACL tears, meniscus tears, and patellofemoral syndrome. Most states treat the knee as a "scheduled" body part — meaning your permanent disability benefit is calculated based on a fixed number of weeks tied to impairment rating, regardless of wage loss. New York allows up to 288 weeks and New Jersey up to 315 weeks for total knee loss. Arthroscopic surgery is routine for meniscus repairs, while ACL reconstruction requires months of rehabilitation and often results in accelerated arthritis, which itself qualifies as an ongoing compensable condition in many states.`,
    commonTreatments: [
      'RICE protocol (Rest, Ice, Compression, Elevation)',
      'Arthroscopic surgery (meniscectomy or repair)',
      'ACL reconstruction',
      'Physical therapy and bracing',
      'Cortisone or hyaluronic acid injections',
      'Total knee replacement (severe cases)',
    ],
    documentationNeeded: [
      'MRI confirming structural damage',
      'Orthopedic surgeon operative report',
      'Pre-injury employment records showing physical duties',
      'Incident or accident report',
      'Post-surgical PT records',
      'Impairment rating report',
    ],
    returnToWork: 'Light-duty return typically occurs 4–8 weeks post-arthroscopy; full duty after ACL reconstruction averages 9–12 months.',
  },

  'shoulder-injury': {
    description: `Shoulder injuries — rotator cuff tears, labral tears (SLAP/Bankart), and glenohumeral dislocations — are particularly common among construction workers, painters, electricians, and warehouse staff who perform overhead work. Rotator cuff repairs are among the costliest outpatient orthopedic procedures, with average surgical costs exceeding $25,000. The shoulder is generally a "scheduled" body part in states like New York (312 weeks) and New Jersey (330 weeks), but in AMA-based states the impairment rating methodology often yields lower awards for partial tears that do not require surgery. Contested shoulder claims frequently turn on causation — whether the condition is acute trauma vs. degenerative wear. Documenting a specific incident is critical to maximizing settlement value.`,
    commonTreatments: [
      'Conservative management: rest, sling, NSAIDs',
      'Physical therapy (rotator cuff strengthening)',
      'Corticosteroid injections',
      'Rotator cuff repair (arthroscopic or open)',
      'SLAP repair or labral reconstruction',
      'Shoulder replacement (severe glenohumeral arthritis)',
    ],
    documentationNeeded: [
      'MRI arthrogram of the shoulder',
      'Orthopedic surgeon evaluation notes',
      'Job description documenting overhead work duties',
      'Employer incident report',
      'Physical therapy progress notes',
      'AMA impairment rating',
    ],
    returnToWork: 'Light-duty work is often possible within 2–4 weeks; return to full overhead activity following rotator cuff repair typically requires 4–6 months of rehabilitation.',
  },

  'hand-injury': {
    description: `Hand and wrist injuries encompass fractures, tendon lacerations, crush injuries, and nerve damage — conditions that can permanently reduce grip strength and fine motor function. The hand is covered under scheduled-loss provisions in most states, with New York awarding up to 244 weeks and New Jersey up to 245 weeks for total loss. Nerve injuries (ulnar, median, or radial neuropathy) are particularly disabling for workers in skilled trades, healthcare, or manufacturing, where hand precision is essential. Even partial loss of function can meet the threshold for permanent impairment under the AMA Guides, 5th Edition. Timely reporting is critical: delayed treatment creates causation disputes, and employers frequently argue pre-existing degenerative conditions caused the injury.`,
    commonTreatments: [
      'Splinting and casting for fractures',
      'Tendon repair surgery',
      'Nerve repair or grafting',
      'Hand therapy and occupational rehabilitation',
      'Carpal tunnel release (if concurrent)',
      'Skin grafting for crush/degloving injuries',
    ],
    documentationNeeded: [
      'X-rays confirming fractures or dislocations',
      'Surgeon operative report',
      'Nerve conduction studies (for nerve injuries)',
      'Grip strength measurements pre- and post-treatment',
      'Job description listing manual work requirements',
      'Incident report and witness statements',
    ],
    returnToWork: 'Simple fractures: 4–8 weeks. Tendon or nerve repairs: 3–6 months depending on the specific structure involved and the demands of the job.',
  },

  'foot-injury': {
    description: `Foot and ankle injuries at work range from metatarsal fractures (common in construction when objects are dropped) to Achilles tendon ruptures and ankle sprains. Most states schedule the foot and ankle separately — New York awards up to 205 weeks for total foot loss. Workers who spend long shifts on hard surfaces may develop plantar fasciitis as a compensable occupational disease. Crush injuries to the foot, particularly in manufacturing and warehouse settings, can cause complex regional pain syndrome (CRPS), a neuropathic pain condition that dramatically inflates settlement values due to its chronic nature and treatment-resistant profile. Surgical cases involving hardware implantation often lead to arthritic changes that require ongoing treatment for years.`,
    commonTreatments: [
      'Cast or boot immobilization',
      'Open reduction internal fixation (ORIF)',
      'Achilles tendon repair',
      'Physical therapy and gait retraining',
      'Custom orthotics',
      'Ankle arthroscopy or fusion (severe arthritis)',
    ],
    documentationNeeded: [
      'X-rays and CT scan of fracture or dislocation',
      'Podiatrist or orthopedic surgeon notes',
      'Incident report describing the mechanism of injury',
      'Employer records confirming work-related cause',
      'Functional capacity evaluation',
      'Impairment rating per AMA Guides',
    ],
    returnToWork: 'Ankle sprains: 2–6 weeks. Metatarsal fractures: 6–10 weeks. Achilles repair or complex foot reconstruction: 4–9 months.',
  },

  'neck-injury': {
    description: `Cervical spine injuries — disc herniations, facet joint injuries, and cervical radiculopathy — frequently result from vehicle accidents, falls, or acute lifting events. The neck is not a scheduled body part in most states, which means permanent disability is calculated under the whole-person impairment methodology. Cervical radiculopathy (nerve compression causing pain, numbness, or weakness radiating into the arms) is a common outcome of C5–C6 or C6–C7 disc herniation. Cervical fusion carries significant risk of adjacent-segment disease, meaning degeneration above or below the fused level often leads to future surgery — a factor that supports higher settlement demands. Thorough neurological documentation distinguishing radiculopathy from peripheral neuropathy is critical for claim value.`,
    commonTreatments: [
      'Rest, cervical collar, and NSAIDs',
      'Physical therapy (traction, strengthening)',
      'Cervical epidural steroid injections',
      'Anterior cervical discectomy and fusion (ACDF)',
      'Cervical disc replacement (arthroplasty)',
      'Pain management and trigger-point injections',
    ],
    documentationNeeded: [
      'Cervical MRI showing disc pathology',
      'Neurosurgeon or spine surgeon evaluation',
      'EMG/nerve conduction study for radiculopathy',
      'Incident or accident report',
      'Pre-injury imaging (if available) to establish causation',
      'Whole-person AMA impairment rating',
    ],
    returnToWork: 'Conservative cervical cases: 4–12 weeks. Post-ACDF surgery: 3–6 months for sedentary work, 6–12 months for manual labor.',
  },

  'head-injury': {
    description: `Traumatic brain injuries (TBI) represent some of the most complex and high-value workers' compensation claims. Even mild TBI (concussion) can produce persistent post-concussion syndrome — headaches, cognitive impairment, light sensitivity, and emotional dysregulation — that prevents return to skilled work for extended periods. Moderate and severe TBI can result in permanent cognitive deficits, seizure disorders, and the need for long-term care. TBI claims require multidisciplinary documentation from neurologists, neuropsychologists, and occupational therapists. Average settlement values for significant TBI are well above $100,000 and can exceed $1 million in severe cases with permanent total disability. Falls from elevation (construction) and vehicle accidents are the leading causes of work-related TBI.`,
    commonTreatments: [
      'Acute hospitalization and neurosurgical evaluation',
      'CT and MRI neuroimaging',
      'Neuropsychological testing (baseline and follow-up)',
      'Cognitive rehabilitation therapy',
      'Occupational therapy for daily living skills',
      'Psychiatric treatment for mood disorders and PTSD',
    ],
    documentationNeeded: [
      'Emergency room and hospital records',
      'CT scan and brain MRI reports',
      'Neuropsychologist evaluation reports',
      'Neurologist treatment notes',
      'Witness statements and incident report',
      'Pre-injury employment and academic records (for cognitive comparison)',
    ],
    returnToWork: 'Mild TBI: 2–12 weeks. Moderate TBI: 6 months to 2 years. Severe TBI: permanent total disability is common.',
  },

  'eye-injury': {
    description: `Occupational eye injuries range from chemical burns and arc flash (welding) to penetrating foreign body injuries and blunt trauma. The eye is a scheduled body part in most states — New York allows up to 160 weeks and New Jersey up to 200 weeks for total loss of one eye. Vision loss claims require documentation from an ophthalmologist using standardized visual acuity testing and visual field measurements. Workers using grinding equipment, cutting torches, or handling caustic chemicals face the highest risk. Chemical burns to the cornea (acids or alkalis) can cause permanent scarring and permanent vision loss even with prompt irrigation. Employers are required to provide ANSI-compliant eye protection; failure to do so strengthens your claim.`,
    commonTreatments: [
      'Emergency irrigation for chemical exposure',
      'Topical antibiotics and steroids',
      'Corneal surgery or transplant',
      'Foreign body removal under slit-lamp',
      'Intraocular surgery (for penetrating trauma)',
      'Low vision rehabilitation',
    ],
    documentationNeeded: [
      'Ophthalmology evaluation with visual acuity measurements',
      'Slit-lamp examination records',
      'Photographs of the injury (ER or ophthalmology)',
      'OSHA incident report',
      'Employer safety log (confirming no prior eye protection provided)',
      'Visual field testing for permanent disability',
    ],
    returnToWork: 'Minor corneal abrasions: 1–5 days. Moderate burns or penetrating injury: 4–12 weeks. Permanent vision loss may prevent return to certain occupations.',
  },

  'amputation': {
    description: `Traumatic amputation of fingers, hands, or limbs is among the most severe work injuries and typically results in substantial permanent disability awards. Manufacturing press machines, saws, conveyors, and agricultural equipment are the most common causes. The scheduled-loss system in states like New York (up to 312 weeks for arm loss) and New Jersey (330 weeks) often produces higher awards than AMA-based calculations, particularly for upper-limb amputations. Microsurgical replantation is attempted when feasible, but functional outcome varies — some workers elect forgo replantation due to the extended rehabilitation period. Prosthetic devices, including advanced myoelectric prosthetics, are compensable medical expenses. Future medical costs (prosthetic replacement every 3–5 years) should be included in any settlement demand.`,
    commonTreatments: [
      'Emergency hemorrhage control and wound stabilization',
      'Microsurgical replantation (where indicated)',
      'Residual limb shaping and wound care',
      'Prosthetic fitting and training',
      'Occupational therapy for adaptive function',
      'Psychological counseling for body image and PTSD',
    ],
    documentationNeeded: [
      'Emergency room operative report',
      'Surgeon replantation or revision notes',
      'Prosthetics evaluation and cost projection',
      'Functional capacity evaluation (FCE)',
      'Vocational rehabilitation assessment',
      'Life care plan (for upper-limb or lower-limb loss)',
    ],
    returnToWork: 'Return to sedentary work: 3–6 months. Return to pre-injury physical work: often impossible without significant vocational retraining.',
  },

  'fall-injury': {
    description: `Falls — from elevation (ladders, scaffolding, roofs) and on the same level (slips and trips) — are the leading cause of fatal and non-fatal occupational injuries across all industries. Fall injuries typically involve multiple body parts simultaneously: fractures of the hip, wrist, shoulder, and spine are common when a worker cannot brace effectively. Falls from significant height (above 10 feet) have a high probability of causing TBI along with orthopedic injuries, which dramatically increases claim value. OSHA requires fall protection for work at heights above 6 feet in construction. Employer failure to provide guardrails, harnesses, or proper scaffolding is a statutory violation that can support a third-party negligence claim against a general contractor.`,
    commonTreatments: [
      'Fracture reduction and fixation (ORIF)',
      'Spinal stabilization surgery',
      'Hip replacement (for femoral neck fractures)',
      'Neurological evaluation for TBI',
      'Physical and occupational therapy',
      'Pain management',
    ],
    documentationNeeded: [
      'Emergency room and hospitalization records',
      'Imaging studies (X-ray, CT, MRI) for each injured body part',
      'OSHA incident report',
      'Photographs of the fall location and conditions',
      'Witness statements',
      'Safety equipment log (showing absence of required fall protection)',
    ],
    returnToWork: 'Simple ankle or wrist fractures: 6–10 weeks. Multiple fractures or TBI: 6 months to permanent total disability.',
  },

  'equipment-injury': {
    description: `Machinery and equipment injuries encompass crush injuries, lacerations, degloving, entanglement, and caught-between incidents. These injuries are associated with the highest severity outcomes in workers' compensation — multiple amputations, permanent neurological deficits, and fatality. OSHA's machine guarding standards (29 CFR 1910.212) require point-of-operation guards, and many equipment injuries occur when guards have been removed for maintenance or production speed. When an equipment manufacturer's defective design contributed to the injury, a parallel products liability tort claim against the manufacturer may yield substantial additional compensation outside the workers' comp system, which is critical given the exclusive-remedy limitations of workers' comp.`,
    commonTreatments: [
      'Emergency surgery (vascular repair, wound debridement)',
      'Replantation or revision amputation',
      'Skin grafting for degloving injuries',
      'Peripheral nerve repair',
      'Long-term physical and occupational therapy',
      'Prosthetics (if amputation involved)',
    ],
    documentationNeeded: [
      'Emergency room operative reports',
      'OSHA 300 log entry and incident investigation report',
      'Equipment maintenance records and guard removal history',
      'Photographs of the machine and injury site',
      'Witness statements from co-workers',
      'Life care plan for severe injuries',
    ],
    returnToWork: 'Ranges from 4 months (single limb injury, sedentary reemployment) to permanent total disability for multi-limb or severe crush injuries.',
  },

  'repetitive-strain': {
    description: `Repetitive strain injuries (RSI) develop over time from cumulative microtrauma to tendons, muscles, and nerves caused by repetitive motions, awkward postures, or sustained force. Common RSI diagnoses include lateral epicondylitis (tennis elbow), de Quervain's tenosynovitis, trigger finger, and iliotibial band syndrome. Assembly-line workers, data entry clerks, and healthcare workers performing repeated patient handling are among the most affected. The occupational causation of RSI is often disputed by employers and insurers, who argue that the condition is idiopathic or related to leisure activities. Strong documentation — including an ergonomic workstation analysis showing the causative motions — is essential. Many RSI claims succeed with medical testimony establishing a "more likely than not" causal link to work activities.`,
    commonTreatments: [
      'Activity modification and ergonomic restructuring',
      'NSAIDs and corticosteroid injections',
      'Occupational therapy (splinting, stretching programs)',
      'Platelet-rich plasma (PRP) injections',
      'Surgical release (tendon or ligament)',
      'Vocational rehabilitation if heavy-duty work cannot resume',
    ],
    documentationNeeded: [
      'Physician diagnosis with occupational causation opinion',
      'Ergonomic analysis of workstation and tasks',
      'Job description listing repetitive duties',
      'Duration of employment and volume of repetitive tasks',
      'Medical records showing progression of symptoms',
      'EMG/NCS for nerve involvement',
    ],
    returnToWork: 'With appropriate ergonomic modification: 4–12 weeks. If surgery is required or the job cannot be modified: vocational retraining may be necessary.',
  },

  'lifting-injury': {
    description: `Overexertion from lifting is responsible for more workers' compensation claims than any other single mechanism of injury — approximately 35% of all work-related musculoskeletal disorders in the United States. Warehouse workers, home health aides, nurses, and construction laborers face the highest exposure. Injuries most commonly involve the lumbar spine (disc herniation, facet syndrome, or muscle strain), but shoulders and knees also sustain significant force during heavy or awkward lifts. The key challenge in lifting injury claims is documenting that the injury occurred at work — especially for cumulative injuries that develop gradually. NIOSH's recommended weight limit (35 lbs for most tasks) provides a benchmark for establishing that an employer's lifting requirements exceeded safe limits.`,
    commonTreatments: [
      'Physical therapy and core stabilization',
      'Lumbar epidural steroid injections',
      'Spinal surgery (for confirmed herniation with neurological deficit)',
      'Transcutaneous electrical nerve stimulation (TENS)',
      'Heat, ice, and massage therapy',
      'Functional restoration programs',
    ],
    documentationNeeded: [
      'Treating physician records documenting lifting mechanism',
      'Job description confirming lifting requirements and weight limits',
      'Incident report or supervisor notification records',
      'MRI of the affected spinal region',
      'Wage records for 12 months prior to injury',
      'AMA impairment rating after MMI',
    ],
    returnToWork: 'Lumbar strain without disc involvement: 2–6 weeks. Disc herniation without surgery: 4–12 weeks. Post-surgical: 3–6 months.',
  },

  'vehicle-accident': {
    description: `Work-related motor vehicle accidents — delivery drivers, truckers, sales representatives, and construction equipment operators — produce some of the highest-value workers' compensation claims because injuries often involve multiple body parts and may include head and spinal trauma. When the at-fault driver was a third party (not your employer), you may pursue both a workers' comp claim and a separate personal injury lawsuit, potentially recovering amounts that exceed workers' comp limits. Commercial vehicle accidents involving large trucks are governed by FMCSA regulations; violations of hours-of-service rules or maintenance standards can support significant third-party liability. Uninsured motorist (UM) coverage on the employer's commercial auto policy may also be available.`,
    commonTreatments: [
      'Emergency trauma care and hospitalization',
      'Spinal and orthopedic surgery',
      'Traumatic brain injury rehabilitation',
      'Pain management and nerve blocks',
      'Physical and occupational therapy',
      'Psychological counseling for PTSD',
    ],
    documentationNeeded: [
      'Police accident report',
      'Employer vehicle use policy and trip records',
      'Driver log or GPS records confirming work trip',
      'Third-party insurance information',
      'Hospital and ER records',
      'Independent medical evaluation',
    ],
    returnToWork: 'Soft-tissue injuries: 4–12 weeks. Significant orthopedic or neurological injury: 6 months to 2+ years.',
  },

  'burn-injury': {
    description: `Workplace burn injuries range from minor contact burns (first-degree) to catastrophic full-thickness burns covering large body surface areas. Burns are classified by depth (first through fourth degree) and surface area using the "rule of nines." Even moderate second-degree burns covering 10–15% of body surface area require hospitalization, surgical debridement, and skin grafting. Burn victims in industrial settings (chemical plant explosions, electrical arc flash, foundry operations) often suffer inhalation injury simultaneously, which is a life-threatening complication. Scar formation and contractures after significant burns frequently lead to permanent functional limitations, cosmetic disfigurement claims, and the need for reconstructive surgery over many years. These factors substantially increase claim value.`,
    commonTreatments: [
      'Fluid resuscitation and wound care in a burn center',
      'Surgical debridement and skin grafting',
      'Negative pressure wound therapy (VAC)',
      'Physical therapy for contracture prevention',
      'Reconstructive and plastic surgery',
      'Compression garments and scar management',
    ],
    documentationNeeded: [
      'Burn center admission and treatment records',
      'Percentage of total body surface area (TBSA) burned',
      'Incident report and fire investigation report',
      'OSHA 300 log entry',
      'Photographs of the burn site and injuries',
      'Long-term care plan including future reconstructive surgeries',
    ],
    returnToWork: 'Minor burns: 1–4 weeks. Significant burns requiring grafting: 3–12 months. Severe or disfiguring burns: may require vocational retraining.',
  },

  'electrical-injury': {
    description: `Electrical injuries — electrocution, arc flash, and lightning strike — cause complex systemic injuries that go beyond surface burns. Electrical current traveling through the body can cause cardiac arrhythmia, neurological damage, rhabdomyolysis (muscle breakdown), and deep tissue necrosis not visible externally at the time of injury. Many workers with significant electrical injuries appear initially uninjured, then develop serious complications over 24–72 hours. OSHA's lockout/tagout standards (29 CFR 1910.147) and electrical safety standards (29 CFR 1910.302–308) govern employer obligations. Employer violations of these standards strengthen the claim and can support inspections or citations. Because electrical injuries have a delayed presentation, documenting the full extent of injury requires a comprehensive evaluation 2–4 weeks post-exposure.`,
    commonTreatments: [
      'Cardiac monitoring and ECG',
      'Burn wound care and grafting',
      'Kidney dialysis (for rhabdomyolysis)',
      'Neurological evaluation for delayed neuropathy',
      'Ophthalmology evaluation (cataracts from current)',
      'Long-term neuropsychological follow-up',
    ],
    documentationNeeded: [
      'Emergency room ECG and troponin results',
      'OSHA incident investigation report',
      'Lockout/tagout compliance records',
      'Electrical contractor or utility company records',
      'Neurological follow-up evaluation',
      'Occupational medicine causation opinion',
    ],
    returnToWork: 'Low-voltage contact with limited tissue damage: 2–6 weeks. High-voltage or arc flash with deep injury: 6 months to permanent disability.',
  },

  'heat-illness': {
    description: `Heat-related illness on the job — heat exhaustion and heat stroke — is a growing workers' compensation concern as temperatures rise. Heat stroke is a medical emergency in which core body temperature exceeds 104°F with central nervous system dysfunction; without immediate cooling, permanent brain damage and death can result. Outdoor workers (agriculture, construction, landscaping, roofing) and indoor workers in foundries, bakeries, and warehouses are most at risk. OSHA has proposed federal heat illness prevention standards, and several states (California, Oregon, Washington) already have enforceable heat illness regulations. Employers who fail to provide shade, water, and rest periods face OSHA citations. Cognitive impairment from heat stroke may qualify as permanent whole-person impairment under the AMA Guides.`,
    commonTreatments: [
      'Immediate cooling (ice packs, cold IV fluids)',
      'IV fluid and electrolyte replacement',
      'Hospitalization for monitoring',
      'Neurological evaluation for heat stroke survivors',
      'Cardiac monitoring (rhabdomyolysis risk)',
      'Neuropsychological testing for cognitive effects',
    ],
    documentationNeeded: [
      'Emergency room temperature readings and treatment records',
      'Employer heat illness prevention program (or absence thereof)',
      'Weather records for the day of injury',
      'Witness statements confirming work conditions',
      'OSHA citation records (if applicable)',
      'Neurologist follow-up notes',
    ],
    returnToWork: 'Heat exhaustion with full recovery: 3–7 days. Heat stroke with neurological sequelae: weeks to months; permanent disability possible.',
  },

  'slip-fall': {
    description: `Slip-and-fall injuries on wet, slippery, or uneven surfaces are among the most common workplace accidents across all industries. Retail, food service, healthcare, and construction workers face the highest frequency. Injuries depend on the direction of the fall: backward falls (slip) often cause wrist fractures (FOOSH — fall on outstretched hand), hip fractures, and head injuries. Forward falls (trip) commonly result in knee injuries and facial trauma. Hip fractures in workers over 50 are particularly significant, as they often require total hip replacement and prolonged rehabilitation. In addition to workers' compensation, slip-and-fall injuries may support a third-party premises liability claim against a property owner (in cases where the injury occurred at a client's or third-party site).`,
    commonTreatments: [
      'Hip ORIF or total hip replacement',
      'Wrist fracture fixation',
      'Concussion and TBI evaluation',
      'Physical therapy and gait retraining',
      'Knee surgery if ligamentous injury occurred',
      'Fall prevention assessment for return to work',
    ],
    documentationNeeded: [
      'Incident report identifying the hazardous surface',
      'Photographs of the accident location immediately after the incident',
      'Witness statements',
      'Floor inspection and maintenance records',
      'Hospital and orthopedic treatment records',
      'Functional capacity evaluation',
    ],
    returnToWork: 'Simple wrist fracture: 4–8 weeks. Hip fracture requiring replacement: 3–6 months. Hip fracture in older worker: may not return to pre-injury physical work.',
  },

  'carpal-tunnel': {
    description: `Carpal tunnel syndrome (CTS) is the most common occupational peripheral nerve disorder in the United States, caused by compression of the median nerve at the wrist. Assembly workers, cashiers, data-entry operators, and vibrating tool operators have a significantly elevated prevalence compared to the general population. CTS is diagnosed via nerve conduction study (NCS) and electromyography (EMG), and the severity is graded mild, moderate, or severe. Mild and moderate CTS responds to splinting, ergonomic modification, and steroid injections in many cases, but severe CTS typically requires carpal tunnel release surgery. Bilateral CTS is common in occupational settings and results in compounded impairment ratings. Causation is often disputed by employers claiming the condition is idiopathic; epidemiological data and a physician's occupational causation opinion are essential.`,
    commonTreatments: [
      'Wrist splinting (especially nocturnal)',
      'Corticosteroid injection',
      'Ergonomic workstation modification',
      'Carpal tunnel release surgery (open or endoscopic)',
      'Post-operative occupational therapy',
      'Nerve gliding exercises',
    ],
    documentationNeeded: [
      'Nerve conduction study and EMG report',
      'Occupational medicine or hand surgeon evaluation',
      'Job description detailing repetitive and forceful hand use',
      'Ergonomic workstation assessment',
      'Duration and volume of repetitive work history',
      'AMA impairment rating post-MMI',
    ],
    returnToWork: 'Post-carpal-tunnel release: light duty in 1–2 weeks; full grip strength and unrestricted work typically at 3–6 weeks.',
  },

  'hearing-loss': {
    description: `Occupational hearing loss (OHL) is one of the most prevalent occupational diseases in the United States, affecting millions of workers exposed to sustained noise levels above 85 dBA. It is sensorineural — caused by damage to the cochlear hair cells — and is irreversible. OSHA requires hearing conservation programs (29 CFR 1910.95) for workers exposed above 85 dBA. OHL is typically a cumulative injury, meaning claims are calculated based on the total hearing loss after the occupational exposure period. Most states treat OHL under scheduled-loss provisions. New York allows up to 150 weeks for bilateral hearing loss. Baseline audiograms at hire and annual monitoring audiograms are the critical evidence — the shift in hearing threshold over employment demonstrates causation. Tinnitus is frequently associated with OHL and may be separately compensable in some states.`,
    commonTreatments: [
      'Hearing aids (binaural fitting)',
      'Cochlear implant evaluation (severe-to-profound loss)',
      'Auditory rehabilitation and aural training',
      'Tinnitus management (sound therapy, CBT)',
      'Protection against further exposure',
      'Communication strategy training',
    ],
    documentationNeeded: [
      'Baseline and serial audiometric test results',
      'Otolaryngologist (ENT) evaluation',
      'Noise exposure history and noise level measurements (sound level meter data)',
      'OSHA compliance records for hearing conservation program',
      'Duration and intensity of occupational noise exposure',
      'Independent audiological evaluation for impairment rating',
    ],
    returnToWork: 'Hearing loss itself does not prevent most work; return to noise-exposed work requires adequate hearing protection with monitoring.',
  },

  'mesothelioma': {
    description: `Mesothelioma is a malignant cancer of the pleura, peritoneum, or pericardium caused almost exclusively by asbestos exposure. Latency between first asbestos exposure and diagnosis typically ranges from 20 to 50 years, meaning workers diagnosed today were exposed in industrial settings decades ago. Mesothelioma workers' compensation claims intersect significantly with personal injury asbestos litigation, which historically has produced settlements and verdicts in the millions. Workers' comp provides medical benefits and wage replacement, but the tort system typically provides far greater compensation for pain and suffering. Many asbestos trust funds — created by bankrupt asbestos manufacturers — pay claims independently of workers' comp. Mesothelioma carries a median survival of 12–21 months, making prompt legal action critical.`,
    commonTreatments: [
      'Extrapleural pneumonectomy (EPP) or pleurectomy/decortication (P/D)',
      'Chemotherapy (pemetrexed + cisplatin)',
      'Immunotherapy (pembrolizumab, nivolumab)',
      'Radiation therapy',
      'Palliative care and pain management',
      'Clinical trial enrollment',
    ],
    documentationNeeded: [
      'Pathology report confirming mesothelioma diagnosis',
      'Asbestos exposure history (employment records, union records)',
      'Coworker affidavits identifying asbestos products',
      'Military service records (if shipyard or Navy exposure)',
      'Social Security earnings history',
      'Asbestos trust fund claim eligibility evidence',
    ],
    returnToWork: 'Mesothelioma is generally a totally disabling condition; most claimants are unable to return to work and may qualify for permanent total disability or Social Security Disability.',
  },

  'lung-disease': {
    description: `Occupational lung diseases — including pneumoconiosis (silicosis, coal workers' pneumoconiosis), hypersensitivity pneumonitis, and occupational asthma — result from years of inhaling toxic dusts, gases, or biological agents. Unlike traumatic injuries, occupational lung disease develops insidiously, and workers are often unaware of the connection between their work and respiratory symptoms until significant lung function has been lost. NIOSH surveillance data indicates that silicosis rates have risen sharply in the engineered stone industry (quartz countertop fabrication). Spirometry (FEV1/FVC ratio), HRCT of the chest, and bronchoalveolar lavage are the primary diagnostic tools. Once lung fibrosis is established, it is irreversible; treatment is supportive and focused on slowing progression. Whole-person impairment under the AMA Guides can reach 40–60% for moderate-to-severe restrictive lung disease.`,
    commonTreatments: [
      'Removal from exposure (critical for halting progression)',
      'Inhaled corticosteroids and bronchodilators',
      'Pulmonary rehabilitation',
      'Oxygen therapy',
      'Antifibrotic medications (for IPF/hypersensitivity pneumonitis)',
      'Lung transplant evaluation (severe cases)',
    ],
    documentationNeeded: [
      'Chest HRCT and PFT (pulmonary function testing)',
      'Pulmonologist evaluation and diagnosis report',
      'Occupational exposure history (dust and fume monitoring records)',
      'MSDS / SDS sheets for materials handled',
      'Industrial hygiene air sampling data',
      'AMA Guides respiratory impairment rating',
    ],
    returnToWork: 'Mild impairment with removal from exposure: possible light-duty return. Moderate to severe disease: typically permanently disabled from physically demanding work.',
  },

  'ptsd': {
    description: `Work-related post-traumatic stress disorder (PTSD) arises from exposure to traumatic events on the job — violent crimes (robbery, assault), mass casualty incidents, witnessing a coworker's fatal injury, or first-responder trauma exposure. PTSD compensability varies by state: some states require a physical injury accompanying the psychological trauma (physical-mental rule), while others allow standalone mental-mental claims. First responders — police officers, firefighters, and EMTs — are increasingly covered by dedicated presumptive PTSD laws in states including California, Florida, and Minnesota, which shift the burden of proof to the employer. Diagnosis requires DSM-5 criteria met by a licensed psychiatrist or psychologist. Neuroimaging (fMRI) is increasingly used to corroborate PTSD diagnoses in litigation.`,
    commonTreatments: [
      'Trauma-focused cognitive behavioral therapy (TF-CBT)',
      'EMDR (Eye Movement Desensitization and Reprocessing)',
      'SSRIs and SNRIs (sertraline, venlafaxine)',
      'Prazosin for nightmares',
      'Intensive outpatient program (IOP)',
      'Peer support and occupational rehabilitation',
    ],
    documentationNeeded: [
      'DSM-5 PTSD diagnosis from licensed psychiatrist or psychologist',
      'Incident report for the traumatic event',
      'Witness statements confirming the worker was present',
      'Police or emergency response records (for crime or mass casualty)',
      'Treatment records showing chronological development of symptoms',
      'Work absence and personnel records',
    ],
    returnToWork: 'With treatment: 3–12 months for many workers. Severe and treatment-resistant PTSD: permanent total psychiatric disability possible.',
  },

  'needlestick': {
    description: `Needlestick and sharps injuries in healthcare settings expose workers to bloodborne pathogens including HIV, hepatitis B (HBV), and hepatitis C (HCV). OSHA's Bloodborne Pathogen Standard (29 CFR 1910.1030) requires employers to provide engineering controls (safety-engineered sharps devices), training, and post-exposure follow-up. The post-exposure protocol must begin within hours of the incident — HIV prophylaxis (PEP) must be started within 72 hours to be effective. While the statistical risk of HIV transmission from a single needlestick is approximately 0.3%, the psychological burden and required prophylaxis medications (with significant side effects) often support workers' compensation claims even when seroconversion does not occur. Workers who do seroconvert to HCV or HIV face lifelong medical costs that must be captured in any settlement.`,
    commonTreatments: [
      'Immediate wound care and source testing',
      'HIV post-exposure prophylaxis (PEP) 28-day course',
      'Hepatitis B immune globulin and vaccination',
      'Baseline and follow-up serological testing (6 weeks, 3 months, 6 months)',
      'Hepatitis C direct-acting antivirals (if seroconversion)',
      'HIV antiretroviral therapy (if seroconversion)',
    ],
    documentationNeeded: [
      'Incident report filed within 24 hours',
      'Source patient test results (if available)',
      'Employer\'s exposure control plan',
      'Post-exposure medical evaluation records',
      'Baseline and follow-up serological results',
      'Evidence that safety-engineered devices were not provided',
    ],
    returnToWork: 'In most cases, immediate return to work is possible after wound care. PEP side effects (nausea, fatigue) may require temporary work modification.',
  },

  'skin-disease': {
    description: `Occupational skin diseases — principally contact dermatitis (irritant and allergic), occupational acne (chloracne), and skin infections — are the second most common occupational disease category in the United States. Healthcare workers (latex allergy, disinfectants), construction workers (cement, epoxy resins), hairdressers (hair dyes, bleaches), and food service workers (wet work) are most affected. Allergic contact dermatitis caused by sensitizing agents (such as chromate in cement or thiurams in rubber gloves) is permanent — once sensitized, reexposure to even trace amounts causes flare-ups, often making continued employment in the causative role impossible. Patch testing is the diagnostic gold standard. Chronic allergic contact dermatitis can reach 10–25% whole-person impairment under AMA standards.`,
    commonTreatments: [
      'Identification and complete avoidance of the causative agent',
      'Topical corticosteroids and emollients',
      'Systemic immunosuppressants (severe allergic dermatitis)',
      'Phototherapy (UV-B for chronic hand eczema)',
      'Barrier creams and protective gloves',
      'Vocational counseling if avoidance requires job change',
    ],
    documentationNeeded: [
      'Dermatologist evaluation with clinical photographs',
      'Patch test results identifying specific allergens',
      'MSDS / SDS for products handled at work',
      'Employer records confirming use of identified allergens',
      'Incident or symptom progression report',
      'AMA impairment rating from dermatologist',
    ],
    returnToWork: 'Irritant contact dermatitis with avoidance: weeks. Allergic sensitization to a workplace agent: may require permanent reassignment or retraining.',
  },

  'chemical-exposure': {
    description: `Toxic chemical exposures in occupational settings can cause acute poisoning (immediate symptom onset), chronic disease (from years of low-level exposure), or both. Solvents (benzene, toluene), heavy metals (lead, arsenic, mercury), pesticides (organophosphates), and isocyanates (spray painting) are among the most hazardous industrial chemicals. OSHA permissible exposure limits (PELs) define legally enforceable thresholds, but NIOSH recommended exposure limits (RELs) and ACGIH TLVs are often more protective. Chronic benzene exposure causes hematological malignancies including leukemia and aplastic anemia. Lead poisoning causes neurological damage, reproductive harm, and kidney disease. Blood lead levels, urine heavy metal panels, liver function tests, and neuropsychological testing are key diagnostic tools depending on the suspected agent.`,
    commonTreatments: [
      'Chelation therapy (for heavy metal poisoning)',
      'Decontamination and removal from exposure',
      'Pulmonary treatment (for inhaled toxics)',
      'Neurological monitoring and rehabilitation',
      'Oncology treatment (for chemically induced malignancies)',
      'Psychiatric support for cognitive and emotional sequelae',
    ],
    documentationNeeded: [
      'Industrial hygiene monitoring data (air sampling, biological monitoring)',
      'MSDS / SDS and chemical inventory for the workplace',
      'Blood or urine toxicology confirming exposure',
      'OSHA inspection records or citations',
      'Occupational medicine causation evaluation',
      'Specialist physician records (pulmonology, neurology, oncology)',
    ],
    returnToWork: 'Acute exposure with full recovery: weeks. Chronic poisoning with end-organ damage: months to permanent disability depending on the organ system affected.',
  },
}

// ─── State-specific content ───────────────────────────────────────────────────

export const STATE_CONTENT: Record<string, StateContent> = {
  california: {
    overview: `California operates one of the nation's most comprehensive workers' compensation systems, administered by the Division of Workers' Compensation (DWC). California uses the Permanent Disability Rating System (PDRS) with weekly PD payments based on a 0–100% scale, and the Qualified Medical Evaluator (QME) process for disputed medical-legal issues. SB 863 (2012) substantially reformed the system, introducing Independent Medical Review (IMR) for treatment disputes.`,
    statute: 'California Labor Code § 3200 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['PDRS impairment rating system (unique to CA)', 'QME / PQME process for disputed cases', "Injured Worker's Bill of Rights (Lab. Code § 4901)"],
  },
  texas: {
    overview: `Texas is the only state where employer participation in the workers' compensation system is optional (non-subscriber employers lose common-law defenses and can face tort suits). Subscribing employers are governed by the Texas Department of Insurance, Division of Workers' Compensation (DWC). Texas uses the AMA Guides, 4th Edition for impairment ratings. Injured workers have one year from the injury date to file a claim with the DWC.`,
    statute: 'Texas Labor Code § 406',
    reportingDays: 30,
    uniqueFeatures: ['Employer opt-out system — verify your employer subscribes', 'Impairment Income Benefits (IIBs) based on AMA 4th Ed.', '104-week Temporary Income Benefit cap before permanent rating'],
  },
  florida: {
    overview: `Florida's workers' compensation system, governed by Chapter 440 of the Florida Statutes, is known for being employer/insurer-favorable following the 2003 reforms. Attorney fees are strictly regulated, which limits claimant legal representation. The 1099 / independent contractor misclassification issue is particularly prevalent in Florida's construction industry. Maximum Medical Improvement (MMI) must be reached before permanent impairment benefits are calculated.`,
    statute: 'Chapter 440, Florida Statutes',
    reportingDays: 30,
    uniqueFeatures: ['Strict attorney fee schedule (§ 440.34)', 'Mandatory selection of authorized treating physician', '104-week TTD cap with limited exceptions'],
  },
  'new-york': {
    overview: `New York's Workers' Compensation Board administers one of the most worker-friendly systems in the nation, particularly for scheduled-loss injuries (loss of limb, vision, or hearing). New York uses a dual system: scheduled benefits for extremity injuries and spinal awards for non-scheduled injuries. PPD awards can continue for life for total industrial disability. The Workers' Compensation Board has exclusive jurisdiction and a well-developed administrative court system.`,
    statute: "New York Workers' Compensation Law (WCL)",
    reportingDays: 30,
    uniqueFeatures: ['Scheduled loss of use (SLU) for extremity injuries', 'Lifetime PPD benefits for total industrial disability', 'Mandatory use of Workers\' Compensation Board Medical Guidelines'],
  },
  illinois: {
    overview: `Illinois Workers' Compensation Commission (IWCC) administers a system notable for its high impairment benefit multipliers — permanent disability is calculated as a percentage-of-person disability, with payments at 60% of average weekly wage for the applicable number of weeks. Illinois has no maximum number of weeks for non-scheduled injuries, which can result in very high PPD awards for significant impairments. Attorney contingency fees are capped at 20% of disputed amounts.`,
    statute: "Illinois Workers' Compensation Act (820 ILCS 305)",
    reportingDays: 45,
    uniqueFeatures: ['Percentage-of-person disability system (no scheduled loss)', 'No cap on PPD weeks for non-scheduled injuries', 'Petitioner can choose treating physician'],
  },
  pennsylvania: {
    overview: `Pennsylvania's workers' compensation system is administered by the Bureau of Workers' Compensation under the Pennsylvania Department of Labor. Pennsylvania's system includes a significant Utilization Review (UR) process for medical disputes and an Impairment Rating Evaluation (IRE) that can convert total disability to partial disability status. The 2018 Protz decision significantly limited IRE use until legislative reform.`,
    statute: "Pennsylvania Workers' Compensation Act of 1915 (77 P.S. § 1 et seq.)",
    reportingDays: 21,
    uniqueFeatures: ['Impairment Rating Evaluation (IRE) can convert TTD to partial', 'Act 111 of 2018 reformed IRE to AMA 6th Edition', 'Notice of Compensation Payable (NCP) or Notice of Denial within 21 days'],
  },
  georgia: {
    overview: `The State Board of Workers' Compensation administers Georgia's program. Georgia uses the AMA Guides for impairment ratings and provides scheduled benefits for extremity injuries. The employer has the right to select the treating physician from a posted panel of physicians; if no panel exists, the employee may choose. Georgia's PPD benefits are capped at 400 weeks from the date of injury.`,
    statute: 'O.C.G.A. § 34-9-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Employer controls authorized physician (posted panel)', 'PPD benefits capped at 400 weeks', 'Change-of-condition petitions allow modification of benefits'],
  },
  'new-jersey': {
    overview: `New Jersey's Division of Workers' Compensation handles claims, with formal hearings before Workers' Compensation Judges. New Jersey uses a scheduled-loss system for extremity injuries and a percentage-of-total-disability system for non-scheduled injuries. PPD awards are expressed as a percentage of partial total (35 weeks of compensation per 1% disability). The 70% cap on attorney fees (of disputed amounts) allows for meaningful representation.`,
    statute: 'N.J.S.A. § 34:15-1 et seq.',
    reportingDays: 14,
    uniqueFeatures: ['Scheduled loss for extremities (per statutory schedule)', 'Total permanent disability award requires two physicians', 'Second Injury Fund available for pre-existing conditions'],
  },
  michigan: {
    overview: `Michigan's Workers' Disability Compensation Agency (WDCA) administers a wage-loss system — benefits are paid only when a claimant has an actual wage loss due to disability. This is unique among most states. Michigan uses a differential disability standard: if a worker can perform any type of job, benefits may be reduced or terminated through a "favored work" offer. Attorney fees are hourly (not contingency), which is another distinctive feature.`,
    statute: "Michigan Workers' Disability Compensation Act (MCL § 418.101 et seq.)",
    reportingDays: 90,
    uniqueFeatures: ['Wage-loss system (benefits tied to actual wage loss)', 'Favored-work defense — employer can offer light duty to suspend benefits', 'Appellate Commission provides two-tier appellate review'],
  },
  colorado: {
    overview: `Colorado's Division of Workers' Compensation (DOWC) administers the system with a focus on medical management and early return to work. Colorado requires employers to maintain an authorized treating physician and uses division-designated medical examinations (DIME) to resolve disputes over MMI and impairment ratings. Permanent impairment is rated under AMA Guides, 3rd Edition (revised), which is unique to Colorado.`,
    statute: 'C.R.S. § 8-40-101 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['Division-designated independent medical examiner (DIME) system', 'AMA 3rd Edition (revised) for impairment ratings (unique to CO)', 'Employer must file a Final Admission of Liability (FAL) at MMI'],
  },
  arizona: {
    overview: `The Arizona Industrial Commission (AIC) administers workers' compensation in Arizona. Arizona is a no-fault system covering all work-related injuries and diseases. Employers must carry coverage through a private insurer or self-insure. Arizona uses the AMA Guides for permanent impairment ratings and has specific scheduled-injury benefits for extremity losses. Claims must be filed within one year of the injury date.`,
    statute: 'A.R.S. § 23-901 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['Industrial Commission administers all claims', 'No direct lawsuit against employer (exclusive remedy)', 'Structured settlement (compromise and release) requires AIC approval'],
  },
  'north-carolina': {
    overview: `The North Carolina Industrial Commission (NCIC) administers workers' compensation. North Carolina provides scheduled benefits for extremity injuries and wage-replacement benefits for total disability. The employer controls the selection of the authorized treating physician. Claimants who reach MMI with permanent impairment may receive compensation for a fixed number of weeks (scheduled) or negotiate a settlement approved by the NCIC.`,
    statute: 'N.C.G.S. § 97-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Employer selects treating physician', 'Detailed statutory schedule for extremity injuries', 'Full and final settlements require NCIC approval'],
  },
  virginia: {
    overview: `The Virginia Workers' Compensation Commission (VWC) operates as an independent state agency with exclusive jurisdiction over workers' compensation claims. Virginia uses a scheduled-loss system for extremity injuries and loss of sensory organs, and an indemnity system for spinal and whole-body injuries. Virginia's two-year statute of limitations runs from the date of accident, with a separate limitation for occupational diseases.`,
    statute: 'Va. Code § 65.2-100 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Must select from employer\'s panel of physicians', 'Scheduled injury benefits per VWC schedule', 'Change in condition petition allows modification within 2 years of last award'],
  },
  tennessee: {
    overview: `Tennessee's Bureau of Workers' Compensation was substantially reformed in 2013 with the Tennessee Workers' Compensation Reform Act. The Bureau of Workers' Compensation (BWC) administers the system, with a new Court of Workers' Compensation Claims replacing the former circuit court system. Tennessee uses AMA Guides, 6th Edition for impairment ratings. Attorney fees are limited to 20% of awarded benefits.`,
    statute: 'T.C.A. § 50-6-101 et seq.',
    reportingDays: 15,
    uniqueFeatures: ['Court of Workers\' Compensation Claims (dedicated court system)', 'AMA 6th Edition for impairment ratings', 'Mandatory mediation before trial'],
  },
  minnesota: {
    overview: `Minnesota's Department of Labor and Industry (DLI) and Office of Administrative Hearings (OAH) administer workers' compensation. Minnesota provides one of the more comprehensive benefit packages, including retraining benefits. The state uses a causation standard requiring work to be "a substantial contributing cause" of injury. Minnesota has specific presumptions for certain occupational diseases in law enforcement and fire fighters.`,
    statute: 'Minn. Stat. § 176.001 et seq.',
    reportingDays: 180,
    uniqueFeatures: ['Vocational rehabilitation and retraining benefits are robust', 'Employees can report injury up to 180 days after first knowledge', 'COLA adjustments apply to some long-term disability benefits'],
  },
  missouri: {
    overview: `Missouri's Division of Workers' Compensation (DWC) administers the system. Missouri uses AMA Guides for impairment ratings and provides benefits for both scheduled and non-scheduled injuries. The Second Injury Fund (SIF) compensates workers with pre-existing disabilities who suffer a second workplace injury, though SIF reform in 2013 significantly limited its scope. Attorney fees are typically 25% of disputed benefits.`,
    statute: 'RSMo § 287.010 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Second Injury Fund (SIF) for workers with prior disabilities (reformed 2013)', 'Medical aid only claims (no lost time) have no statute of limitations', 'Employer has right to choose initial treating physician'],
  },
  wisconsin: {
    overview: `Wisconsin's Department of Workforce Development (DWD) administers workers' compensation through the Worker's Compensation Division. Wisconsin uses a wage-loss system combined with scheduled permanent partial disability (PPD) benefits for specific body parts. Wisconsin has liberal coverage including a "coming and going" exception for fixed-site employees injured traveling to a fixed work location.`,
    statute: 'Wis. Stat. § 102.01 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Scheduled PPD for extremities plus wage-loss PPD for non-scheduled injuries', 'Liberal "arising out of employment" standard', 'Department provides free assistance through the Worker\'s Compensation Division'],
  },
  indiana: {
    overview: `The Indiana Workers' Compensation Board administers Indiana's system. Indiana uses AMA Guides for impairment ratings and provides scheduled benefits for extremity and sensory organ losses. Indiana distinguishes between accidents (instantaneous event) and occupational diseases (gradual exposure), with different filing deadlines for each. The Board has a medical fee schedule that limits authorized medical costs.`,
    statute: 'I.C. § 22-3-2-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Separate coverage for accidents vs. occupational diseases', 'Medical fee schedule limits reimbursement', 'Functional impairment rating system for extremities'],
  },
  maryland: {
    overview: `The Maryland Workers' Compensation Commission (MWCC) is an independent state agency with adjudicatory authority. Maryland covers all employees, including part-time workers, under a mandatory system. Maryland uses AMA Guides for impairment ratings, and accidental injuries must be reported to the employer within 10 days. The state requires employer-selected medical treatment initially, but employees may seek an additional medical opinion.`,
    statute: 'Md. Code, Labor & Empl. § 9-101 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['10-day notice requirement to employer', 'MWCC conducts hearings with full appeal rights', 'Subsequent injury fund for workers with prior disabilities'],
  },
  alaska: {
    overview: `Alaska's Workers' Compensation Division (within the Department of Labor) administers the system. Alaska provides one of the highest maximum weekly benefits in the nation and an 80% TTD rate for the first five years. The state uses an independent medical evaluator (IME) system and AMA Guides for impairment ratings. Alaska allows for attorney fee awards against employers who unreasonably controvert claims.`,
    statute: 'AS 23.30.001 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['80% TTD rate for first 5 years (among highest in nation)', 'Attorney fee shifting for unreasonable controversion', 'Reemployment benefits program for permanently disabled workers'],
  },
  louisiana: {
    overview: `Louisiana's Office of Workers' Compensation Administration (OWCA) administers the system through a network of district offices. Louisiana has one of the lowest maximum weekly benefit caps in the nation. The employer has the right to direct medical care, and the employee is entitled to a second medical opinion at their own expense in some circumstances. Disputes are handled by Workers' Compensation Judges (WCJ).`,
    statute: 'LSA-R.S. 23:1021 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Employer controls authorized treating physician', 'Penalties and attorney fees for arbitrary and capricious claim denials', 'Vocational rehabilitation benefits for displaced workers'],
  },
  kentucky: {
    overview: `Kentucky's Department of Workers' Claims (DWC) administers the program. Kentucky uses a unique benefit calculation involving an "income benefit factor" based on the worker's wage relative to the state average. Kentucky was historically a very claimant-friendly state for coal miners with occupational lung disease (black lung). AMA Guides are used for impairment ratings.`,
    statute: 'KRS § 342.001 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Income benefit factor adjusts awards based on wage level', 'Strong occupational disease provisions for coal dust exposure', 'Work-relatedness standard: work must be a "significant factor" in the injury'],
  },
  oklahoma: {
    overview: `Oklahoma's Workers' Compensation system was dramatically reformed in 2013 with the creation of the Oklahoma Workers' Compensation Commission (WCC), replacing the old Oklahoma Workers' Compensation Court. Oklahoma uses AMA Guides, 6th Edition and has a more restrictive "major cause" standard — work must be the major cause (> 50%) of the injury for occupational disease claims. Permanent disability is limited to scheduled benefits for most injuries.`,
    statute: '85A O.S. § 1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Major cause standard for occupational disease (>50%)', 'AMA 6th Edition for impairment ratings', 'Binding arbitration option for claim resolution'],
  },
  connecticut: {
    overview: `Connecticut's Workers' Compensation Commission administers the system through eight district offices. Connecticut provides a 75% TTD rate, one of the higher rates in the country. Connecticut has a specific waiting period of three days before benefits begin (retroactive if disability exceeds seven days). The state requires mandatory mediation before a formal hearing.`,
    statute: 'C.G.S. § 31-275 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['75% of average weekly wage TTD rate (high nationally)', 'Mandatory mediation before formal hearing', 'Notice to employer required within 10 days of injury or knowledge of occupational disease'],
  },
  utah: {
    overview: `Utah's Labor Commission administers workers' compensation through its Industrial Accidents Division. Utah uses AMA Guides, 5th Edition for impairment ratings, which tends to produce lower impairment percentages than the 3rd Edition used in some states. Utah provides a waiting period of three days before benefits begin. Occupational disease claims have a three-year statute of limitations from the date the employee knew or should have known of the condition.`,
    statute: 'Utah Code § 34A-2-101 et seq.',
    reportingDays: 180,
    uniqueFeatures: ['AMA 5th Edition impairment ratings', '180-day notice period for occupational disease', 'Apportionment for pre-existing conditions is permitted'],
  },
  nevada: {
    overview: `Nevada's Division of Industrial Relations (DIR) administers workers' compensation. Nevada uses a system of scheduled benefits for extremity injuries and "whole person" ratings for other injuries. Nevada's maximum weekly benefit is updated annually based on the state's average weekly wage. Employers must provide a list of preferred treating physicians (PPP), and employees must initially select from this list.`,
    statute: 'NRS § 616A.010 et seq.',
    reportingDays: 7,
    uniqueFeatures: ['7-day notice requirement to employer (strict)', 'Employer-controlled preferred provider organization (PPO) list', 'Annual adjustment of maximum weekly benefit'],
  },
  arkansas: {
    overview: `The Arkansas Workers' Compensation Commission (AWCC) administers the program. Arkansas uses the AMA Guides for impairment ratings and has a relatively strict causation standard requiring the work injury to be the "major cause" of any permanent disability or need for surgery. Arkansas has a 2-year statute of limitations for filing claims from the date of injury.`,
    statute: 'A.C.A. § 11-9-101 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Major cause standard for surgery and permanent disability', 'Commission-ordered medical evaluations (CME) to resolve disputes', 'Death claims have 2-year limitation for dependents'],
  },
  mississippi: {
    overview: `The Mississippi Workers' Compensation Commission (MWCC) administers claims. Mississippi has one of the lowest maximum weekly benefit caps in the nation ($616/week). Benefits follow a scheduled-injury system for extremity losses and an impairment percentage system for total/partial disability. The employer typically controls the selection of the initial treating physician.`,
    statute: 'Miss. Code § 71-3-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Among lowest maximum weekly benefit caps nationally', 'Employer controls initial treating physician', 'Commission operates settlement conference program'],
  },
  kansas: {
    overview: `The Kansas Division of Workers Compensation administers the program. Kansas uses AMA Guides, 6th Edition for impairment ratings. Kansas provides benefits based on functional impairment, body as a whole disability, or work disability (wage-loss combined with functional impairment). Attorney fees are limited by statute to 25% of the award in contested claims.`,
    statute: 'K.S.A. § 44-501 et seq.',
    reportingDays: 20,
    uniqueFeatures: ['Work disability combines functional and wage-loss factors', 'AMA 6th Edition for ratings', '20-day notice requirement to employer'],
  },
  'new-mexico': {
    overview: `New Mexico's Workers' Compensation Administration (WCA) administers the system. New Mexico provides medical benefits without limit and indemnity benefits for a maximum of 700 weeks of total disability. The state has a formal return-to-work program. Impairment ratings use the AMA Guides. New Mexico's workers' compensation mediation program is well-established and resolves many disputes without formal hearings.`,
    statute: 'NMSA § 52-1-1 et seq.',
    reportingDays: 15,
    uniqueFeatures: ['700-week maximum for total disability', 'Mandatory mediation program before formal hearing', 'Return-to-work program with vocational services'],
  },
  nebraska: {
    overview: `The Nebraska Workers' Compensation Court administers Nebraska's system, making it one of the few states with a dedicated court for workers' comp matters rather than an administrative agency. Nebraska uses AMA Guides for impairment ratings and provides both scheduled and unscheduled permanent partial disability benefits. The attorney contingency fee is typically 33% of award but capped by statute.`,
    statute: 'Neb. Rev. Stat. § 48-101 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Workers\' Compensation Court (not just an administrative agency)', 'Strong vocational rehabilitation program', 'Trial before workers\' comp judge with full appeal rights'],
  },
  idaho: {
    overview: `The Idaho Industrial Commission administers Idaho's workers' compensation. Idaho uses an industrial commission system with commissioners who both adjudicate and administer the program. Idaho follows the AMA Guides for permanent impairment ratings. The state's benefit structure provides scheduled benefits for extremity injuries and whole-person impairment for other claims.`,
    statute: 'Idaho Code § 72-101 et seq.',
    reportingDays: 60,
    uniqueFeatures: ['Idaho Industrial Commission serves dual administrative/adjudicative role', '60-day notice period (longer than most states)', 'Surety Fund provides coverage when employer is uninsured'],
  },
  hawaii: {
    overview: `Hawaii's Disability Compensation Division (DCD) administers workers' compensation. Hawaii is unique in also having a mandated temporary disability insurance (TDI) system for non-work-related illness. Work injuries provide a 2/3 of average weekly wage TTD rate. Hawaii's benefit structure combines elements of scheduled and non-scheduled disability systems. Medical benefits have no dollar cap.`,
    statute: 'HRS § 386-1 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['Parallel TDI (non-work disability) system', 'Medical benefits capped only by reasonable necessity', 'Vocational rehabilitation services through HLRB'],
  },
  maine: {
    overview: `Maine's Workers' Compensation Board (WCB) administers the program. Maine is notable for providing an 80% TTD rate for the first 260 weeks of disability — one of the highest in the country. Maine uses an independent medical examiner (IME) system for disputed medical issues. The state has a comprehensive vocational rehabilitation program and requires good-faith return-to-work cooperation from both employers and employees.`,
    statute: '39-A M.R.S.A. § 101 et seq.',
    reportingDays: 10,
    uniqueFeatures: ['80% TTD rate for first 260 weeks', 'Mandatory return-to-work cooperation obligation', 'Informal dispute resolution available through WCB'],
  },
  'new-hampshire': {
    overview: `New Hampshire's Department of Labor administers workers' compensation with a focus on mandatory insurance and administrative dispute resolution. New Hampshire uses AMA Guides for impairment ratings. The state provides a 60% TTD rate. Attorney fees are limited and approved by the labor commissioner. New Hampshire's administrative appeals go through the state labor department rather than a separate commission.`,
    statute: 'RSA § 281-A:1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Department of Labor administers (no separate WC commission)', 'Attorney fees limited and approved by commissioner', 'Lump sum settlement available with DOL approval'],
  },
  'rhode-island': {
    overview: `Rhode Island's Department of Labor and Training (DLT) and Workers' Compensation Court jointly administer the system. Rhode Island offers a 75% TTD rate (60% base plus 15% dependency allowance for dependents), one of the more generous rates nationally. Rhode Island's Workers' Compensation Court is a specialized court with judges who hear formal hearings. The state also requires employers to provide light-duty work when available.`,
    statute: 'R.I.G.L. § 28-29-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['75% TTD rate with dependency allowance', 'Specialized Workers\' Compensation Court', 'Employer must offer light duty before suspending benefits'],
  },
  montana: {
    overview: `Montana's Department of Labor and Industry administers workers' compensation through the Employment Relations Division. Montana offers both a state fund (Montana State Fund) and private insurer options. Montana uses AMA Guides for impairment ratings and provides a 66.67% TTD rate. The state has a mediation program for dispute resolution before formal litigation.`,
    statute: 'MCA § 39-71-101 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Montana State Fund is the dominant carrier (state-created insurer)', 'Pre-litigation mediation required for most disputes', 'Vocational rehabilitation benefits available'],
  },
  delaware: {
    overview: `Delaware's Industrial Accident Board (IAB) administers workers' compensation. Delaware provides a scheduled-injury system for extremity and sensory organ losses, and a total disability system for permanent total disability. Delaware's maximum weekly benefit is updated annually. The IAB Board members conduct hearings, and appeals go to Superior Court. Attorney fees are limited to 30% of contested benefits.`,
    statute: '19 Del. C. § 2301 et seq.',
    reportingDays: 90,
    uniqueFeatures: ['Industrial Accident Board (IAB) with hearing boards', '90-day notice period (longer than most states)', 'Annual update to maximum weekly benefit'],
  },
  'south-dakota': {
    overview: `South Dakota's Department of Labor and Regulation administers workers' compensation. South Dakota uses AMA Guides for impairment ratings and provides scheduled benefits for extremity injuries. The state has a unique 6-year statute of limitations for certain occupational diseases and requires employer reporting of injuries within 7 days. South Dakota's benefit structure includes both medical and indemnity benefits.`,
    statute: 'SDCL § 62-1-1 et seq.',
    reportingDays: 3,
    uniqueFeatures: ['3-day notice to employer (among strictest)', 'Department of Labor serves administrative function', 'Occupational disease claims have 6-year limitation'],
  },
  'north-dakota': {
    overview: `North Dakota operates an exclusive state fund — North Dakota Workforce Safety & Insurance (WSI) — meaning all workers' compensation is provided through the state, not private insurers. This makes it similar to Ohio, Washington, and Wyoming. However, unlike those three states, private attorneys can assist workers with North Dakota WSI claims in court proceedings.`,
    statute: 'N.D.C.C. § 65-01-01 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Exclusive state fund (WSI) — no private insurance', 'Private attorneys can represent claimants in proceedings', 'Vocational rehabilitation through WSI'],
  },
  vermont: {
    overview: `Vermont's Department of Labor administers workers' compensation. Vermont uses AMA Guides for impairment ratings. Vermont's 66.67% TTD rate applies to the first $792/week of wages (updated regularly), with a higher rate for lower-wage workers in some cases. Vermont has a strong mediator program for resolving disputes informally and allows attorneys fees of 20% of contested benefits.`,
    statute: '21 V.S.A. § 601 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Department of Labor administers (no separate commission)', 'Informal conference before formal hearing', 'Independent medical evaluation program for disputed cases'],
  },
  alabama: {
    overview: `Alabama's Department of Labor administers workers' compensation. Alabama requires injured workers to give written notice within 5 days of the injury to the employer, one of the strictest notice requirements in the country. Alabama uses a unique three-pronged test for permanent disability — functional impairment, age, education, and inability to perform past work all factor into the award. Circuit courts (not an administrative agency) have jurisdiction over contested claims.`,
    statute: 'Ala. Code § 25-5-1 et seq.',
    reportingDays: 5,
    uniqueFeatures: ['5-day notice to employer (strictest in the nation)', 'Circuit courts have jurisdiction over contested claims (unique)', 'Industrial disability standard considers age, education, and work history'],
  },
  'south-carolina': {
    overview: `South Carolina's Workers' Compensation Commission (SCWCC) administers the system. South Carolina uses a scheduled-loss system for extremity injuries and a wage-loss system for total and non-scheduled disability. The state provides 66.67% of average weekly wage up to the maximum weekly benefit. South Carolina's statute of limitations is 2 years from the date of injury or last payment of compensation.`,
    statute: 'S.C. Code § 42-1-10 et seq.',
    reportingDays: 90,
    uniqueFeatures: ['Employer selects initial treating physician', 'Scheduled loss per SCWCC schedule for extremities', 'Second injury fund available for certain pre-existing conditions'],
  },
  oregon: {
    overview: `Oregon's Department of Consumer and Business Services (DCBS) administers workers' compensation, which is known for being relatively employer-controlled in terms of medical management. Oregon uses a "managed care organization" (MCO) model where workers must obtain treatment from MCO-approved providers. Claimants can challenge MCO decisions through an Attending Physician Review (APR). Oregon's impairment ratings use AMA Guides.`,
    statute: 'ORS § 656.001 et seq.',
    reportingDays: 90,
    uniqueFeatures: ['Managed Care Organization (MCO) model for medical treatment', 'Attending Physician Review for medical disputes', 'Preferred Worker Program for reemployment assistance'],
  },
  massachusetts: {
    overview: `Massachusetts's Department of Industrial Accidents (DIA) administers workers' compensation. Massachusetts uses a 60% of average weekly wage TTD rate but has a 4-year statute of limitations — the longest in the nation. Medical benefits are without time limit. Massachusetts provides a unique "wage replacement" benefit structure and allows claimants to appeal to a reviewing board and then to the courts.`,
    statute: 'MGL c. 152, § 1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['4-year statute of limitations (longest in the nation)', 'Reviewing Board process before court appeal', 'Conciliation, conference, and hearing process in DIA'],
  },
  iowa: {
    overview: `Iowa's Division of Workers' Compensation (DWC) administers the program. Iowa provides an 80% TTD rate on spendable earnings (take-home pay after taxes), which produces a different calculation than most states' pre-tax gross wage methods. Iowa uses AMA Guides for impairment ratings. Iowa's statutory schedule for body parts is among the most generous in the country, with very high week values for permanent partial disabilities.`,
    statute: 'Iowa Code § 85.1 et seq.',
    reportingDays: 90,
    uniqueFeatures: ['80% of spendable (after-tax) earnings for TTD', 'High statutory body-part schedule values', 'Second Injury Fund for workers with prior industrial disability'],
  },
  'west-virginia': {
    overview: `West Virginia's Bureau for Workers' Claims (BWC) administers the program. West Virginia has substantial occupational disease experience due to coal mining operations. West Virginia uses AMA Guides for impairment ratings and provides permanent partial disability benefits on a percentage-of-disability basis. The state privatized its workers' compensation insurance system in 2006, transitioning from a state-managed fund to private insurers.`,
    statute: 'W. Va. Code § 23-1-1 et seq.',
    reportingDays: 30,
    uniqueFeatures: ['Privatized insurance market (post-2006 reform)', 'Coal-related occupational disease claims have special provisions', 'Permanent disability on percentage basis'],
  },
}
