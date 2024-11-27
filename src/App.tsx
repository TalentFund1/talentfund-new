import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import EmployeeProfile from "./pages/EmployeeProfile";
import Employees from "./pages/Employees";
import SkillsProfile from "./pages/SkillsProfile";
import SkillProfileDetail from "./pages/SkillProfileDetail";
import MarketData from "./pages/MarketData";
import TalentMarketplace from "./pages/TalentMarketplace";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/skills" element={<SkillsProfile />} />
        <Route path="/skills/:id" element={<SkillProfileDetail />} />
        <Route path="/market" element={<MarketData />} />
        <Route path="/talent" element={<TalentMarketplace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;