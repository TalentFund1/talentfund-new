import { SearchFilter } from '@/components/market/SearchFilter';
import { useTrack } from '../skills/context/TrackContext';
import { getSkillProfileId } from '@/utils/roleUtils';

interface LevelFilterProps {
  onLevelChange: (level: string[]) => void;
  selectedLevel: string[];
  selectedJobTitle: string[];
}

export const LevelFilter = ({ onLevelChange, selectedLevel, selectedJobTitle }: LevelFilterProps) => {
  const { getTrackForRole } = useTrack();
  
  const getTrackForJobTitle = () => {
    if (selectedJobTitle.length === 0) return "Professional";
    const roleId = getSkillProfileId(selectedJobTitle[0]);
    return getTrackForRole(roleId);
  };

  const isManagerialTrack = getTrackForJobTitle() === "Managerial";

  console.log('LevelFilter - Track info:', {
    selectedJobTitle,
    track: getTrackForJobTitle(),
    isManagerialTrack
  });

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
