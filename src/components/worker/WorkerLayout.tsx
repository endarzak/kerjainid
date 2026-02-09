import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Camera,
  FileText,
  Briefcase,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface WorkerLayoutProps {
  children: React.ReactNode;
  title: string;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard/worker" },
  { label: "Edit Profil", icon: FileText, path: "/dashboard/worker/profil" },
  { label: "Portfolio", icon: Camera, path: "/dashboard/worker/portfolio" },
  { label: "Cari Lowongan", icon: Briefcase, path: "/lowongan" },
  { label: "Pelatihan", icon: GraduationCap, path: "/pelatihan" },
  { label: "Pengaturan", icon: Settings, path: "/dashboard/worker/pengaturan" },
];

const WorkerLayout = ({ children, title }: WorkerLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast({ title: "Berhasil Keluar", description: "Sampai jumpa kembali!" });
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-border">
        <Link to="/dashboard/worker" className="flex items-center gap-2">
          <span className={cn("font-bold text-primary transition-all duration-200", collapsed ? "text-sm" : "text-lg")}>
            {collapsed ? "Q" : "QERDJAIN.ID"}
          </span>
          {!collapsed && (
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded">Pekerja</span>
          )}
        </Link>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {!collapsed && (
          <div className="mb-4 px-3">
            <p className="font-medium text-foreground text-sm truncate">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground">Pencari Kerja</p>
          </div>
        )}

        <p className={cn("text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider", collapsed && "text-center")}>
          {collapsed ? "•" : "Menu"}
        </p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Keluar</span>}
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-border hidden lg:block">
        <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="w-full justify-center">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <aside className={cn("hidden lg:flex flex-col bg-card border-r border-border transition-all duration-200 sticky top-0 h-screen", collapsed ? "w-16" : "w-64")}>
        <SidebarContent />
      </aside>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <aside className={cn("fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:hidden flex flex-col", mobileMenuOpen ? "translate-x-0" : "-translate-x-full")}>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="font-bold text-xl text-foreground">{title}</h1>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/"><Home className="mr-2 h-4 w-4" />Beranda</Link>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default WorkerLayout;
