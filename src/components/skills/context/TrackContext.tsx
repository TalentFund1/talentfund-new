import { createContext, useContext, useState, ReactNode } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  tracks: Record<string, Track>;
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
  hasUnsavedChanges: boolean;
}

const DEFAULT_TRACKS: Record<string, Track> = {
  "123": "Professional",
  "124": "Professional",
  "125": "Professional",
  "126": "Professional",
  "127": "Professional"
};

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>(DEFAULT_TRACKS);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting standardized track for role:', roleId, 'Current tracks:', tracks);
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    const newTracks: Record<string, Track> = {
      ...tracks,
      [roleId]: track
    };
    setTracks(newTracks);
    setHasUnsavedChanges(true);
  };

  return (
    <TrackContext.Provider value={{ tracks, getTrackForRole, setTrackForRole, hasUnsavedChanges }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => {
  const context = useContext(TrackContext);
  if (!context) {
    throw new Error('useTrack must be used within a TrackProvider');
  }
  return context;
};