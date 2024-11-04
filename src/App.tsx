import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SkillsProfile from "./pages/SkillsProfile";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import BenchmarkAnalysis from "./pages/BenchmarkAnalysis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/skills" element={<SkillsProfile />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employee-profile" element={<EmployeeProfile />} />
          <Route path="/benchmark-analysis" element={<BenchmarkAnalysis />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;