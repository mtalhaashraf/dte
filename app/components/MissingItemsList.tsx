import { MissingItem } from '../types';

interface MissingItemsListProps {
  missingItems: MissingItem[];
  onResolve: (itemId: string) => void;
}

export default function MissingItemsList({
  missingItems,
  onResolve
}: MissingItemsListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
      <h3 className="text-xl font-bold text-slate-900 mb-4">Missing Items</h3>

      {missingItems.length === 0 ? (
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-green-800 font-semibold text-sm">✓ All items complete</p>
        </div>
      ) : (
        <div className="space-y-3">
          {missingItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 ${
                item.isResolved
                  ? 'bg-green-50 border-green-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${
                    item.isResolved ? 'text-green-800 line-through' : 'text-red-800'
                  }`}>
                    {item.description}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                {!item.isResolved && (
                  <button
                    onClick={() => onResolve(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded text-xs whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                  >
                    Mark Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
