import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-foreground">Welcome to TalentFund</h1>
            <p className="text-lg text-muted-foreground">
              Manage your organization's talent and skills profiles
            </p>
            <div className="flex gap-4">
              <Button onClick={() => navigate('/skills')}>
                View Skills Profiles
              </Button>
              <Button onClick={() => navigate('/employees')} variant="outline">
                View Employees
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;