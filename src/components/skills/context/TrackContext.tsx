import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams();
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    try {
      const savedTracks = localStorage.getItem('role-tracks');
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        console.log('Loading saved tracks:', parsed);
        return { ...DEFAULT_TRACKS, ...parsed };
      }
    } catch (error) {
      console.error('Error loading tracks:', error);
    }
    return DEFAULT_TRACKS;
  });
  
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Effect to handle profile switches
  useEffect(() => {
    if (id) {
      console.log('Profile changed, initializing track for role:', id);
      // Ensure the new profile has a track set
      setTracks(current => {
        if (!current[id]) {
          console.log('Setting default track for new profile:', id);
          return { ...current, [id]: "Professional" };
        }
        return current;
      });
    }
  }, [id]);

  // Effect to persist tracks to localStorage
  useEffect(() => {
    try {
      console.log('Persisting tracks to localStorage:', tracks);
      localStorage.setItem('role-tracks', JSON.stringify(tracks));
    } catch (error) {
      console.error('Error saving tracks:', error);
    }
  }, [tracks]);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting track for role:', roleId, 'Current tracks:', tracks);
    return tracks[roleId] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    setTracks(current => ({
      ...current,
      [roleId]: track
    }));
    setHasUnsavedChanges(true);
  };

  return (
    <TrackContext.Provider value={{ 
      tracks, 
      getTrackForRole, 
      setTrackForRole, 
      hasUnsavedChanges 
    }}>
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