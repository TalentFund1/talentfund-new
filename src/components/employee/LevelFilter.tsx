import { SearchFilter } from '@/components/market/SearchFilter';
import { useTrack } from '../skills/context/TrackContext';
import { getSkillProfileId } from '../EmployeeTable';
import { professionalLevels, managerialLevels } from '../benchmark/data/levelData';

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
      return Object.entries(managerialLevels).map(([key, value]) => 
        `${value} - ${getLevelDescription(key)}`
      );
    }
    return Object.entries(professionalLevels).map(([key, value]) => 
      `${value} - ${getLevelDescription(key)}`
    );
  };

  const getLevelDescription = (level: string) => {
    switch (level.toLowerCase()) {
      case 'p1': return 'Entry';
      case 'p2': return 'Developing';
      case 'p3': return 'Career';
      case 'p4': return 'Senior';
      case 'p5': return 'Expert';
      case 'p6': return 'Principal';
      case 'm3': return 'Manager';
      case 'm4': return 'Senior Manager';
      case 'm5': return 'Director';
      case 'm6': return 'Senior Director';
      default: return '';
    }
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