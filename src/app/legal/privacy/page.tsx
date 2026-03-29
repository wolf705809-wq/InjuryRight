import type { Metadata } from 'next'
import { SITE_NAME } from '@/lib/compliance'

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: 'How WorkInjuryCalc collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 prose prose-gray prose-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-xs mb-8">Last updated: March 29, 2026</p>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            When you use WorkInjuryCalc, we may collect the following information:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Contact information (name, phone number, email address) that you provide voluntarily</li>
            <li>Injury and employment details entered into the compensation calculator</li>
            <li>Usage data such as pages visited, time spent on site, and browser type</li>
            <li>IP address and approximate geographic location</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">We use the information we collect to:</p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Connect you with licensed workers' compensation attorneys in your state</li>
            <li>Provide compensation estimate calculations</li>
            <li>Improve the accuracy and functionality of our tools</li>
            <li>Send you follow-up communications about your potential claim (with your consent)</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">3. Sharing Your Information</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            We may share your personal information with:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li><strong>Licensed attorneys:</strong> When you submit a lead form, your information is shared with one or more licensed workers' compensation attorneys in your state who may contact you.</li>
            <li><strong>Service providers:</strong> Third-party vendors who assist us in operating our website and services (e.g., database hosting, analytics).</li>
            <li><strong>Legal requirements:</strong> When required by law, court order, or government authority.</li>
          </ul>
          <p className="text-gray-600 text-sm mt-3">
            We do not sell your personal information to third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">4. Referral Fee Disclosure</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            WorkInjuryCalc may receive a referral fee from attorneys or law firms when we connect you with their services. This fee does not affect the legal advice you receive or the cost to you — workers' compensation attorneys typically work on contingency.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">5. Data Retention</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Lead form submissions are retained for up to 24 months.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">6. Your Rights</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Depending on your state of residence, you may have the right to:
          </p>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>California residents: additional rights under the CCPA/CPRA</li>
          </ul>
          <p className="text-gray-600 text-sm mt-3">
            To exercise any of these rights, contact us at privacy@workinjurycalc.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">7. Cookies and Tracking</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We use cookies and similar tracking technologies to analyze site traffic, personalize content, and improve user experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain site functionality.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">8. Security</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is completely secure and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">9. Children's Privacy</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">10. Changes to This Policy</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of material changes by updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">11. Contact Us</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            If you have questions about this Privacy Policy or our data practices, please contact:<br />
            <strong>WorkInjuryCalc</strong><br />
            Email: privacy@workinjurycalc.com
          </p>
        </section>
      </div>
    </main>
  )
}
