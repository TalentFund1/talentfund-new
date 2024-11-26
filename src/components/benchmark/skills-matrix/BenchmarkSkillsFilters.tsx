import { Dispatch, SetStateAction } from "react";

interface BenchmarkSkillsFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedLevel: string;
  setSelectedLevel: Dispatch<SetStateAction<string>>;
  selectedInterest: string;
  setSelectedInterest: Dispatch<SetStateAction<string>>;
  selectedSkillLevel: string;
  setSelectedSkillLevel: Dispatch<SetStateAction<string>>;
  selectedSearchSkills: string[];
  setSelectedSearchSkills: Dispatch<SetStateAction<string[]>>;
}

export const BenchmarkSkillsFilters = ({
  searchTerm,
  setSearchTerm,
  selectedLevel,
  setSelectedLevel,
  selectedInterest,
  setSelectedInterest,
  selectedSkillLevel,
  setSelectedSkillLevel,
  selectedSearchSkills,
  setSelectedSearchSkills,
}: BenchmarkSkillsFiltersProps) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search skills..."
        className="border rounded p-2 w-full"
      />
      <div className="flex space-x-4">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <select
          value={selectedInterest}
          onChange={(e) => setSelectedInterest(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Interests</option>
          <option value="skill_goal">Skill Goal</option>
          <option value="not_interested">Not Interested</option>
        </select>
        <select
          value={selectedSkillLevel}
          onChange={(e) => setSelectedSkillLevel(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Skill Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
};
