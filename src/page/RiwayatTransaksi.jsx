import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EditTransaksi from "./EditTransaksi";

const RiwayatTransaksi = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const transactions = [
    {
      id: 1,
      name: "Uang Saku Orang Tua",
      amount: 2000000,
      type: "pemasukan",
      date: "16 Nov 2025",
      time: "09:30",
      category: "",
      paymentMethod: "Non Tunai",
    },
    {
      id: 2,
      name: "Makan Siang di Kantin",
      amount: -25000,
      type: "pengeluaran",
      date: "16 Nov 2025",
      time: "12:15",
      category: "Makanan & Minuman",
      paymentMethod: "Tunai",
    },
    {
      id: 3,
      name: "Ongkos Angkot Pulang",
      amount: -8000,
      type: "pengeluaran",
      date: "16 Nov 2025",
      time: "16:45",
      category: "Transportasi",
      paymentMethod: "Tunai",
    },
    {
      id: 4,
      name: "Freelance Design Project",
      amount: 500000,
      type: "pemasukan",
      date: "16 Nov 2025",
      time: "14:20",
      category: "",
      paymentMethod: "Non Tunai",
    },
    {
      id: 5,
      name: "Nonton Bioskop",
      amount: -45000,
      type: "pengeluaran",
      date: "15 Nov 2025",
      time: "19:30",
      category: "Hiburan",
      paymentMethod: "Non Tunai",
    },
    {
      id: 6,
      name: "Kopi & Snack",
      amount: -35000,
      type: "pengeluaran",
      date: "15 Nov 2025",
      time: "15:00",
      category: "Makanan & Minuman",
      paymentMethod: "Non Tunai",
    },
  ];

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedTransaction) => {
    // Logic untuk menyimpan transaksi yang diedit
    console.log("Transaksi diperbarui:", updatedTransaction);
    setIsEditing(false);
    setSelectedTransaction(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter =
      filter === "semua" ||
      (filter === "pemasukan" && transaction.type === "pemasukan") ||
      (filter === "pengeluaran" && transaction.type === "pengeluaran");

    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (isEditing && selectedTransaction) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <EditTransaksi
          transaction={selectedTransaction}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-600 mt-1">
            Kelola keuangan mahasiswa dengan mudah
          </p>
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

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Filter and Search Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-medium text-gray-700">Filter:</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter("semua")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      filter === "semua"
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setFilter("pemasukan")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      filter === "pemasukan"
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pemasukan
                  </button>
                  <button
                    onClick={() => setFilter("pengeluaran")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${
                      filter === "pengeluaran"
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Pengeluaran
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
                  <option>Semua Kategori</option>
                  <option>Makanan & Minuman</option>
                  <option>Transportasi</option>
                  <option>Hiburan</option>
                </select>

                <select className="px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white">
                  <option>Semua Metode</option>
                  <option>Tunai</option>
                  <option>Non Tunai</option>
                </select>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Daftar Transaksi
            </h3>

            {filteredTransactions.length > 0 ? (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    onClick={() => handleTransactionClick(transaction)}
                    className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 hover:shadow-sm border border-transparent hover:border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          transaction.type === "pemasukan"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "pemasukan" ? (
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900">
                          {transaction.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">
                            {transaction.date}
                          </span>
                          <span className="text-sm text-gray-500">
                            {transaction.time}
                          </span>
                          {transaction.category && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {transaction.category}
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              transaction.paymentMethod === "Tunai"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-purple-100 text-purple-700"
                            }`}
                          >
                            {transaction.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-lg font-bold ${
                          transaction.type === "pemasukan"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "pemasukan" ? "+" : "-"}Rp{" "}
                        {Math.abs(transaction.amount).toLocaleString("id-ID")}
                      </span>
                      <div className="mt-1">
                        <span className="text-xs text-blue-600 font-medium flex items-center justify-end">
                          Klik untuk mengedit
                          <svg
                            className="w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination Info */}
                <div className="pt-4 mt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    Menampilkan {filteredTransactions.length} dari {transactions.length} transaksi
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500">
                  Tidak ada transaksi yang ditemukan
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiwayatTransaksi;