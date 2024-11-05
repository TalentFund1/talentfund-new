interface SkillBenchmarkProps {
  benchmarks: {
    J: boolean;
    B: boolean;
    O: boolean;
  };
}

export const SkillBenchmark = ({ benchmarks }: SkillBenchmarkProps) => {
  return (
    <div className="flex justify-center gap-1">
      <span className={`w-6 h-6 rounded-full ${benchmarks.J ? 'bg-[#8073ec]/20 text-primary' : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-sm font-medium`}>
        J
      </span>
      <span className={`w-6 h-6 rounded-full ${benchmarks.B ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-sm font-medium`}>
        B
      </span>
      <span className={`w-6 h-6 rounded-full ${benchmarks.O ? 'bg-primary-icon/10 text-primary-icon' : 'bg-gray-100 text-gray-400'} flex items-center justify-center text-sm font-medium`}>
        O
      </span>
    </div>
  );
};