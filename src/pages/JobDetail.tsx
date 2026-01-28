import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Building2,
  CheckCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { SkillBadge } from "@/components/SkillBadge";
import { mockJobs } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const DURATION_LABELS = {
  daily: "Harian",
  weekly: "Mingguan",
  monthly: "Bulanan",
  project: "Proyek",
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Lowongan Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-4">
              Maaf, lowongan yang Anda cari tidak ada atau sudah ditutup.
            </p>
            <Button asChild>
              <Link to="/lowongan">Kembali ke Lowongan</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (user?.role === "employer") {
      toast({
        title: "Akses Terbatas",
        description: "Hanya pekerja yang dapat melamar pekerjaan",
        variant: "destructive",
      });
      return;
    }

    setShowApplyDialog(true);
  };

  const submitApplication = async () => {
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowApplyDialog(false);
    setApplicationMessage("");

    toast({
      title: "Lamaran Terkirim! 🎉",
      description: "Lamaran Anda telah dikirim ke pemberi kerja.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <div className="card-elevated p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  {job.employerLogo && (
                    <img
                      src={job.employerLogo}
                      alt={job.employerName}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          {job.title}
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          <span>{job.employerName}</span>
                        </div>
                      </div>
                      <Badge
                        variant={job.status === "open" ? "secondary" : "outline"}
                        className={
                          job.status === "open"
                            ? "bg-secondary/20 text-secondary"
                            : ""
                        }
                      >
                        {job.status === "open" ? "Dibuka" : "Ditutup"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{DURATION_LABELS[job.durationType]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{job.applicationsCount} pelamar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Kategori
                </h2>
                <SkillBadge skill={job.skillCategory} />
              </div>

              {/* Description */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Deskripsi Pekerjaan
                </h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              {/* Requirements */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Persyaratan
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Apply Card */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-sm text-muted-foreground mb-1">Budget</div>
                  <div className="text-2xl font-bold text-primary">
                    {formatCurrency(job.budgetMin)} - {formatCurrency(job.budgetMax)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    /{DURATION_LABELS[job.durationType].toLowerCase()}
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleApply}
                  disabled={job.status !== "open"}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {job.status === "open" ? "Lamar Sekarang" : "Lowongan Ditutup"}
                </Button>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Detail</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Diposting</span>
                      <span className="font-medium">{formatDate(job.createdAt)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tipe</span>
                      <span className="font-medium">
                        {DURATION_LABELS[job.durationType]}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pelamar</span>
                      <span className="font-medium">{job.applicationsCount} orang</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    Tips: Pastikan profil Anda lengkap dan portfolio terupdate untuk
                    meningkatkan peluang diterima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Auth Required Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Diperlukan</DialogTitle>
            <DialogDescription>
              Anda harus login sebagai pekerja untuk melamar pekerjaan ini.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button asChild>
              <Link to="/masuk">Masuk</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/daftar">Daftar Sebagai Pekerja</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lamar Pekerjaan</DialogTitle>
            <DialogDescription>
              Kirim lamaran Anda untuk posisi "{job.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="message">Pesan untuk Pemberi Kerja (Opsional)</Label>
              <Textarea
                id="message"
                placeholder="Ceritakan mengapa Anda cocok untuk pekerjaan ini..."
                value={applicationMessage}
                onChange={(e) => setApplicationMessage(e.target.value)}
                rows={4}
              />
            </div>
            <Button
              className="w-full"
              onClick={submitApplication}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default JobDetail;
