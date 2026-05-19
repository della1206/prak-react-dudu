import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function Components() {
  // Contoh Data untuk Table sesuai Modul
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" }
  ];

  return (
    <Container className="bg-gray-50 min-h-screen">
      {/* 1. Page Header */}
      <PageHeader title="Components" subtitle="Dashboard / Components" />
      <p className="text-gray-600 mb-8">Ini Halaman Components</p>

      <div className="space-y-10">
        
        {/* SECTION 1: BASIC COMPONENTS */}
        <section>
          {/* Buttons */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Button type="primary">Edit</Button>
              <Button type="success">Simpan</Button>
              <Button type="danger">Hapus</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Badge type="success">Aktif</Badge>
              <Badge type="warning">Pending</Badge>
              <Badge type="danger">Batal</Badge>
              <Badge type="primary">Baru</Badge>
            </div>
          </div>

          {/* Avatars */}
          <div>
            <div className="flex gap-2">
              <Avatar name="Fikri" />
              <Avatar name="Hendra" />
              <Avatar name="Suci" />
            </div>
          </div>
        </section>

        {/* SECTION 2: DATA DISPLAY COMPONENTS */}
        <section>
          {/* Standard Card */}
          <div className="mb-8">
            <Card>
              <h2 className="text-xl font-bold">Judul Card</h2>
              <p className="text-gray-600">Ini adalah isi dari card.</p>
            </Card>
          </div>

          {/* Product Cards Grid */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductCard
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                title="Sepatu Sport"
                category="Fashion"
                price="Rp 450.000"
                description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
              />
              <ProductCard
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                title="Smartphone"
                category="Elektronik"
                price="Rp 4.500.000"
                description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
              />
            </div>
          </div>

          {/* Table Data */}
          <div>
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 bg-white">
                  <td className="border px-4 py-3">{index + 1}</td>
                  <td className="border px-4 py-3 font-medium">{product.name}</td>
                  <td className="border px-4 py-3">
                    <Badge type={product.category === "Elektronik" ? "primary" : "success"}>
                      {product.category}
                    </Badge>
                  </td>
                  <td className="border px-4 py-3 text-blue-600 font-semibold">{product.price}</td>
                  <td className="border px-4 py-3">
                    <Button type="primary">Detail</Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </section>

      </div>

      {/* 2. Layout Component: Footer */}
      <Footer />
    </Container>
  );
}