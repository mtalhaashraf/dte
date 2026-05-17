# DTE - Governed Workflow Dashboard

A professional tax engagement orchestration system with governed execution, real-time audit logging, and compliance-driven workflow management.

## What is DTE?

DTE (Deemed Tax Engagement) is a workflow management system designed to bring order and compliance to complex tax engagement processes. It enforces business rules through a state machine, prevents unauthorized state transitions, blocks approvals when governance conditions aren't met, and maintains an immutable audit trail of every action.

### The Problem

Traditional engagement management systems lack:
- **Governance Control** - No enforcement of valid state transitions
- **Approval Gates** - Escalations and missing documents can be ignored
- **Traceability** - No clear audit trail for compliance audits
- **Escalation Blocking** - Critical issues don't prevent progress

### The Solution

DTE solves this with:
- ✅ **State Machine Governance** - Only valid state transitions allowed
- ✅ **Approval Gate Enforcement** - Conditions must be met before approval
- ✅ **Escalation Blocking** - Unresolved issues prevent approval
- ✅ **Complete Audit Trail** - Every action recorded with timestamp and details
- ✅ **Real-time Tracking** - Side-by-side audit log with workflow controls
- ✅ **Persistent Storage** - Changes survive browser refresh via localStorage

---

## Key Features

### 1. **Governed State Transitions**
```
Intake Active
    ↓ (only valid transitions shown)
Document Review Active
    ↓
CPA Review Pending
    ↓
Filing Readiness Pending
    ↓
Approved
```

Each state has specific allowed next states. Invalid transitions are blocked at the UI level and prevented by the state machine.

### 2. **Approval Gate Enforcement**
Before an engagement can be approved:
- All escalations must be resolved
- All missing items must be resolved
- CPA approval must be explicitly recorded

Violate these rules? The "Approved" button stays disabled.

### 3. **Real-time Audit Trail**
Every significant event is logged:
- State transitions (with old→new values)
- Escalation additions and resolutions
- Missing item additions and resolutions
- CPA approval recordings
- Approval status changes
- Timestamps for every event

### 4. **Dashboard & Overview**
Each engagement shows:
- Current workflow state
- Readiness status
- Count of active escalations
- Count of missing items
- CPA approval status
- Quick access to detailed view

---

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd dte

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Project Structure

```
dte/
├── app/
│   ├── components/           # React components
│   │   ├── Dashboard.tsx     # Engagement overview
│   │   ├── WorkflowControls.tsx  # State transition buttons
│   │   ├── ApprovalGate.tsx  # CPA approval recording
│   │   ├── EscalationsList.tsx   # Escalation management
│   │   ├── MissingItemsList.tsx  # Missing item tracking
│   │   └── AuditLog.tsx      # Event timeline
│   ├── hooks/
│   │   └── useLocalStorage.ts    # Local storage persistence hook
│   ├── types.ts              # TypeScript types and interfaces
│   ├── mockData.ts           # 5 test scenario factories
│   ├── stateMachine.ts       # State machine + governance logic
│   ├── layout.tsx            # Root layout with sidebar
│   ├── page.tsx              # Home page
│   ├── engagements/
│   │   ├── page.tsx          # All engagements list
│   │   └── [id]/
│   │       └── page.tsx      # Engagement detail page
│   ├── globals.css           # Tailwind styles
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── LOOM_SCRIPT.md           # 5-minute video script
└── README.md                # This file
```

---

## How to Use

### 1. **View All Engagements**
Navigate to "All Engagements" to see all test scenarios. Each shows:
- Client name and engagement type
- Current state (color-coded)
- Readiness status
- Active escalations and missing items
- CPA approval status
- Quick "View" button to drill down

### 2. **Open an Engagement**
Click "View" on any engagement to see the full detail page with:
- **Left side**: Dashboard, workflow controls, approval gate, escalations, missing items
- **Right side**: Real-time audit log showing all actions
- **Header**: Engagement name, client, reset button

### 3. **Navigate Workflow States**
Use the Workflow Controls section to transition between states. Only valid next states are shown. Invalid transitions are blocked by the state machine.

