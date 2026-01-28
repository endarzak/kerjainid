import { Link } from "react-router-dom";
import { Check, Crown, Zap, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const pricingPlans = [
  {
    name: "Free",
    price: "Gratis",
    period: "",
    description: "Untuk memulai pencarian pekerja",
    icon: Building2,
    features: [
      "3 lowongan aktif",
      "Lihat 10 profil pekerja/bulan",
      "Fitur pencarian dasar",
      "Notifikasi email",
    ],
    limitations: [
      "Tidak ada badge premium",
      "Tidak ada prioritas listing",
    ],
    cta: "Paket Saat Ini",
    ctaVariant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "Rp 299.000",
    period: "/bulan",
    description: "Untuk bisnis yang berkembang",
    icon: Crown,
    features: [
      "Lowongan unlimited",
      "Lihat profil unlimited",
      "Fitur pencarian lanjutan",
      "Badge Premium",
      "Prioritas listing",
      "Notifikasi WhatsApp",
      "Support prioritas",
    ],
    limitations: [],
    cta: "Pilih Premium",
    ctaVariant: "default" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Untuk perusahaan besar",
    icon: Zap,
    features: [
      "Semua fitur Premium",
      "Multiple user accounts",
      "Dashboard analytics",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
    ],
    limitations: [],
    cta: "Hubungi Sales",
    ctaVariant: "outline" as const,
    popular: false,
  },
];

const Pricing = () => {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleSelectPlan = (planName: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk memilih paket",
      });
      return;
    }

    if (user?.role !== "employer") {
      toast({
        title: "Hanya untuk Employer",
        description: "Paket ini hanya tersedia untuk akun pemberi kerja",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Segera Hadir",
      description: `Pembayaran untuk paket ${planName} akan segera tersedia`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Hero */}
        <section className="py-12 md:py-20 bg-muted/50">
          <div className="container text-center">
            <Badge variant="secondary" className="mb-4">
              Pricing
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Pilih Paket yang Tepat untuk Bisnis Anda
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Mulai gratis dan upgrade kapan saja sesuai kebutuhan Anda.
              Tidak ada biaya tersembunyi.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`card-elevated p-6 md:p-8 relative ${
                    plan.popular
                      ? "border-2 border-primary ring-4 ring-primary/10"
                      : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Paling Populer
                    </Badge>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        plan.popular
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <plan.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  <Button
                    variant={plan.ctaVariant}
                    size="lg"
                    className="w-full mb-6"
                    onClick={() => handleSelectPlan(plan.name)}
                    disabled={plan.name === "Free"}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                          ✕
                        </span>
                        <span className="text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Pertanyaan Umum
            </h2>

            <div className="space-y-4">
              {[
                {
                  q: "Apakah bisa upgrade atau downgrade kapan saja?",
                  a: "Ya, Anda bisa mengubah paket kapan saja. Perubahan akan berlaku di periode billing berikutnya.",
                },
                {
                  q: "Metode pembayaran apa yang diterima?",
                  a: "Kami menerima transfer bank, kartu kredit/debit, e-wallet (GoPay, OVO, DANA), dan virtual account.",
                },
                {
                  q: "Apakah ada kontrak jangka panjang?",
                  a: "Tidak ada. Semua paket berbasis bulanan dan bisa dibatalkan kapan saja.",
                },
                {
                  q: "Bagaimana cara menghubungi sales untuk paket Enterprise?",
                  a: "Anda bisa menghubungi tim sales kami melalui email enterprise@kerjain.id atau WhatsApp.",
                },
              ].map((faq, index) => (
                <div key={index} className="card-elevated p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              Siap untuk Memulai?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl mx-auto">
              Daftar gratis sekarang dan mulai temukan pekerja terampil untuk
              bisnis Anda
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="xl"
                asChild
                className="bg-white text-primary hover:bg-white/90"
              >
                <Link to="/daftar-employer">Daftar Gratis</Link>
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/cari-pekerja">Lihat Pekerja</Link>
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

export default Pricing;
