import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
  hasUnsavedChanges: boolean;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

const DEFAULT_TRACKS: Record<string, Track> = {
  "123": "Professional", // AI Engineer
  "124": "Professional", // Backend Engineer
  "125": "Professional", // Frontend Engineer
  "126": "Managerial",  // Engineering Manager
  "127": "Professional", // DevOps Engineer
};

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
    console.log('Using default tracks:', DEFAULT_TRACKS);
    return DEFAULT_TRACKS;
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize tracks in localStorage if not present
  useEffect(() => {
    const savedTracks = localStorage.getItem(STORAGE_KEY);
    if (!savedTracks) {
      console.log('Initializing tracks in localStorage:', DEFAULT_TRACKS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TRACKS));
      setTracks(DEFAULT_TRACKS);
    }
  }, []);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting track for role:', roleId, 'Current tracks:', tracks);
    return tracks[roleId] || DEFAULT_TRACKS[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    const newTracks = {
      ...tracks,
      [roleId]: track
    };
    setTracks(newTracks);
    setHasUnsavedChanges(true);
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