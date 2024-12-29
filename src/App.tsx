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
import CreateProject from "./pages/CreateProject";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  console.log('App component rendering with new QueryClient instance');

  return (
    <QueryClientProvider client={queryClient}>
      <ToggledSkillsProvider>
        <TooltipProvider>
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
              <Route path="/create-project" element={<CreateProject />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ToggledSkillsProvider>
    </QueryClientProvider>
  );
};

export default App;