### 4. **Resolve Issues**
- **Escalations**: Click "Resolve" next to any escalation to mark it complete
- **Missing Items**: Click "Mark as Done" to resolve missing items
- Both actions are immediately recorded in the audit log

### 5. **Record CPA Approval**
Once all issues are resolved, use the Approval Gate section to record CPA approval. This enables the "Approved" state transition.

### 6. **Watch the Audit Log**
The right side audit log shows:
- Every action you take
- Timestamps for compliance
- Event type and description
- State transitions with before/after values
- Complete governance trail

### 7. **Reset Engagement**
Use the "Reset to Original" button in the header to restore an engagement to its initial mock state (useful for testing).

---

## Test Scenarios

The app includes 5 built-in test scenarios, each demonstrating different governance challenges:

### **Scenario 1: Active Escalations** (`eng-001`)
- **Purpose**: Show escalation blocking
- **State**: Document Review Active
- **Issues**: 3 active escalations, 1 missing item
- **Test**: Try to approve without resolving escalations—it will fail
- **Governance Rule**: Escalations must be resolved before approval

### **Scenario 2: Ready for Approval** (`eng-002`)
- **Purpose**: Happy path workflow
- **State**: CPA Review Pending
- **Issues**: No escalations or missing items
- **Test**: Complete the approval flow
- **Governance Rule**: Once clean, approval is straightforward

### **Scenario 3: Approved** (`eng-003`)
- **Purpose**: Final state example
- **State**: Approved
- **Issues**: None
- **Test**: View immutable approved state
- **Governance Rule**: Once approved, engagement is locked

### **Scenario 4: Multiple Issues** (`eng-004`)
- **Purpose**: Complex governance challenge
- **State**: Intake Active
- **Issues**: 2 escalations, 3 missing items
- **Test**: Resolve issues progressively, watch audit trail
- **Governance Rule**: All issues block approval until resolved

### **Scenario 5: Just Created** (`eng-005`)
- **Purpose**: Fresh engagement flow
- **State**: Intake Active
- **Issues**: 1 missing item
- **Test**: From creation to approval in one workflow
- **Governance Rule**: New engagements start with no approvals

---

## Architecture

### State Machine (`stateMachine.ts`)

The `StateMachine` class enforces all governance rules:

```typescript
class StateMachine {
  constructor(engagement: Engagement)
  
  // Core methods
  canTransitionTo(nextState: WorkflowState): boolean
  transitionTo(nextState: WorkflowState): TransitionResult
  recordCPAApproval(): Engagement
  resolveEscalation(escalationId: string): Engagement
  resolveMissingItem(itemId: string): Engagement
  
  // Private helpers
  private createAuditEvent(...)
  private canApprove(): boolean
}
```

**Key Governance Rules:**
1. Only allowed state transitions (defined in `VALID_TRANSITIONS`)
2. Cannot approve if escalations exist
3. Cannot approve if missing items exist
4. Cannot approve without CPA approval recorded
5. Every change creates an immutable audit event

### Local Storage (`useLocalStorage.ts`)

Custom React hook for persistent storage:
- `getEngagement(id)` - Retrieve from localStorage
- `saveEngagement(engagement)` - Persist changes
- `getAllStoredEngagements()` - Get all stored engagements
- `resetAll()` - Clear all stored data

**Note**: Uses `useCallback` to maintain function identity and prevent infinite loops in React hooks.

### Component Hierarchy

```
layout.tsx (with sidebar)
├── page.tsx (Home)
└── engagements/
    ├── page.tsx (List all)
    └── [id]/page.tsx (Detail)
        ├── Dashboard
        ├── WorkflowControls
        ├── ApprovalGate
        ├── EscalationsList
        ├── MissingItemsList
        └── AuditLog (right sidebar)
```

---

## Technical Stack

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + localStorage
- **Persistence**: Browser localStorage
- **Pattern**: State machine for governance

### Requirements

- Node.js 18+
- npm or yarn

---

## Governance Rules Explained

### Rule 1: Valid State Transitions

Not every state can transition to every other state. Valid transitions:

```
Intake Active → Document Review Active (or back)
Document Review Active → CPA Review Pending (or back)
CPA Review Pending → Filing Readiness Pending (or back)
Filing Readiness Pending → Approved (only if conditions met)
```

