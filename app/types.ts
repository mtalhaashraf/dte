export type WorkflowState =
  | 'Intake Active'
  | 'Document Review Active'
  | 'CPA Review Pending'
  | 'Filing Readiness Pending'
  | 'Approved';

export interface AuditEvent {
  id: string;
  timestamp: Date;
  eventType: 'engagement_created' | 'status_changed' | 'missing_item_added' | 'escalation_added' | 'cpa_approval_recorded' | 'approval_status_changed';
  description: string;
  oldState?: WorkflowState;
  newState?: WorkflowState;
}

export interface MissingItem {
  id: string;
  description: string;
  isResolved: boolean;
  createdAt: Date;
}

export interface Escalation {
  id: string;
  description: string;
  isResolved: boolean;
  createdAt: Date;
}

export interface Engagement {
  id: string;
  clientName: string;
  engagementName: string;
  engagementType: string;
  currentState: WorkflowState;
  readinessStatus: string;
  cpaApprovalRecorded: boolean;
  missingItemCount: number;
  escalationCount: number;
  createdAt: Date;
  updatedAt: Date;
  auditLog: AuditEvent[];
  missingItems: MissingItem[];
  escalations: Escalation[];
}

export const VALID_TRANSITIONS: Record<WorkflowState, WorkflowState[]> = {
  'Intake Active': ['Document Review Active'],
  'Document Review Active': ['CPA Review Pending'],
  'CPA Review Pending': ['Filing Readiness Pending'],
  'Filing Readiness Pending': ['Approved'],
  'Approved': []
};
