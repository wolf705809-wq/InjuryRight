import { Suspense } from 'react'
import ResultsContent from './ResultsContent'

export const metadata = {
  title: 'Your Compensation Estimate | WorkerRight',
  description: 'See your personalised workers compensation estimate.',
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 text-sm">Calculating…</div>}>
      <ResultsContent />
    </Suspense>
  )
}
