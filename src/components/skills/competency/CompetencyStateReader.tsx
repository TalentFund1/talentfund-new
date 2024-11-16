import { useCompetencyStore } from './CompetencyState';

interface CompetencyStateDisplay {
  skillName: string;
  states: {
    [levelKey: string]: {
      level: string;
      required: string;
    };
  };
}

export const CompetencyStateReader = () => {
  const { currentStates } = useCompetencyStore();
  
  const stateEntries = Object.entries(currentStates).map(([skillName, states]) => ({
    skillName,
    states
  }));

  if (stateEntries.length === 0) {
    return <div className="text-muted-foreground">No saved competency states found.</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Saved Competency States</h3>
      <div className="space-y-4">
        {stateEntries.map((entry) => (
          <div key={entry.skillName} className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{entry.skillName}</h4>
            <div className="space-y-2">
              {Object.entries(entry.states).map(([levelKey, state]) => (
                <div key={levelKey} className="flex items-center gap-4 text-sm">
                  <span className="min-w-[100px] font-medium">Level {levelKey}:</span>
                  <span className="px-2 py-1 bg-primary-accent/10 rounded">
                    {state.level}
                  </span>
                  <span className={`px-2 py-1 rounded ${
                    state.required === 'required' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {state.required}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};