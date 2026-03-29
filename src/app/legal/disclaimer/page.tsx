import type { Metadata } from 'next'
import { SITE_NAME, FOOTER_DISCLAIMER, RESULTS_DISCLAIMER } from '@/lib/compliance'

export const metadata: Metadata = {
  title: `Legal Disclaimer | ${SITE_NAME}`,
  description: 'Important legal disclaimers for WorkInjuryCalc users.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Legal Disclaimer</h1>
        <p className="text-gray-400 text-xs mb-8">Last updated: March 29, 2026</p>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <section className="bg-red-50 border border-red-200 rounded-lg p-5">
            <h2 className="text-base font-bold text-red-800 mb-2">Not Legal Advice</h2>
            <p className="text-red-700">
              WorkInjuryCalc is not a law firm and does not provide legal advice. Nothing on this website constitutes legal advice or creates an attorney-client relationship. For advice about your specific situation, consult a licensed workers' compensation attorney in your state.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Estimate Disclaimer</h2>
            <p className="bg-gray-50 rounded-lg p-4 text-gray-600 border-l-4 border-emerald-400">
              {RESULTS_DISCLAIMER}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">General Disclaimer</h2>
            <p className="bg-gray-50 rounded-lg p-4 text-gray-600 border-l-4 border-gray-300">
              {FOOTER_DISCLAIMER}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Attorney Advertising</h2>
            <p>
              This website constitutes attorney advertising under applicable state bar rules. WorkInjuryCalc connects injured workers with licensed attorneys and may receive compensation for those connections. Past results referenced on this website do not guarantee similar outcomes in future cases.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">State-Specific Variations</h2>
            <p className="mb-3">
              Workers' compensation laws vary significantly by state. Settlement amounts, benefit rates, statutes of limitations, and procedures differ across jurisdictions. The information on this site is general in nature and may not reflect current law in your state.
            </p>
            <p>
              Some states — including Ohio, Washington, and Wyoming — operate exclusive state fund workers' compensation systems where private attorneys have limited ability to assist. If you reside in one of these states, contact your state's Bureau of Workers' Compensation directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">No Guarantee of Results</h2>
            <p>
              Compensation estimates provided by the WorkInjuryCalc calculator are based on publicly available averages and statistical data. Individual outcomes vary based on the severity of injury, employer cooperation, medical documentation, legal representation, and other factors outside our control. We make no guarantee that you will receive any particular compensation amount.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Do Not Delay Action</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 font-medium mb-2">Important Deadline Warning</p>
              <p className="text-amber-700">
                Workers' compensation claims are subject to strict statutes of limitations — typically 1 to 3 years from the date of injury, depending on your state. Failing to file within the deadline may permanently bar your right to compensation. Do not delay in consulting an attorney or filing a claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Third-Party Attorneys</h2>
            <p>
              WorkInjuryCalc does not employ attorneys and is not responsible for the conduct, advice, or outcomes of attorneys to whom we refer users. The attorneys in our network are independent legal professionals. You should independently verify an attorney's credentials, bar status, and experience before retaining their services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Accuracy of Data</h2>
            <p>
              While we make reasonable efforts to ensure data accuracy, settlement averages, benefit rates, and legal information are subject to change. WorkInjuryCalc makes no representations or warranties about the accuracy, completeness, or timeliness of information on this site.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-gray-400 text-xs">
              By using WorkInjuryCalc, you acknowledge that you have read and understood this disclaimer. If you do not agree with any part of this disclaimer, please discontinue use of this website.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
