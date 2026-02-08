import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  GraduationCap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Globe,
  Tags,
  HelpCircle,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Pekerja", icon: Users, path: "/admin/workers" },
  { label: "Employer", icon: Building2, path: "/admin/employers" },
  { label: "Lowongan", icon: Briefcase, path: "/admin/jobs" },
  { label: "Artikel", icon: FileText, path: "/admin/articles" },
  { label: "Pelatihan", icon: GraduationCap, path: "/admin/trainings" },
];

const contentMenuItems = [
  { label: "Halaman", icon: Globe, path: "/admin/pages" },
  { label: "Kategori Keahlian", icon: Tags, path: "/admin/skills" },
  { label: "FAQ", icon: HelpCircle, path: "/admin/faq" },
];

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/admin" className="flex items-center gap-2">
          <span className={cn(
            "font-bold text-primary transition-all duration-200",
            collapsed ? "text-sm" : "text-lg"
          )}>
            {collapsed ? "Q" : "QERDJAIN.ID"}
          </span>
          {!collapsed && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
              Admin
            </span>
          )}
        </Link>
      </div>

      {/* Main Menu */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className={cn(
          "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
          collapsed && "text-center"
        )}>
          {collapsed ? "•" : "Menu Utama"}
        </p>
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
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

        {/* Content Management */}
        <div className="mt-6">
          <p className={cn(
            "text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider",
            collapsed && "text-center"
          )}>
            {collapsed ? "•" : "Konten"}
          </p>
          <nav className="space-y-1">
            {contentMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
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
        </div>

        {/* Settings */}
        <div className="mt-6">
          <Link
            to="/admin/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
              isActive("/admin/settings")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Pengaturan" : undefined}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Pengaturan</span>}
          </Link>
        </div>
      </div>

      {/* Collapse Button */}
      <div className="p-4 border-t border-border hidden lg:block">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-card border-r border-border transition-all duration-200 sticky top-0 h-screen",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform lg:hidden flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-card border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="font-bold text-xl text-foreground">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Lihat Website</Link>
              </Button>
              <Button variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
