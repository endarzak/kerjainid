import { Link, useLocation } from "react-router-dom";
import { Home, Search, Briefcase, User, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/", icon: Home, label: "Beranda" },
  { href: "/cari-pekerja", icon: Search, label: "Cari" },
  { href: "/lowongan", icon: Briefcase, label: "Lowongan" },
  { href: "/pelatihan", icon: GraduationCap, label: "Pelatihan" },
];

export function BottomNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const getProfileLink = () => {
    if (!isAuthenticated) {
      return "/profil";
    }
    return user?.role === "employer" ? "/dashboard/employer" : "/dashboard/worker";
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 min-w-[50px] rounded-lg transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Link
          to={getProfileLink()}
          className={cn(
            "flex flex-col items-center gap-1 px-3 py-2 min-w-[50px] rounded-lg transition-colors",
            location.pathname.includes("/profil") || location.pathname.includes("/dashboard")
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <User
            className={cn(
              "h-5 w-5 transition-transform",
              (location.pathname.includes("/profil") || location.pathname.includes("/dashboard")) && "scale-110"
            )}
          />
          <span className="text-[10px] font-medium">Profil</span>
        </Link>
      </div>
    </nav>
  );
}
