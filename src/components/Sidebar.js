import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 1, name: "Dashboard", path: "/dashboard", active: location.pathname === "/dashboard" },
    { id: 2, name: "Tambah Transaksi", path: "/tambah-transaksi", active: location.pathname === "/tambah-transaksi" },
    { id: 3, name: "Edit Transaksi", path: "/edit-transaksi", active: location.pathname === "/edit-transaksi" },
    { id: 4, name: "Riwayat Transaksi", path: "/riwayat-transaksi", active: location.pathname === "/riwayat-transaksi" },
    { id: 5, name: "Statistik", path: "/statistik", active: location.pathname === "/statistik" },
    { id: 6, name: "Pengaturan", path: "/pengaturan", active: location.pathname === "/pengaturan" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-white text-white flex flex-col min-h-screen shadow-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">MoneyTracker</h1>
        <p className="text-gray-600 mt-1">Keuangan Mahasiswa</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="flex-1 text-left">{item.name}</span>
                {item.active && (
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="font-semibold text-white">AR</span>
          </div>
          <div>
            <p className="font-medium text-black">Ahmad Rizki</p>
            <p className="text-sm text-gray-600">Mahasiswa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;