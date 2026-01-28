import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const ContactSales = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Pesan Terkirim!",
      description:
        "Tim sales kami akan menghubungi Anda dalam 1-2 hari kerja.",
    });

    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10 max-w-2xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="card-elevated p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Hubungi Tim Sales
                </h1>
                <p className="text-muted-foreground">
                  Konsultasikan kebutuhan Enterprise Anda
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nama Perusahaan *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactName">Nama Kontak *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) =>
                      setFormData({ ...formData, contactName: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Perusahaan *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Jumlah Karyawan</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) =>
                      setFormData({ ...formData, companySize: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jumlah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 karyawan</SelectItem>
                      <SelectItem value="51-200">51-200 karyawan</SelectItem>
                      <SelectItem value="201-500">201-500 karyawan</SelectItem>
                      <SelectItem value="501-1000">501-1000 karyawan</SelectItem>
                      <SelectItem value="1000+">1000+ karyawan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industri</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih industri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Konstruksi">Konstruksi</SelectItem>
                      <SelectItem value="Manufaktur">Manufaktur</SelectItem>
                      <SelectItem value="Logistik">Logistik</SelectItem>
                      <SelectItem value="Properti">Properti</SelectItem>
                      <SelectItem value="Otomotif">Otomotif</SelectItem>
                      <SelectItem value="Pertambangan">Pertambangan</SelectItem>
                      <SelectItem value="Lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Pesan / Kebutuhan Khusus</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Ceritakan kebutuhan perusahaan Anda..."
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-xl">
                <h3 className="font-medium text-foreground mb-2">
                  Apa yang Anda dapatkan:
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Konsultasi gratis dengan tim ahli kami</li>
                  <li>✓ Demo produk sesuai kebutuhan perusahaan</li>
                  <li>✓ Penawaran harga khusus untuk Enterprise</li>
                  <li>✓ Dukungan implementasi dan onboarding</li>
                </ul>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Mengirim..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Permintaan
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default ContactSales;
