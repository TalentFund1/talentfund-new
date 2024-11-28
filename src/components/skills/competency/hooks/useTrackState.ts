import { useState, useEffect, useRef } from "react";
import { useTrack } from "../../context/TrackContext";

export const useTrackState = (
  currentRoleId: string,
  initialTrack?: "Professional" | "Managerial"
) => {
  const { getTrackForRole } = useTrack();
  const savedTrack = getTrackForRole(currentRoleId);
  const isInitialMount = useRef(true);

  // Initialize track state immediately with the correct value
  const [track, setTrack] = useState<"Professional" | "Managerial">(() => {
    console.log('Initializing track state:', {
      currentRoleId,
      savedTrack,
      initialTrack,
      isInitialMount: true
    });
    return savedTrack;
  });

  // Keep track in sync with saved track
  useEffect(() => {
    if (isInitialMount.current) {
      console.log('Skipping initial track sync effect');
      isInitialMount.current = false;
      return;
    }

    console.log('Track sync effect:', {
      currentRoleId,
      savedTrack,
      currentTrack: track,
      isInitialMount: false
    });
    
    // Only update if we're actually changing roles and tracks
    if (savedTrack !== track) {
      console.log('Updating track to match saved track:', savedTrack);
      // Use immediate state update to prevent flicker
      setTrack(savedTrack);
    }
  }, [currentRoleId, savedTrack, track]);

  const updateTrack = (newTrack: "Professional" | "Managerial") => {
    console.log('Manual track update:', {
      currentTrack: track,
      newTrack,
      currentRoleId
    });
    setTrack(newTrack);
  };

  return {
    track,
    setTrack: updateTrack
  };
};