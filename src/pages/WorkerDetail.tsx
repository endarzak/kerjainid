import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  MapPin,
  CheckCircle,
  Briefcase,
  Clock,
  MessageCircle,
  Bookmark,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { SkillBadge } from "@/components/SkillBadge";
import { mockWorkers } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Review {
  id: string;
  reviewerName: string;
  reviewerCompany: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "r1",
    reviewerName: "Pak Darmawan",
    reviewerCompany: "CV Maju Bersama",
    rating: 5,
    comment: "Pekerjaannya sangat rapih dan tepat waktu. Recommended!",
    date: "2 minggu lalu",
  },
  {
    id: "r2",
    reviewerName: "Ibu Siti",
    reviewerCompany: "Rumah Pribadi",
    rating: 5,
    comment: "Hasil las-nya kuat dan tahan lama. Harga juga sesuai.",
    date: "1 bulan lalu",
  },
  {
    id: "r3",
    reviewerName: "Bpk. Ahmad Hidayat",
    reviewerCompany: "PT Konstruksi Jaya",
    rating: 4,
    comment: "Kerja bagus, komunikatif, dan profesional.",
    date: "2 bulan lalu",
  },
  {
    id: "r4",
    reviewerName: "Hendra Wijaya",
    reviewerCompany: "Toko Bangunan Makmur",
    rating: 5,
    comment: "Sudah 3x pakai jasanya, selalu puas dengan hasilnya.",
    date: "3 bulan lalu",
  },
];

const WorkerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const worker = mockWorkers.find((w) => w.id === id);

  if (!worker) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Pekerja Tidak Ditemukan
            </h1>
            <p className="text-muted-foreground mb-4">
              Maaf, pekerja yang Anda cari tidak ada.
            </p>
            <Button asChild>
              <Link to="/cari-pekerja">Kembali ke Pencarian</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleContact = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (user?.role === "worker") {
      toast({
        title: "Akses Terbatas",
        description: "Hanya employer yang dapat merekrut pekerja",
        variant: "destructive",
      });
      return;
    }

    // Open WhatsApp
    const message = encodeURIComponent(
      `Halo ${worker.fullName}, saya tertarik untuk merekrut Anda melalui QERDJAIN.ID. Apakah Anda tersedia untuk pekerjaan?`
    );
    window.open(`https://wa.me/${worker.phone.replace("+", "")}?text=${message}`, "_blank");
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }

    if (user?.role === "worker") {
      toast({
        title: "Akses Terbatas",
        description: "Hanya employer yang dapat menyimpan pekerja",
        variant: "destructive",
      });
      return;
    }

    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Dihapus dari Tersimpan" : "Pekerja Disimpan",
      description: isSaved 
        ? "Pekerja telah dihapus dari daftar tersimpan" 
        : "Pekerja telah ditambahkan ke daftar tersimpan",
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

  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 3);

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
            {/* Left Column - Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="card-elevated p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={worker.profilePhoto || "/placeholder.svg"}
                      alt={worker.fullName}
                      className="w-32 h-32 rounded-2xl object-cover"
                    />
                    {worker.isVerified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">
                          {worker.fullName}
                        </h1>
                        <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{worker.location}</span>
                        </div>
                      </div>
                      {worker.isAvailable ? (
                        <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                          Tersedia
                        </Badge>
                      ) : (
                        <Badge variant="outline">Tidak Tersedia</Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 text-accent fill-accent" />
                        <span className="font-semibold">{worker.averageRating}</span>
                        <span className="text-muted-foreground">
                          ({worker.totalReviews} review)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{worker.totalJobsCompleted} pekerjaan selesai</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground mt-2">
                      <Clock className="h-4 w-4" />
                      <span>{worker.yearsExperience} tahun pengalaman</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">Tentang</h2>
                <p className="text-muted-foreground leading-relaxed">{worker.bio}</p>
              </div>

              {/* Skills */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Keahlian</h2>
                <div className="flex flex-wrap gap-2">
                  {worker.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} />
                  ))}
                </div>
              </div>

              {/* Portfolio Videos */}
              {worker.portfolioItems.length > 0 && (
                <div className="card-elevated p-6">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Video</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {worker.portfolioItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="relative group cursor-pointer"
                        onClick={() => setSelectedVideo(item.mediaUrl)}
                      >
                        <div className="aspect-video bg-black rounded-xl overflow-hidden">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors rounded-xl flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                            <Play className="h-5 w-5 text-primary ml-0.5" />
                          </div>
                        </div>
                        <p className="absolute bottom-2 left-2 right-2 text-white text-xs truncate">
                          {item.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Ulasan ({mockReviews.length})
                  </h2>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-accent fill-accent" />
                    <span className="font-semibold">{worker.averageRating}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {displayedReviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary text-sm">
                              {review.reviewerName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{review.reviewerName}</p>
                            <p className="text-xs text-muted-foreground">{review.reviewerCompany}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>

                {mockReviews.length > 3 && (
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? (
                      <>
                        Tampilkan Lebih Sedikit
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Lihat Semua Ulasan ({mockReviews.length})
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column - Contact Card */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6 sticky top-24">
                <div className="text-center mb-6">
                  {worker.ratePerDay && (
                    <div>
                      <span className="text-3xl font-bold text-primary">
                        {formatCurrency(worker.ratePerDay)}
                      </span>
                      <span className="text-muted-foreground">/hari</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    className="w-full"
                    onClick={handleContact}
                    disabled={!worker.isAvailable}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {worker.isAvailable ? "Rekrut via WhatsApp" : "Tidak Tersedia"}
                  </Button>

                  <Button
                    variant={isSaved ? "default" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={handleSave}
                  >
                    <Bookmark className={`mr-2 h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Tersimpan" : "Simpan Pekerja"}
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-3">Informasi</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <span className="font-medium flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        {worker.averageRating}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pekerjaan Selesai</span>
                      <span className="font-medium">{worker.totalJobsCompleted}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Pengalaman</span>
                      <span className="font-medium">{worker.yearsExperience} tahun</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Status Verifikasi</span>
                      <span className="font-medium">
                        {worker.isVerified ? (
                          <span className="text-secondary">Terverifikasi</span>
                        ) : (
                          <span className="text-muted-foreground">Belum</span>
                        )}
                      </span>
                    </li>
                  </ul>
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
              Anda harus login sebagai employer untuk merekrut atau menyimpan pekerja ini.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button asChild>
              <Link to="/masuk">Masuk</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/daftar-employer">Daftar Sebagai Employer</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Player Dialog */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="p-4">
            {selectedVideo && (
              <video
                src={selectedVideo}
                className="w-full aspect-video rounded-lg bg-black"
                controls
                autoPlay
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default WorkerDetail;
