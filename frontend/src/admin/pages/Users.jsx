import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { getAllUsers, updateUserRole } from "../../services/adminApi";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data.data);
    } catch (error) {
      console.error("Users load failed", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      fetchUsers();
    } catch (error) {
      console.error("Role update failed", error);
    }
  };

  return (
    <AdminLayout>

      <h2 className="text-lg sm:text-xl font-bold mb-6 text-gray-800">
        Manage Users 👥
      </h2>

      {/* ✅ Visual Container */}
      <div className="bg-white/80 backdrop-blur-md
                      border border-[#E3BFC3]
                      rounded-2xl shadow-sm">

        {/* ✅ Scroll Wrapper (IMPORTANT FIX) */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm min-w-[520px]">

            <thead className="bg-[#f9e4e7] text-gray-700">
              <tr>
                <th className="text-left p-2 sm:p-3">Name</th>
                <th className="text-left p-2 sm:p-3">Email</th>
                <th className="text-left p-2 sm:p-3">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">

                  <td className="p-2 sm:p-3 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="p-2 sm:p-3 text-gray-600 break-all">
                    {user.email}
                  </td>

                  <td className="p-2 sm:p-3">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border border-[#E3BFC3]
                                 focus:border-[#DD7A83]
                                 outline-none
                                 rounded-lg px-3 py-1.5 text-sm"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </AdminLayout>
  );
};

export default Users;
