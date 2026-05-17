import { Engagement } from '../types';

interface DashboardProps {
  engagement: Engagement;
}

export default function Dashboard({ engagement }: DashboardProps) {
  const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
      'Intake Active': 'bg-blue-100 text-blue-800 border-blue-300',
      'Document Review Active': 'bg-purple-100 text-purple-800 border-purple-300',
      'CPA Review Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Filing Readiness Pending': 'bg-orange-100 text-orange-800 border-orange-300',
      'Approved': 'bg-green-100 text-green-800 border-green-300'
    };
    return colors[state] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Engagement Overview</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Client Info */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Client Name</p>
          <p className="text-base font-semibold text-slate-900 mt-1">{engagement.clientName}</p>
        </div>

        {/* Engagement Name */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Engagement Name</p>
          <p className="text-base font-semibold text-slate-900 mt-1">{engagement.engagementName}</p>
        </div>

        {/* Current State */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Current State</p>
          <div className={`inline-block mt-2 px-3 py-1 rounded-full border font-semibold text-xs ${getStateColor(engagement.currentState)}`}>
            {engagement.currentState}
          </div>
        </div>

        {/* Readiness Status */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Readiness</p>
          <p className="text-base font-semibold text-slate-900 mt-1">{engagement.readinessStatus}</p>
        </div>

        {/* Missing Items */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Missing Items</p>
          <p className={`text-2xl font-bold mt-1 ${engagement.missingItemCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {engagement.missingItemCount}
          </p>
        </div>

        {/* Escalations */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Escalations</p>
          <p className={`text-2xl font-bold mt-1 ${engagement.escalationCount > 0 ? 'text-orange-600' : 'text-green-600'}`}>
            {engagement.escalationCount}
          </p>
        </div>

        {/* CPA Approval */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">CPA Approval</p>
          <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-semibold mt-1 ${engagement.cpaApprovalRecorded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <span className={`w-2 h-2 rounded-full ${engagement.cpaApprovalRecorded ? 'bg-green-600' : 'bg-red-600'}`}></span>
            {engagement.cpaApprovalRecorded ? '✓ Recorded' : '⏳ Pending'}
          </div>
        </div>

        {/* Updated */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase">Last Updated</p>
          <p className="text-xs text-slate-600 mt-1">{new Date(engagement.updatedAt).toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Timeline Info */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Engagement Timeline</p>
        <div className="text-xs text-slate-600">
          <p>Created: {new Date(engagement.createdAt).toLocaleString()}</p>
          <p>Updated: {new Date(engagement.updatedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
