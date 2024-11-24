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

  // Updated color palette to match website theme
  const colors = [
    "#8073ec", // Primary accent
    "#ff8256", // Primary icon
    "#1F2144", // Primary
    "#6B7280", // Muted text
    "#9333EA", // Additional purple
    "#4F46E5", // Additional indigo
    "#2563EB", // Additional blue
    "#0EA5E9", // Additional light blue
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart 
        data={chartData} 
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        className="font-inter"
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          className="stroke-border/30" 
          horizontal={true}
          vertical={false}
        />
        <XAxis 
          dataKey="level" 
          stroke="#1F2144"
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: '#CCDBFF' }}
        />
        <YAxis 
          stroke="#1F2144"
          fontSize={12}
          ticks={[0, 1, 2, 3]}
          tickLine={false}
          axisLine={{ stroke: '#CCDBFF' }}
          tickFormatter={(value) => {
            const labels = ['Unspecified', 'Beginner', 'Intermediate', 'Advanced'];
            return labels[value] || '';
          }}
        />
        <Tooltip 
          contentStyle={{ 
            background: 'white',
            border: '1px solid #CCDBFF',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            padding: '12px'
          }}
          itemStyle={{
            color: '#1F2144',
            fontSize: '12px',
            fontWeight: 500
          }}
          labelStyle={{
            color: '#1F2144',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '4px'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{
            paddingTop: '20px',
            fontSize: '12px',
            color: '#1F2144'
          }}
        />
        {skills.map((skill, index) => (
          <Line
            key={skill.title}
            type="monotone"
            dataKey={skill.title}
            stroke={colors[index % colors.length]}
            strokeWidth={2.5}
            dot={{ 
              r: 4, 
              strokeWidth: 2,
              fill: 'white',
              stroke: colors[index % colors.length]
            }}
            activeDot={{ 
              r: 6,
              strokeWidth: 2,
              fill: colors[index % colors.length],
              stroke: 'white'
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};