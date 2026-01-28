import { Star, MapPin, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Worker, SKILL_LABELS } from "@/types";
import { SKILL_ICONS } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
  worker: Worker;
  className?: string;
}

export function WorkerCard({ worker, className }: WorkerCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
      className={cn(
        "card-elevated p-4 hover:shadow-lg transition-all duration-300 group",
        className
      )}
    >
      <div className="flex gap-4">
        {/* Profile Photo */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted">
            {worker.profilePhoto ? (
              <img
                src={worker.profilePhoto}
                alt={worker.fullName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
                {worker.fullName.charAt(0)}
              </div>
            )}
          </div>
          {worker.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground rounded-full p-0.5">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">
                {worker.fullName}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{worker.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-kerjain-orange-50 text-accent px-2 py-1 rounded-lg shrink-0">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-semibold text-sm">{worker.averageRating}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {worker.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs font-medium bg-kerjain-blue-50 text-primary border-0">
                {SKILL_ICONS[skill]} {SKILL_LABELS[skill]}
              </Badge>
            ))}
            {worker.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{worker.skills.length - 3}
              </Badge>
            )}
          </div>

          {/* Stats & Rate */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{worker.totalJobsCompleted} proyek</span>
              <span>•</span>
              <span>{worker.yearsExperience} tahun</span>
            </div>
            {worker.ratePerDay && (
              <div className="text-right">
                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(worker.ratePerDay)}
                </span>
                <span className="text-xs text-muted-foreground">/hari</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Availability & CTA */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              worker.isAvailable ? "bg-secondary" : "bg-muted-foreground"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {worker.isAvailable ? "Tersedia" : "Tidak Tersedia"}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/pekerja/${worker.id}`}>Lihat Profil</Link>
          </Button>
          <Button variant="whatsapp" size="sm" asChild>
            <Link to={`/pekerja/${worker.id}`}>Hubungi</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
