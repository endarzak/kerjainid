import { useState } from "react";
import { Search, Filter, MapPin, Star, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { WorkerCard } from "@/components/WorkerCard";
import { SkillBadge } from "@/components/SkillBadge";
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
import { mockWorkers } from "@/data/mockData";
import { SkillCategory, Location, SKILL_LABELS, LOCATION_LABELS } from "@/types";

const allSkills: SkillCategory[] = Object.keys(SKILL_LABELS) as SkillCategory[];

const SearchWorkers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<SkillCategory[]>([]);
  const [minRating, setMinRating] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleSkill = (skill: SkillCategory) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedSkills([]);
    setMinRating("");
  };

  const hasActiveFilters =
    searchQuery || selectedLocation || selectedSkills.length > 0 || minRating;

  // Filter workers based on criteria
  const filteredWorkers = mockWorkers.filter((worker) => {
    if (
      searchQuery &&
      !worker.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !worker.bio.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedLocation &&
      !worker.location.toLowerCase().includes(selectedLocation.toLowerCase())
    ) {
      return false;
    }
    if (
      selectedSkills.length > 0 &&
      !selectedSkills.some((skill) => worker.skills.includes(skill))
    ) {
      return false;
    }
    if (minRating && worker.averageRating < parseFloat(minRating)) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">
        {/* Search Header */}
        <section className="bg-primary py-8 md:py-12">
          <div className="container">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center mb-6">
              Cari Pekerja Terampil
            </h1>
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Cari nama atau skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white border-0 text-foreground"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  className="h-12 md:hidden"
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

                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="w-[160px] bg-white border-0">
                    <Star className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Rating</SelectItem>
                    <SelectItem value="4.5">4.5+ Bintang</SelectItem>
                    <SelectItem value="4">4+ Bintang</SelectItem>
                    <SelectItem value="3.5">3.5+ Bintang</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                    onClick={clearFilters}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reset Filter
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

              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger>
                  <Star className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Rating</SelectItem>
                  <SelectItem value="4.5">4.5+ Bintang</SelectItem>
                  <SelectItem value="4">4+ Bintang</SelectItem>
                  <SelectItem value="3.5">3.5+ Bintang</SelectItem>
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
          {/* Skills Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Filter berdasarkan skill:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 12).map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  selected={selectedSkills.includes(skill)}
                  onClick={() => toggleSkill(skill)}
                />
              ))}
            </div>
          </div>

          {/* Selected Filters */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Filter aktif:</span>
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {SKILL_LABELS[skill]}
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Menampilkan{" "}
              <span className="font-semibold text-foreground">
                {filteredWorkers.length}
              </span>{" "}
              pekerja
            </p>
          </div>

          {/* Workers Grid */}
          {filteredWorkers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWorkers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tidak ada hasil
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

export default SearchWorkers;
