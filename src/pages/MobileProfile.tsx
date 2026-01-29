import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogIn,
  UserPlus,
  Settings,
  Camera,
  FileText,
  Briefcase,
  LogOut,
  ChevronRight,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const MobileProfile = () => {
  const { isAuthenticated, user, logout } = useAuth();
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

  // Not logged in state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pb-20">
          <div className="container py-6">
            <div className="card-elevated p-6 text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground mb-2">
                Belum Masuk
              </h1>
              <p className="text-muted-foreground mb-6">
                Masuk atau daftar untuk mengakses semua fitur QERDJAIN.ID
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild>
                  <Link to="/masuk">
                    <LogIn className="mr-2 h-4 w-4" />
                    Masuk
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/daftar">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Daftar Sebagai Pekerja
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/daftar-employer">
                    <Building2 className="mr-2 h-4 w-4" />
                    Daftar Sebagai Pemberi Kerja
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/pelatihan"
                className="card-elevated p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">
                    Pelatihan & Sertifikasi
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Worker logged in
  if (user?.role === "worker") {
    const menuItems = [
      {
        icon: Camera,
        label: "Portfolio Saya",
        description: "Kelola foto/video hasil kerja",
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
        icon: GraduationCap,
        label: "Pelatihan & Sertifikasi",
        description: "Tingkatkan kemampuan Anda",
        href: "/pelatihan",
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

        <main className="flex-1 pb-20">
          <div className="container py-6">
            <div className="card-elevated p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-foreground">
                    {user.fullName}
                  </h1>
                  <p className="text-sm text-muted-foreground">Pekerja</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                asChild
              >
                <Link to="/dashboard/worker">
                  Lihat Dashboard
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className="card-elevated p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium text-foreground block">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-6 text-destructive hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Keluar
            </Button>
          </div>
        </main>

        <Footer />
        <BottomNav />
      </div>
    );
  }

  // Employer logged in
  const employerMenuItems = [
    {
      icon: Briefcase,
      label: "Pasang Lowongan",
      description: "Buat lowongan kerja baru",
      href: "/dashboard/employer/lowongan/baru",
    },
    {
      icon: FileText,
      label: "Kelola Lowongan",
      description: "Atur lowongan yang sudah ada",
      href: "/dashboard/employer/lowongan",
    },
    {
      icon: GraduationCap,
      label: "Pelatihan & Sertifikasi",
      description: "Program pelatihan",
      href: "/pelatihan",
    },
    {
      icon: Settings,
      label: "Pengaturan",
      description: "Atur profil perusahaan",
      href: "/dashboard/employer/pengaturan",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20">
        <div className="container py-6">
          <div className="card-elevated p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-foreground">
                  {user?.companyName || user?.fullName}
                </h1>
                <p className="text-sm text-muted-foreground">Pemberi Kerja</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              asChild
            >
              <Link to="/dashboard/employer">
                Lihat Dashboard
              </Link>
            </Button>
          </div>

          <div className="space-y-3">
            {employerMenuItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="card-elevated p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground block">
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Keluar
          </Button>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default MobileProfile;