**Why**: Prevents skipping critical review steps and ensures structured workflow.

### Rule 2: Escalation Blocking

If even one escalation is active, the "Approved" button is disabled.

```typescript
canApprove() {
  return this.engagement.escalations.every(e => e.resolved);
}
```

**Why**: Unresolved issues should block final approval for compliance.

### Rule 3: Missing Item Blocking

Similar to escalations—all missing items must be resolved before approval.

**Why**: Ensures complete documentation before engagement approval.

### Rule 4: CPA Approval Recording

A boolean flag `cpaApprovalRecorded` must be true before transitioning to "Approved".

**Why**: Creates explicit approval record in audit trail.

### Rule 5: Immutable Audit Trail

Every event is appended (never modified) with:
- Unique ID
- Event type
- Timestamp
- Description
- Before/after state values

**Why**: Regulatory compliance and forensic audit capability.

---

## Workflow Example: Escalation to Approval

### Starting State
- Engagement in "Document Review Active"
- 3 escalations active
- Cannot transition to "Approved" (blocked by state machine)
- CPA approval button disabled

### Action 1: Resolve First Escalation
```
User clicks "Resolve" on escalation
→ StateMachine.resolveEscalation() called
→ Audit event created: "Escalation Resolved"
→ Engagement saved to localStorage
→ Audit log updated immediately on UI
```

### Action 2: Resolve Remaining Escalations
```
Same process repeated for escalations 2 and 3
→ After 3rd escalation resolved, approval becomes possible
→ Audit log now shows timeline of all resolutions
```

### Action 3: Record CPA Approval
```
User clicks "Record CPA Approval"
→ StateMachine.recordCPAApproval() called
→ cpaApprovalRecorded flag set to true
→ Audit event created: "CPA Approval Recorded"
→ All conditions for approval now met
```

### Action 4: Transition to Approved
```
User clicks "Approved" button
→ StateMachine.transitionTo("Approved") succeeds
→ Audit event created: "Status Changed" (with old→new)
→ Engagement locked in Approved state
→ Full audit trail visible for compliance audit
```

---

## Extending DTE

### Adding a New State

1. Update `types.ts` - Add to `WorkflowState` union
2. Update `mockData.ts` - Create scenarios using new state
3. Update `VALID_TRANSITIONS` - Define allowed transitions
4. Update `AuditLog.tsx` - Add color/icon if desired

### Adding a New Governance Rule

1. Edit `StateMachine.ts` - Add rule to `canTransitionTo()` or `canApprove()`
2. Create corresponding audit event type
3. Test with a mock scenario
4. Document the rule in this README

### Customizing the UI

- Components in `app/components/` are independent and reusable
- Tailwind classes can be modified for different styling
- Sidebar navigation in `layout.tsx` can be extended with new links

---

## FAQ

**Q: Where does data persist?**
A: Browser localStorage. Each engagement is stored under key `dte_engagements_{id}`. Data survives refresh but is cleared on browser cache clear.

**Q: Can I use this without the mock data?**
A: Yes. Remove `mockData.ts` import and load engagements from your own API.

**Q: How do I add my own engagements?**
A: Create an `Engagement` object matching the type definition and save it via `useLocalStorage().saveEngagement()`.

**Q: Can this run offline?**
A: Yes. All logic runs client-side. No backend required.

**Q: Is this production-ready?**
A: This is a demonstration. For production use, you would add:
- Backend API with persistent database
- User authentication
- Role-based access control
- Real audit logging to secure server
- PDF export for audit trail

---

## Demo Video

A 5-minute Loom walkthrough script is available in `LOOM_SCRIPT.md`. It covers:
- Problem statement
- System overview
- Governance in action
- Escalation blocking
- Approval gate enforcement
- Audit trail traceability

---

## License

MIT

---

## Questions?

This system demonstrates governance-driven workflow management. It's built to be:
- **Trustworthy** - Clear rules, no surprises
- **Auditable** - Complete event trail
- **Compliant** - Governance enforced at code level
- **Simple** - Clean UI, obvious constraints

Perfect for tax, accounting, legal, and financial workflows where governance matters.
