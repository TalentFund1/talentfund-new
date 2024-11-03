import { StatCard } from "@/components/StatCard";
import { SkillsOverview } from "@/components/SkillsOverview";
import { EmployeeSkillCard } from "@/components/EmployeeSkillCard";
import { Users, Target, TrendingUp, Award } from "lucide-react";

const Index = () => {
  const employeeData = {
    name: "Sarah Johnson",
    role: "Senior Product Manager",
    avatar: "https://i.pravatar.cc/150?img=1",
    skills: [
      { name: "Product Strategy", level: 92 },
      { name: "Team Leadership", level: 88 },
      { name: "Stakeholder Management", level: 85 },
      { name: "Technical Knowledge", level: 78 },
    ],
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-primary">Skills Intelligence Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Employees"
            value="1,234"
            description="+12% from last month"
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Skills Coverage"
            value="87%"
            description="Above industry average"
            icon={<Target className="h-6 w-6" />}
          />
          <StatCard
            title="Growth Rate"
            value="+15%"
            description="Year over year"
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <StatCard
            title="Skill Score"
            value="4.8/5"
            description="Team performance"
            icon={<Award className="h-6 w-6" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SkillsOverview />
          </div>
          <div>
            <EmployeeSkillCard {...employeeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;