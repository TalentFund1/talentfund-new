import { useCompetencyStore } from "./CompetencyState";
import { roleSkills } from "../data/roleSkills";
import { professionalLevels, managerialLevels } from "../../benchmark/data/levelData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SkillProgressionChartProps {
  track: "Professional" | "Managerial";
  currentRoleId: string;
  toggledSkills: Set<string>;
}

const levelToScore = {
  'unspecified': 0,
  'beginner': 1,
  'intermediate': 2,
  'advanced': 3
};

export const SkillProgressionChart = ({ track, currentRoleId, toggledSkills }: SkillProgressionChartProps) => {
  const { currentStates } = useCompetencyStore();
  const levels = track === "Professional" ? Object.keys(professionalLevels) : Object.keys(managerialLevels);
  
  const currentRoleSkills = roleSkills[currentRoleId as keyof typeof roleSkills] || roleSkills["123"];
  const skills = [
    ...currentRoleSkills.specialized,
    ...currentRoleSkills.common,
    ...currentRoleSkills.certifications
  ].filter(skill => toggledSkills.has(skill.title));

  const chartData = levels.map(level => {
    const dataPoint: any = {
      level: level.toUpperCase(),
    };

    skills.forEach(skill => {
      const skillState = currentStates[currentRoleId]?.[skill.title]?.[level.toLowerCase()];
      if (skillState) {
        const score = levelToScore[skillState.level as keyof typeof levelToScore] || 0;
        dataPoint[skill.title] = score;
      } else {
        dataPoint[skill.title] = 0;
      }
    });

    return dataPoint;
  });

  const colors = [
    "#8073ec", "#FF6B6B", "#4ECDC4", "#45B7D1", 
    "#96CEB4", "#FFEEAD", "#D4A5A5", "#9B5DE5",
    "#F15BB5", "#00BBF9", "#00F5D4", "#FEE440"
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
        <XAxis 
          dataKey="level" 
          stroke="#1F2144"
          fontSize={12}
        />
        <YAxis 
          stroke="#1F2144"
          fontSize={12}
          ticks={[0, 1, 2, 3]}
          tickFormatter={(value) => {
            const labels = ['Unspecified', 'Beginner', 'Intermediate', 'Advanced'];
            return labels[value] || '';
          }}
        />
        <Tooltip 
          contentStyle={{ 
            background: 'white',
            border: '1px solid #CCDBFF',
            borderRadius: '6px'
          }}
        />
        <Legend />
        {skills.map((skill, index) => (
          <Line
            key={skill.title}
            type="monotone"
            dataKey={skill.title}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};