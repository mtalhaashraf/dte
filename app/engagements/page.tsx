'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllEngagements } from '../mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Engagement } from '../types';

export default function EngagementsPage() {
  const { isClient, getEngagement } = useLocalStorage();
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isClient) {
      // Get mock engagements
      const mockEngagements = getAllEngagements();

      // Override with localStorage versions if they exist
      const updatedEngagements = mockEngagements.map(mock => {
        const stored = getEngagement(mock.id);
        return stored || mock;
      });

      setEngagements(updatedEngagements);
      setLoading(false);
    }
  }, [isClient, getEngagement]);

  const getStateColor = (state: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      'Intake Active': { bg: 'bg-blue-100', text: 'text-blue-900' },
      'Document Review Active': { bg: 'bg-purple-100', text: 'text-purple-900' },
      'CPA Review Pending': { bg: 'bg-yellow-100', text: 'text-yellow-900' },
      'Filing Readiness Pending': { bg: 'bg-orange-100', text: 'text-orange-900' },
      'Approved': { bg: 'bg-green-100', text: 'text-green-900' }
    };
    return colors[state] || { bg: 'bg-gray-100', text: 'text-gray-900' };
  };

  const getIssueColor = (count: number) => {
    if (count === 0) return 'text-green-600';
    if (count === 1) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Loading engagements...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-slate-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-slate-300 hover:text-white text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold">All Engagements</h1>
          <p className="text-slate-300 mt-2">{engagements.length} test scenarios demonstrating governed workflow states</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-slate-900">{engagements.length}</div>
            <div className="text-sm text-slate-600">Total Engagements</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-green-600">{engagements.filter(e => e.currentState === 'Approved').length}</div>
            <div className="text-sm text-slate-600">Approved</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-orange-600">{engagements.reduce((sum, e) => sum + e.escalationCount, 0)}</div>
            <div className="text-sm text-slate-600">Active Escalations</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-3xl font-bold text-red-600">{engagements.reduce((sum, e) => sum + e.missingItemCount, 0)}</div>
            <div className="text-sm text-slate-600">Missing Items</div>
          </div>
        </div>

        {/* Engagements Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Engagement</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Current State</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Issues</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">CPA Approval</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {engagements.map((engagement, idx) => {
                  const colors = getStateColor(engagement.currentState);
                  const issueColor = getIssueColor(engagement.escalationCount + engagement.missingItemCount);

                  return (
                    <tr key={engagement.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{engagement.clientName}</div>
                        <div className="text-xs text-slate-500">{engagement.engagementType}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{engagement.engagementName}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
                          {engagement.currentState}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-sm font-semibold ${engagement.readinessStatus.includes('Complete') ? 'text-green-600' : 'text-slate-600'}`}>
                          {engagement.readinessStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className={`text-sm font-bold ${issueColor}`}>
                          {engagement.escalationCount + engagement.missingItemCount}
                        </div>
                        <div className="text-xs text-slate-500">
                          {engagement.escalationCount > 0 && <div>🚨 {engagement.escalationCount}</div>}
                          {engagement.missingItemCount > 0 && <div>⚠️ {engagement.missingItemCount}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${engagement.cpaApprovalRecorded ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {engagement.cpaApprovalRecorded ? '✓ Recorded' : '⏳ Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Link
                          href={`/engagements/${engagement.id}`}
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded transition-colors"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-3">💡 How to Test</h3>
          <ol className="text-sm text-blue-800 space-y-2 ml-4">
            <li><strong>1. Click "View"</strong> on any engagement to explore its workflow state</li>
            <li><strong>2. Resolve issues</strong> by marking escalations and missing items as complete</li>
            <li><strong>3. Record CPA approval</strong> in the approval gate section</li>
            <li><strong>4. Transition states</strong> using the workflow controls (only valid transitions allowed)</li>
            <li><strong>5. Watch the audit log</strong> to see all events recorded with timestamps</li>
            <li><strong>6. Verify governance rules</strong> - notice how escalations block approval until resolved</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
