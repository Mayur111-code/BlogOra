// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// const Signup = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     image: null,
//   });
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const onChangeHandler = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const fileHandler = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("email", formData.email);
//       data.append("password", formData.password);
//       data.append("image", formData.image);
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:4000/user/register",
//         data,
//         {
//           headers: {
//             "Content-Type": "multipart/formData",
//           },
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/login");
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full bg-pink-200 py-12 mx-auto flex items-center justify-center ">
//       <div className="w-full bg-white max-w-md p-5 mx-auto py-6 border-1 border-gray-200 shadow-md">
//         <h1 className="text-lg font-bold text-center text-gray-700">
//           Create your account!
//         </h1>
//         <form
//           onSubmit={submitHandler}
//           className="flex flex-col gap-5 mt-5 w-full"
//         >
//           <input
//             onChange={onChangeHandler}
//             name="name"
//             value={formData.name}
//             type="text"
//             placeholder="Your name"
//             className="w-full p-2 border border-gray-300 rounded outline-none"
//             required
//           />
//           <input
//             onChange={onChangeHandler}
//             name="email"
//             value={formData.email}
//             type="email"
//             placeholder="Your email"
//             className="w-full p-2 border border-gray-300 rounded outline-none"
//             required
//           />
//           <input
//             onChange={onChangeHandler}
//             name="password"
//             value={formData.password}
//             type="password"
//             placeholder="Your password"
//             className="w-full p-2 border border-gray-300 rounded outline-none"
//             required
//           />
//           <input
//             onChange={fileHandler}
//             accept="image/*"
//             type="file"
//             className="w-full p-2 border border-gray-300 rounded outline-none"
//             required
//           />
//           <button className="bg-orange-600 text-white px-6 py-2 w-full cursor-pointer">
//             Signup
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Already have an account?{" "}
//           <Link to={"/login"} className="text-orange-600 cursor-pointer">
//             Login Here
//           </Link>{" "}
//         </p>
//       </div>
//     </div>
//   );
// };
// export default Signup;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { HiUser, HiMail, HiLockClosed, HiCamera } from "react-icons/hi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  
  const [preview, setPreview] = useState(null); // For image preview
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file)); // Create a local URL for the preview
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!formData.image) return toast.error("Please upload a profile picture");

    try {
      setLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("image", formData.image);

      const res = await axios.post(
        "http://localhost:4000/user/register",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-2 bg-orange-600 w-full"></div>
        
        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-800 tracking-tight">
              Create <span className="text-orange-600">Account</span>
            </h1>
            <p className="text-gray-500 mt-2 font-medium">Join our community of writers</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center mb-6">
              <label htmlFor="avatar" className="relative cursor-pointer group">
                <div className="w-24 h-24 rounded-full border-4 border-orange-50 overflow-hidden bg-gray-100 flex items-center justify-center transition-all group-hover:border-orange-200">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <HiUser className="text-gray-300 w-12 h-12" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-600 p-2 rounded-full text-white shadow-lg border-2 border-white">
                  <HiCamera size={16} />
                </div>
              </label>
              <input 
                id="avatar" 
                onChange={fileHandler} 
                accept="image/*" 
                type="file" 
                className="hidden" 
              />
              <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Profile Photo</p>
            </div>

            <div className="relative group">
              <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                name="name" value={formData.name} onChange={onChangeHandler}
                type="text" placeholder="Full Name" required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="relative group">
              <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                name="email" value={formData.email} onChange={onChangeHandler}
                type="email" placeholder="Email address" required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="relative group">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
              <input
                name="password" value={formData.password} onChange={onChangeHandler}
                type="password" placeholder="Create Password" required
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-orange-600 transition-all active:scale-[0.98] flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-500 font-medium text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 font-bold hover:underline underline-offset-4">
              Login Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;