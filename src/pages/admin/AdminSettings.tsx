import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Save, Globe, Bell, Shield, Palette, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const AdminSettings = () => {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "QERDJAIN.ID",
    tagline: "Platform #1 untuk Blue-Collar Workers",
    description: "QERDJAIN.ID menghubungkan pekerja skilled dengan pemberi kerja terpercaya di Indonesia.",
    email: "info@qerdjain.id",
    phone: "+62 21 1234 5678",
    address: "Jakarta, Indonesia",
    whatsapp: "+6281234567890",
  });

  const [notifications, setNotifications] = useState({
    emailNewUser: true,
    emailNewJob: true,
    emailNewApplication: true,
    smsVerification: true,
  });

  const handleSaveSite = () => {
    localStorage.setItem("cms_site_settings", JSON.stringify(siteSettings));
    toast.success("Pengaturan website berhasil disimpan!");
  };

  const handleSaveNotifications = () => {
    localStorage.setItem("cms_notifications", JSON.stringify(notifications));
    toast.success("Pengaturan notifikasi berhasil disimpan!");
  };

  const handleClearCache = () => {
    toast.success("Cache berhasil dibersihkan!");
  };

  const handleResetData = () => {
    localStorage.removeItem("cms_workers");
    localStorage.removeItem("cms_employers");
    localStorage.removeItem("cms_jobs");
    localStorage.removeItem("cms_articles");
    localStorage.removeItem("cms_trainings");
    toast.success("Data CMS berhasil direset ke default!");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-bold text-xl">Pengaturan</h1>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-xl">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Umum</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifikasi</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Keamanan</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Website</CardTitle>
                <CardDescription>
                  Konfigurasi informasi dasar website Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nama Website</Label>
                    <Input
                      value={siteSettings.siteName}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, siteName: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Tagline</Label>
                    <Input
                      value={siteSettings.tagline}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, tagline: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    value={siteSettings.description}
                    onChange={(e) =>
                      setSiteSettings({ ...siteSettings, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={siteSettings.email}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Telepon</Label>
                    <Input
                      value={siteSettings.phone}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>WhatsApp</Label>
                    <Input
                      value={siteSettings.whatsapp}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, whatsapp: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Alamat</Label>
                    <Input
                      value={siteSettings.address}
                      onChange={(e) =>
                        setSiteSettings({ ...siteSettings, address: e.target.value })
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleSaveSite}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Notifikasi</CardTitle>
                <CardDescription>
                  Kelola notifikasi email dan SMS untuk admin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email User Baru</p>
                    <p className="text-sm text-muted-foreground">
                      Terima email saat ada user baru mendaftar
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNewUser}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNewUser: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Lowongan Baru</p>
                    <p className="text-sm text-muted-foreground">
                      Terima email saat ada lowongan baru dipasang
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNewJob}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNewJob: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Lamaran Baru</p>
                    <p className="text-sm text-muted-foreground">
                      Terima email saat ada lamaran baru masuk
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNewApplication}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, emailNewApplication: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Verifikasi</p>
                    <p className="text-sm text-muted-foreground">
                      Kirim SMS untuk verifikasi user baru
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsVerification}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, smsVerification: checked })
                    }
                  />
                </div>
                <Button onClick={handleSaveNotifications}>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Pengaturan
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Keamanan</CardTitle>
                <CardDescription>
                  Konfigurasi keamanan akun admin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Password Saat Ini</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Password Baru</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Konfirmasi Password Baru</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Ubah Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Manajemen Data</CardTitle>
                  <CardDescription>
                    Kelola data dan cache aplikasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-medium">Bersihkan Cache</p>
                      <p className="text-sm text-muted-foreground">
                        Hapus cache untuk memperbarui data tampilan
                      </p>
                    </div>
                    <Button variant="outline" onClick={handleClearCache}>
                      Bersihkan
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-destructive/50 rounded-lg bg-destructive/5">
                    <div>
                      <p className="font-medium text-destructive">Reset Data CMS</p>
                      <p className="text-sm text-muted-foreground">
                        Kembalikan semua data ke default. Tindakan ini tidak dapat dibatalkan!
                      </p>
                    </div>
                    <Button variant="destructive" onClick={handleResetData}>
                      Reset Data
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Penyimpanan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Pekerja</span>
                      <span className="font-medium">
                        {(localStorage.getItem("cms_workers")?.length || 0) / 1024} KB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Employer</span>
                      <span className="font-medium">
                        {(localStorage.getItem("cms_employers")?.length || 0) / 1024} KB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Lowongan</span>
                      <span className="font-medium">
                        {(localStorage.getItem("cms_jobs")?.length || 0) / 1024} KB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data Artikel</span>
                      <span className="font-medium">
                        {(localStorage.getItem("cms_articles")?.length || 0) / 1024} KB
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminSettings;
