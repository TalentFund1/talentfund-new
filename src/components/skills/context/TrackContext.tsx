import { createContext, useContext, useState, ReactNode } from 'react';

interface TrackContextType {
  track: "Professional" | "Managerial";
  setTrack: (track: "Professional" | "Managerial") => void;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: (value: boolean) => void;
  saveTrackSelection: () => void;
}

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [track, setTrack] = useState<"Professional" | "Managerial">(() => {
    const savedTrack = localStorage.getItem('selectedTrack');
    return (savedTrack as "Professional" | "Managerial") || "Professional";
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const saveTrackSelection = () => {
    localStorage.setItem('selectedTrack', track);
    setHasUnsavedChanges(false);
  };

  return (
    <TrackContext.Provider value={{ 
      track, 
      setTrack, 
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