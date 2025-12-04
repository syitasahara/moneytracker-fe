import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Pengaturan = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGantiPassword = (e) => {
    e.preventDefault();
    // Handle ganti password logic here
    console.log('Ganti password:', formData);
    setActivePopup(null);
    setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleHapusAkun = () => {
    // Handle hapus akun logic here
    console.log('Hapus akun');
    setActivePopup(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header Sederhana */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
          <p className="text-gray-600 mt-1">Kelola keuangan mahasiswa dengan mudah</p>
        </div>

        {/* Container dengan grid 1 kolom untuk konten utama */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">Pengaturan Akun</h2>
              
              <div className="space-y-6">
                {/* Ganti Password Card */}
                <button
                  onClick={() => setActivePopup('ganti-password')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900 text-lg mb-1">Ganti Password</div>
                    <p className="text-sm text-gray-500">
                      Ubah kata sandi anda untuk menjaga keamanan akun anda
                    </p>
                  </div>
                </button>
                
                {/* Hapus Akun Card */}
                <button
                  onClick={() => setActivePopup('hapus-akun')}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                >
                  <div className="flex flex-col">
                    <div className="font-medium text-gray-900 text-lg mb-1">Hapus Akun</div>
                    <p className="text-sm text-gray-500">
                      Akun yang sudah terhapus tidak dapat dikembalikan lagi
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Ganti Password */}
        {activePopup === 'ganti-password' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Ganti Password</h3>
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
                      placeholder="masukkan password lama"
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
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
                  >
                    Simpan Password
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActivePopup(null);
                      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
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
        {activePopup === 'hapus-akun' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800">Hapus Akun ?</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-gray-700 text-center">
                    Apakah anda yakin akan menghapus akun
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleHapusAkun}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition duration-200"
                  >
                    Hapus akun
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