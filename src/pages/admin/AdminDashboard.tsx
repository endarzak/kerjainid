import { Link } from "react-router-dom";
import { 
  Users, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Building2, 
  Settings,
  TrendingUp,
  Eye,
  UserPlus,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Pekerja", value: "50,234", icon: Users, change: "+12%", color: "text-blue-500" },
    { label: "Total Employer", value: "1,823", icon: Building2, change: "+8%", color: "text-green-500" },
    { label: "Lowongan Aktif", value: "1,245", icon: Briefcase, change: "+15%", color: "text-orange-500" },
    { label: "Artikel", value: "48", icon: FileText, change: "+5", color: "text-purple-500" },
    { label: "Pelatihan", value: "12", icon: GraduationCap, change: "+2", color: "text-cyan-500" },
    { label: "Kunjungan Hari Ini", value: "3,421", icon: Eye, change: "+23%", color: "text-pink-500" },
  ];

  const menuItems = [
    { label: "Kelola Pekerja", icon: Users, path: "/admin/workers", description: "Lihat, edit, dan verifikasi data pekerja" },
    { label: "Kelola Employer", icon: Building2, path: "/admin/employers", description: "Kelola data perusahaan dan employer" },
    { label: "Kelola Lowongan", icon: Briefcase, path: "/admin/jobs", description: "Moderasi dan kelola lowongan pekerjaan" },
    { label: "Kelola Artikel", icon: FileText, path: "/admin/articles", description: "Tulis, edit, dan publikasikan artikel" },
    { label: "Kelola Pelatihan", icon: GraduationCap, path: "/admin/trainings", description: "Kelola program pelatihan dan sertifikasi" },
    { label: "Pengaturan", icon: Settings, path: "/admin/settings", description: "Konfigurasi sistem dan pengaturan umum" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-bold text-xl text-primary">
              QERDJAIN.ID
            </Link>
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Lihat Website</Link>
            </Button>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground">Selamat datang di Content Management System QERDJAIN.ID</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.label}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Pekerja baru terdaftar", user: "Budi Santoso", time: "5 menit lalu" },
                  { action: "Lowongan baru dipasang", user: "PT Maju Jaya", time: "15 menit lalu" },
                  { action: "Artikel dipublikasikan", user: "Admin", time: "1 jam lalu" },
                  { action: "Pekerja terverifikasi", user: "Ahmad Ridwan", time: "2 jam lalu" },
                  { action: "Employer upgrade Premium", user: "CV Sejahtera", time: "3 jam lalu" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
