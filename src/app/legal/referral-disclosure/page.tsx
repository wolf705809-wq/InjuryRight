import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral Fee Disclosure | WorkerRight',
  description: 'Full disclosure of referral fee relationships between WorkerRight and its attorney network.',
}

export default function ReferralDisclosurePage() {
  return (
    <main className="bg-white py-14 px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '-0.4px' }}>
          Referral Fee Disclosure
        </h1>
        <p className="text-[12px] text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="prose prose-sm max-w-none space-y-6 text-gray-600">
          <section>
            <p className="leading-relaxed">
              WorkerRight receives compensation when injured workers connect with attorneys through
              our platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Specifically:</h2>
            <ul className="space-y-2">
              {[
                'We receive a referral fee paid by the attorney',
                'This fee is never charged to you',
                'Attorneys in our network work on contingency — you pay nothing unless you win',
                'This disclosure complies with FTC guidelines on affiliate and referral relationships',
                'Our referral relationships do not influence the settlement estimates or information we provide',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm">
                  <span className="text-emerald-600 mt-0.5 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Legal Basis</h2>
            <p className="text-sm leading-relaxed">
              This disclosure is made pursuant to FTC guidelines on endorsements and testimonials
              (16 C.F.R. Part 255) and applicable state bar advertising rules. Attorney referral fees
              are permitted under the Rules of Professional Conduct in all states in which we operate,
              provided the fee is not contingent on the outcome of the case and is disclosed to the client.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Your Rights</h2>
            <p className="text-sm leading-relaxed">
              You have the right to hire any attorney of your choosing. You are under no obligation to
              use an attorney introduced through WorkerRight. The information and estimates we
              provide are available to you regardless of whether you use our attorney matching service.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              WorkerRight is not a law firm. Prior results do not guarantee similar outcomes.
              Attorney advertising.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
