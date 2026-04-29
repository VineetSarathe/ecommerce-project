// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { loginUser } from "../services/authApi";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await loginUser(formData);

//       login(data);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen
//                     bg-gradient-to-br from-[#E3BFC3] via-[#f5d6da] to-[#DD7A83]
//                     p-4">

//       <div className="bg-white/80 backdrop-blur-md
//                       shadow-lg rounded-2xl
//                       p-6 sm:p-8 w-full max-w-md">

//         <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
//           Login to Your Account 🔐
//         </h2>

//         {error && (
//           <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

//           <input
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="border border-[#E3BFC3] focus:border-[#DD7A83]
//                        outline-none p-3 rounded-xl"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="border border-[#E3BFC3] focus:border-[#DD7A83]
//                        outline-none p-3 rounded-xl"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-[#DD7A83] hover:bg-[#c9656e]
//                        text-white p-3 rounded-xl
//                        shadow-md transition"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4 text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="font-semibold text-[#DD7A83] hover:underline"
//           >
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;








import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginUser(formData);

      login(data);
      toast.success("Login successful 👋");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed"
      );
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
          Login to Your Account 🔐
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-[#E3BFC3] focus:border-[#DD7A83]
                       outline-none p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#DD7A83] hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;