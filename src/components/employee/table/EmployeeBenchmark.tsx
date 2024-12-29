interface EmployeeBenchmarkProps {
  benchmark: number;
}

export const EmployeeBenchmark = ({ benchmark }: EmployeeBenchmarkProps) => {
  const getBenchmarkColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800';
    if (percentage >= 70) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <td className="px-6 py-4 text-center w-[120px]">
      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-sm font-medium ${
        getBenchmarkColor(benchmark)
      }`}>
        {Math.round(benchmark)}%
      </span>
    </td>
  );
};