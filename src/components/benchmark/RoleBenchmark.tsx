import { useParams } from "react-router-dom";
import { RoleBenchmarkMatrix } from "./RoleBenchmarkMatrix";

export const RoleBenchmark = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="space-y-8">
      <RoleBenchmarkMatrix id={id || ""} />
      {/* Additional components or content can be added here */}
    </div>
  );
};
