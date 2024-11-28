import { useState, useEffect } from "react";
import { useTrack } from "../../context/TrackContext";

export const useTrackState = (
  currentRoleId: string,
  initialTrack?: "Professional" | "Managerial"
) => {
  const { getTrackForRole } = useTrack();
  const savedTrack = getTrackForRole(currentRoleId);

  // Initialize track state immediately with the correct value
  const [track, setTrack] = useState<"Professional" | "Managerial">(() => {
    console.log('Initializing track state:', {
      currentRoleId,
      savedTrack,
      initialTrack
    });
    // Use saved track as the source of truth
    return savedTrack;
  });

  // Keep track in sync with saved track
  useEffect(() => {
    console.log('Track sync effect:', {
      currentRoleId,
      savedTrack,
      currentTrack: track
    });
    
    if (savedTrack !== track) {
      console.log('Updating track to match saved track:', savedTrack);
      setTrack(savedTrack);
    }
  }, [currentRoleId, savedTrack, track]);

  return {
    track,
    setTrack
  };
};
