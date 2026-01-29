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
import ContactSales from "./pages/ContactSales";
import MobileProfile from "./pages/MobileProfile";
import Training from "./pages/Training";
import TrainingDetail from "./pages/TrainingDetail";
import NotFound from "./pages/NotFound";

// Employer pages
import CreateJob from "./pages/employer/CreateJob";
import ManageJobs from "./pages/employer/ManageJobs";
import EmployerJobDetail from "./pages/employer/EmployerJobDetail";
import EmployerSettings from "./pages/employer/EmployerSettings";

// Worker pages
import WorkerPortfolio from "./pages/worker/WorkerPortfolio";
import WorkerProfile from "./pages/worker/WorkerProfile";
import WorkerSettings from "./pages/worker/WorkerSettings";

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
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact-sales" element={<ContactSales />} />
            <Route path="/profil" element={<MobileProfile />} />
            <Route path="/pelatihan" element={<Training />} />
            <Route path="/pelatihan/:id" element={<TrainingDetail />} />
            
            {/* Worker Dashboard Routes */}
            <Route path="/dashboard/worker" element={<WorkerDashboard />} />
            <Route path="/dashboard/worker/portfolio" element={<WorkerPortfolio />} />
            <Route path="/dashboard/worker/profil" element={<WorkerProfile />} />
            <Route path="/dashboard/worker/pengaturan" element={<WorkerSettings />} />
            
            {/* Employer Dashboard Routes */}
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/dashboard/employer/lowongan/baru" element={<CreateJob />} />
            <Route path="/dashboard/employer/lowongan" element={<ManageJobs />} />
            <Route path="/dashboard/employer/lowongan/:id" element={<EmployerJobDetail />} />
            <Route path="/dashboard/employer/pengaturan" element={<EmployerSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
