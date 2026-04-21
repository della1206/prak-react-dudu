import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";

import PageHeader from "../components/PageHeader";

export default function NotFound() {
    return (
        <div id="not-found-container">
            <PageHeader title="Halaman tidak ditemukan" />
            <p>Halaman yang Anda cari tidak ditemukan.</p>
        </div>
    );
}