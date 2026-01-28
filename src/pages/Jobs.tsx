import { useState } from "react";
import { Search, MapPin, Clock, Filter, X, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockJobs } from "@/data/mockData";
import { SkillCategory, SKILL_LABELS, LOCATION_LABELS } from "@/types";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedDuration("");
  };

  const hasActiveFilters =
    searchQuery || selectedLocation || selectedCategory || selectedDuration;

  // Filter jobs based on criteria
  const filteredJobs = mockJobs.filter((job) => {
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.employerName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedLocation &&
      selectedLocation !== "all" &&
      !job.location.toLowerCase().includes(selectedLocation.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedCategory &&
      selectedCategory !== "all" &&
      job.skillCategory !== selectedCategory
    ) {
      return false;
    }
    if (
      selectedDuration &&
      selectedDuration !== "all" &&
      job.durationType !== selectedDuration
    ) {
      return false;
    }
    return true;
  });

  const uniqueCategories = [...new Set(mockJobs.map((job) => job.skillCategory))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Search Header */}
        <section className="bg-secondary py-8 md:py-12">
          <div className="container">
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-foreground text-center mb-6">
              Temukan Lowongan Kerja
            </h1>
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari lowongan atau perusahaan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white border-0 text-foreground"
                  />
                </div>
                <Button
                  variant="default"
                  size="lg"
                  className="h-12 md:hidden bg-kerjain-green-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Desktop Filters */}
              <div className="hidden md:flex gap-3 mt-4">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[180px] bg-white border-0">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Semua Lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokasi</SelectItem>
                    {Object.entries(LOCATION_LABELS).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-white border-0">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {SKILL_LABELS[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[160px] bg-white border-0">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Durasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Durasi</SelectItem>
                    <SelectItem value="daily">Harian</SelectItem>
                    <SelectItem value="weekly">Mingguan</SelectItem>
                    <SelectItem value="monthly">Bulanan</SelectItem>
                    <SelectItem value="project">Per Proyek</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    className="text-secondary-foreground hover:bg-secondary-foreground/10"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters */}
        {showFilters && (
          <section className="md:hidden bg-card border-b border-border p-4 animate-slide-up">
            <div className="space-y-4">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Semua Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  {Object.entries(LOCATION_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {SKILL_LABELS[category]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Durasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Durasi</SelectItem>
                  <SelectItem value="daily">Harian</SelectItem>
                  <SelectItem value="weekly">Mingguan</SelectItem>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="project">Per Proyek</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Reset Filter
                </Button>
              )}
            </div>
          </section>
        )}

        <div className="container py-6 md:py-8">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {filteredJobs.length}
              </span>{" "}
              lowongan
            </p>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tidak ada lowongan ditemukan
              </h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter pencarian Anda
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Jobs;
