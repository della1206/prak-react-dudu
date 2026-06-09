import { useState, useEffect } from "react";
import { notesAPI } from "../services/notesAPI";
import AlertBox from "../components/AlertBox";
import PageHeader from "@/components/PageHeader"; // Menggunakan PageHeader dari proyekmu

export default function Notes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // State notes dikosongkan ([]) agar tidak ada isi bawaan dari awal
  const [notes, setNotes] = useState([]);

  const [dataForm, setDataForm] = useState({
    title: "",
    content: "",
    status: "",
  });

  // Ambil data dari API saat halaman pertama kali dimuat
  useEffect(() => {
    loadNotes();
  }, []);

  // Fungsi memuat data catatan
  const loadNotes = async () => {
    try {
      const response = await notesAPI.getNotes();
      const resultData = response.data || response;
      
      if (Array.isArray(resultData)) {
        setNotes(resultData);
      }
    } catch (err) {
      // Jika API 404 atau gagal, diamkan saja agar daftar tetap kosong dan siap diisi manual
      console.warn("API belum siap atau 404. Sistem beralih ke mode input manual.");
    }
  };

  // Menangani input form
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // Menangani submit penambahan data manual
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // 1. Mencoba kirim ke API terlebih dahulu
      await notesAPI.createNote(dataForm);
      setSuccess("Catatan berhasil disimpan ke database!");
      setDataForm({ title: "", content: "", status: "" });
      setTimeout(() => setSuccess(""), 3000);
      loadNotes(); // Refresh data dari server
    } catch (err) {
      // 2. JIKA API ERROR 404, data tetap dimasukkan secara manual ke dalam state lokal
      console.log("API Bermasalah, memasukkan data ke lokal state...");
      
      const newNote = {
        id: Date.now(), // Membuat ID unik sementara
        title: dataForm.title,
        content: dataForm.content
      };
      
      // Tambahkan data baru ke dalam list tabel
      setNotes((prevNotes) => [...prevNotes, newNote]);
      
      setSuccess("Catatan berhasil ditambahkan secara manual!");
      setDataForm({ title: "", content: "", status: "" });
      setTimeout(() => setSuccess(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Menangani penghapusan data manual
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
      try {
        await notesAPI.deleteNote(id);
        setSuccess("Catatan berhasil dihapus!");
        setTimeout(() => setSuccess(""), 3000);
        loadNotes();
      } catch (err) {
        // Jika API gagal, hapus data langsung dari state lokal
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        setSuccess("Catatan berhasil dihapus!");
        setTimeout(() => setSuccess(""), 3000);
      }
    }
  };

  return (
    <div id="dashboard-container" className="space-y-6">

      {/* Konten Utama Aplikasi */}
      <div className="max-w-xl mx-auto p-4 space-y-6 font-poppins">
        
        {/* Judul Aplikasi */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Notes App</h2>
        </div>

        {/* Card 1: Form Tambah Catatan */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-md font-bold text-gray-800 mb-4">
            Tambah Catatan Baru
          </h3>

          {error && <AlertBox type="error">{error}</AlertBox>}
          {success && <AlertBox type="success">{success}</AlertBox>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={dataForm.title}
              placeholder="Judul catatan"
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-gray-400 text-sm transition-all disabled:opacity-60"
            />

            <textarea
              name="content"
              value={dataForm.content}
              placeholder="Isi catatan"
              onChange={handleChange}
              disabled={loading}
              required
              rows="3"
              className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 focus:outline-none focus:ring-1 focus:ring-emerald-400 placeholder-gray-400 text-sm transition-all resize-none disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition-all shadow-sm active:scale-95 disabled:opacity-50"
            >
              {loading ? "Mohon Tunggu..." : "Tambah Data"}
            </button>
          </form>
        </div>

        {/* Card 2: Tabel Daftar Catatan */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-md font-bold text-gray-800 mb-4">
            Daftar Catatan ({notes.length})
          </h3>

          <div className="overflow-hidden rounded-xl border border-gray-100">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#52b788] text-white text-xs font-semibold">
                  <th className="p-3 text-center w-12">#</th>
                  <th className="p-3 w-1/3">Judul</th>
                  <th className="p-3">Isi Catatan</th>
                  <th className="p-3 text-center w-20">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {notes.map((note, index) => (
                  <tr key={note.id || index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-center text-gray-500">{index + 1}.</td>
                    <td className="p-3 font-semibold text-emerald-600">
                      {note.title}
                    </td>
                    <td className="p-3 text-gray-600 leading-relaxed whitespace-pre-line">
                      {note.content}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        className="bg-black hover:bg-gray-800 text-white font-medium px-4 py-1.5 rounded-lg text-[11px] transition-all active:scale-95 shadow-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {notes.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-400 italic">
                      Belum ada catatan. Silakan tambah data di atas!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
