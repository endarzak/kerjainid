import { Link } from "react-router-dom";
import {
  GraduationCap,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

interface TrainingProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  participants: number;
  rating: number;
  image: string;
  instructor: string;
  isCertified: boolean;
  price: number;
  level: "Pemula" | "Menengah" | "Lanjutan";
}

const trainingPrograms: TrainingProgram[] = [
  {
    id: "1",
    title: "Sertifikasi Welder BNSP",
    category: "Konstruksi",
    description: "Pelatihan dan sertifikasi las dasar hingga mahir sesuai standar BNSP untuk industri konstruksi.",
    duration: "5 hari",
    participants: 1250,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    instructor: "Ir. Ahmad Supriadi",
    isCertified: true,
    price: 2500000,
    level: "Menengah",
  },
  {
    id: "2",
    title: "Teknisi Listrik Bersertifikat",
    category: "Teknik",
    description: "Pelajari instalasi listrik rumah tangga dan industri dengan standar keamanan yang benar.",
    duration: "7 hari",
    participants: 980,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
    instructor: "Budi Santoso, S.T.",
    isCertified: true,
    price: 3000000,
    level: "Pemula",
  },
  {
    id: "3",
    title: "Driver Profesional & Defensive Driving",
    category: "Transportasi",
    description: "Teknik mengemudi aman dan profesional untuk driver komersial dan pribadi.",
    duration: "3 hari",
    participants: 2100,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400",
    instructor: "Drs. Hendra Wijaya",
    isCertified: true,
    price: 1500000,
    level: "Pemula",
  },
  {
    id: "4",
    title: "Teknisi AC & Refrigerasi",
    category: "Teknik",
    description: "Pelatihan lengkap instalasi, perawatan, dan perbaikan AC serta sistem pendingin.",
    duration: "5 hari",
    participants: 750,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    instructor: "Agus Setiawan",
    isCertified: true,
    price: 2000000,
    level: "Menengah",
  },
  {
    id: "5",
    title: "Operator Forklift Bersertifikat",
    category: "Logistik",
    description: "Pelatihan dan sertifikasi operator forklift sesuai standar K3 untuk gudang dan pabrik.",
    duration: "4 hari",
    participants: 890,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    instructor: "Ridwan Kamil",
    isCertified: true,
    price: 1800000,
    level: "Pemula",
  },
  {
    id: "6",
    title: "Plumber & Instalasi Pipa",
    category: "Konstruksi",
    description: "Teknik instalasi dan perbaikan sistem perpipaan untuk bangunan rumah tangga dan komersial.",
    duration: "4 hari",
    participants: 620,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400",
    instructor: "Pak Darman",
    isCertified: true,
    price: 1500000,
    level: "Pemula",
  },
];

const categories = ["Semua", "Konstruksi", "Teknik", "Transportasi", "Logistik"];

const Training = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="bg-primary/5 border-b border-border">
          <div className="container py-12 md:py-16">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                <GraduationCap className="mr-1 h-3 w-3" />
                Pelatihan & Sertifikasi
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Tingkatkan Keahlian Anda dengan Sertifikasi Resmi
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Ikuti program pelatihan profesional dan dapatkan sertifikat yang diakui industri untuk meningkatkan peluang karir Anda.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4 text-secondary" />
                  <span>Sertifikat Resmi</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-secondary" />
                  <span>Instruktur Berpengalaman</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span>Praktik Langsung</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Program Pelatihan</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">15,000+</div>
                <div className="text-sm text-muted-foreground">Alumni Tersertifikasi</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Tingkat Kelulusan</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Rating Rata-rata</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-border sticky top-16 bg-background z-40">
          <div className="container">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Semua" ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="py-8">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainingPrograms.map((program) => (
                <Link
                  key={program.id}
                  to={`/pelatihan/${program.id}`}
                  className="card-elevated overflow-hidden group"
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/90">
                        {program.category}
                      </Badge>
                      {program.isCertified && (
                        <Badge className="bg-secondary text-secondary-foreground">
                          <Award className="mr-1 h-3 w-3" />
                          Bersertifikat
                        </Badge>
                      )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-6 w-6 text-primary ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {program.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="font-medium">{program.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {program.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        <span>{program.participants.toLocaleString()} peserta</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(program.price)}
                        </span>
                      </div>
                      <Button size="sm">
                        Lihat Detail
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-primary">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Butuh Pelatihan Khusus untuk Tim Anda?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Kami menyediakan program pelatihan in-house yang dapat disesuaikan dengan kebutuhan perusahaan Anda.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <Link to="/contact-sales">
                Hubungi Tim Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Training;
