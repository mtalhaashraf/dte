'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getAllEngagements } from '@/app/mockData';
import { StateMachine } from '@/app/stateMachine';
import { WorkflowState, VALID_TRANSITIONS, Engagement } from '@/app/types';
import { useLocalStorage } from '@/app/hooks/useLocalStorage';
import Dashboard from '@/app/components/Dashboard';
import WorkflowControls from '@/app/components/WorkflowControls';
import ApprovalGate from '@/app/components/ApprovalGate';
import EscalationsList from '@/app/components/EscalationsList';
import MissingItemsList from '@/app/components/MissingItemsList';
import AuditLog from '@/app/components/AuditLog';

export default function EngagementDetailPage() {
  const params = useParams();
  const { getEngagement, saveEngagement, isClient } = useLocalStorage();
  const [engagement, setEngagement] = useState<Engagement | null>(null);
  const [transitionError, setTransitionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params?.id as string;
    if (id && isClient) {
      // Try to load from localStorage first
      let foundEngagement = getEngagement(id);

      // If not in localStorage, load from mock data
      if (!foundEngagement) {
        const mockEngagement = getAllEngagements().find(e => e.id === id);
        if (mockEngagement) {
          foundEngagement = mockEngagement;
        }
      }

      if (foundEngagement) {
        setEngagement(foundEngagement);
      }
      setLoading(false);
    }
  }, [params, isClient, getEngagement]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!engagement) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/engagements" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
            ← Back to Engagements
          </Link>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800">Engagement not found</p>
          </div>
        </div>
      </div>
    );
  }

  const handleStateTransition = (nextState: WorkflowState) => {
    const sm = new StateMachine(engagement);
    const result = sm.transitionTo(nextState);

    if (result.success && result.engagement) {
      const updated = result.engagement;
      setEngagement(updated);
      saveEngagement(updated);
      setTransitionError(null);
    } else {
      setTransitionError(result.error || 'Unknown error');
    }
  };

  const handleCPAApproval = () => {
    const sm = new StateMachine(engagement);
    const updated = sm.recordCPAApproval();
    setEngagement(updated);
    saveEngagement(updated);
  };

  const handleResolveEscalation = (escalationId: string) => {
    const sm = new StateMachine(engagement);
    const updated = sm.resolveEscalation(escalationId);
    setEngagement(updated);
    saveEngagement(updated);
  };

  const handleResolveMissingItem = (itemId: string) => {
    const sm = new StateMachine(engagement);
    const updated = sm.resolveMissingItem(itemId);
    setEngagement(updated);
    saveEngagement(updated);
  };

  const handleResetEngagement = () => {
    const mockEngagement = getAllEngagements().find(e => e.id === engagement.id);
    if (mockEngagement) {
      setEngagement(mockEngagement);
      saveEngagement(mockEngagement);
      setTransitionError(null);
    }
  };

  return (
    <main className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header - Fixed */}
      <div className="bg-slate-900 text-white py-8 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-4">
            <Link href="/engagements" className="text-slate-300 hover:text-white text-sm">
              ← Back to Engagements
            </Link>
            <button
              onClick={handleResetEngagement}
              className="bg-slate-700 hover:bg-slate-600 text-white text-sm px-3 py-1 rounded transition-colors"
              title="Reset engagement to original state"
            >
              🔄 Reset to Original
            </button>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{engagement.engagementName}</h1>
            <p className="text-slate-300 mt-1">{engagement.clientName}</p>
            <p className="text-xs text-slate-400 mt-2">💾 Changes are automatically saved to your browser</p>
          </div>
        </div>
      </div>

      {/* Main Content with Independent Scrolling */}
      <div className="flex-1 overflow-hidden flex px-6 py-8">
        {/* Left Side - Controls with vertical scroll */}
        <div className="flex-1 overflow-y-auto pr-6">
          <div className="space-y-6">
          {/* Dashboard Overview */}
          <div>
            <Dashboard engagement={engagement} />
          </div>

          {/* Transition Error Alert */}
          {transitionError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">
                <strong>⚠️ Transition Error:</strong> {transitionError}
              </p>
            </div>
          )}

          {/* Workflow Controls */}
          <WorkflowControls
            currentState={engagement.currentState}
            validNextStates={VALID_TRANSITIONS[engagement.currentState]}
            onTransition={handleStateTransition}
          />

          {/* Approval Gate */}
          <ApprovalGate
            cpaApprovalRecorded={engagement.cpaApprovalRecorded}
            onRecordApproval={handleCPAApproval}
          />

          {/* Issues Section */}
          <div className="space-y-6">
            <EscalationsList
              escalations={engagement.escalations}
              onResolve={handleResolveEscalation}
            />
            <MissingItemsList
              missingItems={engagement.missingItems}
              onResolve={handleResolveMissingItem}
            />
          </div>
          </div>
        </div>

        {/* Right Side - Audit Log with vertical scroll */}
        <div className="w-full lg:w-96 flex-shrink-0 overflow-y-auto pl-6">
          <AuditLog events={engagement.auditLog} />
        </div>
      </div>
    </main>
  );
}
