import { createContext, useContext, useState, ReactNode } from 'react';

interface TrackContextType {
  getTrackForRole: (roleId: string) => "Professional" | "Managerial";
  setTrackForRole: (roleId: string, track: "Professional" | "Managerial") => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [tracks, setTracks] = useState<Record<string, "Professional" | "Managerial">(() => {
    const savedTracks = localStorage.getItem('roleTracks');
    return savedTracks ? JSON.parse(savedTracks) : {};
  }));
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const getTrackForRole = (roleId: string): "Professional" | "Managerial" => {
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: "Professional" | "Managerial") => {
    setTracks(prev => ({
      ...prev,
      [roleId]: track
    }));
    setHasUnsavedChanges(true);
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
      setHasUnsavedChanges,
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