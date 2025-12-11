import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EditTransaksi from "./EditTransaksi";
import api from "../api/api";

const RiwayatTransaksi = () => {
  // const navigate = useNavigate();
  const [filter, setFilter] = useState("semua");
  const [categoryFilter, setCategoryFilter] = useState("semua");
  const [paymentFilter, setPaymentFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchTransactions();
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      const categoriesData = response.data.categories || [];
      setCategories(categoriesData);
      return categoriesData;
    } catch (err) {
      console.error("Error fetching categories:", err);
      const fallbackCategories = [
        { id: 1, name: "makanan & minuman" },
        { id: 2, name: "transportasi" },
        { id: 3, name: "hiburan" },
        { id: 4, name: "lainnya" },
      ];
      setCategories(fallbackCategories);
      return fallbackCategories;
    }
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get("/transactions");

      const currentCategories =
        categories.length > 0 ? categories : await fetchCategories();

      const transformedData = response.data.transactions.map((tx) => {
        let categoryName = "";
        if (tx.category_id) {
          const category = currentCategories.find(
            (cat) => cat.id === tx.category_id
          );
          if (category) {
            categoryName = category.name
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          }
        }

        return {
          id: tx.id,
          name: tx.name,
          amount: tx.type === "income" ? tx.amount : -tx.amount,
          type: tx.type === "income" ? "pemasukan" : "pengeluaran",
          date: formatDate(tx.transaction_date),
          time: formatTime(tx.created_at),
          category: categoryName,
          paymentMethod: tx.payment_method === "cash" ? "Tunai" : "Non Tunai",
          category_id: tx.category_id,
          rawType: tx.type,
          rawPaymentMethod: tx.payment_method,
          transaction_date: tx.transaction_date,
        };
      });

      setTransactions(transformedData);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Gagal memuat data transaksi");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Hitung total saldo, pemasukan, dan pengeluaran
  const calculateTotals = () => {
    const pemasukan = transactions
      .filter((tx) => tx.type === "pemasukan")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const pengeluaran = transactions
      .filter((tx) => tx.type === "pengeluaran")
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    const saldo = pemasukan - pengeluaran;

    return { saldo, pemasukan, pengeluaran };
  };

  const { saldo, pemasukan, pengeluaran } = calculateTotals();

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowPopup(true);
  };

  const handleEditClick = () => {
    setShowPopup(false);
    setIsEditing(true);
  };

  const handleDeleteClick = async () => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus transaksi "${selectedTransaction.name}"?`
      )
    ) {
      try {
        await api.delete(`/transactions/${selectedTransaction.id}`);

        await fetchTransactions();

        setShowPopup(false);
        setSelectedTransaction(null);
        alert("Transaksi berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting transaction:", err);
        alert(
          "Gagal menghapus transaksi: " +
            (err.response?.data?.message || err.message)
        );
      }
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedTransaction(null);
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      if (
        updatedTransaction.rawType === "income" &&
        updatedTransaction.category_id
      ) {
        alert("Pemasukan tidak boleh memiliki kategori!");
        return;
      }

      if (
        updatedTransaction.rawType === "expense" &&
        !updatedTransaction.category_id
      ) {
        alert("Pengeluaran harus memiliki kategori!");
        return;
      }

      const payload = {
        name: updatedTransaction.name,
        type: updatedTransaction.rawType,
        category_id:
          updatedTransaction.rawType === "income"
            ? null
            : updatedTransaction.category_id,
        amount: Math.abs(updatedTransaction.amount),
        payment_method: updatedTransaction.rawPaymentMethod,
        transaction_date: updatedTransaction.transaction_date,
      };

      await api.put(`/transactions/${updatedTransaction.id}`, payload);

      await fetchTransactions();

      setIsEditing(false);
      setSelectedTransaction(null);
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert(
        "Gagal memperbarui transaksi: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTransaction(null);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesTypeFilter =
      filter === "semua" ||
      (filter === "pemasukan" && transaction.type === "pemasukan") ||
      (filter === "pengeluaran" && transaction.type === "pengeluaran");

    const matchesCategoryFilter =
      categoryFilter === "semua" ||
      transaction.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesPaymentFilter =
      paymentFilter === "semua" || transaction.paymentMethod === paymentFilter;

    const matchesSearch = transaction.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      matchesTypeFilter &&
      matchesCategoryFilter &&
      matchesPaymentFilter &&
      matchesSearch
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, categoryFilter, paymentFilter, searchQuery]);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (isEditing && selectedTransaction) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <EditTransaksi
          transaction={selectedTransaction}
          categories={categories}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Popup Modal untuk Edit/Delete */}
      {showPopup && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                Pilih Aksi
              </h3>
              <button
                onClick={handleClosePopup}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Transaction Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-1">Transaksi:</p>
              <p className="font-semibold text-gray-800">
                {selectedTransaction.name}
              </p>
              <p
                className={`text-lg font-bold mt-2 ${
                  selectedTransaction.type === "pemasukan"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedTransaction.type === "pemasukan" ? "+" : "-"}Rp{" "}
                {Math.abs(selectedTransaction.amount).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleEditClick}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit Transaksi
              </button>

              <button
                onClick={handleDeleteClick}
                className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Hapus Transaksi
              </button>

              <button
                onClick={handleClosePopup}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Konten Utama */}
      <main className="flex-1 p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Riwayat Transaksi
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Kelola keuangan mahasiswa dengan mudah
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Memuat data transaksi...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Content */}
        {!loading && !error && (
          <>
            {/* Cards saldo/pemasukan/pengeluaran */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {/* Saldo */}
              <div className="bg-[#3B82F6] rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-semibold text-[#E0E7FF]">
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
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    Rp {saldo.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-[#E0E7FF] text-xs sm:text-sm flex items-center">
                  Saldo saat ini
                </p>
              </div>

              {/* Pemasukan */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-[#4B5563]">
                    Pemasukan
                  </h2>
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
                  <span className="text-xl sm:text-2xl font-bold text-black">
                    Rp {pemasukan.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-[#6B7280] text-xs sm:text-sm">
                  Total pemasukan
                </p>
              </div>

              {/* Pengeluaran */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-medium text-[#4B5563]">
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
                  <span className="text-xl sm:text-2xl font-bold text-black">
                    Rp {pengeluaran.toLocaleString("id-ID")}
                  </span>
                </div>
                <p className="text-[#6B7280] text-xs sm:text-sm">
                  Total pengeluaran
                </p>
              </div>
            </div>

            {/* Main content list + filter + pagination */}
            <div className="bg-white rounded-lg shadow-sm">
              {/* Filter & search */}
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* Filter jenis transaksi */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Filter:
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                      <button
                        onClick={() => setFilter("semua")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                          filter === "semua"
                            ? "bg-[#2563EB] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Semua
                      </button>
                      <button
                        onClick={() => setFilter("pemasukan")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                          filter === "pemasukan"
                            ? "bg-[#2563EB] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Pemasukan
                      </button>
                      <button
                        onClick={() => setFilter("pengeluaran")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                          filter === "pengeluaran"
                            ? "bg-[#2563EB] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        Pengeluaran
                      </button>
                    </div>
                  </div>

                  {/* Filter kategori + metode + search */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 lg:items-center">
                    {/* Filter kategori */}
                    <div className="relative w-full lg:w-auto">
                      <select
                        className="w-full px-4 py-2.5 pr-10 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="semua">Semua Kategori</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
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
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="w-4 h-4"
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

                    {/* Filter metode pembayaran */}
                    <div className="relative w-full lg:w-auto">
                      <select
                        className="w-full px-4 py-2.5 pr-10 text-sm font-medium border border-gray-300 rounded-lg bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer appearance-none"
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                      >
                        <option value="semua">Semua Metode</option>
                        <option value="Tunai">Tunai</option>
                        <option value="Non Tunai">Non Tunai</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="w-4 h-4"
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

                    {/* Search */}
                    <div className="relative w-full sm:col-span-2 lg:w-64">
                      <input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
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

              {/* List transaksi */}
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
                  Daftar Transaksi
                </h3>
                {filteredTransactions.length > 0 ? (
                  <div className="space-y-3">
                    {currentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        onClick={() => handleTransactionClick(transaction)}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 hover:shadow-sm border border-transparent hover:border-gray-200"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${
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
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-xs sm:text-sm text-gray-500">
                                {transaction.date}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500">
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
                            className={`text-lg font-bold block ${
                              transaction.type === "pemasukan"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "pemasukan" ? "+" : "-"}Rp{" "}
                            {Math.abs(transaction.amount).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                          <div className="mt-1">
                            <span className="text-xs text-blue-600 font-medium flex items-center justify-end">
                              Klik untuk opsi
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
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="pt-6 mt-6 border-t border-gray-200 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-xs sm:text-sm text-gray-500">
                          Menampilkan {startIndex + 1}-
                          {Math.min(endIndex, filteredTransactions.length)} dari{" "}
                          {filteredTransactions.length} transaksi
                        </p>

                        <div className="flex flex-wrap items-center gap-2 justify-end">
                          {/* Prev */}
                          <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                              currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Sebelumnya
                          </button>

                          {/* Page numbers */}
                          <div className="flex gap-1">
                            {getPageNumbers().map((page, index) =>
                              page === "..." ? (
                                <span
                                  key={`ellipsis-${index}`}
                                  className="px-3 py-2 text-gray-500 text-sm"
                                >
                                  ...
                                </span>
                              ) : (
                                <button
                                  key={page}
                                  onClick={() => goToPage(page)}
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                                    currentPage === page
                                      ? "bg-[#3B82F6] text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {page}
                                </button>
                              )
                            )}
                          </div>

                          {/* Next */}
                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                              currentPage === totalPages
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            Selanjutnya
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg
                      className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4"
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
                    <p className="text-gray-500 text-sm sm:text-base">
                      Tidak ada transaksi yang ditemukan
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default RiwayatTransaksi;
