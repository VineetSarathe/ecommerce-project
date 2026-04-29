import { useAuth } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-gradient-to-r from-[#DD7A83] to-[#E3BFC3]
                    text-white
                    px-3 sm:px-6
                    py-2.5 sm:py-3
                    flex justify-between items-center
                    shadow-md sticky top-0 z-40">

      {/* Title */}
      <h2 className="font-bold 
                     text-sm sm:text-base md:text-lg 
                     tracking-wide whitespace-nowrap">
        Admin Panel 👑
      </h2>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Username */}
        <span className="text-[11px] sm:text-sm font-medium
                         max-w-[90px] sm:max-w-none
                         truncate">
          {user?.name}
        </span>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-white/90 text-[#DD7A83]
                     px-2.5 sm:px-3
                     py-1 sm:py-1.5
                     rounded-lg sm:rounded-xl
                     text-[11px] sm:text-sm font-medium
                     hover:bg-white transition
                     whitespace-nowrap"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminNavbar;
