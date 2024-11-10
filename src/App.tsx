import { SkillsSearchProvider } from "./contexts/SkillsSearchContext";
import { SkillsMatrix } from "./components/benchmark/SkillsMatrix";
import { SkillsSummary } from "./components/skills/SkillsSummary";

function App() {
  return (
    <SkillsSearchProvider>
      <div className="App">
        <SkillsSummary />
        <SkillsMatrix />
      </div>
    </SkillsSearchProvider>
  );
}

export default App;
