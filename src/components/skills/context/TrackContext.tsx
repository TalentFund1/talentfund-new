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
    if (savedTracks) {
      console.log('Loading saved tracks from storage:', JSON.parse(savedTracks));
      return JSON.parse(savedTracks);
    }
    console.log('Using default tracks:', DEFAULT_TRACKS);
    localStorage.setItem('roleTracks', JSON.stringify(DEFAULT_TRACKS));
    return DEFAULT_TRACKS;
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): Track => {
    const track = tracks[roleId] || DEFAULT_TRACKS[roleId] || "Professional";
    console.log('Getting track for role:', { roleId, track, allTracks: tracks });
    return track;
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', { roleId, track, previousTracks: tracks });
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