import { useState } from "react";
import frameworkData from "./framework.json";
export default function FrameworkList() { 
		/** Deklrasai state **/
		const [searchTerm, setSearchTerm] = useState("");
		const [selectedTag, setSelectedTag] = useState("");
    
     /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm) ||
      framework.details.developer.toLowerCase().includes(_searchTerm)||
       framework.details.releaseYear.toString().includes(_searchTerm);

    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  /** Deklarasi pengambilan unique tags di frameworkData **/
    const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

    return (
    // Background utama abu-abu sangat muda (hampir putih) agar segar
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <input
            type="text"
            name="searchTerm"
            placeholder="Search framework..."
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSearchTerm(e.target.value)}
            />

          <select
            name="selectedTag"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            onChange={(e) => setSelectedTag(e.target.value)}
             >
            <option value="">All Tags</option>
             {allTags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
            </select>
        {filteredFrameworks.map((item) => (
          <div 
            key={item.id} 
            // Kartu putih bersih dengan border kiri yang tebal sebagai aksen warna
            className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
          >
            {/* AKSEN WARNA: Garis vertikal di samping kiri kartu */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-cyan-400 to-blue-500" />

            {/* Bagian Kiri: Badge Tahun yang Terang */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex flex-col items-center justify-center border border-cyan-100">
                <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-600">Year</span>
                <span className="text-lg font-black text-cyan-700">{item.details.releaseYear}</span>
              </div>
            </div>

            {/* Bagian Tengah: Konten */}
            <div className="flex-grow">
              <div className="flex flex-col mb-3">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {item.name}
                </h2>
                <span className="text-sm font-medium text-blue-500">
                  {item.details.developer}
                </span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Footer: Tags & Link */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-500 border border-slate-200"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Tombol Modern dengan Gradasi Terang */}
                <a 
                  href={item.details.officialWebsite} 
                  target="_blank" 
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:scale-105 transition-transform"
                >
                  View Site
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  }
