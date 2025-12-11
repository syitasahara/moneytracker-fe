import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Pengaturan = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [userId, setUserId] = useState(null);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.id) {
          setUserId(parsed.id);
        }
      } catch (e) {
        console.error("Gagal parse user dari localStorage:", e);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGantiPassword = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User tidak ditemukan. Coba login ulang.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Password baru dan konfirmasi password tidak sama.");
      return;
    }

    if (!formData.oldPassword || !formData.newPassword) {
      alert("Password lama dan password baru wajib diisi.");
      return;
    }

    try {
      setLoadingPassword(true);

      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      };

      const res = await api.put(`/users/${userId}/password`, payload);

      alert(res.data?.message || "Password updated successfully");

      setActivePopup(null);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Error ganti password:", error);
      const msg =
        error.response?.data?.message ||
        "Gagal ganti password. Pastikan password lama benar.";
      alert(msg);
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleHapusAkun = async () => {
    if (!userId) {
      alert("User tidak ditemukan. Coba login ulang.");
      return;
    }

    const yakin = window.confirm(
      "Apakah kamu yakin ingin menghapus akun? Aksi ini tidak bisa dibatalkan."
    );
    if (!yakin) return;

    try {
      setLoadingDelete(true);

      await api.delete(`/users/${userId}`);

      alert("Akun berhasil dihapus.");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setActivePopup(null);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error hapus akun:", error);
      const msg =
        error.response?.data?.message ||
        "Gagal menghapus akun. Coba lagi nanti.";
      alert(msg);
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
            <p className="text-gray-600">
              Kelola keuangan mahasiswa dengan mudah
            </p>
          </div>
        </div>

        {/* Container untuk konten utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header Card */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Pengaturan Akun
                </h2>
              </div>

              {/* Content Area */}
              <div className="divide-y divide-gray-200">
                {/* Ganti Password Card */}
                <button
                  onClick={() => setActivePopup("ganti-password")}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    {/* Icon Ganti Password */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg mr-4">
                      <svg
                        width="36"
                        height="19"
                        viewBox="0 0 36 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 0C19.3261 0 20.5979 0.500445 21.5355 1.39124C22.4732 2.28204 23 3.49022 23 4.75V7.6C23.7956 7.6 24.5587 7.90027 25.1213 8.43475C25.6839 8.96922 26 9.69413 26 10.45V16.15C26 16.9059 25.6839 17.6308 25.1213 18.1653C24.5587 18.6997 23.7956 19 23 19H13C12.2044 19 11.4413 18.6997 10.8787 18.1653C10.3161 17.6308 10 16.9059 10 16.15V10.45C10 9.69413 10.3161 8.96922 10.8787 8.43475C11.4413 7.90027 12.2044 7.6 13 7.6V4.75C13 3.49022 13.5268 2.28204 14.4645 1.39124C15.4021 0.500445 16.6739 0 18 0ZM18 11.4C17.4954 11.3998 17.0094 11.5809 16.6395 11.9068C16.2695 12.2328 16.0428 12.6795 16.005 13.1575L16 13.3C16 13.6758 16.1173 14.0431 16.3371 14.3556C16.5568 14.668 16.8692 14.9116 17.2346 15.0554C17.6001 15.1992 18.0022 15.2368 18.3902 15.1635C18.7781 15.0902 19.1345 14.9092 19.4142 14.6435C19.6939 14.3778 19.8844 14.0392 19.9616 13.6707C20.0387 13.3021 19.9991 12.9201 19.8478 12.5729C19.6964 12.2257 19.44 11.929 19.1111 11.7202C18.7822 11.5114 18.3956 11.4 18 11.4ZM18 1.9C17.2044 1.9 16.4413 2.20027 15.8787 2.73475C15.3161 3.26922 15 3.99413 15 4.75V7.6H21V4.75C21 3.99413 20.6839 3.26922 20.1213 2.73475C19.5587 2.20027 18.7956 1.9 18 1.9Z"
                          fill="#374151"
                          fillOpacity="0.77"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-base mb-1">
                        Ganti Password
                      </div>
                      <p className="text-sm text-gray-500">
                        Ubah kata sandi anda untuk menjaga keamanan akun anda
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActivePopup("hapus-akun")}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg mr-4">
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 5H20C20.2833 5 20.521 5.096 20.713 5.288C20.905 5.48 21.0007 5.71733 21 6C20.9993 6.28267 20.9033 6.52033 20.712 6.713C20.5207 6.90567 20.2833 7.00133 20 7H16C15.7167 7 15.4793 6.904 15.288 6.712C15.0967 6.52 15.0007 6.28267 15 6C14.9993 5.71733 15.0953 5.48 15.288 5.288C15.4807 5.096 15.718 5 16 5ZM8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 14V13.2C0 12.6333 0.146 12.1127 0.438 11.638C0.73 11.1633 1.11733 10.8007 1.6 10.55C2.63333 10.0333 3.68333 9.646 4.75 9.388C5.81667 9.13 6.9 9.00067 8 9C9.1 8.99933 10.1833 9.12867 11.25 9.388C12.3167 9.64733 13.3667 10.0347 14.4 10.55C14.8833 10.8 15.271 11.1627 15.563 11.638C15.855 12.1133 16.0007 12.634 16 13.2V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14Z"
                          fill="#656D79"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-base mb-1">
                        Hapus Akun
                      </div>
                      <p className="text-sm text-gray-500">
                        Akun yang sudah terhapus tidak dapat dikembalikan lagi
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Ganti Password */}
        {activePopup === "ganti-password" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Ganti Password
                </h3>
              </div>

              {/* Form */}
              <form onSubmit={handleGantiPassword} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Lama
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      placeholder="Masukkan password lama"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Baru
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Buat password baru"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ulangi Password Baru
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Ulangi password baru"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-8">
                  <button
                    type="submit"
                    disabled={loadingPassword}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                  >
                    {loadingPassword ? "Menyimpan..." : "Simpan Password"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePopup(null);
                      setFormData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-300"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Popup Hapus Akun */}
        {activePopup === "hapus-akun" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">
                  Hapus Akun?
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-700 text-center">
                    Apakah anda yakin akan menghapus akun? Aksi ini tidak dapat
                    dibatalkan.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleHapusAkun}
                    disabled={loadingDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200 disabled:opacity-50"
                  >
                    {loadingDelete ? "Menghapus..." : "Hapus akun"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePopup(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition duration-200 border border-gray-300"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Pengaturan;
