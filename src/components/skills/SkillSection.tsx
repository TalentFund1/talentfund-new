interface SkillSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

export const SkillSection = ({ title, count, children }: SkillSectionProps) => {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {count}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};