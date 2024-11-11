import { TrackProvider } from "../skills/context/TrackContext";
import { RoleBenchmark } from "./RoleBenchmark";

export const RoleBenchmarkWrapper = () => {
  return (
    <TrackProvider>
      <RoleBenchmark />
    </TrackProvider>
  );
};