import { StatCard } from "@/components/StatCard";
import { SkillsOverview } from "@/components/SkillsOverview";
import { Sidebar } from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-6 ml-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Skills Intelligence Dashboard</h1>
            <button className="text-sm text-foreground">Sign Out</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Employees"
              value="124"
              description="+12% from last month"
            />
            <StatCard
              title="Skills Coverage"
              value="87%"
              description="Above industry average"
            />
            <StatCard
              title="Growth Rate"
              value="+15%"
              description="Year over year"
            />
            <StatCard
              title="Skill Score"
              value="4.8/5"
              description="Team performance"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <SkillsOverview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;