import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },

    // ✅ NEW (nothing removed)
    { name: "Delivery States", path: "/admin/delivery-states" },
  ];

  return (
    <div className="w-16 sm:w-60
                    bg-gradient-to-b from-[#DD7A83] to-[#E3BFC3]
                    text-white min-h-screen p-3 sm:p-4
                    shadow-lg">

      <h3 className="hidden sm:block text-lg font-semibold mb-6">
        Admin Menu
      </h3>

      <div className="flex flex-col gap-2">

        {menu.map((item) => (
          <Link key={item.path} to={item.path}>
            <div
              className={`p-2 sm:p-2.5 rounded-xl text-xs sm:text-sm 
                          cursor-pointer transition
                          ${
                            location.pathname === item.path
                              ? "bg-white text-[#DD7A83] font-semibold shadow"
                              : "hover:bg-white/20"
                          }`}
            >
              <span className="sm:hidden">
                {item.name.charAt(0)}
              </span>

              <span className="hidden sm:inline">
                {item.name}
              </span>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default AdminSidebar;