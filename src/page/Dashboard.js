import Sidebar from "../components/Sidebar";

function App() {
  // Data statis untuk demo
  const transactionData = [
    { name: "Makan Siang", category: "Makanan & Minuman", amount: -25000, date: "Hari ini" },
    { name: "Gojek", category: "Transportasi", amount: -150000, date: "Kemarin" },
    { name: "Freelance Web", category: "Pemasukan", amount: 500000, date: "2 hari lalu" },
  ];

  const categories = [
    { name: "Temansaka", percentage: 3, color: "bg-blue-500" },
    { name: "Makana", percentage: 5, color: "bg-green-500" },
    { name: "Bilun", percentage: 10, color: "bg-yellow-500" },
    { name: "Janya", percentage: 10, color: "bg-red-500" },
    { name: "Rhyasa", percentage: 10, color: "bg-purple-500" },
  ];

  // Fungsi untuk membuat diagram pie sederhana
  const PieChart = ({ categories }) => {
    let currentAngle = 0;
    
    return (
      <div className="relative w-40 h-40">
        <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
          {categories.map((category, index) => {
            const percentage = category.percentage;
            const angle = (percentage / 100) * 360;
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const x1 = 80 + 60 * Math.cos(currentAngle * Math.PI / 180);
            const y1 = 80 + 60 * Math.sin(currentAngle * Math.PI / 180);
            
            const x2 = 80 + 60 * Math.cos((currentAngle + angle) * Math.PI / 180);
            const y2 = 80 + 60 * Math.sin((currentAngle + angle) * Math.PI / 180);
            
            const pathData = [
              `M 80 80`,
              `L ${x1} ${y1}`,
              `A 60 60 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `Z`
            ].join(' ');
            
            const segment = (
              <path
                key={index}
                d={pathData}
                fill={getComputedStyle(document.documentElement).getPropertyValue(`--color-${category.color.split('-')[1]}-500`) || '#3b82f6'}
                className={category.color}
              />
            );
            
            currentAngle += angle;
            return segment;
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-700">Total</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      {/* Konten Utama Dashboard */}
      <main className="flex-1 p-8">
        {/* Header dengan Button Tambah Transaksi */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Keuangan</h1>
            <p className="text-gray-600">Kelola keuangan mahasiswa dengan mudah</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Transaksi
          </button>
        </div>

        {/* Tiga Card Saldo, Pemasukan, Pengeluaran dalam satu baris */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Total Saldo */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Saldo</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-gray-900">Rp 2.450.000</span>
            </div>
            <p className="text-green-500 text-sm">+15% dari bulan lalu</p>
          </div>

          {/* Pemasukan */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Pemasukan</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-green-600">Rp 3.500.000</span>
            </div>
            <p className="text-gray-500 text-sm">Bulan ini</p>
          </div>

          {/* Pengeluaran */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Pengeluaran</h2>
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold text-red-600">Rp 1.050.000</span>
            </div>
            <p className="text-gray-500 text-sm">Bulan ini</p>
          </div>
        </div>

        {/* Pengeluaran per Kategori dan Transaksi Terbaru bersebelahan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pengeluaran per Kategori dengan Diagram */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Pengeluaran per Kategori</h2>
            <div className="flex items-center justify-between">
              {/* Diagram Pie */}
              <div className="flex-shrink-0">
                <PieChart categories={categories} />
              </div>
              
              {/* Legenda Kategori */}
              <div className="flex-1 ml-6">
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

          {/* Transaksi Terbaru */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Transaksi Terbaru</h2>
              <button className="text-blue-600 text-sm font-medium">Lihat Semua</button>
            </div>
            
            <div className="space-y-4">
              {transactionData.map((transaction, index) => (
                <div key={index} className="flex justify-between items-start pb-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{transaction.name}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : '-'}Rp {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;