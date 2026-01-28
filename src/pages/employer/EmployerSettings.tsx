import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2, Bell, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const EmployerSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [companyData, setCompanyData] = useState({
    companyName: user?.companyName || "",
    industry: "Konstruksi",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    phone: user?.phone || "",
    email: user?.email || "",
    website: "",
    description: "Perusahaan konstruksi terkemuka di Indonesia dengan pengalaman lebih dari 20 tahun.",
  });

  const [notifications, setNotifications] = useState({
    emailNewApplicant: true,
    emailWeeklyReport: true,
    whatsappNewApplicant: false,
    pushNotifications: true,
  });

  const handleSaveCompany = () => {
    toast({
      title: "Profil Tersimpan",
      description: "Perubahan profil perusahaan berhasil disimpan",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Pengaturan notifikasi berhasil disimpan",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard/employer")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Pengaturan
          </h1>

          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="company">
                <Building2 className="h-4 w-4 mr-2 hidden sm:inline" />
                Perusahaan
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
                Notifikasi
              </TabsTrigger>
              <TabsTrigger value="billing">
                <CreditCard className="h-4 w-4 mr-2 hidden sm:inline" />
                Billing
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Profil Perusahaan
                </h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nama Perusahaan</Label>
                    <Input
                      id="companyName"
                      value={companyData.companyName}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, companyName: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industri</Label>
                      <Select
                        value={companyData.industry}
                        onValueChange={(value) =>
                          setCompanyData({ ...companyData, industry: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Konstruksi">Konstruksi</SelectItem>
                          <SelectItem value="Manufaktur">Manufaktur</SelectItem>
                          <SelectItem value="Otomotif">Otomotif</SelectItem>
                          <SelectItem value="Properti">Properti</SelectItem>
                          <SelectItem value="Logistik">Logistik</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        value={companyData.phone}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, email: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website (Opsional)</Label>
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, website: e.target.value })
                        }
                        placeholder="https://"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      value={companyData.address}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi Perusahaan</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={companyData.description}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, description: e.target.value })
                      }
                    />
                  </div>

                  <Button onClick={handleSaveCompany}>Simpan Perubahan</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Pengaturan Notifikasi
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Email Pelamar Baru
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima email saat ada pelamar baru
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNewApplicant}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNewApplicant: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Laporan Mingguan
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima rangkuman aktivitas mingguan via email
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailWeeklyReport}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailWeeklyReport: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        WhatsApp Pelamar Baru
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi WhatsApp saat ada pelamar baru
                      </p>
                    </div>
                    <Switch
                      checked={notifications.whatsappNewApplicant}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          whatsappNewApplicant: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Push Notifications
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi di browser
                      </p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          pushNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <Button onClick={handleSaveNotifications}>
                    Simpan Pengaturan
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="billing">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Informasi Billing
                </h2>

                <div className="p-6 bg-muted/50 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-foreground">Paket Saat Ini</p>
                      <p className="text-2xl font-bold text-foreground">Free</p>
                    </div>
                    <Shield className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    3 lowongan aktif • 10 profil pekerja/bulan
                  </p>
                  <Button asChild>
                    <a href="/pricing">Upgrade ke Premium</a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Riwayat Pembayaran</h3>
                  <div className="text-center py-8 text-muted-foreground">
                    Belum ada riwayat pembayaran
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default EmployerSettings;
