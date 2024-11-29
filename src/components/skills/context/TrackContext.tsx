import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

const STORAGE_KEY = 'role-tracks-v2';

const TrackContext = createContext<TrackContextType | undefined>(undefined);

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const { id } = useParams();
  const { toast } = useToast();
  const [tracks, setTracks] = useState<Record<string, Track>>(() => {
    try {
      const savedTracks = localStorage.getItem(STORAGE_KEY);
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
  const [currentProfileId, setCurrentProfileId] = useState<string | undefined>(id);

  // Effect to handle profile switches
  useEffect(() => {
    if (id !== currentProfileId) {
      console.log('Profile changed:', { previous: currentProfileId, current: id });
      setCurrentProfileId(id);
      
      // Ensure the new profile has a track set
      setTracks(current => {
        if (!current[id || ''] || current[id || ''] !== tracks[id || '']) {
          console.log('Initializing track for new profile:', id);
          const newTracks = { 
            ...current, 
            [id || '']: DEFAULT_TRACKS[id as keyof typeof DEFAULT_TRACKS] || "Professional" 
          };
          return newTracks;
        }
        return current;
      });
    }
  }, [id, currentProfileId, tracks]);

  // Effect to persist tracks to localStorage
  useEffect(() => {
    try {
      console.log('Persisting tracks to localStorage:', tracks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
    } catch (error) {
      console.error('Error saving tracks:', error);
    }
  }, [tracks]);

  const getTrackForRole = (roleId: string): Track => {
    console.log('Getting track for role:', roleId, 'Current tracks:', tracks);
    return tracks[roleId] || DEFAULT_TRACKS[roleId as keyof typeof DEFAULT_TRACKS] || "Professional";
  };

  const setTrackForRole = (roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    setTracks(current => {
      const newTracks = {
        ...current,
        [roleId]: track
      };
      
      // Show toast notification
      toast({
        title: "Track Updated",
        description: `Track for ${roleId} has been set to ${track}`,
      });
      
      return newTracks;
    });
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