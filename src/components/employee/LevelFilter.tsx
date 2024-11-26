import { SearchFilter } from '@/components/market/SearchFilter';

interface LevelFilterProps {
  onLevelChange: (level: string[]) => void;
  selectedLevel: string[];
  selectedJobTitle: string[];
}

export const LevelFilter = ({ onLevelChange, selectedLevel, selectedJobTitle = [] }: LevelFilterProps) => {
  const isManagerialTrack = selectedJobTitle.length > 0 && 
    selectedJobTitle[0].toLowerCase().includes('manager');

  const getLevelsForTrack = () => {
    if (isManagerialTrack) {
      return [
        "M3 - Manager",
        "M4 - Senior Manager",
        "M5 - Director",
        "M6 - Senior Director"
      ];
    }
    return [
      "P1 - Entry",
      "P2 - Developing",
      "P3 - Career",
      "P4 - Senior",
      "P5 - Expert",
      "P6 - Principal"
    ];
  };

  const formatLevel = (level: string) => {
    return level.split(' - ')[0];
  };

  return (
    <SearchFilter
      label=""
      placeholder="Level"
      items={getLevelsForTrack()}
      selectedItems={selectedLevel}
      onItemsChange={(items) => onLevelChange(items.map(formatLevel))}
      singleSelect={false}
      className="w-[180px]"
    />
  );
};