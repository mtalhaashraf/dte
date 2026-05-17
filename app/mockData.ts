import { Engagement, AuditEvent, MissingItem, Escalation } from './types';

const now = new Date();

// Scenario 1: Engagement with active escalations (blocks approval)
export const createScenario1_ActiveEscalations = (): Engagement => {
  const missingItems: MissingItem[] = [
    {
      id: '1',
      description: 'Schedule final meeting with client for document validation',
      isResolved: false,
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000)
    }
  ];

  const escalations: Escalation[] = [
    {
      id: '1',
      description: 'Client unable to provide K-1 distributions documentation - awaiting clarification from pass-through entity',
      isResolved: false,
      createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000)
    }
  ];

  const auditLog: AuditEvent[] = [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      eventType: 'engagement_created',
      description: 'Engagement created for ABC Roofing LLC - 2025 S-Corp CPA Review'
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 20 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Intake Active',
      newState: 'Document Review Active'
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
      eventType: 'escalation_added',
      description: 'Escalation added: Client unable to provide K-1 distributions documentation'
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      eventType: 'missing_item_added',
      description: 'Missing item added: Schedule final meeting with client for document validation'
    }
  ];

  return {
    id: 'eng-001',
    clientName: 'ABC Roofing LLC',
    engagementName: '2025 S-Corp CPA Review',
    engagementType: 'CPA Review',
    currentState: 'Document Review Active',
    readinessStatus: 'In Progress',
    cpaApprovalRecorded: false,
    missingItemCount: missingItems.length,
    escalationCount: escalations.length,
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    updatedAt: now,
    auditLog,
    missingItems,
    escalations
  };
};

// Scenario 2: Clean engagement ready for approval (no issues)
export const createScenario2_ReadyForApproval = (): Engagement => {
  const auditLog: AuditEvent[] = [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000),
      eventType: 'engagement_created',
      description: 'Engagement created for Sterling Manufacturing - 2025 Partnership Return'
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 40 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Intake Active',
      newState: 'Document Review Active'
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 32 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Document Review Active',
      newState: 'CPA Review Pending'
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'CPA Review Pending',
      newState: 'Filing Readiness Pending'
    }
  ];

  return {
    id: 'eng-002',
    clientName: 'Sterling Manufacturing',
    engagementName: '2025 Partnership Return',
    engagementType: 'Partnership Return',
    currentState: 'Filing Readiness Pending',
    readinessStatus: 'Ready for CPA Review',
    cpaApprovalRecorded: false,
    missingItemCount: 0,
    escalationCount: 0,
    createdAt: new Date(now.getTime() - 48 * 60 * 60 * 1000),
    updatedAt: now,
    auditLog,
    missingItems: [],
    escalations: []
  };
};

// Scenario 3: Already approved engagement (final state)
export const createScenario3_Approved = (): Engagement => {
  const auditLog: AuditEvent[] = [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 72 * 60 * 60 * 1000),
      eventType: 'engagement_created',
      description: 'Engagement created for Horizon Tech Solutions - 2025 S-Corp Review'
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 64 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Intake Active',
      newState: 'Document Review Active'
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 56 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Document Review Active',
      newState: 'CPA Review Pending'
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 48 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'CPA Review Pending',
      newState: 'Filing Readiness Pending'
    },
    {
      id: '5',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      eventType: 'cpa_approval_recorded',
      description: 'CPA approval recorded'
    },
    {
      id: '6',
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Filing Readiness Pending',
      newState: 'Approved'
    }
  ];

  return {
    id: 'eng-003',
    clientName: 'Horizon Tech Solutions',
    engagementName: '2025 S-Corp Review',
    engagementType: 'S-Corp Review',
    currentState: 'Approved',
    readinessStatus: 'Complete',
    cpaApprovalRecorded: true,
    missingItemCount: 0,
    escalationCount: 0,
    createdAt: new Date(now.getTime() - 72 * 60 * 60 * 1000),
    updatedAt: now,
    auditLog,
    missingItems: [],
    escalations: []
  };
};

