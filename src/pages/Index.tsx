import { Link } from "react-router-dom";
import { ArrowRight, Search, Users, Star, Briefcase, CheckCircle, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { WorkerCard } from "@/components/WorkerCard";
import { JobCard } from "@/components/JobCard";
import { StatsCard } from "@/components/StatsCard";
import { SkillBadge } from "@/components/SkillBadge";
import { mockWorkers, mockJobs } from "@/data/mockData";
import { SkillCategory, SKILL_LABELS } from "@/types";
import heroImage from "@/assets/hero-workers.jpg";

const popularSkills: SkillCategory[] = [
  "welder",
  "electrician",
  "driver-car",
  "plumber",
  "ac-technician",
  "carpenter",
  "cleaning-service",
  "driver-truck",
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Pekerja Terverifikasi",
    description: "Semua pekerja melalui proses verifikasi skill dan identitas",
  },
  {
    icon: Star,
    title: "Rating Transparan",
    description: "Sistem rating dua arah untuk membangun kepercayaan",
  },
  {
    icon: Clock,
    title: "Proses Cepat",
    description: "Temukan pekerja yang tepat dalam hitungan menit",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Data dilindungi dan transaksi dijamin aman",
  },
];

const Index = () => {
  const cmsHeroImage = (() => {
    try {
      const stored = localStorage.getItem("cms_pages");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.homepage?.heroImage) return data.homepage.heroImage;
      }
    } catch {}
    return null;
  })();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden hero-gradient">
          <div className="container py-12 md:py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left animate-fade-in">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="animate-pulse-soft">🚀</span>
                  <span>Platform #1 untuk Blue-Collar Workers</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  Temukan{" "}
                  <span className="text-gradient">Pekerja Terampil</span>{" "}
                  atau{" "}
                  <span className="text-gradient">Pekerjaan Impian</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  QERDJAIN.ID menghubungkan pekerja skilled dengan pemberi kerja terpercaya.
                  Verifikasi skill, rating transparan, dan proses hiring 70% lebih cepat.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/cari-pekerja">
                      <Search className="mr-2 h-5 w-5" />
                      Cari Pekerja
                    </Link>
                  </Button>
                  <Button variant="hero-outline" size="xl" asChild>
                    <Link to="/lowongan">
                      <Briefcase className="mr-2 h-5 w-5" />
                      Lihat Lowongan
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>50rb+ Pekerja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-secondary" />
                    <span>1000+ Lowongan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>4.8 Rating</span>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative animate-slide-up hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                  <img
                    src={cmsHeroImage || heroImage}
                    alt="Pekerja Indonesia"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Floating Cards */}
                <div className="absolute -left-4 top-1/4 glass-card p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Terverifikasi</div>
                      <div className="text-xs text-muted-foreground">5000+ Pekerja</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-1/4 glass-card p-4 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Rating 4.8</div>
                      <div className="text-xs text-muted-foreground">dari 10rb+ Review</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard icon={Users} value="50,000+" label="Pekerja Terdaftar" />
              <StatsCard icon={Briefcase} value="1,200+" label="Lowongan Aktif" />
              <StatsCard icon={CheckCircle} value="15,000+" label="Hire Sukses" />
              <StatsCard icon={Star} value="4.8" label="Rating Rata-rata" />
            </div>
          </div>
        </section>

        {/* Popular Skills */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Kategori Skill Populer
              </h2>
              <p className="mt-2 text-muted-foreground">
                Temukan pekerja berdasarkan keahlian yang Anda butuhkan
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSkills.map((skill) => (
                <Link key={skill} to={`/cari-pekerja?skill=${skill}`}>
                  <SkillBadge skill={skill} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Workers */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Pekerja Unggulan
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Pekerja dengan rating dan track record terbaik
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden md:flex">
                <Link to="/cari-pekerja">
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockWorkers.slice(0, 6).map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link to="/cari-pekerja">
                  Lihat Semua Pekerja
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Lowongan Terbaru
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Kesempatan kerja baru setiap hari
                </p>
              </div>
              <Button variant="ghost" asChild className="hidden md:flex">
                <Link to="/lowongan">
                  Lihat Semua
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockJobs.slice(0, 4).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Button variant="outline" asChild>
                <Link to="/lowongan">
                  Lihat Semua Lowongan
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Mengapa Memilih QERDJAIN.ID?
            </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Platform yang dirancang khusus untuk kebutuhan blue-collar workers dan pemberi kerja di Indonesia
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="card-elevated p-6 text-center hover:shadow-lg transition-all group"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="container text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-primary-foreground">
              Siap untuk Memulai?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Daftar gratis sekarang dan mulai temukan pekerja terampil atau pekerjaan impian Anda
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/daftar">
                  <Users className="mr-2 h-5 w-5" />
                  Daftar Sebagai Pekerja
                </Link>
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/daftar-employer">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Daftar Sebagai Pemberi Kerja
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
