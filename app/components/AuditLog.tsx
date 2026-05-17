import { AuditEvent } from '../types';

interface AuditLogProps {
  events: AuditEvent[];
}

const eventTypeLabels: Record<string, { label: string; color: string; icon: string }> = {
  engagement_created: {
    label: 'Engagement Created',
    color: 'bg-blue-100 text-blue-800',
    icon: '📋'
  },
  status_changed: {
    label: 'Status Changed',
    color: 'bg-purple-100 text-purple-800',
    icon: '↔️'
  },
  missing_item_added: {
    label: 'Missing Item Added',
    color: 'bg-red-100 text-red-800',
    icon: '⚠️'
  },
  escalation_added: {
    label: 'Escalation Added',
    color: 'bg-orange-100 text-orange-800',
    icon: '🚨'
  },
  cpa_approval_recorded: {
    label: 'CPA Approval Recorded',
    color: 'bg-green-100 text-green-800',
    icon: '✅'
  },
  approval_status_changed: {
    label: 'Approval Status Changed',
    color: 'bg-cyan-100 text-cyan-800',
    icon: '🔐'
  }
};

export default function AuditLog({ events }: AuditLogProps) {
  const sortedEvents = [...events].reverse();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Audit & Event Log</h2>

      <p className="text-sm text-slate-600 mb-6">
        Total Events: <span className="font-semibold">{events.length}</span>
      </p>

      <div className="space-y-4">
        {sortedEvents.length === 0 ? (
          <div className="text-center text-slate-500 py-8 text-sm">No events recorded</div>
        ) : (
          sortedEvents.map((event) => {
            const eventType = eventTypeLabels[event.eventType];
            return (
              <div key={event.id} className="border-l-4 border-slate-300 pl-4 py-3 relative">
                <div className="absolute -left-3 top-5 w-5 h-5 bg-white border-2 border-slate-300 rounded-full"></div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2 gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${eventType?.color}`}>
                      {eventType?.icon} {eventType?.label}
                    </span>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-sm text-slate-900 font-medium mb-2">
                    {event.description}
                  </p>

                  {event.oldState && event.newState && (
                    <div className="bg-white rounded p-3 text-xs text-slate-600 border border-slate-200">
                      <span className="font-semibold text-slate-900">{event.oldState}</span>
                      <span className="mx-2">→</span>
                      <span className="font-semibold text-slate-900">{event.newState}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 mt-2">
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Complete Governance Trail</p>
        <p className="text-sm text-slate-600">
          This immutable audit log records all significant events. It supports replay capability and ensures complete traceability of governed execution.
        </p>
      </div>
    </div>
  );
}
