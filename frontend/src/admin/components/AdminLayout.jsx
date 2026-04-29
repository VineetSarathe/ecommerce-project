import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen overflow-x-hidden">

      <AdminSidebar />

      <div className="flex-1 min-w-0
                      bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]">

        <AdminNavbar />

        <div className="p-3 sm:p-6">
          <div className="bg-white/70 backdrop-blur-md
                          rounded-2xl shadow-sm p-3 sm:p-6">

            {children}

          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminLayout;
