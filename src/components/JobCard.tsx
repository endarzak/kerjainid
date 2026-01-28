import { MapPin, Clock, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobPosting, SKILL_LABELS } from "@/types";
import { SKILL_ICONS } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: JobPosting;
  className?: string;
}

const DURATION_LABELS = {
  daily: "/hari",
  weekly: "/minggu",
  monthly: "/bulan",
  project: " (proyek)",
};

export function JobCard({ job, className }: JobCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <div
      className={cn(
        "card-elevated p-4 hover:shadow-lg transition-all duration-300 group",
        className
      )}
    >
      <div className="flex gap-4">
        {/* Company Logo */}
        <div className="shrink-0">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
            {job.employerLogo ? (
              <img
                src={job.employerLogo}
                alt={job.employerName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-muted-foreground">{job.employerName}</p>
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "shrink-0 text-xs",
                job.status === "open"
                  ? "bg-kerjain-green-50 text-secondary border-0"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {job.status === "open" ? "Buka" : "Tutup"}
            </Badge>
          </div>

          {/* Location & Category */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span>{job.location}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {SKILL_ICONS[job.skillCategory]} {SKILL_LABELS[job.skillCategory]}
            </Badge>
          </div>

          {/* Budget */}
          <div className="mt-3">
            <span className="text-lg font-bold text-primary">
              {formatCurrency(job.budgetMin)} - {formatCurrency(job.budgetMax)}
            </span>
            <span className="text-sm text-muted-foreground">
              {DURATION_LABELS[job.durationType]}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDate(job.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{job.applicationsCount} pelamar</span>
          </div>
        </div>
        <Button size="sm" asChild>
          <Link to={`/lowongan/${job.id}`}>Lamar</Link>
        </Button>
      </div>
    </div>
  );
}
