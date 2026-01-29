import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  Calendar,
  MapPin,
  Play,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const trainingData = {
  "1": {
    id: "1",
    title: "Sertifikasi Welder BNSP",
    category: "Konstruksi",
    description: "Pelatihan dan sertifikasi las dasar hingga mahir sesuai standar BNSP untuk industri konstruksi.",
    fullDescription: `Program sertifikasi welder ini dirancang untuk memberikan pengetahuan dan keterampilan yang komprehensif dalam teknik pengelasan. Peserta akan mempelajari berbagai metode pengelasan termasuk SMAW, GMAW, dan GTAW.

Program ini diakui oleh BNSP (Badan Nasional Sertifikasi Profesi) dan sertifikat yang diperoleh berlaku secara nasional serta dapat digunakan untuk melamar pekerjaan di perusahaan konstruksi, manufaktur, dan industri lainnya.`,
    duration: "5 hari",
    participants: 1250,
    rating: 4.9,
    totalReviews: 342,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800",
    instructor: "Ir. Ahmad Supriadi",
    instructorBio: "Welder berpengalaman 20+ tahun dengan sertifikasi internasional AWS",
    isCertified: true,
    price: 2500000,
    level: "Menengah",
    location: "Jakarta Selatan",
    nextBatch: "15 Februari 2026",
    curriculum: [
      "Pengenalan jenis-jenis pengelasan",
      "Keselamatan dan Kesehatan Kerja (K3)",
      "Persiapan material dan peralatan",
      "Teknik pengelasan SMAW",
      "Teknik pengelasan GMAW/MIG",
      "Teknik pengelasan GTAW/TIG",
      "Praktik pengelasan posisi 1G, 2G, 3G",
      "Inspeksi hasil pengelasan",
      "Ujian sertifikasi BNSP",
    ],
    benefits: [
      "Sertifikat BNSP yang diakui nasional",
      "Materi pelatihan lengkap",
      "Praktik langsung dengan peralatan modern",
      "Makan siang dan coffee break",
      "Akses ke jaringan alumni",
    ],
    requirements: [
      "Usia minimal 18 tahun",
      "Sehat jasmani dan rohani",
      "Pendidikan minimal SMA/SMK",
      "Memiliki pengetahuan dasar tentang logam",
    ],
  },
};

const reviews = [
  {
    id: "r1",
    name: "Budi Santoso",
    rating: 5,
    comment: "Pelatihan sangat bagus dan lengkap. Instruktur sabar menjelaskan dan banyak praktik langsung.",
    date: "2 minggu lalu",
  },
  {
    id: "r2",
    name: "Ahmad Ridwan",
    rating: 5,
    comment: "Setelah ikut pelatihan ini langsung dapat kerja di proyek besar. Sertifikatnya sangat membantu.",
    date: "1 bulan lalu",
  },
  {
    id: "r3",
    name: "Joko Prasetyo",
    rating: 4,
    comment: "Materi lengkap dan fasilitas bagus. Recommended untuk yang mau jadi welder profesional.",
    date: "1 bulan lalu",
  },
];

const TrainingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);

  const training = trainingData["1"]; // Using mock data

  if (!training) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Pelatihan Tidak Ditemukan
            </h1>
            <Button asChild>
              <Link to="/pelatihan">Kembali ke Daftar Pelatihan</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleEnroll = () => {
    setShowEnrollDialog(true);
  };

  const confirmEnroll = () => {
    toast({
      title: "Pendaftaran Berhasil!",
      description: "Tim kami akan menghubungi Anda untuk konfirmasi pendaftaran.",
    });
    setShowEnrollDialog(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                <img
                  src={training.image}
                  alt={training.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>

              {/* Title & Info */}
              <div className="card-elevated p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{training.category}</Badge>
                  <Badge variant="outline">{training.level}</Badge>
                  {training.isCertified && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      <Award className="mr-1 h-3 w-3" />
                      Bersertifikat BNSP
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {training.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{training.rating}</span>
                    <span>({training.totalReviews} ulasan)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{training.participants.toLocaleString()} peserta</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{training.duration}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Tentang Pelatihan
                </h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {training.fullDescription}
                </p>
              </div>

              {/* Curriculum */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Kurikulum
                </h2>
                <ul className="space-y-3">
                  {training.curriculum.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Yang Akan Anda Dapatkan
                </h2>
                <ul className="space-y-3">
                  {training.benefits.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Persyaratan Peserta
                </h2>
                <ul className="space-y-2">
                  {training.requirements.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reviews */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Ulasan Peserta
                </h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6 sticky top-24">
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold text-primary">
                    {formatCurrency(training.price)}
                  </span>
                </div>

                <Button size="lg" className="w-full mb-4" onClick={handleEnroll}>
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Daftar Sekarang
                </Button>

                <div className="flex gap-2 mb-6">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Brosur
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Bagikan
                  </Button>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Batch Terdekat</p>
                      <p className="text-sm text-muted-foreground">{training.nextBatch}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Lokasi</p>
                      <p className="text-sm text-muted-foreground">{training.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Durasi</p>
                      <p className="text-sm text-muted-foreground">{training.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="font-medium text-foreground mb-2">Instruktur</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{training.instructor}</p>
                      <p className="text-xs text-muted-foreground">{training.instructorBio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enrollment Dialog */}
      <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Pendaftaran</DialogTitle>
            <DialogDescription>
              Anda akan mendaftar untuk program "{training.title}".
              Tim kami akan menghubungi Anda untuk konfirmasi pembayaran dan jadwal.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Biaya Pelatihan</span>
              <span className="font-bold text-foreground">
                {formatCurrency(training.price)}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setShowEnrollDialog(false)}>
              Batal
            </Button>
            <Button className="flex-1" onClick={confirmEnroll}>
              Konfirmasi
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default TrainingDetail;
