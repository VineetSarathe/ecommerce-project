import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // AUTO REDIRECT (unchanged)
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await loginUser(formData);

      if (data.user.role !== "admin") {
        setError("Not an admin account");
        setLoading(false);
        return;
      }

      login(data);
      navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen
                    bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]
                    p-4">

      <div className="bg-white/80 backdrop-blur-md
                      shadow-lg rounded-2xl
                      p-6 sm:p-8 w-full max-w-md">

        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Login 👑
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            onChange={handleChange}
            required
            className="border border-[#E3BFC3] focus:border-[#DD7A83]
                       outline-none p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="border border-[#E3BFC3] focus:border-[#DD7A83]
                       outline-none p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#DD7A83] hover:bg-[#c9656e]
                       text-white p-3 rounded-xl
                       shadow-md transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
