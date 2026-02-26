import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// replaced react-toastify with sonner
import { toast } from "sonner";
import { HiUser, HiMail, HiLockClosed, HiCamera } from "react-icons/hi";
import api from "../api/api";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  
  const [preview, setPreview] = useState(null); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file)); 
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

      const res = await api.post(
        "/user/register",
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