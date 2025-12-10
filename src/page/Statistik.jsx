import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Statistik = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('november');
  const [selectedMonth, setSelectedMonth] = useState('november');

  const months = [
    { value: 'januari', label: 'Januari' },
    { value: 'februari', label: 'Februari' },
    { value: 'maret', label: 'Maret' },
    { value: 'april', label: 'April' },
    { value: 'mei', label: 'Mei' },
    { value: 'juni', label: 'Juni' },
    { value: 'juli', label: 'Juli' },
    { value: 'agustus', label: 'Agustus' },
    { value: 'september', label: 'September' },
    { value: 'oktober', label: 'Oktober' },
    { value: 'november', label: 'November' },
    { value: 'desember', label: 'Desember' }
  ];

  const handleMonthChange = (e) => {
    const value = e.target.value;
    setSelectedMonth(value);
    setSelectedPeriod(value);
  };

  const handlePeriodChange = (period) => {
    if (period === 'bulan-lalu') {
      // Logika untuk mendapatkan bulan sebelumnya
      const currentMonthIndex = months.findIndex(m => m.value === selectedMonth);
      const prevMonthIndex = currentMonthIndex > 0 ? currentMonthIndex - 1 : 11;
      setSelectedPeriod('bulan-lalu');
      setSelectedMonth(months[prevMonthIndex].value);
    } else {
      setSelectedPeriod(period);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Statistik</h1>
          <p className="text-gray-600 mt-1">Kelola keuangan mahasiswa dengan mudah</p>
        </div>

        {/* Pilih Periode */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Pilih Periode:</h3>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Dropdown untuk memilih bulan */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="appearance-none w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            {/* Tombol untuk bulan lalu */}
            <button
              onClick={() => handlePeriodChange('bulan-lalu')}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                selectedPeriod === 'bulan-lalu'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bulan lalu
            </button>
          </div>
        </div>

        {/* Tiga Kartu Statistik Atas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Pemasukan Bulan Ini */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Pemasukan bulan ini</h3>
            <div className="mb-1">
              <span className="text-3xl font-bold text-gray-900">3.500.000</span>
            </div>
            <p className="text-sm text-gray-500">bulan ini</p>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Pengeluaran</h3>
            <div className="mb-1">
              <span className="text-3xl font-bold text-gray-900">Rp 1.575.000</span>
            </div>
            <p className="text-sm text-gray-500">Bulan ini</p>
          </div>

          {/* Rata-rata Pengeluaran Harian */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Rata-rata Pengeluaran Harian</h3>
            <div className="mb-1">
              <span className="text-3xl font-bold text-gray-900">Rp 52.000</span>
            </div>
            <p className="text-sm text-gray-500">per hari</p>
          </div>
        </div>

        {/* Container utama dengan grid 2 kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kolom Kiri - Pengeluaran per Kategori */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Pengeluaran per Kategori</h3>
              <div className="space-y-4">
                {/* Kategori 1 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Makanan & Minuman</span>
                    <span className="text-sm font-medium text-gray-900">50%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                {/* Kategori 2 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Transportasi</span>
                    <span className="text-sm font-medium text-gray-900">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                {/* Kategori 3 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Hiburan</span>
                    <span className="text-sm font-medium text-gray-900">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                {/* Kategori 4 */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-700">Lainnya</span>
                    <span className="text-sm font-medium text-gray-900">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Dua kartu bertumpuk */}
          <div className="space-y-6">
            {/* Kategori Paling Boros */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">Kategori Paling Boros Bulan Ini</h3>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Makanan</h4>
                </div>
                <p className="text-sm text-gray-500 ml-11">50% dari total pengeluaran bulan ini</p>
              </div>
            </div>

            {/* Pengeluaran per Minggu */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-6">Pengeluaran per minggu</h3>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-between h-40 mb-4">
                {/* Minggu 1 */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 bg-blue-500 rounded-t-lg"
                    style={{ height: '80%' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">Minggu 1</span>
                </div>
                {/* Minggu 2 */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 bg-blue-400 rounded-t-lg"
                    style={{ height: '60%' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">Minggu 2</span>
                </div>
                {/* Minggu 3 */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 bg-blue-300 rounded-t-lg"
                    style={{ height: '40%' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">Minggu 3</span>
                </div>
                {/* Minggu 4 */}
                <div className="flex flex-col items-center">
                  <div 
                    className="w-10 bg-blue-200 rounded-t-lg"
                    style={{ height: '20%' }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">Minggu 4</span>
                </div>
              </div>

              {/* Labels */}
              <div className="flex justify-between text-xs text-gray-500">
                <span>Rp 300.000</span>
                <span>Rp 200.000</span>
                <span>Rp 100.000</span>
                <span>Rp 0</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistik;