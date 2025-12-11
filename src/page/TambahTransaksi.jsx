import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

function TambahTransaksi() {
  const [formData, setFormData] = useState({
    type: "pemasukan",
    amount: "",
    name: "",
    category_id: "",
    date: "",
    payment_method: "tunai",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([
        { id: 1, name: "makanan & minuman" },
        { id: 2, name: "transportasi" },
        { id: 3, name: "hiburan" },
        { id: 4, name: "lainnya" },
      ]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (method) => {
    setFormData({ ...formData, payment_method: method });
  };

  const handleCancel = () => {
    navigate("/riwayat-transaksi");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.amount) return alert("Nominal wajib diisi.");
    if (!formData.name) return alert("Nama wajib diisi.");
    if (formData.type === "pengeluaran" && !formData.category_id)
      return alert("Kategori pengeluaran wajib diisi.");

    setLoading(true);

    try {
      const payload = {
        type: formData.type === "pemasukan" ? "income" : "expense",
        amount: Number(formData.amount),
        name: formData.name,
        payment_method:
          formData.payment_method === "tunai" ? "cash" : "non-cash",
        transaction_date:
          formData.date || new Date().toISOString().split("T")[0],
        ...(formData.type === "pengeluaran" && {
          category_id: Number(formData.category_id),
        }),
      };

      await api.post("/transactions", payload);

      alert("Transaksi berhasil ditambahkan!");
      navigate("/riwayat-transaksi");
    } catch (err) {
      console.error(err);
      alert(
        "Gagal menambahkan transaksi: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Tambah Transaksi</h1>
          <p className="text-gray-600 mt-1">
            Kelola keuangan mahasiswa dengan mudah
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">
                Form Transaksi
              </h2>

              {/* Type */}
              <div className="flex mb-8 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "pemasukan" })
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    formData.type === "pemasukan"
                      ? "bg-[#F0FDF4] text-[#16A34A] border-[#22C55E] shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Pemasukan
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, type: "pengeluaran" })
                  }
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                    formData.type === "pengeluaran"
                      ? "bg-[#FFE8E8] text-[#DC2626] border-[#DC2626] shadow-sm"
                      : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Pengeluaran
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah (Rp) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    Rp
                  </div>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Name */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.type === "pemasukan"
                    ? "Nama Pemasukan"
                    : "Nama Pengeluaran"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder={`Masukkan nama ${
                    formData.type === "pemasukan" ? "pemasukan" : "pengeluaran"
                  }`}
                />
              </div>

              {/* Category */}
              {formData.type === "pengeluaran" && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </option>
                      ))}
                    </select>
                    {/* Custom Arrow Icon */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
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
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Date */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <label className="block text.sm font-medium text-gray-700 mb-2">
                  Metode Pembayaran <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("tunai")}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                      formData.payment_method === "tunai"
                        ? "bg-[#EEF2FF] text-[#3B82F6] border-[#3B82F6] shadow-sm"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Tunai
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePaymentMethodChange("non-tunai")}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all ${
                      formData.payment_method === "non-tunai"
                        ? "bg-[#EEF2FF] text-[#3B82F6] border-[#3B82F6] shadow-sm"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    Non-Tunai
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-10 border-t pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`flex-grow ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#3B82F6] hover:bg-blue-700"
                  } text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Menyimpan...
                    </>
                  ) : (
                    "Simpan Transaksi"
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className={`${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  } bg-gray-100 border py-3 px-6 rounded-lg transition-colors`}
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
                    <g clipPath="url(#clip0_92_525)">
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
}

export default TambahTransaksi;
