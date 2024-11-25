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
import SkillProfileDetail from "./pages/SkillProfileDetail";
import MarketData from "./pages/MarketData";
import TalentMarketplace from "./pages/TalentMarketplace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ToggledSkillsProvider>
        <BrowserRouter>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skills" element={<SkillsProfile />} />
            <Route path="/skills/:id" element={<SkillProfileDetail />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employee/:id" element={<EmployeeProfile />} />
            <Route path="/market" element={<MarketData />} />
            <Route path="/marketplace" element={<TalentMarketplace />} />
          </Routes>
        </BrowserRouter>
      </ToggledSkillsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;