interface BenchmarkLevelsProps {
  selectedLevel: string;
  onLevelSelect: (level: string) => void;
}

export const BenchmarkLevels = ({ selectedLevel, onLevelSelect }: BenchmarkLevelsProps) => {
  const levels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'M3', 'M4', 'M5', 'M6'];

  return (
    <div className="grid grid-cols-2 gap-2">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onLevelSelect(level)}
          className={`p-2 rounded-md text-sm ${
            selectedLevel === level
              ? 'bg-primary text-white'
              : 'bg-background hover:bg-muted'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};