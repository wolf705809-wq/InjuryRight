import { USState, Industry, InjuryType } from '@/types'

export interface PageCopy {
  h1: string
  metaTitle: string
  metaDesc: string
  heroHeadline: string
  heroSub: string
  statCallout: string
  faqItems: { q: string; a: string }[]
}

export function generatePageCopy(
  state: USState,
  industry: Industry,
  injury: InjuryType
): PageCopy {
  const avgLow  = state.avgSettlement.low.toLocaleString('en-US')
  const avgHigh = state.avgSettlement.high.toLocaleString('en-US')
  const ttdPct  = (state.ttdRate * 100).toFixed(0)
  const year    = new Date().getFullYear()

  return {
    h1:          `${injury.name} Workers' Comp in ${state.name}`,
    metaTitle:   `${injury.name} at Work in ${state.name}: Workers' Comp Settlement & Rights (${year})`,
    metaDesc:    `${injury.name} at work in ${state.name}? Workers' comp pays ${ttdPct}% of your wage (max $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week). Settlements average $${avgLow}–$${avgHigh}. Free calculator — 2 minutes.`,
    heroHeadline: `${industry.name} Worker Injured in ${state.name}?`,
    heroSub:     `Find out what your ${injury.name.toLowerCase()} claim is worth. ${state.name} workers typically receive $${avgLow}–$${avgHigh}. Free, no-obligation assessment.`,
    statCallout: `In ${state.name}, TTD benefits are capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week. The statute of limitations is ${state.sol}.`,
    faqItems: [
      // Pattern 1 — Amount query
      {
        q: `How much is a ${injury.name.toLowerCase()} workers' comp settlement in ${state.name}?`,
        a: `In ${state.name}, ${injury.name.toLowerCase()} workers' comp settlements typically range from $${avgLow} to $${avgHigh}, depending on impairment rating and treatment status. ${state.name} pays TTD at ${ttdPct}% of your average weekly wage, capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week under ${state.statute}.`,
      },
      // Pattern 2 — Average query
      {
        q: `What is the average workers' comp settlement for ${injury.name.toLowerCase()} in ${state.name}?`,
        a: `${state.name} workers with ${injury.name.toLowerCase()} typically settle between $${avgLow} and $${avgHigh}, depending on impairment rating, treatment costs, and lost wages. Cases involving surgery, permanent disability, or denied claims that are later appealed tend to settle higher.`,
      },
      // Pattern 3 — Deadline query
      {
        q: `How long do I have to file a workers' comp claim in ${state.name}?`,
        a: `In ${state.name}, you have ${state.sol} from the date of injury to file a workers' compensation claim under ${state.statute}. You must also report your injury to your employer within ${state.reportingDays} days. Missing these deadlines can permanently bar your claim.`,
      },
      // Pattern 4 — Employment type query
      {
        q: `Does my employment type affect my workers' comp claim in ${state.name}?`,
        a: `Yes. In ${state.name}, full-time employees are fully covered. Part-time employees may receive prorated benefits. Independent contractors and gig workers may qualify if misclassified — coverage depends on the degree of employer control over work performance under ${state.statute}.`,
      },
      // Pattern 5 — Denied claim query
      {
        q: `What can I do if my workers' comp claim was denied in ${state.name}?`,
        a: `If your claim is denied in ${state.name}, you have the right to appeal to the ${state.regulator}. Most denials are overturned with proper documentation. You have ${state.sol} from the original injury date to pursue an appeal. An attorney can file on your behalf at no upfront cost — most work on contingency.`,
      },
      // Pattern 6 — Lawyer query
      {
        q: `Do I need a lawyer for workers' comp in ${state.name}?`,
        a: `You are not required to have an attorney, but representation significantly increases average settlement amounts. Studies show workers with attorneys receive 2× higher settlements on average. Most workers' comp attorneys work on contingency — no fee unless you win. Typical fees in ${state.name} are ${(state.attorneyFeeRate * 100).toFixed(0)}% of settlement.`,
      },
    ],
  }
}
