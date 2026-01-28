import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { skillCategories } from "@/data/mockData";

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    location: "Jakarta Selatan",
    experience: "5",
    bio: "Tukang las berpengalaman dengan keahlian di bidang konstruksi baja dan aluminium. Telah menyelesaikan berbagai proyek mulai dari pagar rumah hingga konstruksi bangunan.",
    availability: "available",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Las/Welding",
    "Konstruksi Baja",
  ]);

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      toast({
        title: "Maksimal 5 Keahlian",
        description: "Anda hanya bisa memilih maksimal 5 keahlian",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Profil Tersimpan",
      description: "Perubahan profil Anda berhasil disimpan",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10 max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard/worker")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Button>

          <div className="card-elevated p-6 md:p-8">
            <h1 className="text-2xl font-bold text-foreground mb-8">Edit Profil</h1>

            {/* Photo Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileData.photoUrl} />
                  <AvatarFallback className="text-2xl">
                    {profileData.fullName[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Foto Profil</h2>
                <p className="text-sm text-muted-foreground">
                  Foto yang jelas akan meningkatkan kepercayaan pemberi kerja
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor WhatsApp *</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Opsional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi *</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({ ...profileData, location: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Pengalaman (Tahun)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profileData.experience}
                    onChange={(e) =>
                      setProfileData({ ...profileData, experience: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Status Ketersediaan</Label>
                  <Select
                    value={profileData.availability}
                    onValueChange={(value) =>
                      setProfileData({ ...profileData, availability: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Tersedia</SelectItem>
                      <SelectItem value="busy">Sedang Bekerja</SelectItem>
                      <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Tentang Saya</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  placeholder="Ceritakan tentang pengalaman dan keahlian Anda..."
                />
              </div>

              {/* Skills Section */}
              <div className="space-y-4">
                <div>
                  <Label>Keahlian (Pilih max. 5)</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSkills.length}/5 keahlian dipilih
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      className="cursor-pointer"
                      onClick={() => handleSkillToggle(skill)}
                    >
                      {skill} ✕
                    </Badge>
                  ))}
                </div>

                <div className="p-4 bg-muted/50 rounded-xl max-h-48 overflow-y-auto">
                  <div className="flex flex-wrap gap-2">
                    {allSkills
                      .filter((skill) => !selectedSkills.includes(skill))
                      .map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          + {skill}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/dashboard/worker")}
                >
                  Batal
                </Button>
                <Button className="flex-1" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Perubahan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default WorkerProfile;
