import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { StoreContext } from "../context/StoreContext";
import { HiCamera, HiUser, HiMail, HiSave } from "react-icons/hi";
import api, { BASE_URL } from "../api/api";

const FALLBACK_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const Profile = () => {
  const { user, setUser } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      if (image) {
        formData.append("image", image);
      }

      const response = await api.put("/user/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated");
        const updatedUser = response.data.user;
        setUserData({
          name: updatedUser.name || "",
          email: updatedUser.email || "",
          image: updatedUser.image || "",
        });
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setImage(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-32">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-40 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">My Profile</h1>
        </div>

        <div className="px-8 pb-10">
          <form onSubmit={handleUpdate} className="relative -mt-16 space-y-8">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={
                        userData.image
                          ? `${BASE_URL}/images/${userData.image}`
                          : FALLBACK_AVATAR
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_AVATAR;
                      }}
                    />
                  )}
                </div>
                <label
                  htmlFor="image-input"
                  className="absolute bottom-1 right-1 bg-orange-600 p-2.5 rounded-full text-white cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white"
                  aria-label="Change profile photo"
                >
                  <HiCamera size={20} />
                  <input
                    type="file"
                    id="image-input"
                    hidden
                    onChange={(e) => setImage(e.target.files[0] || null)}
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="mt-3 text-sm text-gray-500 font-medium italic">
                Click the camera to change photo
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1">
                  <HiUser className="text-orange-500" /> Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 ml-1">
                  <HiMail className="text-orange-500" /> Email Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-xl hover:bg-orange-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-gray-400"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <HiSave size={20} /> Update Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
