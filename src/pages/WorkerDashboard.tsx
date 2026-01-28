import { Link } from "react-router-dom";
import {
  Briefcase,
  Star,
  Eye,
  TrendingUp,
  Bell,
  Settings,
  FileText,
  Camera,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const WorkerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil Keluar",
      description: "Sampai jumpa kembali!",
    });
    navigate("/");
  };

  const stats = [
    { icon: Eye, label: "Profil Dilihat", value: "128", change: "+12%" },
    { icon: Briefcase, label: "Lamaran Terkirim", value: "8", change: "+3" },
    { icon: Star, label: "Rating", value: "4.8", change: "" },
    { icon: TrendingUp, label: "Posisi di Pencarian", value: "#15", change: "+5" },
  ];

  const recentActivities = [
    {
      type: "view",
      title: "PT Konstruksi Jaya melihat profil Anda",
      time: "2 jam lalu",
    },
    {
      type: "apply",
      title: "Lamaran Anda dikirim ke CV Maju Bersama",
      time: "1 hari lalu",
    },
    {
      type: "message",
      title: "Pesan baru dari Rumah Pak Darmawan",
      time: "2 hari lalu",
    },
  ];

  const quickActions = [
    {
      icon: Camera,
      label: "Update Portfolio",
      description: "Tambah foto/video hasil kerja",
      href: "/dashboard/worker/portfolio",
    },
    {
      icon: FileText,
      label: "Edit Profil",
      description: "Perbarui informasi diri",
      href: "/dashboard/worker/profil",
    },
    {
      icon: Briefcase,
      label: "Cari Lowongan",
      description: "Temukan pekerjaan baru",
      href: "/lowongan",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      description: "Atur notifikasi & privasi",
      href: "/dashboard/worker/pengaturan",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Selamat Datang, {user?.fullName?.split(" ")[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-1">
                Berikut ringkasan aktivitas akun Anda
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>

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
                  {stat.change && (
                    <span className="text-xs text-secondary font-medium">
                      {stat.change}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Aksi Cepat
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="card-elevated p-4 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <action.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {action.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Aktivitas Terbaru
                </h2>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="card-elevated divide-y divide-border">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="p-4">
                    <p className="text-sm text-foreground">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
            <h3 className="font-semibold text-foreground mb-2">
              💡 Tips Meningkatkan Profil
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Tambahkan foto hasil kerja terbaik Anda ke portfolio</li>
              <li>• Lengkapi deskripsi pengalaman kerja dengan detail</li>
              <li>• Minta review dari klien sebelumnya untuk meningkatkan rating</li>
              <li>• Update ketersediaan Anda secara rutin</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default WorkerDashboard;
