interface BenchmarkHeaderProps {
  showComparison: boolean;
  onToggleComparison: () => void;
}

export const BenchmarkHeader = ({ showComparison, onToggleComparison }: BenchmarkHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Role Benchmark</h2>
      <button 
        onClick={onToggleComparison}
        className="text-sm text-primary hover:underline"
      >
        {showComparison ? 'Hide Comparison' : 'Show Comparison'}
      </button>
    </div>
  );
};