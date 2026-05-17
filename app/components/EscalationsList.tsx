import { Escalation } from '../types';

interface EscalationsListProps {
  escalations: Escalation[];
  onResolve: (escalationId: string) => void;
}

export default function EscalationsList({
  escalations,
  onResolve
}: EscalationsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Escalations</h3>

      {escalations.length === 0 ? (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-green-800 font-semibold text-sm">✓ No escalations</p>
        </div>
      ) : (
        <div className="space-y-3">
          {escalations.map((escalation) => (
            <div
              key={escalation.id}
              className={`p-4 rounded-lg border-2 ${
                escalation.isResolved
                  ? 'bg-green-50 border-green-300'
                  : 'bg-orange-50 border-orange-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${
                    escalation.isResolved ? 'text-green-800 line-through' : 'text-orange-800'
                  }`}>
                    {escalation.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(escalation.createdAt).toLocaleString()}
                  </p>
                </div>
                {!escalation.isResolved && (
                  <button
                    onClick={() => onResolve(escalation.id)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-1 px-3 rounded text-xs whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
        <p className="text-xs text-orange-900">
          <strong>⚠️ Blocking Rule:</strong> Unresolved escalations block approval. Resolve all before reaching "Approved" state.
        </p>
      </div>
    </div>
  );
}
