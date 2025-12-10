import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function App() {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Data statis untuk demo
  const transactionData = [
    {
      name: "Makan Siang",
      category: "Makanan & Minuman",
      amount: -25000,
      date: "Hari ini",
    },
    {
      name: "Gojek",
      category: "Transportasi",
      amount: -150000,
      date: "Kemarin",
    },
    {
      name: "Freelance Web",
      category: "Pemasukan",
      amount: 500000,
      date: "2 hari lalu",
    },
  ];

  const categories = [
    { name: "Makan", percentage: 31, color: "bg-blue-500" },
    { name: "Tango", percentage: 13, color: "bg-green-500" },
    { name: "Lainnya", percentage: 16.1, color: "bg-yellow-500" },
    { name: "Transport", percentage: 22.7, color: "bg-red-500" },
    { name: "Hiburan", percentage: 17.2, color: "bg-purple-500" },
  ];

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Konten Utama Dashboard */}
      <main className="flex-1 p-8">
        {/* Header dengan Profil dan Button Tambah Transaksi */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Keuangan
            </h1>
            <p className="text-gray-600">
              Kelola keuangan mahasiswa dengan mudah
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/tambah-transaksi")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Transaksi
            </button>
            
            {/* Profil User dengan Menu Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">Ahmad Rizki</p>
                  <p className="text-xs text-gray-500">Mahasiswa</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isProfileMenuOpen ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </button>

              {/* Dropdown Menu Profil */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <svg 
                          className="w-6 h-6 text-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Ahmad Rizki</p>
                        <p className="text-sm text-gray-500">ahmad.rizki@email.com</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <svg 
                        className="w-5 h-5 mr-3 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                        />
                      </svg>
                      Profil Saya
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate("/pengaturan");
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    >
                      <svg 
                        className="w-5 h-5 mr-3 text-gray-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                      </svg>
                      Pengaturan
                    </button>
                    
                    <div className="border-t border-gray-100 my-2"></div>
                    
                    <button
                      onClick={() => {
                        // Logout logic here
                        setIsProfileMenuOpen(false);
                        navigate("/");
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <svg 
                        className="w-5 h-5 mr-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                        />
                      </svg>
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tiga Card Saldo, Pemasukan, Pengeluaran dalam satu baris */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Saldo */}
          <div className="bg-[#3B82F6] rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#E0E7FF]">
                Total Saldo
              </h2>
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 0C1.34531 0 0 1.34531 0 3V18C0 19.6547 1.34531 21 3 21H21C22.6547 21 24 19.6547 24 18V7.5C24 5.84531 22.6547 4.5 21 4.5H3.75C3.3375 4.5 3 4.1625 3 3.75C3 3.3375 3.3375 3 3.75 3H21C21.8297 3 22.5 2.32969 22.5 1.5C22.5 0.670312 21.8297 0 21 0H3ZM19.5 11.25C19.8978 11.25 20.2794 11.408 20.5607 11.6893C20.842 11.9706 21 12.3522 21 12.75C21 13.1478 20.842 13.5294 20.5607 13.8107C20.2794 14.092 19.8978 14.25 19.5 14.25C19.1022 14.25 18.7206 14.092 18.4393 13.8107C18.158 13.5294 18 13.1478 18 12.75C18 12.3522 18.158 11.9706 18.4393 11.6893C18.7206 11.408 19.1022 11.25 19.5 11.25Z"
                  fill="#C7D2FE"
                />
              </svg>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-white">
                Rp 2.450.000
              </span>
            </div>
            <p className="text-[#E0E7FF] text-sm flex items-center">
              +12% dari bulan lalu
            </p>
          </div>

          {/* Pemasukan */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#4B5563]">Pemasukan</h2>
              <svg
                width="27"
                height="15"
                viewBox="0 0 27 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 3C17.1703 3 16.5 2.32969 16.5 1.5C16.5 0.670312 17.1703 0 18 0H25.5C26.3297 0 27 0.670312 27 1.5V9C27 9.82969 26.3297 10.5 25.5 10.5C24.6703 10.5 24 9.82969 24 9V5.12344L16.0594 13.0594C15.4734 13.6453 14.5219 13.6453 13.9359 13.0594L8.99998 8.12344L2.55935 14.5594C1.97341 15.1453 1.02185 15.1453 0.435913 14.5594C-0.150024 13.9734 -0.150024 13.0219 0.435913 12.4359L7.93591 4.93594C8.52185 4.35 9.47341 4.35 10.0594 4.93594L15 9.87656L21.8765 3H18Z"
                  fill="#22C55E"
                />
              </svg>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-black">
                Rp 3.500.000
              </span>
            </div>
            <p className="text-[#6B7280] text-sm">Bulan ini</p>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-[#4B5563]">
                Pengeluaran
              </h2>
              <svg
                width="27"
                height="15"
                viewBox="0 0 27 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 11.9988C17.1703 11.9988 16.5 12.6691 16.5 13.4988C16.5 14.3285 17.1703 14.9988 18 14.9988H25.5C26.3297 14.9988 27 14.3285 27 13.4988V5.99883C27 5.16914 26.3297 4.49883 25.5 4.49883C24.6703 4.49883 24 5.16914 24 5.99883V9.87539L16.0594 1.93945C15.4734 1.35352 14.5219 1.35352 13.9359 1.93945L8.99998 6.87539L2.55935 0.439453C1.97341 -0.146484 1.02185 -0.146484 0.435913 0.439453C-0.150024 1.02539 -0.150024 1.97695 0.435913 2.56289L7.93591 10.0629C8.52185 10.6488 9.47341 10.6488 10.0594 10.0629L15 5.12227L21.8765 11.9988H18Z"
                  fill="#EF4444"
                />
              </svg>
            </div>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-black">
                Rp 1.050.000
              </span>
            </div>
            <p className="text-[#6B7280] text-sm">Bulan ini</p>
          </div>
        </div>

        {/* Pengeluaran per Kategori dan Transaksi Terbaru */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pengeluaran per Kategori */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Pengeluaran per Kategori
            </h2>
            <div className="flex items-center">
              {/* Diagram Pie Sederhana */}
              <div className="relative w-32 h-32 mr-6">
                <div
                  className="absolute inset-0 rounded-full border-8 border-blue-500"
                  style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{
                    clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-yellow-500"
                  style={{
                    clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)",
                  }}
                ></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-red-500"
                  style={{
                    clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)",
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-gray-700">Total</span>
                </div>
              </div>

              {/* Legenda Kategori */}
              <div className="flex-1">
                <div className="space-y-3">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${category.color} mr-2`}
                        ></div>
                        <span className="text-gray-600 text-sm">
                          {category.name}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {category.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transaksi Terbaru */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">
                Transaksi Terbaru
              </h2>
              <button
                className="text-blue-600 text-sm font-medium flex items-center hover:text-blue-700 transition-colors duration-200"
                onClick={() => navigate("/riwayat-transaksi")}
              >
                Lihat Semua
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {transactionData.map((transaction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <svg
                        className={`w-5 h-5 ${
                          transaction.amount > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {transaction.amount > 0 ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        )}
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : "-"}Rp{" "}
                      {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;