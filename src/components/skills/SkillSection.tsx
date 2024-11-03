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
          <span className="bg-background rounded-full px-2 py-0.5 text-xs font-medium text-foreground">
            {count}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};