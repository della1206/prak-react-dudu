import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ errorCode, title, description, imageUrl }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center p-6">
      {/* Gambar Error (Dinamis dari Props) */}
      <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
        <img 
          src={imageUrl} 
          alt={`Error ${errorCode}`} 
          className="w-full max-w-[320px] h-auto drop-shadow-xl"
        />
      </div>

      {/* Kode Error (Dinamis) */}
      <h1 className="text-8xl font-black text-hijau opacity-20 mb-[-40px]">
        {errorCode}
      </h1>

      {/* Judul & Deskripsi (Dinamis) */}
      <div className="relative">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          {description}
        </p>
      </div>

      {/* Tombol Kembali */}
      <Link 
        to="/" 
        className="bg-hijau hover:bg-green-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-green-200 transition-all active:scale-95"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ErrorPage;