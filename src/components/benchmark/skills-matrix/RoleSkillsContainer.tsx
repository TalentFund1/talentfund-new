import { Badge } from "@/components/ui/badge";
import { roleSkills } from "@/components/skills/data/roleSkills";

interface RoleSkillsContainerProps {
  selectedRole: {
    id: string;
    track: string;
    title: string;
    level: string;
  } | null;
}

export const RoleSkillsContainer = ({ selectedRole }: RoleSkillsContainerProps) => {
  const getSkillsForRole = () => {
    if (!selectedRole) return { required: [], preferred: [], certifications: [] };

    const roleId = selectedRole.id.split('-')[1];
    const skillsData = roleSkills[roleId as keyof typeof roleSkills] || {
      specialized: [],
      common: [],
      certifications: []
    };

    return {
      required: skillsData.specialized || [],
      preferred: skillsData.common || [],
      certifications: skillsData.certifications || []
    };
  };

  const { required, preferred, certifications } = getSkillsForRole();

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
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

  return (
    <div className="space-y-6 mt-6">
      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Required Skills</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {required.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {required.map((skill) => (
            <Badge 
              key={skill.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Common Skills</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {preferred.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {preferred.map((skill) => (
            <Badge 
              key={skill.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {skill.title}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Certifications</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {certifications.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {certifications.map((cert) => (
            <Badge 
              key={cert.title}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {cert.title}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(cert.level)}`} />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};