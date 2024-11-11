import { Badge } from "@/components/ui/badge";

interface SkillsDisplayProps {
  selectedRoleSkills: any;
  toggledSkills: Set<string>;
}

export const SkillsDisplay = ({ selectedRoleSkills, toggledSkills }: SkillsDisplayProps) => {
  const getLevelStyles = () => {
    return "border-[#CCDBFF]";
  };

  const getLevelDot = (level: string) => {
    switch (level) {
      case "advanced":
        return "bg-primary-accent";
      case "intermediate":
        return "bg-primary-icon";
      case "beginner":
        return "bg-[#008000]";
      default:
        return "bg-gray-300";
    }
  };

  const filteredSpecializedSkills = selectedRoleSkills.specialized.filter(
    (skill: any) => toggledSkills.has(skill.title)
  );

  const filteredCommonSkills = selectedRoleSkills.common.filter(
    (skill: any) => toggledSkills.has(skill.title)
  );

  const filteredCertifications = selectedRoleSkills.certifications.filter(
    (cert: any) => toggledSkills.has(cert.title)
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Specialized Skills</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {filteredSpecializedSkills.length}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredSpecializedSkills.map((skill: any) => (
            <Badge 
              key={skill.title} 
              variant="outline" 
              className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles()}`}
            >
              {skill.title} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Common Skills</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {filteredCommonSkills.length}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredCommonSkills.map((skill: any) => (
            <Badge 
              key={skill.title} 
              variant="outline" 
              className={`rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors ${getLevelStyles()}`}
            >
              {skill.title} <div className={`h-2 w-2 rounded-full ${getLevelDot(skill.level)}`} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Certifications</span>
            <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
              {filteredCertifications.length}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filteredCertifications.map((cert: any) => (
            <Badge 
              key={cert.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border border-border bg-white"
            >
              {cert.title}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};