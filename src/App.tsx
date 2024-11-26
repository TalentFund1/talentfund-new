import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AppRoutes } from "./AppRoutes";
import { ToggledSkillsProvider } from "./components/skills/context/ToggledSkillsContext";
import "./App.css";

function App() {
  return (
    <Router>
      <ToggledSkillsProvider>
        <AppRoutes />
        <Toaster />
      </ToggledSkillsProvider>
    </Router>
  );
}

export default App;