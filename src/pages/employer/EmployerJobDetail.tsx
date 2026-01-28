import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Eye,
  MessageSquare,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { useToast } from "@/hooks/use-toast";

const mockApplicants = [
  {
    id: "1",
    name: "Budi Santoso",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    skills: ["Welding", "Las Argon"],
    experience: "8 tahun",
    rating: 4.8,
    appliedAt: "2 jam lalu",
    status: "pending",
  },
  {
    id: "2",
    name: "Ahmad Ridwan",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    skills: ["Welding", "Konstruksi"],
    experience: "5 tahun",
    rating: 4.5,
    appliedAt: "5 jam lalu",
    status: "pending",
  },
  {
    id: "3",
    name: "Joko Prasetyo",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    skills: ["Welding", "Pipa"],
    experience: "10 tahun",
    rating: 4.9,
    appliedAt: "1 hari lalu",
    status: "accepted",
  },
];

const EmployerJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState(mockApplicants);

  const jobData = {
    id,
    title: "Dicari Welder untuk Proyek Gedung",
    location: "Jakarta Selatan",
    salary: "Rp 150.000 - 200.000",
    salaryPeriod: "hari",
    duration: "Kontrak 3 bulan",
    status: "active",
    views: 89,
    createdAt: "20 Jan 2024",
    description:
      "Kami mencari welder berpengalaman untuk proyek pembangunan gedung perkantoran di area Jakarta Selatan. Proyek akan berlangsung selama 3 bulan dengan kemungkinan perpanjangan.",
    requirements: [
      "Pengalaman minimal 3 tahun di bidang welding",
      "Menguasai teknik las listrik dan las argon",
      "Memiliki sertifikat K3",
      "Bersedia bekerja lembur jika diperlukan",
    ],
  };

  const handleApplicantAction = (applicantId: string, action: "accept" | "reject") => {
    setApplicants(
      applicants.map((a) =>
        a.id === applicantId
          ? { ...a, status: action === "accept" ? "accepted" : "rejected" }
          : a
      )
    );
    toast({
      title: action === "accept" ? "Pelamar Diterima" : "Pelamar Ditolak",
      description: `Status pelamar berhasil diperbarui`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-6 md:py-10">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate("/dashboard/employer/lowongan")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Lowongan
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Job Details */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={jobData.status === "active" ? "default" : "secondary"}>
                    {jobData.status === "active" ? "Aktif" : "Ditutup"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {jobData.createdAt}
                  </span>
                </div>

                <h1 className="text-xl font-bold text-foreground mb-4">
                  {jobData.title}
                </h1>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{jobData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{jobData.views} views</span>
                  </div>
                </div>

                <div className="py-4 border-y border-border mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Gaji</p>
                  <p className="font-semibold text-primary">
                    {jobData.salary}/{jobData.salaryPeriod}
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-foreground mb-2">Deskripsi</h3>
                  <p className="text-sm text-muted-foreground">
                    {jobData.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Persyaratan</h3>
                  <ul className="space-y-1">
                    {jobData.requirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => navigate(`/dashboard/employer/lowongan/${id}/edit`)}
                >
                  Edit Lowongan
                </Button>
              </div>
            </div>

            {/* Applicants */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  <Users className="inline-block mr-2 h-5 w-5" />
                  Pelamar ({applicants.length})
                </h2>
              </div>

              <div className="space-y-4">
                {applicants.map((applicant) => (
                  <div key={applicant.id} className="card-elevated p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={applicant.photo} />
                        <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div>
                            <Link
                              to={`/pekerja/${applicant.id}`}
                              className="font-semibold text-foreground hover:text-primary"
                            >
                              {applicant.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              {applicant.experience} pengalaman • ⭐{" "}
                              {applicant.rating}
                            </p>
                          </div>
                          <Badge
                            variant={
                              applicant.status === "accepted"
                                ? "default"
                                : applicant.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {applicant.status === "accepted"
                              ? "Diterima"
                              : applicant.status === "rejected"
                              ? "Ditolak"
                              : "Pending"}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {applicant.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-xs text-muted-foreground mb-4">
                          Melamar {applicant.appliedAt}
                        </p>

                        {applicant.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleApplicantAction(applicant.id, "accept")
                              }
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Terima
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleApplicantAction(applicant.id, "reject")
                              }
                            >
                              <X className="mr-1 h-4 w-4" />
                              Tolak
                            </Button>
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/pekerja/${applicant.id}`}>
                                <MessageSquare className="mr-1 h-4 w-4" />
                                Lihat Profil
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {applicants.length === 0 && (
                  <div className="card-elevated p-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      Belum Ada Pelamar
                    </h3>
                    <p className="text-muted-foreground">
                      Lowongan Anda belum mendapatkan pelamar. Pastikan informasi
                      lowongan sudah lengkap dan menarik.
                    </p>
                  </div>
                )}
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

export default EmployerJobDetail;
