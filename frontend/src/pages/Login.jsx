// import axios from "axios";
// import { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { StoreContext } from "../context/StoreContext";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { loginUser } = useContext(StoreContext);
//   const token = localStorage.getItem("token");
//   const onChangeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:4000/user/login",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("res", res);
//       if (res.data.success) {
//         const { user, token } = res.data;
//         loginUser(user, token);
//         toast.success(res.data.message);
//         navigate("/");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <div className="w-full bg-pink-200 py-12 mx-auto flex items-center justify-center ">
//         <div className="w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md">
//           <h1 className="text-lg font-bold text-center text-gray-700">
//             Login into your account!
//           </h1>
//           <form
//             onSubmit={submitHandler}
//             className="flex flex-col gap-5 mt-5 w-full"
//           >
//             <input
//               name="email"
//               value={formData.email}
//               onChange={onChangeHandler}
//               type="email"
//               placeholder="Your email"
//               className="w-full p-2 border border-gray-300 rounded outline-none"
//               required
//             />
//             <input
//               name="password"
//               value={formData.password}
//               onChange={onChangeHandler}
//               type="password"
//               placeholder="Your password"
//               className="w-full p-2 border border-gray-300 rounded outline-none"
//               required
//             />

//             <button className="bg-orange-600 text-white px-6 py-2 w-full cursor-pointer">
//               Signin
//             </button>
//           </form>
//           <p className="text-center mt-4">
//             Don't have an account?{" "}
//             <Link to={"/register"} className="text-orange-600 cursor-pointer">
//               Register Here
//             </Link>{" "}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Login;





import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";
import { HiMail, HiLockClosed } from "react-icons/hi"; // Professional icons

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/user/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        const { user, token } = res.data;
        loginUser(user, token);
        toast.success(res.data.message || "Welcome back!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all">
        
        {/* Top Accent Bar */}
        <div className="h-2 bg-orange-600 w-full"></div>

        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Welcome <span className="text-orange-600">Back</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Login to manage your stories</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Email Input */}
            <div className="relative group">
              <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
              <input
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                type="email"
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={20} />
              <input
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-gray-700"
                required
              />
            </div>

            <div className="text-right">
              <Link to="/forgot-password" size="sm" className="text-sm font-semibold text-gray-400 hover:text-orange-600 transition-colors">
                Forgot password?
              </Link>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg shadow-gray-200 hover:bg-orange-600 hover:shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-600 font-bold hover:underline decoration-2 underline-offset-4">
                Join Blog Ora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;