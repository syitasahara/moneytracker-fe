import React, { useState } from "react";

const EditTransaksi = ({ transaction, categories, onSave, onCancel }) => {
  const isPemasukan = transaction.type === "pemasukan";

  // Format date dari format backend ke format input (YYYY-MM-DD)
  function getCurrentDate() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function formatDateForInput(dateStr) {
    if (!dateStr) return getCurrentDate();

    // Kalau format sudah YYYY-MM-DD / ISO
    if (dateStr.includes("-") && dateStr.split("-").length === 3) {
      return dateStr.split("T")[0]; // ambil date-nya saja
    }

    // Kalau format display (misal: "16 Nov 2025")
    const parts = dateStr.split(" ");
    if (parts.length === 3) {
      const months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        Mei: "05",
        May: "05",
        Jun: "06",
        Jul: "07",
        Agu: "08",
        Aug: "08",
        Sep: "09",
        Okt: "10",
        Oct: "10",
        Nov: "11",
        Des: "12",
        Dec: "12",
      };
      const day = parts[0].padStart(2, "0");
      const month = months[parts[1]];
      const year = parts[2];
      return `${year}-${month}-${day}`;
    }

    return getCurrentDate();
  }

  const [formData, setFormData] = useState({
    name: transaction.name || "",
    amount: Math.abs(transaction.amount) || "",
    type: transaction.type || "pemasukan",
    date:
      formatDateForInput(transaction.transaction_date) || getCurrentDate(),
    paymentMethod: transaction.paymentMethod || "Tunai",
    category_id: transaction.category_id || "",
    rawType:
      transaction.rawType ||
      (transaction.type === "pemasukan" ? "income" : "expense"),
    rawPaymentMethod:
      transaction.rawPaymentMethod ||
      (transaction.paymentMethod === "Tunai" ? "cash" : "non-cash"),
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updates = { [name]: value };

    // kategori
    if (name === "category_id") {
      updates.category_id = value ? parseInt(value) : null;
    }

    // metode pembayaran
    if (name === "paymentMethod") {
      updates.rawPaymentMethod = value === "Tunai" ? "cash" : "non-cash";
    }

    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount) {
      alert("Nominal wajib diisi.");
      return;
    }

    if (!formData.name) {
      alert("Nama transaksi wajib diisi.");
      return;
    }

    if (!isPemasukan && !formData.category_id) {
      alert("Kategori pengeluaran wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const updatedTransaction = {
        id: transaction.id,
        name: formData.name,
        amount: parseInt(formData.amount),
        type: formData.type,
        rawType: formData.rawType,
        category_id: isPemasukan ? null : parseInt(formData.category_id),
        paymentMethod: formData.paymentMethod,
        rawPaymentMethod: formData.rawPaymentMethod,
        transaction_date: formData.date,
      };

      await onSave(updatedTransaction);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Gagal menyimpan transaksi: " +
          (error.message || "Terjadi kesalahan")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfirm = () => {
    setShowSuccessPopup(false);
  };

  return (
    <main className="flex-1 p-6">
      {/* Popup Sukses */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      stroke="#22C55E"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Edit Transaksi Berhasil!
                </h3>
                <p className="text-gray-600 mb-6">
                  Transaksi {isPemasukan ? "pemasukan" : "pengeluaran"} telah
                  berhasil diperbarui
                </p>

                <button
                  onClick={handleSaveConfirm}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200"
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
            {/* Jumlah */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jumlah (Rp) <span className="text-red-500">*</span>
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

            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama {isPemasukan ? "Pemasukan" : "Pengeluaran"}{" "}
                <span className="text-red-500">*</span>
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
                Tanggal <span className="text-red-500">*</span>
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

            {/* Kategori (kalau pengeluaran) */}
            {!isPemasukan && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories && categories.length > 0 ? (
                      categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Makanan & Minuman</option>
                        <option value="2">Transportasi</option>
                        <option value="3">Hiburan</option>
                        <option value="4">Lainnya</option>
                      </>
                    )}
                  </select>
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

            {/* Metode Pembayaran */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Metode Pembayaran <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Tunai"
                    checked={formData.paymentMethod === "Tunai"}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700">Tunai</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Non Tunai"
                    checked={formData.paymentMethod === "Non Tunai"}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
                  />
                  <span className="ml-2 text-gray-700">Non-Tunai</span>
                </label>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="flex space-x-4 mt-10 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-grow ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#3B82F6] hover:bg-blue-700"
                } text-white py-3 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className={`flex-none ${
                  isLoading
                    ? "bg-gray-100 cursor-not-allowed opacity-50"
                    : "bg-gray-100 hover:bg-gray-200"
                } text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-300 flex items-center justify-center gap-2`}
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
