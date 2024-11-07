interface SkillDetails {
  level?: string;
  required?: string;
}

interface SkillCellProps {
  details: SkillDetails;
}

export const SkillCell = ({ details }: SkillCellProps) => {
  if (!details.level || details.level === "-") return <span>-</span>;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="font-medium">{details.level}</div>
      {details.required && (
        <div className="text-xs text-muted-foreground">
          {details.required === "required" ? "✓ required" : "◇ preferred"}
        </div>
      )}
    </div>
  );
};