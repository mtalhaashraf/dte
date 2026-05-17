import { WorkflowState } from '../types';

interface WorkflowControlsProps {
  currentState: WorkflowState;
  validNextStates: WorkflowState[];
  onTransition: (nextState: WorkflowState) => void;
}

export default function WorkflowControls({
  currentState,
  validNextStates,
  onTransition
}: WorkflowControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Workflow State Transitions</h3>

      <p className="text-sm text-slate-600 mb-4">
        Current: <span className="font-semibold text-slate-900">{currentState}</span>
      </p>

      <div className="space-y-3">
        {validNextStates.length > 0 ? (
          <>
            <p className="text-sm font-semibold text-slate-600 mb-3">Valid Next States:</p>
            {validNextStates.map((state) => (
              <button
                key={state}
                onClick={() => onTransition(state)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Move to: {state}
              </button>
            ))}
          </>
        ) : (
          <div className="bg-slate-100 p-4 rounded-lg text-center">
            <p className="text-slate-600">✓ Final state reached</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Governance</p>
        <p className="text-sm text-slate-600">
          Only valid next states are available. This prevents uncontrolled status changes and enforces proper workflow progression.
        </p>
      </div>
    </div>
  );
}
