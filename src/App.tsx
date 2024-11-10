import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToggledSkillsProvider } from "./components/skills/context/ToggledSkillsContext";
import Index from "./pages/Index";
import SkillsProfile from "./pages/SkillsProfile";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import VictorProfile from "./pages/VictorProfile";
import JennieProfile from "./pages/JennieProfile";
import SuzProfile from "./pages/SuzProfile";
import SkillProfileDetail from "./pages/SkillProfileDetail";
import MarketData from "./pages/MarketData";
import TalentMarketplace from "./pages/TalentMarketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToggledSkillsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skills" element={<SkillsProfile />} />
            <Route path="/skills/:id" element={<SkillProfileDetail />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee/anna-vyselva-123" element={<EmployeeProfile />} />
            <Route path="/employee/victor-smith-124" element={<VictorProfile />} />
            <Route path="/employee/jennie-richards-125" element={<JennieProfile />} />
            <Route path="/employee/suz-manu-126" element={<SuzProfile />} />
            <Route path="/market" element={<MarketData />} />
            <Route path="/marketplace" element={<TalentMarketplace />} />
          </Routes>
        </BrowserRouter>
      </ToggledSkillsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;