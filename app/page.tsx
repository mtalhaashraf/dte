import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">DTE Governed Workflow Dashboard</h1>
          <p className="text-slate-300 text-lg">Professional tax engagement orchestration system with governed execution</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Quick Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/engagements"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-blue-600"
          >
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">View All Engagements</h2>
            <p className="text-slate-600">Explore 5 different test scenarios demonstrating the governed workflow system</p>
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
            <div className="text-4xl mb-3">✅</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Test Scenarios</h2>
            <p className="text-slate-600">Each scenario demonstrates a different workflow state and governance rule</p>
          </div>
        </div>

        {/* Scenario Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Test Scenarios Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Scenario 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🚨</span>
                <h3 className="text-lg font-bold text-slate-900">Scenario 1: Active Escalations</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong>ABC Roofing LLC</strong> - S-Corp Review
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Current State: Document Review Active</li>
                <li>✗ Escalation blocks approval</li>
                <li>✗ Missing item tracking</li>
              </ul>
              <p className="text-xs text-orange-600 mt-3 font-semibold">Tests: Escalation blocking, approval gate</p>
            </div>

            {/* Scenario 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⏳</span>
                <h3 className="text-lg font-bold text-slate-900">Scenario 2: Ready for Approval</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong>Sterling Manufacturing</strong> - Partnership Return
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Current State: Filing Readiness Pending</li>
                <li>✓ No escalations or missing items</li>
                <li>→ Ready for CPA approval</li>
              </ul>
              <p className="text-xs text-yellow-600 mt-3 font-semibold">Tests: Approval gate control</p>
            </div>

            {/* Scenario 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">✅</span>
                <h3 className="text-lg font-bold text-slate-900">Scenario 3: Approved</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong>Horizon Tech Solutions</strong> - S-Corp Review
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Current State: Approved</li>
                <li>✓ CPA approval recorded</li>
                <li>✓ Final state reached</li>
              </ul>
              <p className="text-xs text-green-600 mt-3 font-semibold">Tests: Complete workflow journey</p>
            </div>

            {/* Scenario 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-lg font-bold text-slate-900">Scenario 4: Multiple Issues</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong>Quantum Ventures LLC</strong> - LLC Return
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Current State: Document Review Active</li>
                <li>✗ 2 escalations active</li>
                <li>✗ 2 missing items tracking</li>
              </ul>
              <p className="text-xs text-red-600 mt-3 font-semibold">Tests: Complex issue tracking</p>
            </div>

            {/* Scenario 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📝</span>
                <h3 className="text-lg font-bold text-slate-900">Scenario 5: Just Created</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                <strong>Cornerstone Investments</strong> - Trust Return
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Current State: Intake Active</li>
                <li>✓ Empty escalations & issues</li>
                <li>→ Beginning of workflow</li>
              </ul>
              <p className="text-xs text-blue-600 mt-3 font-semibold">Tests: Initial state transitions</p>
            </div>

            {/* Audit Log Info */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <h3 className="text-lg font-bold text-slate-900">Audit Logging</h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                All scenarios include complete event history
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ Engagement created events</li>
                <li>✓ State transitions tracked</li>
                <li>✓ Approvals & escalations logged</li>
              </ul>
              <p className="text-xs text-purple-600 mt-3 font-semibold">Tests: Complete auditability</p>
            </div>
          </div>
        </div>

        {/* Governance Rules */}
        <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-slate-900 mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Governance Rules Enforced</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>🔒</span> State Machine Control
              </h4>
              <p className="text-sm text-slate-600">
                Only sequential state transitions allowed. No random or unauthorized state changes.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>✅</span> Approval Gate
              </h4>
              <p className="text-sm text-slate-600">
                Cannot transition to "Approved" without explicit CPA approval recording.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>🚫</span> Escalation Blocking
              </h4>
              <p className="text-sm text-slate-600">
                Unresolved escalations prevent workflow progression to final states.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span>📝</span> Complete Audit Trail
              </h4>
              <p className="text-sm text-slate-600">
                All actions immutably recorded with timestamps for full traceability.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/engagements"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
          >
            Explore Test Scenarios →
          </Link>
        </div>
      </div>
    </main>
  );
}
