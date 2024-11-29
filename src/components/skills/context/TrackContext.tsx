import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from 'react';
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

  // Memoize track operations to prevent unnecessary re-renders
  const getTrackForRole = useCallback((roleId: string): Track => {
    const track = tracks[roleId] || DEFAULT_TRACKS[roleId as keyof typeof DEFAULT_TRACKS] || "Professional";
    console.log('Getting track for role:', roleId, 'Resolved track:', track);
    return track;
  }, [tracks]);

  const setTrackForRole = useCallback((roleId: string, track: Track) => {
    console.log('Setting track for role:', roleId, 'to:', track);
    
    setTracks(current => ({
      ...current,
      [roleId]: track
    }));
    
    setHasUnsavedChanges(true);
    
    toast({
      title: "Track Updated",
      description: `Track for ${roleId} has been set to ${track}`,
    });
  }, [toast]);

  // Handle profile changes
  useEffect(() => {
    if (!id) return;

    const defaultTrack = DEFAULT_TRACKS[id as keyof typeof DEFAULT_TRACKS] || "Professional";
    
    setTracks(current => {
      if (!current[id] || current[id] !== defaultTrack) {
        console.log('Initializing track for new profile:', {
          id,
          defaultTrack,
          currentTrack: current[id]
        });
        
        return {
          ...current,
          [id]: defaultTrack
        };
      }
      return current;
    });

    setHasUnsavedChanges(false);
  }, [id]);

  // Persist tracks to localStorage
  useEffect(() => {
    if (Object.keys(tracks).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
        console.log('Persisted tracks to localStorage:', tracks);
      } catch (error) {
        console.error('Error saving tracks:', error);
      }
    }
  }, [tracks]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    tracks,
    getTrackForRole,
    setTrackForRole,
    hasUnsavedChanges
  }), [tracks, getTrackForRole, setTrackForRole, hasUnsavedChanges]);

  return (
    <TrackContext.Provider value={value}>
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