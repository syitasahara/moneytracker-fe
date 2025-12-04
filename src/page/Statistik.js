import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Statistik = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('november');

  // Data untuk diagram pengeluaran per minggu
  const weeklyData = [
    { week: 'Minggu 1', amount: 300000 },
    { week: 'Minggu 2', amount: 200000 },
    { week: 'Minggu 3', amount: 100000 },
    { week: 'Minggu 4', amount: 0 }
  ];

  // Data untuk kategori pengeluaran
  const categories = [
    { name: 'Makanan', percentage: 50, color: 'bg-blue-500' },
    { name: 'Transportasi', percentage: 25, color: 'bg-green-500' },
    { name: 'Hiburan', percentage: 15, color: 'bg-yellow-500' },
    { name: 'Lainnya', percentage: 10, color: 'bg-gray-500' }
  ];

  const maxAmount = Math.max(...weeklyData.map(item => item.amount));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Konten Utama */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Statistik</h1>
          <p className="text-gray-600">Kelola keuangan mahasiswa dengan mudah</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri - Pemasukan dan Kategori Boros */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pilih Periode */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Pilih Periode:</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedPeriod('november')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedPeriod === 'november'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  November
                </button>
                <button
                  onClick={() => setSelectedPeriod('bulan-lalu')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                    selectedPeriod === 'bulan-lalu'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Bulan Lalu
                </button>
              </div>
            </div>

            {/* Pemasukan Bulan Ini */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pemasukan bulan ini</h3>
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold text-green-600">3.500.000</span>
              </div>
              <p className="text-gray-500 text-sm">bulan ini</p>
            </div>

            {/* Kategori Paling Boros */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Kategori Paling Boros Bulan ini</h3>
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Makanan</h4>
                  <p className="text-gray-600 text-sm">50% dari total pengeluaran bulan ini</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full" 
                  style={{ width: '50%' }}
                ></div>
              </div>
            </div>

            {/* Rata-rata Pengeluaran Harian */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Rata-rata Pengeluaran Harian</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-red-600">Rp 52.000</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Diagram dan Statistik Detail */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pengeluaran per Kategori */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Pengeluaran per Kategori</h3>
              <div className="flex items-center">
                {/* Diagram Pie Sederhana */}
                <div className="relative w-40 h-40 mr-6">
                  <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 50%, 50% 50%)" }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-yellow-500" style={{ clipPath: "polygon(0 50%, 50% 50%, 50% 100%, 0 100%)" }}></div>
                  <div className="absolute inset-0 rounded-full border-8 border-gray-500" style={{ clipPath: "polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)" }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-700">Total</span>
                  </div>
                </div>
                
                {/* Legenda Kategori */}
                <div className="flex-1">
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
                          <span className="text-gray-600">{category.name}</span>
                        </div>
                        <span className="font-medium text-gray-900">{category.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pengeluaran per Minggu */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-6">Pengeluaran per minggu</h3>
              
              {/* Bar Chart */}
              <div className="flex items-end justify-between h-48 px-4">
                {weeklyData.map((week, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                      style={{ 
                        height: `${(week.amount / maxAmount) * 100}%`,
                        minHeight: week.amount > 0 ? '20px' : '0px'
                      }}
                    ></div>
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium text-gray-900">
                        Rp {week.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{week.week}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-4 px-4">
                {weeklyData.map((week, index) => (
                  <span key={index} className="text-xs text-gray-500 flex-1 text-center">
                    {week.week}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Statistics */}
            <div className="grid grid-cols-2 gap-4">
              {/* Total Pengeluaran Bulan Ini */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Total Pengeluaran</h4>
                <p className="text-2xl font-bold text-red-600">Rp 1.050.000</p>
                <p className="text-xs text-gray-500 mt-1">Bulan ini</p>
              </div>

              {/* Transaksi Terbanyak */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Transaksi Terbanyak</h4>
                <p className="text-2xl font-bold text-blue-600">28</p>
                <p className="text-xs text-gray-500 mt-1">Transaksi</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Statistik;