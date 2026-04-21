import { FaBan, FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // Asumsi menggunakan react-router
import PageHeader from "../components/PageHeader";

export default function NotFound() {
    return (
        <div style={styles.container}>
            <PageHeader title="404 - Oops!" />
            
            <div style={styles.content}>
                {/* Ikon Gede */}
                <div style={styles.iconWrapper}>
                    <FaBan style={styles.mainIcon} />
                    <FaSearch style={styles.subIcon} />
                </div>

                <h1 style={styles.errorCode}>404</h1>
                <h2 style={styles.message}>Halaman Tidak Ditemukan</h2>
                <p style={styles.description}>
                    Sepertinya halaman yang Anda cari telah dipindahkan, 
                    dihapus, atau mungkin tidak pernah ada sejak awal.
                </p>

                {/* Tombol Kembali */}
                <Link to="/" style={styles.homeButton}>
                    <FaHome style={{ marginRight: '8px' }} /> Kembali ke Beranda
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    content: {
        marginTop: '40px',
    },
    iconWrapper: {
        position: 'relative',
        display: 'inline-block',
        marginBottom: '20px'
    },
    mainIcon: {
        fontSize: '120px',
        color: '#e74c3c',
    },
    subIcon: {
        fontSize: '40px',
        color: '#34495e',
        position: 'absolute',
        bottom: '10px',
        right: '-10px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        padding: '5px'
    },
    errorCode: {
        fontSize: '80px',
        margin: '0',
        fontWeight: '900',
        color: '#2c3e50',
        letterSpacing: '5px'
    },
    message: {
        fontSize: '24px',
        color: '#34495e',
        marginBottom: '15px'
    },
    description: {
        fontSize: '16px',
        color: '#7f8c8d',
        maxWidth: '400px',
        margin: '0 auto 30px auto',
        lineHeight: '1.6'
    },
    homeButton: {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#3498db',
        color: 'white',
        padding: '12px 25px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }
};