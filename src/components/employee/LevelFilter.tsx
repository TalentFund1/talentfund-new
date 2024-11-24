import { SearchFilter } from '@/components/market/SearchFilter';

interface LevelFilterProps {
  onLevelChange: (level: string[]) => void;
  selectedLevel: string[];
  selectedJobTitle: string[];
}

export const LevelFilter = ({ onLevelChange, selectedLevel, selectedJobTitle }: LevelFilterProps) => {
  const isManagerialTrack = selectedJobTitle.length > 0 && 
    selectedJobTitle[0].toLowerCase().includes('manager');

  const getLevelsForTrack = () => {
    if (isManagerialTrack) {
      return ["M3", "M4", "M5", "M6"];
    }
    return ["P1", "P2", "P3", "P4", "P5", "P6"];
  };

  const getLevelDescription = (level: string) => {
    const descriptions: Record<string, string> = {
      "P1": "Entry",
      "P2": "Developing",
      "P3": "Career",
      "P4": "Senior",
      "P5": "Expert",
      "P6": "Principal",
      "M3": "Manager",
      "M4": "Senior Manager",
      "M5": "Director",
      "M6": "Senior Director"
    };
    return descriptions[level] || level;
  };

  return (
    <SearchFilter
      label=""
      placeholder="Level"
      items={getLevelsForTrack().map(level => `${level} - ${getLevelDescription(level)}`)}
      selectedItems={selectedLevel}
      onItemsChange={onLevelChange}
      singleSelect={false}
      className="w-[180px]"
    />
  );
};