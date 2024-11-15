import { createContext, useContext, useState, ReactNode } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
  hasUnsavedChanges: boolean;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    const savedTracks = localStorage.getItem('roleTracks');
    return savedTracks ? JSON.parse(savedTracks) : {};
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): Track => {
    // Default to Managerial for Engineering Manager (126), Professional for others
    if (!tracks[roleId]) {
      const defaultTrack = roleId === "126" ? "Managerial" : "Professional";
      setTrackForRole(roleId, defaultTrack);
      return defaultTrack;
    }
    return tracks[roleId];
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    const newTracks = {
      ...tracks,
      [roleId]: track
    };
    setTracks(newTracks);
    setHasUnsavedChanges(true);
    // Immediately save to localStorage
    localStorage.setItem('roleTracks', JSON.stringify(newTracks));
  };

  const saveTrackSelection = () => {
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