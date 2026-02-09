import { Check, Clock, FileText, UserCheck, Send, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type HiringStage = "applied" | "reviewed" | "interview" | "offered" | "accepted" | "rejected";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  currentStage: HiringStage;
  appliedDate: string;
  lastUpdate: string;
}

const STAGES: { key: HiringStage; label: string; icon: React.ElementType }[] = [
  { key: "applied", label: "Melamar", icon: Send },
  { key: "reviewed", label: "Ditinjau", icon: FileText },
  { key: "interview", label: "Interview", icon: UserCheck },
  { key: "offered", label: "Ditawari", icon: CircleDot },
  { key: "accepted", label: "Diterima", icon: Check },
];

const STAGE_INDEX: Record<HiringStage, number> = {
  applied: 0,
  reviewed: 1,
  interview: 2,
  offered: 3,
  accepted: 4,
  rejected: -1,
};

const mockApplications: Application[] = [
  {
    id: "a1",
    jobTitle: "Tukang Las Senior",
    company: "PT Konstruksi Jaya",
    currentStage: "interview",
    appliedDate: "3 hari lalu",
    lastUpdate: "1 jam lalu",
  },
  {
    id: "a2",
    jobTitle: "Welder Pipa Baja",
    company: "CV Maju Bersama",
    currentStage: "reviewed",
    appliedDate: "5 hari lalu",
    lastUpdate: "2 hari lalu",
  },
  {
    id: "a3",
    jobTitle: "Tukang Las Konstruksi",
    company: "PT Baja Mandiri",
    currentStage: "accepted",
    appliedDate: "2 minggu lalu",
    lastUpdate: "3 hari lalu",
  },
  {
    id: "a4",
    jobTitle: "Helper Las",
    company: "UD Logam Jaya",
    currentStage: "rejected",
    appliedDate: "1 minggu lalu",
    lastUpdate: "4 hari lalu",
  },
];

function StageIndicator({ stage, currentStage }: { stage: typeof STAGES[number]; currentStageIndex: number; index: number; currentStage: HiringStage }) {
  const idx = STAGES.indexOf(stage);
  const currentIdx = STAGE_INDEX[currentStage];
  const isRejected = currentStage === "rejected";
  const isCompleted = !isRejected && currentIdx >= 0 && idx < currentIdx;
  const isCurrent = !isRejected && idx === currentIdx;
  const Icon = stage.icon;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors",
          isCompleted && "bg-primary text-primary-foreground",
          isCurrent && "bg-primary/20 text-primary ring-2 ring-primary",
          !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
        )}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </div>
      <span className={cn(
        "text-[10px] leading-tight text-center max-w-[50px]",
        (isCompleted || isCurrent) ? "text-foreground font-medium" : "text-muted-foreground"
      )}>
        {stage.label}
      </span>
    </div>
  );
}

export function HiringProgress() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Progress Lamaran
        </h2>
        <Badge variant="secondary" className="text-xs">
          {mockApplications.length} lamaran aktif
        </Badge>
      </div>
      <div className="space-y-4">
        {mockApplications.map((app) => {
          const currentIdx = STAGE_INDEX[app.currentStage];
          const isRejected = app.currentStage === "rejected";

          return (
            <div key={app.id} className="card-elevated p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{app.jobTitle}</h3>
                  <p className="text-xs text-muted-foreground">{app.company}</p>
                </div>
                {isRejected ? (
                  <Badge variant="destructive" className="text-xs">Ditolak</Badge>
                ) : app.currentStage === "accepted" ? (
                  <Badge className="text-xs bg-primary text-primary-foreground">Diterima</Badge>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{app.lastUpdate}</span>
                  </div>
                )}
              </div>

              {/* Progress Steps */}
              {!isRejected && (
                <div className="flex items-start justify-between relative">
                  {/* Connecting line */}
                  <div className="absolute top-4 left-4 right-4 h-[2px] bg-muted z-0" />
                  <div
                    className="absolute top-4 left-4 h-[2px] bg-primary z-0 transition-all"
                    style={{ width: `${Math.max(0, (currentIdx / (STAGES.length - 1)) * (100 - (100 / STAGES.length))) }%` }}
                  />
                  {STAGES.map((stage, index) => (
                    <div key={stage.key} className="relative z-10">
                      <StageIndicator
                        stage={stage}
                        currentStageIndex={currentIdx}
                        index={index}
                        currentStage={app.currentStage}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                <span>Dilamar: {app.appliedDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
