import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const requiredSkills = [
  { name: "React", level: "present" },
  { name: "JavaScript", level: "present" },
  { name: "GraphQL", level: "missing" },
  { name: "HTML and CSS3", level: "present" },
  { name: "Angular", level: "missing" },
  { name: "IPA Integrations", level: "missing" },
];

const preferredSkills = [
  { name: "UI/UX Design Principles", level: "present" },
  { name: "Communication", level: "present" },
  { name: "Angular", level: "present" },
];

export const RoleBenchmark = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Role Benchmark</h3>
        
        <div className="w-full max-w-[800px]">
          <Select defaultValue="senior-frontend">
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="senior-frontend">Senior Frontend Engineer: P4</SelectItem>
              <SelectItem value="lead-frontend">Lead Frontend Engineer: P5</SelectItem>
              <SelectItem value="principal">Principal Engineer: P6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Missing Skills / Seniority or Certification</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {requiredSkills.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {requiredSkills.map((skill) => (
                <div 
                  key={skill.name}
                  className="px-3 py-1.5 rounded-lg text-sm border border-[#E4E7EC] bg-white text-[#344054] flex items-center gap-2"
                >
                  {skill.name}
                  {skill.level === "present" && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#1F2144]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Preferred Skills</span>
                <span className="bg-[#8073ec]/10 text-[#1F2144] rounded-full px-2 py-0.5 text-xs font-medium">
                  {preferredSkills.length}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {preferredSkills.map((skill) => (
                <div 
                  key={skill.name}
                  className="px-3 py-1.5 rounded-lg text-sm border border-[#E4E7EC] bg-white text-[#344054] flex items-center gap-2"
                >
                  {skill.name}
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1F2144]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};