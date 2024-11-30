import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
  hasUnsavedChanges: boolean;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

const STORAGE_KEY = 'roleTracks';

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    try {
      const savedTracks = localStorage.getItem(STORAGE_KEY);
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        console.log('Loaded persisted tracks:', parsed);
        return parsed;
      }
    } catch (error) {
      console.error('Error loading persisted tracks:', error);
    }
    return {};
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting track for role:', roleId, 'Current tracks:', tracks);
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    const newTracks = {
      ...tracks,
      [roleId]: track
    };
    setTracks(newTracks);
    setHasUnsavedChanges(true);
    
    // Save immediately to ensure track selection persists
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTracks));
  };

  const saveTrackSelection = () => {
    console.log('Saving track selections:', tracks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
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