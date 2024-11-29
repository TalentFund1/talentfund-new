import { createContext, useContext, useState, ReactNode } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
  hasUnsavedChanges: boolean;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

// Now all roles default to Professional track for consistent logic
const DEFAULT_TRACKS: Record<string, Track> = {
  "123": "Professional",
  "124": "Professional",
  "125": "Professional",
  "126": "Professional", // Changed from Managerial to Professional
  "127": "Professional",
  "128": "Professional",
  "129": "Professional",
  "130": "Professional"
};

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    const savedTracks = localStorage.getItem('roleTracks');
    return savedTracks ? JSON.parse(savedTracks) : DEFAULT_TRACKS;
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting standardized track for role:', roleId, 'Current tracks:', tracks);
    return "Professional" as Track; // Always return Professional for consistent logic
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    const newTracks: Record<string, Track> = {
      ...tracks,
      [roleId]: "Professional" as Track // Force Professional track for all roles
    };
    setTracks(newTracks);
    setHasUnsavedChanges(true);
    localStorage.setItem('roleTracks', JSON.stringify(newTracks));
  };

  const saveTrackSelection = () => {
    console.log('Saving standardized track selections:', tracks);
    localStorage.setItem('roleTracks', JSON.stringify(tracks));
    setHasUnsavedChanges(false);
  };

  return (
    <TrackContext.Provider value={{ 
      getTrackForRole, 
      setTrackForRole, 
      hasUnsavedChanges, 
      saveTrackSelection 
    }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => {
  const context = useContext(TrackContext);
  if (context === undefined) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};