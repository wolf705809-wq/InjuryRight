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

  return {
    h1:          `${injury.name} Workers' Comp in ${state.name}`,
    metaTitle:   `${injury.name} Workers' Comp ${state.name} | Free Calculator`,
    metaDesc:    `${state.name} ${industry.name.toLowerCase()} workers with ${injury.name.toLowerCase()} received $${avgLow}–$${avgHigh} on average. Free calculator. No obligation.`,
    heroHeadline: `${industry.name} Worker Injured in ${state.name}?`,
    heroSub:     `Find out what your ${injury.name.toLowerCase()} claim is worth. ${state.name} workers typically receive $${avgLow}–$${avgHigh}. Free, no-obligation assessment.`,
    statCallout: `In ${state.name}, TTD benefits are capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}/week. The statute of limitations is ${state.sol}.`,
    faqItems: [
      {
        q: `How is ${injury.name.toLowerCase()} compensation calculated in ${state.name}?`,
        a: `In ${state.name}, your weekly benefit is ${(state.ttdRate * 100).toFixed(0)}% of your average weekly wage, capped at $${state.maxWeeklyBenefit.toLocaleString('en-US')}. Permanent disability is calculated based on your impairment rating.`,
      },
      {
        q: `What is the average ${injury.name.toLowerCase()} settlement in ${state.name}?`,
        a: `${state.name} workers with ${injury.name.toLowerCase()} typically settle between $${avgLow} and $${avgHigh}, depending on impairment rating, treatment costs, and lost wages.`,
      },
      {
        q: `How long do I have to file a workers' comp claim in ${state.name}?`,
        a: `${state.sol}. Missing this deadline can permanently bar your claim. Contact a workers' comp attorney as soon as possible.`,
      },
      {
        q: `Do I need a lawyer for a workers' comp claim in ${state.name}?`,
        a: `You are not required to have an attorney, but representation significantly increases average settlement amounts. Most workers' comp attorneys work on contingency — no fee unless you win. Typical fees are ${(state.attorneyFeeRate * 100).toFixed(0)}% of settlement.`,
      },
    ],
  }
}
