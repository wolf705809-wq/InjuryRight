export interface GuideData {
  slug: string
  title: string
  description: string
  sections: { heading: string; body: string }[]
  faqItems: { q: string; a: string }[]
}

export const GUIDES: GuideData[] = [
  {
    slug: 'how-to-file-workers-comp-claim',
    title: "How to File a Workers' Comp Claim — Step by Step",
    description: "Complete guide to filing your workers' comp claim, from reporting the injury to receiving benefits.",
    sections: [
      {
        heading: 'Step 1: Report the Injury to Your Employer Immediately',
        body: `The most critical first step is reporting your injury to your employer as soon as possible. Most states require reporting within 7–90 days depending on jurisdiction — missing this deadline can jeopardize your entire claim. Report in writing whenever possible, and keep a copy. Include the date, time, location, how the injury occurred, and any witnesses. If you are injured and cannot report immediately, ask a coworker or family member to report on your behalf.\n\nDo not minimize your symptoms when reporting. Describe all body parts affected, even if you think some symptoms are minor. Symptoms that worsen later may be more difficult to connect to the work injury if they were not initially reported.`,
      },
      {
        heading: 'Step 2: Seek Medical Treatment',
        body: `In most states, your employer or their insurance carrier controls the choice of treating physician, at least initially. You must typically see an authorized physician from your employer's posted panel. Refusing to see the authorized physician or seeking unauthorized treatment can affect your benefits.\n\nBe thorough and accurate when describing your symptoms to the treating physician. Make sure your medical records clearly document that your condition is work-related, the mechanism of injury (how it happened), all body parts affected, and any work restrictions the physician recommends. These records are the foundation of your claim.`,
      },
      {
        heading: 'Step 3: File a Formal Claim',
        body: `After reporting to your employer, you may also need to file a formal claim directly with your state's workers' compensation authority. The requirement and timeline varies by state. In California, for example, your employer should provide you with a DWC-1 form within one working day of your injury report. In New York, you may need to file a C-3 form with the Workers' Compensation Board.\n\nYour employer or their insurer must also file an Employer's First Report of Injury (FROI) with the state workers' compensation authority, typically within 7–10 days of learning of the injury.`,
      },
      {
        heading: 'Step 4: Cooperate with the Claims Process',
        body: `The insurance carrier will investigate your claim. You may be asked to provide a recorded statement, undergo an independent medical examination (IME), and provide wage records and employment information. You are entitled to representation during this process.\n\nDo not give recorded statements without understanding your rights. The carrier's IME doctor works for the insurer and may minimize your impairment. You have the right to challenge IME findings with your own treating physician's opinions.`,
      },
      {
        heading: 'Step 5: Understand Your Benefits',
        body: `Once your claim is accepted, you are entitled to: medical treatment for your work-related injury; temporary total disability (TTD) benefits equal to a percentage of your pre-injury wage while you are unable to work; and ultimately, permanent disability benefits based on your impairment rating at Maximum Medical Improvement (MMI).\n\nKeep records of all medical treatment, out-of-pocket expenses, and lost time from work. These records will be important in calculating your final settlement.`,
      },
    ],
    faqItems: [
      { q: 'How long do I have to report a work injury?', a: 'It depends on your state. Deadlines range from 3 days (South Dakota) to 90 days (Michigan). Report as soon as possible — missing the deadline can permanently bar your claim.' },
      { q: 'Can my employer fire me for filing a workers\' comp claim?', a: 'Retaliation for filing a workers\' comp claim is illegal in all states. If you are terminated or demoted after filing, consult an attorney immediately as you may have additional claims.' },
      { q: 'What if my employer doesn\'t have workers\' comp insurance?', a: 'If your employer is required to have coverage but doesn\'t, you may be able to file through your state\'s Uninsured Employers Fund and/or sue your employer directly for negligence.' },
      { q: 'Do I need a lawyer to file a workers\' comp claim?', a: 'You can file without an attorney, but having representation significantly increases average settlement amounts. Most workers\' comp attorneys work on contingency — no fee unless you win.' },
    ],
  },

  {
    slug: 'workers-comp-settlement-process',
    title: "The Workers' Comp Settlement Process Explained",
    description: "What to expect from your workers' comp settlement — timelines, how amounts are determined, and what to watch out for.",
    sections: [
      {
        heading: 'When Does Settlement Become an Option?',
        body: `Workers' comp settlements typically occur after you reach Maximum Medical Improvement (MMI) — the point at which your treating physician determines that further significant improvement is unlikely. Before MMI, you are generally receiving ongoing medical treatment and temporary disability benefits. After MMI, your impairment rating is established, and the value of any permanent disability component of your claim can be calculated.\n\nSome states allow settlement before MMI if the parties agree. In California, a "stipulated findings and award" can be entered at any point. In most other states, full and final settlement typically requires MMI.`,
      },
      {
        heading: 'Types of Workers\' Comp Settlements',
        body: `There are two main types of workers' comp settlements. A "compromise and release" (California) or "full and final settlement" closes your claim entirely — you receive a lump sum and give up all future rights related to the injury, including future medical treatment. A "stipulation with request for award" (California) or "open award" maintains your right to future medical treatment while converting disability payments to a lump sum.\n\nThe right choice depends on your long-term medical needs. If you need ongoing treatment, maintaining future medical benefits may be worth a lower lump sum. If your condition is stable, a full settlement may provide more immediate value.`,
      },
      {
        heading: 'How Settlement Amounts Are Calculated',
        body: `The settlement value of your claim is based on: unpaid temporary disability benefits, the present value of future permanent disability payments based on your impairment rating, outstanding and anticipated medical expenses, vocational rehabilitation costs if you cannot return to your prior occupation, and in some states, pain and suffering (generally not available in workers\' comp). Attorneys typically negotiate based on medical records, impairment rating reports, and comparable settlements in the same state and body part category.`,
      },
      {
        heading: 'The Settlement Negotiation Process',
        body: `Settlement negotiations typically involve your attorney making an initial demand to the insurance carrier. The carrier will make a counter-offer based on their internal claim valuation. Multiple rounds of negotiation are common. If agreement cannot be reached, the case proceeds to a formal hearing or mediation before a workers\' compensation judge or arbitrator.\n\nIn California, settlements require approval by a workers\' compensation judge even when the parties agree. Other states have similar judicial oversight requirements. This protects unrepresented workers from accepting undervalue settlements.`,
      },
    ],
    faqItems: [
      { q: 'How long does workers\' comp settlement take?', a: 'The average time to settlement is 16 months according to NCCI data. Simple, uncontested claims may settle in 6–9 months. Complex cases with disputed liability or multiple body parts can take 2–4 years.' },
      { q: 'Should I accept the first settlement offer?', a: 'Generally, no. First offers typically undervalue claims. An experienced workers\' comp attorney can usually negotiate a significantly higher settlement.' },
      { q: 'Is a workers\' comp settlement taxable?', a: 'Workers\' comp settlements are generally not taxable at the federal level under IRC §104. However, if you are also receiving Social Security Disability Insurance (SSDI), there may be an offset.' },
      { q: 'Can I reopen a workers\' comp settlement?', a: 'Under a full and final settlement (compromise and release), you generally cannot reopen the claim. Under an open award, you typically have the right to request additional benefits for up to 5–7 years in most states.' },
    ],
  },

  {
    slug: 'do-i-need-a-workers-comp-attorney',
    title: "Do I Need a Workers' Comp Attorney?",
    description: "When hiring an attorney helps, when it doesn't, and how contingency fees work.",
    sections: [
      {
        heading: 'When an Attorney Significantly Helps',
        body: `You should strongly consider an attorney if: your claim has been denied; your injury is serious (requiring surgery, causing permanent impairment, or keeping you out of work for more than a few weeks); your employer disputes whether the injury is work-related; you have a pre-existing condition the employer claims caused your injury; you are being pressured to return to work before you are medically ready; you need to request an independent medical examination to counter an IME that minimized your injuries; or you are approaching MMI and need help negotiating your settlement.`,
      },
      {
        heading: 'When You May Not Need an Attorney',
        body: `For minor, uncontested claims where you received prompt treatment, missed only a few days of work, and have no permanent impairment, handling the claim yourself may be straightforward. If your employer's insurance carrier is cooperating, covering all medical bills, and paying temporary disability benefits accurately, attorney involvement adds less marginal value.\n\nHowever, even in seemingly simple cases, an attorney consultation is usually worthwhile to ensure you don't unknowingly waive rights or accept a below-market settlement.`,
      },
      {
        heading: 'How Workers\' Comp Attorneys Are Paid',
        body: `Nearly all workers' compensation attorneys work on contingency — they receive a percentage of your settlement or award, typically 10–25% depending on the state. You pay nothing upfront. If you don't win, you owe nothing.\n\nIn many states, the contingency fee percentage is regulated. California caps attorney fees at 15% of the disputed amount. Florida has a complex fee schedule tied to the amount recovered. New York allows up to 15% in most cases. Illinois allows up to 20%. The fee is deducted from your settlement, not added to it.`,
      },
      {
        heading: 'Finding the Right Attorney',
        body: `Look for an attorney who specializes specifically in workers\' compensation — not general personal injury. Workers\' comp is a highly technical area of law with state-specific procedures that generalists often don\t know well. Ask about their experience with your specific type of injury, their track record with similar cases, and their familiarity with the insurance carrier handling your claim.\n\nMost workers\' comp attorneys offer free initial consultations. Use this to evaluate their knowledge, communication style, and whether they take time to understand your specific situation.`,
      },
    ],
    faqItems: [
      { q: 'How much does a workers\' comp attorney cost?', a: 'Workers\' comp attorneys work on contingency — typically 10–25% of your settlement, depending on your state. You pay nothing unless you win.' },
      { q: 'When should I hire an attorney?', a: 'The earlier the better if your claim is denied, disputed, or involves serious injury. Even for seemingly straightforward claims, a consultation is worthwhile.' },
      { q: 'Can I fire my workers\' comp attorney?', a: 'Yes. You can discharge your attorney at any time. The discharged attorney may have a lien on your settlement for services rendered.' },
      { q: 'Will hiring an attorney slow down my case?', a: 'Not necessarily. Represented claimants often resolve cases faster because attorneys know how to navigate the administrative process and avoid common procedural delays.' },
    ],
  },

  {
    slug: 'workers-comp-claim-denied',
    title: "Workers' Comp Claim Denied — What to Do Next",
    description: "Step-by-step guide to appealing a denied workers' comp claim in any state.",
    sections: [
      {
        heading: 'Understanding Why Claims Are Denied',
        body: `Claims are denied for many reasons, some legitimate and some not. Common denial reasons include: the insurer disputes that the injury is work-related; the injury was not reported within the required deadline; you missed or declined medical appointments; there is a question of whether you were actually an employee; the injury occurred during horseplay or willful misconduct; or the insurer simply disputes the extent of your disability.\n\nSome denials are issued in bad faith or based on incomplete investigation. The mere fact of a denial does not mean you have no valid claim.`,
      },
      {
        heading: 'The Appeal Process — Step by Step',
        body: `Step 1: Review the denial letter carefully. The letter must state the specific reason for denial and your appeal rights including deadlines. Missing the appeal deadline is fatal to your case.\n\nStep 2: Gather evidence. This includes medical records documenting your injury, incident reports, witness statements, and any documentation showing you reported on time.\n\nStep 3: File your appeal. In most states, you appeal to a workers' compensation board or court by filing a formal appeal or application for hearing. Some states require mediation or informal resolution first.\n\nStep 4: Attend your hearing. Present your evidence and medical records. The burden is typically on you to prove the injury is work-related and the extent of your disability.`,
      },
      {
        heading: 'Getting Independent Medical Evidence',
        body: `The insurance company's medical examination (IME) is performed by a doctor paid by the insurer and often minimizes your impairment. You have the right to get an independent medical examination from your own doctor and present that evidence at a hearing.\n\nIn many states, the treating physician's opinion is given more weight than the IME physician's opinion because the treating physician has an ongoing relationship with you and more information about your condition. Having strong medical support from your treating physician is often the most important factor in successfully appealing a denial.`,
      },
    ],
    faqItems: [
      { q: 'How long do I have to appeal a denied workers\' comp claim?', a: 'Appeal deadlines vary by state — from 20 days to 2 years. Check your denial letter immediately and consult an attorney if you are close to any deadline.' },
      { q: 'What is the success rate of workers\' comp appeals?', a: 'Success rates vary widely by state and reason for denial. Claims denied for medical causation issues have strong success rates when supported by treating physician testimony.' },
      { q: 'Can I sue my employer if my workers\' comp claim is denied?', a: 'Generally no — workers\' comp provides exclusive remedy against employers. However, if the denial is wrongful and causes significant harm, some states have remedies for bad-faith claim handling.' },
      { q: 'Should I hire an attorney for a denied claim?', a: 'Yes. Denied claims are significantly more complex to navigate. An attorney familiar with the appeals process in your state is essential.' },
    ],
  },

  {
    slug: 'maximum-medical-improvement-guide',
    title: 'Maximum Medical Improvement (MMI) — Complete Guide',
    description: 'What MMI means, when it\'s declared, and how it affects your settlement.',
    sections: [
      {
        heading: 'What Is Maximum Medical Improvement?',
        body: `Maximum Medical Improvement (MMI) is the point at which a treating physician determines that your work-related injury has healed as much as it is expected to heal, or has reached a stable and stationary condition. It does not necessarily mean you are fully healed or without symptoms — it means further significant improvement is not reasonably expected with continued treatment.\n\nMMI is a critical milestone in any workers' comp claim because it triggers the evaluation of permanent disability. Once MMI is reached, your treating physician or an independent medical evaluator assigns an impairment rating that is used to calculate permanent disability benefits.`,
      },
      {
        heading: 'When Is MMI Declared?',
        body: `MMI timing varies significantly by injury type and severity. Simple soft tissue injuries may reach MMI in 3–6 months. Surgeries typically result in MMI 6–18 months post-operatively. Complex cases involving spinal cord injury, TBI, or multiple surgeries may not reach MMI for 2–5 years.\n\nIn most states, if MMI has not been reached within 104 weeks (2 years) of injury, temporary total disability benefits are terminated and the claim moves to a permanent disability evaluation regardless of whether the treating physician has declared MMI.`,
      },
      {
        heading: 'How MMI Affects Your Settlement',
        body: `MMI triggers the impairment rating process. Your treating physician will typically assign a whole person impairment rating under the applicable guide (AMA Guides in most states, California PDRS, or the state's own schedule). This rating is used to calculate permanent disability benefits.\n\nBefore MMI, you should not accept a settlement that includes future medical benefits unless your condition is genuinely stable and you do not expect to need future treatment. Once you settle and release future medical, you are responsible for any future treatment costs.`,
      },
    ],
    faqItems: [
      { q: 'Can I dispute an MMI declaration?', a: 'Yes. If you disagree with the treating physician\'s MMI declaration, you can seek a second opinion, request a qualified medical evaluator (QME) in states like California, or present your own medical evidence at a hearing.' },
      { q: 'What happens to my benefits after MMI?', a: 'Temporary disability benefits typically stop at MMI. Permanent disability benefits begin, based on your impairment rating. Medical treatment for the work injury continues indefinitely under most state systems.' },
      { q: 'Can symptoms worsen after MMI?', a: 'Yes. If your condition materially worsens after MMI, you can file a change-in-condition petition to reopen your claim in most states, typically within 2–7 years of the last award.' },
      { q: 'Can I return to work and still have a permanent disability claim?', a: 'Yes. Many workers return to work at the same or different job while still having a valid permanent disability claim based on their impairment rating.' },
    ],
  },

  {
    slug: 'impairment-rating-explained',
    title: 'Impairment Ratings Explained — How They Affect Your Settlement',
    description: 'How impairment ratings are calculated, what AMA Guides mean, and how ratings translate to compensation.',
    sections: [
      {
        heading: 'What Is an Impairment Rating?',
        body: `An impairment rating is a medical assessment of the percentage of permanent functional loss caused by your work injury. It is expressed as a percentage of whole person impairment (WPI) or, for scheduled injuries, as a percentage of the affected body part.\n\nThe rating is assigned by a physician using standardized guides, most commonly the AMA Guides to the Evaluation of Permanent Impairment. The edition used varies by state — California uses its own PDRS, most states use the 5th or 6th Edition of the AMA Guides, and Colorado uses the 3rd Edition (Revised).`,
      },
      {
        heading: 'How Ratings Translate to Compensation',
        body: `The impairment rating is the primary driver of permanent partial disability (PPD) benefit calculations. A higher rating produces higher benefits.\n\nUnder the AMA Guides system used in most states, a 10% WPI might produce 40–80 weeks of PPD benefits, depending on the state multiplier. In scheduled injury states like New York, the rating is multiplied by the fixed number of weeks assigned to that body part (e.g., 288 weeks for a leg, 312 weeks for an arm). In California, the PDRS converts the rating to a specific number of PD weeks at a fixed weekly rate.`,
      },
      {
        heading: 'Disputing an Impairment Rating',
        body: `Insurance carriers frequently use IME physicians who assign lower ratings than treating physicians. You have the right to challenge the IME rating with your own medical evidence. In California, the QME or PQME process provides a neutral third-party physician evaluation. In most other states, a hearing officer weighs the competing medical opinions based on the physicians' reasoning, qualifications, and consistency with objective medical findings.`,
      },
    ],
    faqItems: [
      { q: 'What is a "good" impairment rating?', a: 'There is no universally good rating — higher ratings produce higher compensation, but they also reflect greater functional loss. The goal is an accurate rating that reflects your actual functional impairment.' },
      { q: 'Who assigns the impairment rating?', a: 'Your treating physician assigns an initial rating. The insurance carrier may conduct an Independent Medical Examination (IME) and their physician may assign a different rating. Both ratings are submitted as evidence at any hearing.' },
      { q: 'Can I get a second opinion on my impairment rating?', a: 'Yes. Getting an independent evaluation from a specialist with experience in impairment ratings is strongly recommended when significant compensation is at stake.' },
      { q: 'How long after MMI is the rating assigned?', a: 'Typically within 30–90 days of MMI declaration. In California, the QME process can take 3–6 months.' },
    ],
  },

  {
    slug: 'workers-comp-vs-personal-injury',
    title: "Workers' Comp vs. Personal Injury Lawsuit — Which Do You File?",
    description: "When you can file both, when you can only file one, and how third-party claims work.",
    sections: [
      {
        heading: "Workers' Comp vs. Personal Injury — The Basic Rule",
        body: `Workers' compensation provides the exclusive remedy against your employer for work-related injuries. This means you generally cannot sue your employer in civil court for negligence — workers' comp was designed as a no-fault trade-off: you receive benefits quickly without having to prove negligence, but you give up the right to sue.\n\nHowever, this exclusive remedy applies only to your employer. If a third party — a contractor, product manufacturer, property owner, or another driver — was responsible for or contributed to your injury, you may file a personal injury lawsuit against that third party in addition to your workers' comp claim.`,
      },
      {
        heading: 'When Third-Party Claims Are Available',
        body: `Third-party claims are available in several common scenarios. Construction site injuries often involve general contractors, subcontractors, and property owners who are not your direct employer. Vehicle accidents where the at-fault driver is not your coworker give rise to third-party claims against the other driver. Equipment injuries may support claims against the equipment manufacturer for design defects or failure to warn. Toxic exposure claims may involve third-party chemical manufacturers.\n\nFiling both a workers' comp claim and a personal injury lawsuit requires careful coordination — there are lien rights, offset rules, and coordination requirements that vary by state.`,
      },
      {
        heading: 'How Recoveries Are Coordinated',
        body: `When you recover from a third party, your workers' comp insurer typically has a lien — the right to recover benefits paid from your third-party settlement. This prevents double recovery. The specific rules for calculating and reducing these liens vary by state, and an attorney experienced in both workers' comp and personal injury is essential to maximize your combined recovery.\n\nPersonal injury claims offer damages not available in workers' comp, including pain and suffering, loss of consortium, and punitive damages (in egregious cases). These can significantly increase total recovery for seriously injured workers.`,
      },
    ],
    faqItems: [
      { q: 'Can I sue my employer if they were negligent?', a: 'Generally no — workers\' comp provides the exclusive remedy against your employer in most states. Exceptions include intentional acts by the employer and states that allow civil suits in limited circumstances.' },
      { q: 'What if a coworker caused my injury?', a: 'Injuries caused by coworkers are typically covered by workers\' comp against the employer, not a separate lawsuit against the coworker (unless the coworker\'s actions were intentional).' },
      { q: 'Does settling workers\' comp affect my personal injury case?', a: 'The workers\' comp insurer will have a lien on your personal injury settlement. An attorney can negotiate a reduction of this lien to maximize your net recovery from both cases.' },
      { q: 'Which pays more — workers\' comp or personal injury?', a: 'Personal injury generally offers higher potential recovery because it includes pain and suffering and loss of quality of life. Workers\' comp is limited to economic losses.' },
    ],
  },
]
