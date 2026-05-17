import { Engagement, WorkflowState, VALID_TRANSITIONS, AuditEvent } from './types';

export class StateMachine {
  private engagement: Engagement;

  constructor(engagement: Engagement) {
    this.engagement = JSON.parse(JSON.stringify(engagement));
  }

  canTransitionTo(nextState: WorkflowState): { allowed: boolean; reason?: string } {
    const currentState = this.engagement.currentState;
    const validNextStates = VALID_TRANSITIONS[currentState];

    if (!validNextStates.includes(nextState)) {
      return {
        allowed: false,
        reason: `Cannot transition from "${currentState}" to "${nextState}"`
      };
    }

    // Approval gate: can't move to Approved without CPA approval
    if (nextState === 'Approved' && !this.engagement.cpaApprovalRecorded) {
      return {
        allowed: false,
        reason: 'Cannot transition to "Approved" without CPA approval'
      };
    }

    // Escalations must be resolved before approval
    if (nextState === 'Approved' && this.engagement.escalations.some(e => !e.isResolved)) {
      return {
        allowed: false,
        reason: 'All escalations must be resolved before approval'
      };
    }

    return { allowed: true };
  }

  transitionTo(nextState: WorkflowState): { success: boolean; error?: string; engagement?: Engagement } {
    const check = this.canTransitionTo(nextState);

    if (!check.allowed) {
      return { success: false, error: check.reason };
    }

    const oldState = this.engagement.currentState;
    this.engagement.currentState = nextState;
    this.engagement.updatedAt = new Date();

    const event: AuditEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      eventType: 'status_changed',
      description: `Workflow state changed from "${oldState}" to "${nextState}"`,
      oldState,
      newState: nextState
    };

    this.engagement.auditLog.push(event);

    return { success: true, engagement: this.engagement };
  }

  recordCPAApproval(): Engagement {
    this.engagement.cpaApprovalRecorded = true;
    this.engagement.updatedAt = new Date();

    const event: AuditEvent = {
      id: Date.now().toString(),
      timestamp: new Date(),
      eventType: 'cpa_approval_recorded',
      description: 'CPA approval recorded'
    };

    this.engagement.auditLog.push(event);

    return this.engagement;
  }

  resolveEscalation(escalationId: string): Engagement {
    const escalation = this.engagement.escalations.find(e => e.id === escalationId);
    if (escalation) {
      escalation.isResolved = true;
      this.engagement.escalationCount = this.engagement.escalations.filter(e => !e.isResolved).length;
      this.engagement.updatedAt = new Date();
    }
    return this.engagement;
  }

  resolveMissingItem(itemId: string): Engagement {
    const item = this.engagement.missingItems.find(m => m.id === itemId);
    if (item) {
      item.isResolved = true;
      this.engagement.missingItemCount = this.engagement.missingItems.filter(m => !m.isResolved).length;
      this.engagement.updatedAt = new Date();
    }
    return this.engagement;
  }

  getEngagement(): Engagement {
    return this.engagement;
  }
}
