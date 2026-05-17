interface ApprovalGateProps {
  cpaApprovalRecorded: boolean;
  onRecordApproval: () => void;
}

export default function ApprovalGate({
  cpaApprovalRecorded,
  onRecordApproval
}: ApprovalGateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Approval Gate</h3>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-900">
          <strong>Governance Rule:</strong> Cannot transition to "Approved" without explicit CPA approval.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-slate-600 mb-2">Approval Status:</p>
          <div className={`flex items-center gap-3 p-3 rounded-lg ${cpaApprovalRecorded ? 'bg-green-100' : 'bg-yellow-100'}`}>
            <span className={`w-3 h-3 rounded-full ${cpaApprovalRecorded ? 'bg-green-600' : 'bg-yellow-600'}`}></span>
            <span className={`font-semibold text-sm ${cpaApprovalRecorded ? 'text-green-800' : 'text-yellow-800'}`}>
              {cpaApprovalRecorded ? 'CPA Approval Recorded ✓' : 'Awaiting CPA Approval'}
            </span>
          </div>
        </div>

        {!cpaApprovalRecorded ? (
          <button
            onClick={onRecordApproval}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Record CPA Approval
          </button>
        ) : (
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-green-800 font-semibold text-sm">✓ Approval Recorded</p>
            <p className="text-xs text-green-700 mt-1">You may now transition to "Approved"</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-2">How It Works</p>
        <p className="text-sm text-slate-600">
          This is a non-bypassable governance control. The UI prevents approval transitions until this gate is satisfied, ensuring CPA oversight.
        </p>
      </div>
    </div>
  );
}
