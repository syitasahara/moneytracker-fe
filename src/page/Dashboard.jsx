import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // State untuk data dari backend
  const [dashboardData, setDashboardData] = useState({
    income: 0,
    expense: 0,
    balance: 0,
    latest: [],
  });
  const [statsData, setStatsData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [categories, setCategories] = useState([]); // categories
  const [loading, setLoading] = useState(true);

  // Warna untuk pie chart
  const COLORS = ["#3B82F6", "#22C55E", "#EAB308", "#EF4444", "#A855F7"];

  // Fetch data dari backend saat component mount
  useEffect(() => {
    fetchDashboardData();
    fetchStatsData();
    fetchUserProfile();
    fetchCategories(); // Fetch categories untuk mapping
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fungsi untuk fetch categories
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // fallback statis kalau API kategori gagal
      setCategories([
        { id: 1, name: "makanan & minuman" },
        { id: 2, name: "transportasi" },
        { id: 3, name: "hiburan" },
        { id: 4, name: "lainnya" },
      ]);
    }
  };

  // Fungsi untuk mendapatkan nama kategori berdasarkan ID
  const getCategoryName = (categoryId) => {
    if (!categoryId) return "Lainnya";
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return "Lainnya";
    // Capitalize first letter of each word
    return category.name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Fungsi untuk mendapatkan nama metode pembayaran
  const getPaymentMethodName = (paymentMethod) => {
    if (!paymentMethod) return "Tunai";

    const method = paymentMethod.toLowerCase();
    if (method === "cash" || method === "tunai") {
      return "Tunai";
    } else if (
      method === "non-cash" ||
      method === "non tunai" ||
      method === "non-tunai"
    ) {
      return "Non-Tunai";
    }

    return "Tunai";
  };

  // Fungsi untuk fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/dashboard");
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fungsi untuk fetch stats data (kategori pengeluaran)
  const fetchStatsData = async () => {
    try {
      const response = await api.get("/stats");
      setStatsData(response.data.byCategory || []);
    } catch (error) {
      console.error("Error fetching stats data:", error);
      setStatsData([]);
    }
  };

  // Fungsi untuk fetch user profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      // Decode token untuk mendapatkan user ID
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.userId || payload.user_id || payload.id;

      const response = await api.get(`/users/${userId}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Hitung persentase untuk setiap kategori
  const calculatePercentages = () => {
    if (!Array.isArray(statsData) || statsData.length === 0) {
      return [];
    }

    const total = statsData.reduce(
      (sum, item) => sum + Number(item.value || 0),
      0
    );
    return statsData.map((item, index) => ({
      name: item.name,
      percentage:
        total > 0 ? ((Number(item.value) / total) * 100).toFixed(1) : 0,
      color: COLORS[index % COLORS.length],
    }));
  };

  const categoriesPercentage = calculatePercentages();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID").format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hari ini";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Kemarin";
    } else {
      const diffTime = Math.abs(today - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} hari lalu`;
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

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
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                    {userData?.image ? (
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
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
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {userData?.username || "User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userData?.status_mahasiswa || "Mahasiswa"}
                  </p>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    isProfileMenuOpen ? "transform rotate-180" : ""
                  }`}
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
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
                        {userData?.image ? (
                          <img
                            src={userData.image}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
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
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {userData?.username || "User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userData?.email || "email@example.com"}
                        </p>
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
                      onClick={handleLogout}
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
                Rp {formatCurrency(dashboardData.balance)}
              </span>
            </div>
            <p className="text-[#E0E7FF] text-sm flex items-center">
              Saldo saat ini
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
                Rp {formatCurrency(dashboardData.income)}
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
                Rp {formatCurrency(dashboardData.expense)}
              </span>
            </div>
            <p className="text-[#6B7280] text-sm">Bulan ini</p>
          </div>
        </div>

        {/* Pengeluaran per Kategori dan Transaksi Terbaru */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pengeluaran per Kategori - Pie Chart di tengah */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">
              Pengeluaran per Kategori
            </h2>
            {statsData.length > 0 ? (
              <div className="flex flex-col items-center">
                {/* Diagram Pie */}
                <div className="relative w-48 h-48 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {statsData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legenda di bawah */}
                <div className="w-full">
                  <div className="grid grid-cols-2 gap-3">
                    {categoriesPercentage.map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <span className="text-gray-600 text-sm">
                            {category.name}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900 text-sm ml-2">
                          {category.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Belum ada data pengeluaran
              </p>
            )}
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
              {dashboardData.latest && dashboardData.latest.length > 0 ? (
                dashboardData.latest.map((transaction, index) => (
                  <div
                    key={transaction.id || index}
                    className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                          transaction.type === "income"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {transaction.type === "income" ? (
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
                          {transaction.type === "income"
                            ? getPaymentMethodName(
                                transaction.payment_method
                              )
                            : getCategoryName(transaction.category_id)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}Rp{" "}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(
                          transaction.transaction_date || transaction.created_at
                        )}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Belum ada transaksi
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
