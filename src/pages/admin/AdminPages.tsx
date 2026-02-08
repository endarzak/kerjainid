import { useState, useEffect } from "react";
import { Save, Eye, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

interface PageContent {
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    ctaText: string;
    statsWorkers: string;
    statsEmployers: string;
    statsJobs: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const defaultContent: PageContent = {
  homepage: {
    heroTitle: "Cari Pekerja Terampil untuk Proyek Anda",
    heroSubtitle: "Platform penghubung antara penyedia jasa dan pencari tenaga kerja terampil di Indonesia",
    ctaText: "Cari Pekerja Sekarang",
    statsWorkers: "50,000+",
    statsEmployers: "2,000+",
    statsJobs: "10,000+",
  },
  about: {
    title: "Tentang QERDJAIN.ID",
    description: "QERDJAIN.ID adalah platform digital yang menghubungkan pekerja terampil dengan pemberi kerja di seluruh Indonesia. Kami berkomitmen untuk memudahkan proses pencarian dan perekrutan tenaga kerja berkualitas.",
    mission: "Menyediakan platform terpercaya yang mempertemukan pekerja terampil dengan peluang kerja yang sesuai, serta membantu pemberi kerja menemukan tenaga kerja berkualitas dengan mudah dan cepat.",
    vision: "Menjadi platform pencarian tenaga kerja terampil terbesar dan terpercaya di Indonesia, yang berkontribusi dalam mengurangi pengangguran dan meningkatkan kesejahteraan pekerja.",
  },
  contact: {
    address: "Jl. Sudirman No. 123, Jakarta Pusat 10220",
    phone: "+62 21 1234 5678",
    email: "info@qerdjain.id",
    whatsapp: "+62 812 3456 7890",
  },
};

const AdminPages = () => {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [activeTab, setActiveTab] = useState("homepage");

  useEffect(() => {
    const stored = localStorage.getItem("cms_pages");
    if (stored) {
      setContent(JSON.parse(stored));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("cms_pages", JSON.stringify(content));
    toast.success("Konten halaman berhasil disimpan!");
  };

  return (
    <AdminLayout title="Kelola Halaman">
      <div className="max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="homepage">Beranda</TabsTrigger>
            <TabsTrigger value="about">Tentang</TabsTrigger>
            <TabsTrigger value="contact">Kontak</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit2 className="h-5 w-5" />
                  Halaman Beranda
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Judul Hero</Label>
                  <Input
                    value={content.homepage.heroTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        homepage: { ...content.homepage, heroTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Subtitle Hero</Label>
                  <Textarea
                    value={content.homepage.heroSubtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        homepage: { ...content.homepage, heroSubtitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Teks CTA Button</Label>
                  <Input
                    value={content.homepage.ctaText}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        homepage: { ...content.homepage, ctaText: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Jumlah Pekerja</Label>
                    <Input
                      value={content.homepage.statsWorkers}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          homepage: { ...content.homepage, statsWorkers: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Jumlah Employer</Label>
                    <Input
                      value={content.homepage.statsEmployers}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          homepage: { ...content.homepage, statsEmployers: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Jumlah Lowongan</Label>
                    <Input
                      value={content.homepage.statsJobs}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          homepage: { ...content.homepage, statsJobs: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit2 className="h-5 w-5" />
                  Halaman Tentang
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Judul</Label>
                  <Input
                    value={content.about.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, title: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <Textarea
                    rows={4}
                    value={content.about.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, description: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Misi</Label>
                  <Textarea
                    rows={3}
                    value={content.about.mission}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, mission: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Visi</Label>
                  <Textarea
                    rows={3}
                    value={content.about.vision}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        about: { ...content.about, vision: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit2 className="h-5 w-5" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Alamat</Label>
                  <Textarea
                    value={content.contact.address}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, address: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Telepon</Label>
                  <Input
                    value={content.contact.phone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label>WhatsApp</Label>
                  <Input
                    value={content.contact.whatsapp}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, whatsapp: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3 mt-6">
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <a href="/" target="_blank">
              <Eye className="h-4 w-4" />
              Preview Website
            </a>
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
