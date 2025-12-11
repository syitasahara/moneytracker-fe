import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cek login dulu begitu Sidebar ke-mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      setIsAuthenticated(false);
      navigate("/", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      active: location.pathname === "/dashboard",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.77778 5.33333C9.52592 5.33333 9.31496 5.248 9.14489 5.07733C8.97481 4.90667 8.88948 4.6957 8.88889 4.44444V0.888889C8.88889 0.637037 8.97422 0.426074 9.14489 0.256C9.31555 0.085926 9.52652 0.000592592 9.77778 0H15.1111C15.363 0 15.5742 0.0853334 15.7449 0.256C15.9156 0.426667 16.0006 0.63763 16 0.888889V4.44444C16 4.6963 15.9147 4.90756 15.744 5.07822C15.5733 5.24889 15.3624 5.33392 15.1111 5.33333H9.77778ZM0.888889 8.88889C0.637037 8.88889 0.426074 8.80355 0.256 8.63289C0.085926 8.46222 0.000592592 8.25126 0 8V0.888889C0 0.637037 0.0853334 0.426074 0.256 0.256C0.426667 0.085926 0.63763 0.000592592 0.888889 0H6.22222C6.47407 0 6.68533 0.0853334 6.856 0.256C7.02667 0.426667 7.1117 0.63763 7.11111 0.888889V8C7.11111 8.25185 7.02578 8.46311 6.85511 8.63378C6.68444 8.80444 6.47348 8.88948 6.22222 8.88889H0.888889ZM9.77778 16C9.52592 16 9.31496 15.9147 9.14489 15.744C8.97481 15.5733 8.88948 15.3624 8.88889 15.1111V8C8.88889 7.74815 8.97422 7.53718 9.14489 7.36711C9.31555 7.19704 9.52652 7.1117 9.77778 7.11111H15.1111C15.363 7.11111 15.5742 7.19644 15.7449 7.36711C15.9156 7.53778 16.0006 7.74874 16 8V15.1111C16 15.363 15.9147 15.5742 15.744 15.7449C15.5733 15.9156 15.3624 16.0006 15.1111 16H9.77778ZM0.888889 16C0.637037 16 0.426074 15.9147 0.256 15.744C0.085926 15.5733 0.000592592 15.3624 0 15.1111V11.5556C0 11.3037 0.0853334 11.0927 0.256 10.9227C0.426667 10.7526 0.63763 10.6673 0.888889 10.6667H6.22222C6.47407 10.6667 6.68533 10.752 6.856 10.9227C7.02667 11.0933 7.1117 11.3043 7.11111 11.5556V15.1111C7.11111 15.363 7.02578 15.5742 6.85511 15.7449C6.68444 15.9156 6.47348 16.0006 6.22222 16H0.888889Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Tambah Transaksi",
      path: "/tambah-transaksi",
      active: location.pathname === "/tambah-transaksi",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_388_23)">
            <path
              d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM7.25 10.75V8.75H5.25C4.83437 8.75 4.5 8.41562 4.5 8C4.5 7.58437 4.83437 7.25 5.25 7.25H7.25V5.25C7.25 4.83437 7.58437 4.5 8 4.5C8.41562 4.5 8.75 4.83437 8.75 5.25V7.25H10.75C11.1656 7.25 11.5 7.58437 11.5 8C11.5 8.41562 11.1656 8.75 10.75 8.75H8.75V10.75C8.75 11.1656 8.41562 11.5 8 11.5C7.58437 11.5 7.25 11.1656 7.25 10.75Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_388_23">
              <path d="M0 0H16V16H0V0Z" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      id: 3,
      name: "Riwayat Transaksi",
      path: "/riwayat-transaksi",
      active: location.pathname === "/riwayat-transaksi",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 16H0V0H16V16Z" stroke="#E5E7EB" />
          <path
            d="M1.25 1.5C0.834375 1.5 0.5 1.83437 0.5 2.25V3.75C0.5 4.16563 0.834375 4.5 1.25 4.5H2.75C3.16563 4.5 3.5 4.16563 3.5 3.75V2.25C3.5 1.83437 3.16563 1.5 2.75 1.5H1.25ZM6 2C5.44688 2 5 2.44687 5 3C5 3.55312 5.44688 4 6 4H15C15.5531 4 16 3.55312 16 3C16 2.44687 15.5531 2 15 2H6ZM6 7C5.44688 7 5 7.44688 5 8C5 8.55312 5.44688 9 6 9H15C15.5531 9 16 8.55312 16 8C16 7.44688 15.5531 7 15 7H6ZM6 12C5.44688 12 5 12.4469 5 13C5 13.5531 5.44688 14 6 14H15C15.5531 14 16 13.5531 16 13C16 12.4469 15.5531 12 15 12H6ZM0.5 7.25V8.75C0.5 9.16563 0.834375 9.5 1.25 9.5H2.75C3.16563 9.5 3.5 9.16563 3.5 8.75V7.25C3.5 6.83437 3.16563 6.5 2.75 6.5H1.25C0.834375 6.5 0.5 6.83437 0.5 7.25ZM1.25 11.5C0.834375 11.5 0.5 11.8344 0.5 12.25V13.75C0.5 14.1656 0.834375 14.5 1.25 14.5H2.75C3.16563 14.5 3.5 14.1656 3.5 13.75V12.25C3.5 11.8344 3.16563 11.5 2.75 11.5H1.25Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 4,
      name: "Statistik",
      path: "/statistik",
      active: location.pathname === "/statistik",
      icon: (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 16H0V0H18V16Z" stroke="#E5E7EB" />
          <path
            d="M9.5 7.5V0.51875C9.5 0.2375 9.71875 0 10 0C13.8656 0 17 3.13438 17 7C17 7.28125 16.7625 7.5 16.4813 7.5H9.5ZM1 8.5C1 4.70937 3.81562 1.57187 7.46875 1.07187C7.75625 1.03125 8 1.2625 8 1.55313V9L12.8906 13.8906C13.1 14.1 13.0844 14.4438 12.8438 14.6125C11.6187 15.4875 10.1187 16 8.5 16C4.35938 16 1 12.6438 1 8.5ZM17.45 9C17.7406 9 17.9688 9.24375 17.9312 9.53125C17.6906 11.2781 16.85 12.8312 15.6219 13.9781C15.4344 14.1531 15.1406 14.1406 14.9594 13.9563L10 9H17.45Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 5,
      name: "Pengaturan",
      path: "/pengaturan",
      active: location.pathname === "/pengaturan",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_388_44)">
            <path
              d="M15.4969 5.20625C15.5969 5.47813 15.5125 5.78125 15.2969 5.975L13.9438 7.20625C13.9781 7.46563 13.9969 7.73125 13.9969 8C13.9969 8.26875 13.9781 8.53438 13.9438 8.79375L15.2969 10.025C15.5125 10.2188 15.5969 10.5219 15.4969 10.7937C15.3594 11.1656 15.1938 11.5219 15.0031 11.8656L14.8563 12.1187C14.65 12.4625 14.4188 12.7875 14.1656 13.0938C13.9813 13.3188 13.675 13.3937 13.4 13.3062L11.6594 12.7531C11.2406 13.075 10.7781 13.3438 10.2844 13.5469L9.89375 15.3313C9.83125 15.6156 9.6125 15.8406 9.325 15.8875C8.89375 15.9594 8.45 15.9969 7.99688 15.9969C7.54375 15.9969 7.1 15.9594 6.66875 15.8875C6.38125 15.8406 6.1625 15.6156 6.1 15.3313L5.70938 13.5469C5.21563 13.3438 4.75313 13.075 4.33438 12.7531L2.59688 13.3094C2.32188 13.3969 2.01563 13.3188 1.83125 13.0969C1.57813 12.7906 1.34688 12.4656 1.14063 12.1219L0.993753 11.8687C0.803128 11.525 0.637503 11.1687 0.500003 10.7969C0.400003 10.525 0.484378 10.2219 0.700003 10.0281L2.05313 8.79688C2.01875 8.53438 2 8.26875 2 8C2 7.73125 2.01875 7.46563 2.05313 7.20625L0.700003 5.975C0.484378 5.78125 0.400003 5.47813 0.500003 5.20625C0.637503 4.83438 0.803128 4.47813 0.993753 4.13438L1.14063 3.88125C1.34688 3.5375 1.57813 3.2125 1.83125 2.90625C2.01563 2.68125 2.32188 2.60625 2.59688 2.69375L4.3375 3.24688C4.75625 2.925 5.21875 2.65625 5.7125 2.45312L6.10313 0.66875C6.16563 0.384375 6.38438 0.159375 6.67188 0.1125C7.10313 0.0375 7.54688 0 8 0C8.45313 0 8.89688 0.0375 9.32813 0.109375C9.61563 0.15625 9.83438 0.38125 9.89688 0.665625L10.2875 2.45C10.7813 2.65313 11.2438 2.92188 11.6625 3.24375L13.4031 2.69062C13.6781 2.60312 13.9844 2.68125 14.1688 2.90313C14.4219 3.20938 14.6531 3.53437 14.8594 3.87812L15.0063 4.13125C15.1969 4.475 15.3625 4.83125 15.5 5.20312L15.4969 5.20625ZM8 10.5C8.66304 10.5 9.29893 10.2366 9.76777 9.76777C10.2366 9.29893 10.5 8.66304 10.5 8C10.5 7.33696 10.2366 6.70107 9.76777 6.23223C9.29893 5.76339 8.66304 5.5 8 5.5C7.33696 5.5 6.70108 5.76339 6.23224 6.23223C5.7634 6.70107 5.5 7.33696 5.5 8C5.5 8.66304 5.7634 9.29893 6.23224 9.76777C6.70108 10.2366 7.33696 10.5 8 10.5Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_388_44">
              <path d="M0 0H16V16H0V0Z" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); 
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleNavigation = (path) => {
    if (!isAuthenticated) return; 
    navigate(path);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    // logout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:hidden"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isSidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative
          inset-y-0 left-0
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
          w-64 lg:w-64
          bg-white
          flex flex-col
          min-h-screen
          shadow-lg
          z-40
        `}
      >
        {/* Header dengan Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {/* Logo MoneyTracker */}
            <div className="relative">
              <div className="w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center shadow-md">
                <svg
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 0C1.00898 0 0 1.00898 0 2.25V13.5C0 14.741 1.00898 15.75 2.25 15.75H15.75C16.991 15.75 18 14.741 18 13.5V5.625C18 4.38398 16.991 3.375 15.75 3.375H2.8125C2.50312 3.375 2.25 3.12188 2.25 2.8125C2.25 2.50312 2.50312 2.25 2.8125 2.25H15.75C16.3723 2.25 16.875 1.74727 16.875 1.125C16.875 0.502734 16.3723 0 15.75 0H2.25ZM14.625 8.4375C14.9234 8.4375 15.2095 8.55603 15.4205 8.767C15.6315 8.97798 15.75 9.26413 15.75 9.5625C15.75 9.86087 15.6315 10.147 15.4205 10.358C15.2095 10.569 14.9234 10.6875 14.625 10.6875C14.3266 10.6875 14.0405 10.569 13.8295 10.358C13.6185 10.147 13.5 9.86087 13.5 9.5625C13.5 9.26413 13.6185 8.97798 13.8295 8.767C14.0405 8.55603 14.3266 8.4375 14.625 8.4375Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black">MoneyTracker</h1>
              <p className="text-gray-600 text-sm">Keuangan Mahasiswa</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  disabled={!isAuthenticated}
                  className={`
                    flex items-center w-full px-4 py-3 rounded-lg transition-colors
                    ${
                      item.active
                        ? "bg-blue-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }
                    ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <span
                    className="mr-3"
                    style={{ color: item.active ? "white" : "inherit" }}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
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
            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay untuk mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
