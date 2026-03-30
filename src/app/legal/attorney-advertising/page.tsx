import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Attorney Advertising Disclosure | WorkerRight',
  description: 'State-specific attorney advertising disclosures for WorkerRight.',
}

const STATE_DISCLOSURES = [
  { state: 'California', text: 'Pursuant to California Business and Professions Code §6157 et seq. Attorney advertising.' },
  { state: 'New York', text: "Prior results do not guarantee a similar outcome. Attorney advertising — New York Rules of Professional Conduct Rule 7.1." },
  { state: 'Florida', text: "The hiring of a lawyer is an important decision that should not be based solely on advertisements. Florida Bar Rule 4-7. Prior results do not guarantee similar outcomes." },
  { state: 'Texas', text: "Pursuant to Texas Disciplinary Rules of Professional Conduct Rule 7.02. Prior results do not guarantee similar outcomes." },
  { state: 'New Jersey', text: "Attorney advertising. New Jersey Rules of Professional Conduct Rule 7.2. Prior results do not guarantee similar outcomes." },
  { state: 'Illinois', text: "Attorney advertising. Prior results do not guarantee a similar outcome." },
  { state: 'Pennsylvania', text: "Attorney advertising. Pennsylvania Rules of Professional Conduct Rule 7.2. Prior results do not guarantee similar outcomes." },
  { state: 'Georgia', text: "Attorney advertising. State Bar of Georgia Rules of Professional Conduct Rule 7.1. Prior results do not guarantee similar outcomes." },
  { state: 'Michigan', text: "Attorney advertising. Michigan Rules of Professional Conduct Rule 7.2. Prior results do not guarantee similar outcomes." },
  { state: 'All other states', text: "Attorney advertising. Prior results do not guarantee a similar outcome. Rules vary by state." },
]

export default function AttorneyAdvertisingPage() {
  return (
    <main className="bg-white py-14 px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ letterSpacing: '-0.4px' }}>
          Attorney Advertising Disclosure
        </h1>
        <p className="text-[12px] text-gray-400 mb-8">Last updated: January 2025</p>

        <div className="space-y-6 text-gray-600">
          <section>
            <p className="text-sm leading-relaxed mb-4">
              This website contains attorney advertising. Prior results do not guarantee similar outcomes.
            </p>
            <p className="text-sm leading-relaxed">
              WorkerRight connects injured workers with licensed workers&apos; compensation attorneys.
              The following state-specific disclosures apply:
            </p>
          </section>

          <section>
            <div className="divide-y divide-gray-100">
              {STATE_DISCLOSURES.map(d => (
                <div key={d.state} className="py-3">
                  <p className="text-sm font-semibold text-gray-800 mb-1">{d.state}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{d.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              WorkerRight is not a law firm and does not provide legal advice. Attorney-client
              relationships are formed solely between the client and the individual attorney. All
              attorneys in our network are licensed in their respective states.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
