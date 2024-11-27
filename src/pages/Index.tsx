import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">Welcome to TalentFund</h1>
        <div className="space-y-4">
          <Button
            onClick={() => navigate("/employees")}
            className="w-full max-w-xs"
          >
            View Employees
          </Button>
          <Button
            onClick={() => navigate("/skills")}
            className="w-full max-w-xs"
          >
            View Skills
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;