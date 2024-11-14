import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    setTracks(prev => ({
      ...prev,
      [roleId]: track
    }));
    setHasUnsavedChanges(true);
    // Immediately save to localStorage to ensure persistence
    localStorage.setItem('roleTracks', JSON.stringify({
      ...tracks,
      [roleId]: track
    }));
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