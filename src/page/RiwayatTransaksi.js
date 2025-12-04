import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

const RiwayatTransaksi = () => {
  const [filter, setFilter] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = [
    {
      id: 1,
      name: "Uang Saku Orang Tua",
      amount: 2000000,
      type: "pemasukan",
      date: "16 Nov 2025",
      time: "09:30",
      category: "",
      paymentMethod: "Non Tunai"
    },
    {
      id: 2,
      name: "Makan Siang di Kantin",
      amount: -25000,
      type: "pengeluaran",
      date: "16 Nov 2025",
      time: "12:15",
      category: "Makanan & Minuman",
      paymentMethod: "Tunai"
    },
    {
      id: 3,
      name: "Ongkos Angkot Pulang",
      amount: -8000,
      type: "pengeluaran",
      date: "16 Nov 2025",
      time: "16:45",
      category: "Transportasi",
      paymentMethod: "Tunai"
    },
    {
      id: 4,
      name: "Freelance Design Project",
      amount: 500000,
      type: "pemasukan",
      date: "16 Nov 2025",
      time: "14:20",
      category: "",
      paymentMethod: "Non Tunai"
    },
    {
      id: 5,
      name: "Nonton Bioskop",
      amount: -45000,
      type: "pengeluaran",
      date: "15 Nov 2025",
      time: "19:30",
      category: "Hiburan",
      paymentMethod: "Non Tunai"
    },
    {
      id: 6,
      name: "Kopi & Snack",
      amount: -35000,
      type: "pengeluaran",
      date: "15 Nov 2025",
      time: "15:00",
      category: "Makanan & Minuman",
      paymentMethod: "Non Tunai"
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'semua' || 
                         (filter === 'pemasukan' && transaction.type === 'pemasukan') ||
                         (filter === 'pengeluaran' && transaction.type === 'pengeluaran');
    
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Konten Utama */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h1>
          <p className="text-gray-600 mt-1">Kelola keuangan mahasiswa dengan mudah</p>
        </div>

        {/* Cards Section - Total Saldo, Pemasukan, Pengeluaran */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Saldo */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Total Saldo</h3>
              <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                +12%
              </div>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold text-gray-900">Rp 2.450.000</span>
            </div>
            <p className="text-sm text-gray-500">dari bulan lalu</p>
          </div>

          {/* Pemasukan */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Pemasukan</h3>
            <div className="mb-2">
              <span className="text-3xl font-bold text-green-600">Rp 3.500.000</span>
            </div>
            <p className="text-sm text-gray-500">Bulan ini</p>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Pengeluaran</h3>
            <div className="mb-2">
              <span className="text-3xl font-bold text-red-600">Rp 1.050.000</span>
            </div>
            <p className="text-sm text-gray-500">Bulan ini</p>
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
                    onClick={() => setFilter('semua')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'semua' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Semua
                  </button>
                  <button
                    onClick={() => setFilter('pemasukan')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'pemasukan' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Pemasukan
                  </button>
                  <button
                    onClick={() => setFilter('pengeluaran')}
                    className={`px-4 py-2 text-sm font-medium rounded-lg ${filter === 'pengeluaran' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daftar Transaksi</h3>
            
            {filteredTransactions.length > 0 ? (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex justify-between items-center p-4 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${transaction.type === 'pemasukan' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {transaction.type === 'pemasukan' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900">{transaction.name}</h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <span className="text-sm text-gray-500">{transaction.date}</span>
                          <span className="text-sm text-gray-500">{transaction.time}</span>
                          {transaction.category && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {transaction.category}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${transaction.paymentMethod === 'Tunai' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {transaction.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span 
                        className={`text-lg font-bold ${transaction.type === 'pemasukan' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {transaction.type === 'pemasukan' ? '+' : '-'}Rp {Math.abs(transaction.amount).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Pagination Info */}
                <div className="pt-4 mt-4 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">Menampilkan 6 dari 10 transaksi</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">Tidak ada transaksi yang ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RiwayatTransaksi;