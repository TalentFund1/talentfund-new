import { Badge } from "@/components/ui/badge";
import { SkillSection } from "@/components/skills/SkillSection";
import { skillsByCategory } from "@/components/skills/competency/skillsData";

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

    const [track, level] = selectedRole.id.split('-');
    const isManagerial = selectedRole.track === "Managerial";
    const skillsData = skillsByCategory.all[isManagerial ? 'managerial' : 'professional'][level] || [];
    const certifications = skillsByCategory.certification[isManagerial ? 'managerial' : 'professional'][level] || [];

    return {
      required: skillsData.filter(skill => skill.required === "required"),
      preferred: skillsData.filter(skill => skill.required === "preferred"),
      certifications: certifications
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
              key={skill.name}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {skill.name}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(skill.level)}`} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 w-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Preferred Skills</span>
          <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
            {preferred.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {preferred.map((skill) => (
            <Badge 
              key={skill.name}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {skill.name}
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
              key={cert.name}
              variant="outline" 
              className="rounded-md px-4 py-2 border-2 flex items-center gap-2 bg-white hover:bg-background/80 transition-colors border-[#CCDBFF]"
            >
              {cert.name}
              <div className={`h-2 w-2 rounded-full ${getLevelColor(cert.level)}`} />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};