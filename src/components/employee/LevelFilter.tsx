import { SearchFilter } from '@/components/market/SearchFilter';
import { useTrack } from '../skills/context/TrackContext';
import { getSkillProfileId } from '../EmployeeTable';
import { professionalLevels, managerialLevels } from '../benchmark/data/levelData';

interface LevelFilterProps {
  onLevelChange: (level: string[]) => void;
  selectedLevel: string[];
  selectedJobTitle: string[];
}

export const LevelFilter = ({ 
  onLevelChange, 
  selectedLevel,
  selectedJobTitle 
}: LevelFilterProps) => {
  const { getTrackForRole } = useTrack();
  
  const isManagerialTrack = () => {
    if (selectedJobTitle.length === 0) return false;
    
    const roleId = getSkillProfileId(selectedJobTitle[0]);
    const track = getTrackForRole(roleId);
    
    console.log('Determining track for level filter:', {
      roleId,
      selectedTitle: selectedJobTitle[0],
      track,
      isManagerial: track === "Managerial"
    });
    
    return track === "Managerial";
  };

  const getLevelsForTrack = () => {
    const isManagerial = isManagerialTrack();
    
    console.log('Getting levels for track:', {
      isManagerial,
      selectedJobTitle,
      availableLevels: isManagerial ? Object.keys(managerialLevels) : Object.keys(professionalLevels)
    });

    if (isManagerial) {
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