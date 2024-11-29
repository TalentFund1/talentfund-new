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
};

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    const savedTracks = localStorage.getItem('roleTracks');
    return savedTracks ? JSON.parse(savedTracks) : DEFAULT_TRACKS;
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const savedTracks = localStorage.getItem('roleTracks');
    if (!savedTracks) {
      localStorage.setItem('roleTracks', JSON.stringify(DEFAULT_TRACKS));
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
    localStorage.setItem('roleTracks', JSON.stringify(newTracks));
  };

  const saveTrackSelection = () => {
    console.log('Saving track selections:', tracks);
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