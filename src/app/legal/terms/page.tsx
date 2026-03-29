import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/compliance'

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: 'Terms and conditions for using WorkInjuryCalc.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-xs mb-8">Last updated: March 29, 2026</p>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <p className="text-amber-800 text-sm font-medium">
            WorkInjuryCalc is not a law firm. We do not provide legal advice. Use of this site does not create an attorney-client relationship. Always consult a licensed attorney for legal advice specific to your situation.
          </p>
        </div>

        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using WorkInjuryCalc ("the Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">2. Description of Services</h2>
            <p className="mb-3">WorkInjuryCalc provides:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>An informational workers' compensation estimate calculator</li>
              <li>Educational content about workers' compensation laws by state</li>
              <li>A referral service connecting injured workers with licensed attorneys</li>
            </ul>
            <p className="mt-3">
              The calculator results are estimates only and do not constitute legal advice. Actual compensation depends on the specific facts of your case and applicable state law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Attorney Advertising</h2>
            <p>
              This website constitutes attorney advertising in some jurisdictions. WorkInjuryCalc connects users with licensed attorneys and may receive a referral fee for such connections. This referral fee does not increase the cost of legal services to you. Workers' compensation attorneys typically work on a contingency fee basis — you pay nothing unless you recover compensation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">4. No Attorney-Client Relationship</h2>
            <p>
              Use of this website does not create an attorney-client relationship. Submitting information through our forms does not establish a legal representation arrangement. An attorney-client relationship is only formed when you have a signed fee agreement with an attorney.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Accuracy of Information</h2>
            <p>
              We strive to keep information on this site accurate and up-to-date, but workers' compensation laws change frequently. We make no warranty that information is current, complete, or accurate for any specific jurisdiction. Do not rely solely on this website for legal decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">6. User Responsibilities</h2>
            <p className="mb-3">You agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate information when using the calculator or submitting forms</li>
              <li>Use the Site only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the Site's operation</li>
              <li>Not submit false or misleading information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
            <p>
              WorkInjuryCalc and its operators shall not be liable for any damages arising from your use of the Site, including but not limited to reliance on compensation estimates, failure to file claims within statutory deadlines, or outcomes of legal proceedings. Use of the Site is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless WorkInjuryCalc, its operators, employees, and partners from any claims, damages, or expenses arising from your use of the Site or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">9. Intellectual Property</h2>
            <p>
              All content on this Site, including text, graphics, logos, and code, is the property of WorkInjuryCalc or its licensors and is protected by applicable intellectual property laws. You may not reproduce or distribute content without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">10. Third-Party Links</h2>
            <p>
              The Site may contain links to third-party websites. We are not responsible for the content or practices of those sites and encourage you to review their terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">11. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the United States and the state in which WorkInjuryCalc is incorporated, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Material changes will be indicated by an updated date. Continued use of the Site after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">13. Contact</h2>
            <p>
              Questions about these Terms should be directed to: legal@workinjurycalc.com
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
