import CalculatorForm from '@/components/Calculator/CalculatorForm'

export const metadata = {
  title: 'Free Workers Compensation Calculator — All 47 States | WorkerRight',
  description: 'Calculate your workers compensation benefits in 2 minutes. Covers TTD, PPD, and medical costs for all 47 states.',
}

export default function CalculatorPage() {
  return (
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
  )
}