// Scenario 4: Multiple issues (escalations + missing items)
export const createScenario4_MultipleIssues = (): Engagement => {
  const missingItems: MissingItem[] = [
    {
      id: '1',
      description: 'Provide updated capital account statement',
      isResolved: false,
      createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000)
    },
    {
      id: '2',
      description: 'Clarify charitable contribution documentation',
      isResolved: false,
      createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000)
    }
  ];

  const escalations: Escalation[] = [
    {
      id: '1',
      description: 'Significant pass-through losses - requires client meeting to discuss tax planning',
      isResolved: false,
      createdAt: new Date(now.getTime() - 10 * 60 * 60 * 1000)
    },
    {
      id: '2',
      description: 'Prior year amendment required - coordination needed with state filings',
      isResolved: false,
      createdAt: new Date(now.getTime() - 7 * 60 * 60 * 1000)
    }
  ];

  const auditLog: AuditEvent[] = [
    {
      id: '1',
      timestamp: new Date(now.getTime() - 30 * 60 * 60 * 1000),
      eventType: 'engagement_created',
      description: 'Engagement created for Quantum Ventures LLC - 2025 LLC Return'
    },
    {
      id: '2',
      timestamp: new Date(now.getTime() - 28 * 60 * 60 * 1000),
      eventType: 'status_changed',
      description: 'Workflow state transitioned',
      oldState: 'Intake Active',
      newState: 'Document Review Active'
    },
    {
      id: '3',
      timestamp: new Date(now.getTime() - 10 * 60 * 60 * 1000),
      eventType: 'escalation_added',
      description: 'Escalation added: Significant pass-through losses'
    },
    {
      id: '4',
      timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000),
      eventType: 'missing_item_added',
      description: 'Missing item added: Provide updated capital account statement'
    },
    {
      id: '5',
      timestamp: new Date(now.getTime() - 7 * 60 * 60 * 1000),
      eventType: 'escalation_added',
      description: 'Escalation added: Prior year amendment required'
    },
    {
      id: '6',
      timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000),
      eventType: 'missing_item_added',
      description: 'Missing item added: Clarify charitable contribution documentation'
    }
  ];

  return {
    id: 'eng-004',
    clientName: 'Quantum Ventures LLC',
    engagementName: '2025 LLC Return',
    engagementType: 'LLC Return',
    currentState: 'Document Review Active',
    readinessStatus: 'Blocked - Multiple Issues',
    cpaApprovalRecorded: false,
    missingItemCount: missingItems.length,
    escalationCount: escalations.length,
    createdAt: new Date(now.getTime() - 30 * 60 * 60 * 1000),
    updatedAt: now,
    auditLog,
    missingItems,
    escalations
  };
};

// Scenario 5: Just created engagement (early stage)
export const createScenario5_JustCreated = (): Engagement => {
  const auditLog: AuditEvent[] = [
    {
      id: '1',
      timestamp: now,
      eventType: 'engagement_created',
      description: 'Engagement created for Cornerstone Investments - 2025 Trust Return'
    }
  ];

  return {
    id: 'eng-005',
    clientName: 'Cornerstone Investments',
    engagementName: '2025 Trust Return',
    engagementType: 'Trust Return',
    currentState: 'Intake Active',
    readinessStatus: 'Not Started',
    cpaApprovalRecorded: false,
    missingItemCount: 0,
    escalationCount: 0,
    createdAt: now,
    updatedAt: now,
    auditLog,
    missingItems: [],
    escalations: []
  };
};

export const getAllEngagements = (): Engagement[] => [
  createScenario1_ActiveEscalations(),
  createScenario2_ReadyForApproval(),
  createScenario3_Approved(),
  createScenario4_MultipleIssues(),
  createScenario5_JustCreated()
];
