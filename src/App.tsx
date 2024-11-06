import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import Index from "./pages/Index";
import SkillsProfile from "./pages/SkillsProfile";
import Employees from "./pages/Employees";
import EmployeeProfile from "./pages/EmployeeProfile";
import SkillProfileDetail from "./pages/SkillProfileDetail";
import MarketData from "./pages/MarketData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <Header />
          <main className="ml-16 pt-16 p-6">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/skills" element={<SkillsProfile />} />
              <Route path="/skills/:id" element={<SkillProfileDetail />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee-profile" element={<EmployeeProfile />} />
              <Route path="/market" element={<MarketData />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;