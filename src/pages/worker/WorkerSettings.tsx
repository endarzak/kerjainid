import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Shield, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const WorkerSettings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailJobMatch: true,
    emailApplicationStatus: true,
    whatsappJobMatch: false,
    pushNotifications: true,
  });

  const [privacy, setPrivacy] = useState({
    showPhone: true,
    showEmail: false,
    profileVisible: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Pengaturan notifikasi berhasil disimpan",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Pengaturan Tersimpan",
      description: "Pengaturan privasi berhasil disimpan",
    });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Tidak Cocok",
        description: "Password baru dan konfirmasi password harus sama",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Diperbarui",
      description: "Password Anda berhasil diperbarui",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    logout();
    toast({
      title: "Akun Dihapus",
      description: "Akun Anda telah dihapus",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10 max-w-4xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard/worker")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Pengaturan
          </h1>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
                Notifikasi
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
                Privasi
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2 hidden sm:inline" />
                Keamanan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notifications">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Pengaturan Notifikasi
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Email Lowongan Cocok
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima email saat ada lowongan yang cocok
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailJobMatch}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailJobMatch: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Status Lamaran
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima email saat status lamaran berubah
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailApplicationStatus}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          emailApplicationStatus: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        WhatsApp Lowongan
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Terima notifikasi WhatsApp untuk lowongan baru
                      </p>
                    </div>
                    <Switch
                      checked={notifications.whatsappJobMatch}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          whatsappJobMatch: checked,
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

            <TabsContent value="privacy">
              <div className="card-elevated p-6 md:p-8">
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Pengaturan Privasi
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Tampilkan Nomor Telepon
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Employer dapat melihat nomor WhatsApp Anda
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showPhone: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Tampilkan Email
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Employer dapat melihat email Anda
                      </p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, showEmail: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Profil Terlihat
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Profil Anda muncul di hasil pencarian
                      </p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, profileVisible: checked })
                      }
                    />
                  </div>

                  <Button onClick={handleSavePrivacy}>Simpan Pengaturan</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <div className="card-elevated p-6 md:p-8">
                  <h2 className="text-lg font-semibold text-foreground mb-6">
                    Ubah Password
                  </h2>

                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="current">Password Saat Ini</Label>
                      <Input
                        id="current"
                        type="password"
                        value={passwords.current}
                        onChange={(e) =>
                          setPasswords({ ...passwords, current: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new">Password Baru</Label>
                      <Input
                        id="new"
                        type="password"
                        value={passwords.new}
                        onChange={(e) =>
                          setPasswords({ ...passwords, new: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm">Konfirmasi Password Baru</Label>
                      <Input
                        id="confirm"
                        type="password"
                        value={passwords.confirm}
                        onChange={(e) =>
                          setPasswords({ ...passwords, confirm: e.target.value })
                        }
                      />
                    </div>

                    <Button onClick={handleChangePassword}>
                      Ubah Password
                    </Button>
                  </div>
                </div>

                <div className="card-elevated p-6 md:p-8 border-destructive/50">
                  <h2 className="text-lg font-semibold text-destructive mb-2">
                    Zona Berbahaya
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tindakan ini tidak dapat dibatalkan. Semua data Anda akan
                    dihapus secara permanen.
                  </p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Hapus Akun
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Yakin ingin menghapus akun?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Tindakan ini tidak dapat dibatalkan. Semua data profil,
                          portfolio, dan riwayat lamaran akan dihapus secara
                          permanen.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount}>
                          Hapus Akun
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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

export default WorkerSettings;
