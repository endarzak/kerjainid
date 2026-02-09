import { Link } from "react-router-dom";
import {
  Users,
  Briefcase,
  FileText,
  PlusCircle,
  Search,
  Settings,
  Crown,
  Eye,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import EmployerLayout from "@/components/employer/EmployerLayout";

const EmployerDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { icon: Briefcase, label: "Lowongan Aktif", value: "3", change: "" },
    { icon: Users, label: "Total Pelamar", value: "47", change: "+12" },
    { icon: Eye, label: "Profil Dilihat", value: "89", change: "+23%" },
    { icon: MessageSquare, label: "Pesan Baru", value: "5", change: "" },
  ];

  const activeJobs = [
    { id: "1", title: "Dicari Welder untuk Proyek Gedung", applicants: 12, status: "open", createdAt: "20 Jan 2024" },
    { id: "2", title: "Driver Truck untuk Antar Barang", applicants: 8, status: "open", createdAt: "22 Jan 2024" },
    { id: "3", title: "Teknisi AC untuk Maintenance", applicants: 7, status: "open", createdAt: "21 Jan 2024" },
  ];

  const quickActions = [
    { icon: PlusCircle, label: "Pasang Lowongan", description: "Buat lowongan pekerjaan baru", href: "/dashboard/employer/lowongan/baru", primary: true },
    { icon: Search, label: "Cari Pekerja", description: "Telusuri database pekerja", href: "/cari-pekerja" },
    { icon: FileText, label: "Kelola Lowongan", description: "Lihat & edit lowongan Anda", href: "/dashboard/employer/lowongan" },
    { icon: Settings, label: "Pengaturan", description: "Atur profil perusahaan", href: "/dashboard/employer/pengaturan" },
  ];

  return (
    <EmployerLayout title="Dashboard Employer">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card-elevated p-4 md:p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              {stat.change && <span className="text-xs text-secondary font-medium">{stat.change}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href} className={`card-elevated p-4 hover:shadow-lg transition-all group ${action.primary ? "border-2 border-primary" : ""}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${action.primary ? "bg-primary text-primary-foreground" : "bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground"}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.label}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">Lowongan Aktif</h2>
          <div className="card-elevated divide-y divide-border">
            {activeJobs.map((job) => (
              <div key={job.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.applicants} pelamar • {job.createdAt}</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/dashboard/employer/lowongan/${job.id}`}>Lihat</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card-elevated p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 mb-6">
            <Crown className="h-8 w-8 text-accent mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Upgrade ke Premium</h3>
            <p className="text-sm text-muted-foreground mb-4">Akses fitur pencarian unlimited, prioritas listing, dan badge premium.</p>
            <Button className="w-full" variant="default" asChild>
              <Link to="/pricing">Lihat Paket</Link>
            </Button>
          </div>

          <div className="card-elevated">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Pelamar Terbaru</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "Budi Santoso", job: "Welder", time: "2 jam lalu" },
                { name: "Ahmad Ridwan", job: "Driver", time: "5 jam lalu" },
                { name: "Joko Prasetyo", job: "Teknisi AC", time: "1 hari lalu" },
              ].map((applicant, index) => (
                <div key={index} className="p-4">
                  <p className="font-medium text-foreground text-sm">{applicant.name}</p>
                  <p className="text-xs text-muted-foreground">Melamar: {applicant.job} • {applicant.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </EmployerLayout>
  );
};

export default EmployerDashboard;
