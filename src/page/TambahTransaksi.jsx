import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const TambahTransaksi = () => {
  const [formData, setFormData] = useState({
    type: "pemasukan",
    amount: "",
    name: "",
    category: "",
    date: "",
    paymentMethod: "tunai",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prevState) => ({
      ...prevState,
      paymentMethod: method,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);
  };

  const handleCancel = () => {
    // Handle cancel action
    setFormData({
      type: "pemasukan",
      amount: "",
      name: "",
      category: "",
      date: "",
      paymentMethod: "tunai",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Tambah Transaksi</h1>
          <p className="text-gray-600 mt-1">
            Kelola keuangan mahasiswa dengan mudah
          </p>
        </div>

        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Form Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                Form Transaksi
              </h2>

              {/* Type Selection Buttons */}
              <div className="flex mb-8 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "pemasukan" })
                  }
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-lg border flex items-center justify-center gap-2 ${
                    formData.type === "pemasukan"
                      ? "bg-[#F0FDF4] text-[#16A34A] border-[#22C55E]"
                      : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pemasukan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "pengeluaran" })
                  }
                  className={`flex-1 py-3 px-4 text-center font-medium rounded-lg border flex items-center justify-center gap-2 ${
                    formData.type === "pengeluaran"
                      ? "bg-[#FFE8E8] text-[#DC2626] border-[#DC2626]"
                      : "bg-gray-50 text-gray-700 border-gray-300"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Pengeluaran
                </button>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jumlah (Rp)
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      Rp
                    </div>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === "pemasukan"
                      ? "Nama Pemasukan"
                      : "Nama Pengeluaran"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={
                      formData.type === "pemasukan"
                        ? "Nama Pemasukan"
                        : "Nama Pengeluaran"
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Category Input (only for pengeluaran) */}
                {formData.type === "pengeluaran" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Pilih Kategori</option>
                      <option value="makanan">Makanan & Minuman</option>
                      <option value="transportasi">Transportasi</option>
                      <option value="hiburan">Hiburan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                )}

                {/* Date Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Metode Pembayaran
                  </label>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodChange("tunai")}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 ${
                        formData.paymentMethod === "tunai"
                          ? "bg-[#EEF2FF] text-[#3B82F6] border-[#3B82F6] font-medium"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4z"
                          clipRule="evenodd"
                        />
                        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v1H2V6zm0 3v5a2 2 0 002 2h12a2 2 0 002-2V9H2z" />
                      </svg>
                      Tunai
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentMethodChange("non-tunai")}
                      className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center gap-2 ${
                        formData.paymentMethod === "non-tunai"
                          ? "bg-[#EEF2FF] text-[#3B82F6] border-[#3B82F6] font-medium"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                      Non-Tunai
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-10 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-grow bg-[#3B82F6] hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg
                    width="14"
                    height="16"
                    viewBox="0 0 14 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_490_696)">
                      <path
                        d="M13.7062 3.29376C14.0968 3.68439 14.0968 4.31876 13.7062 4.70939L5.70615 12.7094C5.31553 13.1 4.68115 13.1 4.29053 12.7094L0.290527 8.70939C-0.100098 8.31876 -0.100098 7.68439 0.290527 7.29376C0.681152 6.90314 1.31553 6.90314 1.70615 7.29376L4.9999 10.5844L12.2937 3.29376C12.6843 2.90314 13.3187 2.90314 13.7093 3.29376H13.7062Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_490_696">
                        <path d="M0 0H14V16H0V0Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Simpan Transaksi
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-300 flex items-center justify-center gap-2"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>

          {/* Tips Sidebar */}
          <div>
            <div className="bg-gradient-to-r bg-[#FDE68A] rounded-lg p-6 text-white">
              <div className="flex items-start mb-4">
                <div className="bg-[#F59E0B] p-2 rounded-lg mr-3">
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_92_525)">
                      <path
                        d="M8.5 12C8.8 11.0031 9.42188 10.1531 10.0375 9.30625C10.2 9.08437 10.3625 8.8625 10.5188 8.6375C11.1375 7.74687 11.5 6.66875 11.5 5.50313C11.5 2.4625 9.0375 0 6 0C2.9625 0 0.5 2.4625 0.5 5.5C0.5 6.66563 0.8625 7.74687 1.48125 8.63437C1.6375 8.85938 1.8 9.08125 1.9625 9.30313C2.58125 10.15 3.20312 11.0031 3.5 11.9969H8.5V12ZM6 16C7.38125 16 8.5 14.8813 8.5 13.5V13H3.5V13.5C3.5 14.8813 4.61875 16 6 16ZM3.5 5.5C3.5 5.775 3.275 6 3 6C2.725 6 2.5 5.775 2.5 5.5C2.5 3.56562 4.06562 2 6 2C6.275 2 6.5 2.225 6.5 2.5C6.5 2.775 6.275 3 6 3C4.61875 3 3.5 4.11875 3.5 5.5Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_92_525">
                        <path d="M0 0H12V16H0V0Z" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937]">
                  Tips Keuangan
                </h3>
              </div>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Catat setiap transaksi secara rutin agar keuangan Anda lebih
                terkontrol dan mudah dianalisis.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TambahTransaksi;
