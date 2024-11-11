import { createContext, useContext, useState, ReactNode } from 'react';

type Track = "Professional" | "Managerial";

interface TrackContextType {
  getTrackForRole: (roleId: string) => Track;
  setTrackForRole: (roleId: string, track: Track) => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, Track>>({});

  const getTrackForRole = (roleId: string): Track => {
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    setTracks(prev => ({
      ...prev,
      [roleId]: track
    }));
  };

  return (
    <TrackContext.Provider value={{ getTrackForRole, setTrackForRole }}>
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