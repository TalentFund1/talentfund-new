import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TimelinePhase {
  level: string;
  duration: string;
  focus: string;
  recommendations: {
    title: string;
    description: string;
  }[];
}

interface KeyRecommendation {
  title: string;
  description: string;
}

interface LearningPlan {
  timeline: TimelinePhase[];
  keyRecommendations: KeyRecommendation[];
  outcome: string;
}

interface LearningSectionProps {
  learningPlan: LearningPlan;
}

export const LearningSection = ({ learningPlan }: LearningSectionProps) => {
  return (
    <div className="space-y-6">
      <Separator className="my-12 bg-[#CCDBFF]" />
      <div>
        <h2 className="text-lg font-medium text-primary">5. L&D Recommendations</h2>
        <p className="text-sm text-primary/60">Learning and development plan for skill transition.</p>
      </div>

      <Card className="space-y-6 p-6 bg-background/40">
        <h3 className="font-medium text-primary">Timeline with Learning Resources:</h3>
        
        {learningPlan.timeline.map((phase, index) => (
          <div key={index} className="space-y-4">
            <h4 className="font-medium text-primary">
              {index + 1}. {phase.level} ({phase.duration}):
            </h4>
            <div className="ml-4 space-y-2">
              <p className="text-sm text-primary/80">
                <span className="font-medium">Focus:</span> {phase.focus}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-primary/80">Recommendations:</p>
                <ul className="ml-4 space-y-2">
                  {phase.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="text-sm text-primary/70">
                      • <span className="font-medium">{rec.title}:</span> {rec.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        <div className="space-y-4 mt-8">
          <h3 className="font-medium text-primary">Key Recommendations for Transition:</h3>
          <ul className="space-y-3">
            {learningPlan.keyRecommendations.map((rec, index) => (
              <li key={index} className="text-sm text-primary/70">
                • <span className="font-medium">{rec.title}:</span> {rec.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary-accent/5 border border-primary-accent/20">
          <p className="text-sm text-primary/80">
            <span className="font-medium">Outcome:</span> {learningPlan.outcome}
          </p>
        </div>
      </Card>
    </div>
  );
};