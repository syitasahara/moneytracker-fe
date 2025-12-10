import React, { useState } from "react";

const EditTransaksi = ({ transaction, onSave, onCancel }) => {
  const isPemasukan = transaction.type === "pemasukan";

  const [formData, setFormData] = useState({
    name: transaction.name,
    amount: Math.abs(transaction.amount),
    type: transaction.type,
    date: transaction.date || getCurrentDate(),
    paymentMethod: transaction.paymentMethod || "Tunai",
    category: transaction.category || "Makanan & Minuman",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Format date untuk input
  function formatDateForInput(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split(" ");
    if (parts.length === 3) {
      const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        Mei: "05",
        Jun: "06",
        Jul: "07",
        Agu: "08",
        Sep: "09",
        Okt: "10",
        Nov: "11",
        Des: "12",
      };
      const day = parts[0];
      const month = months[parts[1]];
      const year = parts[2];
      return `${year}-${month}-${day.padStart(2, "0")}`;
    }
    return "";
  }

  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const categories = [
    "Makanan & Minuman",
    "Transportasi",
    "Hiburan",
    "Pendidikan",
    "Kesehatan",
    "Belanja",
    "Tagihan",
    "Lainnya",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format tanggal ke format yang lebih user friendly
    const formattedDate = formatDateToDisplay(formData.date);

    const updatedTransaction = {
      ...transaction,
      ...formData,
      amount: isPemasukan
        ? parseInt(formData.amount)
        : -parseInt(formData.amount),
      date: formattedDate,
    };

    // Tampilkan popup sukses
    setShowSuccessPopup(true);
  };

  const handleSaveConfirm = () => {
    // Format tanggal ke format yang lebih user friendly
    const formattedDate = formatDateToDisplay(formData.date);

    const updatedTransaction = {
      ...transaction,
      ...formData,
      amount: isPemasukan
        ? parseInt(formData.amount)
        : -parseInt(formData.amount),
      date: formattedDate,
    };

    // Panggil onSave untuk menyimpan transaksi
    onSave(updatedTransaction);
    // Tutup popup
    setShowSuccessPopup(false);
  };

  const formatDateToDisplay = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <main className="flex-1 p-6">
      {/* Popup Sukses */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                {/* Ikon Centang */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="110"
                    height="95"
                    viewBox="0 0 110 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M109.083 47.4089L96.985 34.8117L98.6708 18.1508L80.7713 14.4484L71.4 0L54.5417 6.59209L37.6833 0L28.3121 14.4033L10.4125 18.0605L12.0983 34.7665L0 47.4089L12.0983 60.0061L10.4125 76.7121L28.3121 80.4145L37.6833 94.8177L54.5417 88.1805L71.4 94.7726L80.7713 80.3693L98.6708 76.6669L96.985 60.0061L109.083 47.4089ZM41.5508 65.5145L29.75 54.6782C29.2903 54.2605 28.9257 53.7644 28.6769 53.2181C28.428 52.6719 28.3 52.0864 28.3 51.4951C28.3 50.9037 28.428 50.3182 28.6769 49.772C28.9257 49.2258 29.2903 48.7296 29.75 48.3119L30.0971 47.9958C32.0308 46.2349 35.2042 46.2349 37.1379 47.9958L45.1208 55.3103L70.6562 32.0123C72.59 30.2514 75.7633 30.2514 77.6971 32.0123L78.0442 32.3283C79.9779 34.0892 79.9779 36.9338 78.0442 38.6947L48.6908 65.5145C46.6579 67.2754 43.5342 67.2754 41.5508 65.5145Z"
                      fill="#22C55E"
                    />
                  </svg>
                </div>

                {/* Judul Popup */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Edit Transaksi {isPemasukan ? "Pemasukan" : "Pengeluaran"}{" "}
                  Berhasil Disimpan
                </h3>

                {/* Tombol Oke */}
                <button
                  onClick={handleSaveConfirm}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
                >
                  Oke
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Form Edit Transaksi {isPemasukan ? "Pemasukan" : "Pengeluaran"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isPemasukan
            ? "Edit detail pemasukan Anda"
            : "Edit detail pengeluaran Anda"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Jumlah (Rp) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah (Rp)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  min="0"
                  required
                  placeholder="0"
                />
              </div>
            </div>

            {/* Nama Transaksi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama {isPemasukan ? "Pemasukan" : "Pengeluaran"}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder={`Masukkan nama ${
                  isPemasukan ? "pemasukan" : "pengeluaran"
                }`}
              />
            </div>

            {/* Tanggal */}
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
                required
              />
            </div>

            {/* Hanya untuk Pengeluaran: Kategori */}
            {!isPemasukan && (
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
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Metode Pembayaran */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Metode Pembayaran
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Tunai"
                    checked={formData.paymentMethod === "Tunai"}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Tunai</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Non Tunai"
                    checked={formData.paymentMethod === "Non Tunai"}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-gray-700">Non-Tunai</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-10 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-grow bg-[#3B82F6] hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_490_696)">
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
                onClick={onCancel}
                className="flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-300 flex items-center justify-center gap-2"
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditTransaksi;
