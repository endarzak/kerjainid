import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SearchWorkers from "./pages/SearchWorkers";
import Jobs from "./pages/Jobs";
import Register from "./pages/Register";
import RegisterEmployer from "./pages/RegisterEmployer";
import Login from "./pages/Login";
import WorkerDetail from "./pages/WorkerDetail";
import JobDetail from "./pages/JobDetail";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cari-pekerja" element={<SearchWorkers />} />
            <Route path="/lowongan" element={<Jobs />} />
            <Route path="/pekerja/:id" element={<WorkerDetail />} />
            <Route path="/lowongan/:id" element={<JobDetail />} />
            <Route path="/daftar" element={<Register />} />
            <Route path="/daftar-employer" element={<RegisterEmployer />} />
            <Route path="/masuk" element={<Login />} />
            <Route path="/dashboard/worker" element={<WorkerDashboard />} />
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/pricing" element={<Pricing />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
