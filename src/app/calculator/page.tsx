import CalculatorForm from '@/components/Calculator/CalculatorForm'

const calculatorSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: "Workers' Compensation Settlement Calculator",
    applicationCategory: 'LegalApplication',
    url: 'https://getfairclaimpro.com/calculator',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: "How to Calculate Your Workers' Comp Settlement",
    description: "Use this free calculator to estimate your workers' compensation settlement in 7 steps.",
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Select Your State', text: 'Choose your state from the dropdown. Benefits and formulas vary by state.' },
      { '@type': 'HowToStep', position: 2, name: 'Enter Employment Status', text: 'Select your employment type: full-time, part-time, or contractor.' },
      { '@type': 'HowToStep', position: 3, name: 'Select Injury Type', text: 'Choose the type of injury you sustained at work.' },
      { '@type': 'HowToStep', position: 4, name: 'Rate Injury Severity', text: 'Indicate whether your injury is minor, moderate, severe, or catastrophic.' },
      { '@type': 'HowToStep', position: 5, name: 'Enter Weekly Wage and Employment Duration', text: 'Provide your average weekly wage before the injury and how long you were employed.' },
      { '@type': 'HowToStep', position: 6, name: 'Enter Treatment and Claim Status', text: 'Describe your treatment status and whether your claim was accepted or denied.' },
      { '@type': 'HowToStep', position: 7, name: 'Enter Impairment Rating (if available)', text: 'If your doctor has assigned an impairment rating, enter it here for a more accurate estimate.' },
    ],
  },
]

export const metadata = {
  title: "Free Workers' Comp Settlement Calculator — Instant Estimate by State (2025)",
  description: "Calculate your workers' comp settlement in 2 minutes. State-specific formulas, 47 states, 7 injury factors. Free. No sign-up required.",
  alternates: {
    canonical: 'https://getfairclaimpro.com/calculator',
  },
  openGraph: {
    title: "Free Workers' Comp Settlement Calculator — Instant Estimate by State (2025)",
    description: "Calculate your workers' comp settlement in 2 minutes. State-specific formulas, 47 states, 7 injury factors. Free. No sign-up required.",
    type: 'website',
  },
}

export default function CalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchemas) }}
      />
    <main className="min-h-screen bg-gray-50 py-14 px-8">
      <div className="max-w-[520px] mx-auto">
        <div className="text-center mb-8">
          <p className="text-[11px] font-medium text-emerald-600 tracking-[0.08em] uppercase mb-2">Free · No Registration</p>
          <h1 className="text-2xl font-semibold text-gray-900" style={{ letterSpacing: '-0.3px' }}>
            Workers' Compensation Calculator
          </h1>
          <p className="text-gray-500 text-sm mt-2">5 steps · covers all 47 states · instant estimate</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-7">
          <CalculatorForm />
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-4">Estimates are indicative only. Always consult a licensed attorney.</p>
      </div>
    </main>
    </>
  )
}
