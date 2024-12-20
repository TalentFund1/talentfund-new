import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap } from "lucide-react";

interface LearningRecommendationsProps {
  roleSkills: Record<string, string[]>;
  onBack: () => void;
}

export const LearningRecommendations = ({ 
  roleSkills,
  onBack 
}: LearningRecommendationsProps) => {
  // Mock learning paths for demonstration
  const learningPaths = Object.entries(roleSkills).map(([role, skills]) => ({
    role,
    recommendations: skills.map(skill => ({
      skill,
      course: `Advanced ${skill} Training`,
      provider: "Tech Academy",
      duration: "4 weeks"
    }))
  }));

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">5. Learning & Development Recommendations</h2>
        
        {learningPaths.map(path => (
          <Card key={path.role} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">{path.role} Learning Path</h3>
              </div>
              
              <div className="space-y-4">
                {path.recommendations.map(rec => (
                  <div key={rec.skill} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{rec.skill}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {rec.duration}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{rec.course}</p>
                    <p className="text-sm text-muted-foreground">
                      Provided by {rec.provider}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button>Complete</Button>
      </div>
    </div>
  );
};