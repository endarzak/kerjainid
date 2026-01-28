import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { skillCategories } from "@/data/mockData";

const CreateJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    salary: "",
    salaryPeriod: "bulan",
    duration: "full-time",
    description: "",
    requirements: "",
    benefits: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Lowongan Berhasil Dibuat",
      description: "Lowongan Anda sudah aktif dan dapat dilihat oleh pekerja",
    });

    setIsSubmitting(false);
    navigate("/dashboard/employer/lowongan");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10 max-w-3xl">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="card-elevated p-6 md:p-8">
            <h1 className="text-2xl font-bold text-foreground mb-6">
              Pasang Lowongan Baru
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Lowongan *</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Dicari Welder Berpengalaman"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori Pekerjaan *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi *</Label>
                  <Input
                    id="location"
                    placeholder="Contoh: Jakarta Selatan"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Gaji (Rp)</Label>
                  <Input
                    id="salary"
                    placeholder="Contoh: 5000000"
                    type="number"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryPeriod">Periode Gaji</Label>
                  <Select
                    value={formData.salaryPeriod}
                    onValueChange={(value) =>
                      setFormData({ ...formData, salaryPeriod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jam">Per Jam</SelectItem>
                      <SelectItem value="hari">Per Hari</SelectItem>
                      <SelectItem value="minggu">Per Minggu</SelectItem>
                      <SelectItem value="bulan">Per Bulan</SelectItem>
                      <SelectItem value="proyek">Per Proyek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durasi Pekerjaan *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) =>
                    setFormData({ ...formData, duration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="kontrak">Kontrak</SelectItem>
                    <SelectItem value="harian">Harian</SelectItem>
                    <SelectItem value="proyek">Proyek</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Pekerjaan *</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan detail pekerjaan yang akan dilakukan..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Persyaratan</Label>
                <Textarea
                  id="requirements"
                  placeholder="Tuliskan persyaratan yang dibutuhkan (pisahkan dengan baris baru)..."
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefit</Label>
                <Textarea
                  id="benefits"
                  placeholder="Tuliskan benefit yang ditawarkan (pisahkan dengan baris baru)..."
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                >
                  Batal
                </Button>
                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                  {isSubmitting ? "Menyimpan..." : "Pasang Lowongan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default CreateJob;
