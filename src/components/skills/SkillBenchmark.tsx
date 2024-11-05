import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <Badge 
        variant={benchmarks.J ? "default" : "outline"}
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
          benchmarks.J ? 'bg-[#8073ec]/20 text-primary border-0' : 'bg-white'
        }`}
      >
        J
      </Badge>
      <Badge 
        variant={benchmarks.B ? "default" : "outline"}
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
          benchmarks.B ? 'bg-blue-100 text-blue-800 border-0' : 'bg-white'
        }`}
      >
        B
      </Badge>
      <Badge 
        variant={benchmarks.O ? "default" : "outline"}
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
          benchmarks.O ? 'bg-primary-icon/10 text-primary-icon border-0' : 'bg-white'
        }`}
      >
        O
      </Badge>
    </div>
  );
};