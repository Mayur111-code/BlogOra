//       );
//       console.log("res", res);
//       toast.success(res.data.message);
//       (formData.title = ""),
//         (formData.category = ""),
//         (formData.description = ""),
//         (formData.image = null);
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     const allBlogs = async () => {
//       try {
//         const res = await axios.get("http://localhost:4000/blog/all", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         setBlogs(res.data.blogs);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     allBlogs();
//   }, []);

//   const removeBlog = async (blogId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:4000/blog/delete/${blogId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success(res.data.message);
//       setBlogs(blogs.filter((blog) => blog._id !== blogId));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
//   return (
//     <div className="flex h-auto">
//       {/* side bar */}
//       <div className="w-64 border-1 border-gray-300  text-white p-6">
//         <h2 className="text-lg font-semibold mb-6 text-white">Dashboard</h2>
//         <button
//           className={`w-full text-left py-2 px-4 mb-2 rounded ${
//             activeTab === "post" ? "bg-orange-500" : "bg-gray-700"
//           }`}
//           onClick={() => setActiveTab("post")}
//         >
//           Post a Blog
//         </button>
//         <button
//           className={`w-full text-left py-2 px-4 rounded ${
//             activeTab === "list" ? "bg-orange-500" : "bg-gray-700"
//           }`}
//           onClick={() => setActiveTab("list")}
//         >
//           List of Blogs
//         </button>
//       </div>

//       <div className="flex-1 p-6">
//         {activeTab === "post" ? (
//           <div>
//             <h2 className="text-xl font-bold">Post a new blog</h2>
//             <div className="mt-8">
//               <form
//                 onSubmit={submitHandler}
//                 className="w-1/2 flex flex-col gap-3"
//               >
//                 <input
//                   name="title"
//                   value={formData.title}
//                   onChange={onChangeHandler}
//                   type="text"
//                   placeholder="title"
//                   className="border border-gray-300 rounded-md p-2 outline-none w-full"
//                 />
//                 <input
//                   name="category"
//                   value={formData.category}
//                   onChange={onChangeHandler}
//                   type="text"
//                   placeholder="category"
//                   className="border border-gray-300 rounded-md p-2 outline-none w-full"
//                 />
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={onChangeHandler}
//                   type="text"
//                   placeholder="description"
//                   className="border border-gray-300 rounded-md p-2 outline-none w-full"
//                 />

//                 <div>
//                   <label htmlFor="">Choose Image</label>
//                   <input
//                     onChange={fileHandler}
//                     type="file"
//                     accept="image/*"
//                     className="border border-gray-300 rounded-md p-2 outline-none w-full"
//                   />
//                 </div>
//                 <button className="bg-black text-white w-full rounded-full border-none cursor-pointer py-2">
//                   post blog
//                 </button>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="p-4 h-auto">
//             <h2 className="text-xl font-semibold mb-4">List of Blogs</h2>
//             <div className="overflow-x-auto">
//               <table className="min-w-full border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border px-4 py-2">Title</th>
//                     <th className="border px-4 py-2">Category</th>
//                     <th className="border px-4 py-2">Image</th>
//                     <th className="border px-4 py-2">Remove</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {blogs.map((blog) => (
//                     <tr key={blog._id} className="text-center">
//                       <td className="border px-4 py-2">{blog.title}</td>
//                       <td className="border px-4 py-2">{blog.category}</td>
//                       <td className="border px-4 py-2">
//                         <img
//                           src={`http://localhost:4000/images/${blog.image}`}
//                           alt={blog.title}
//                           className="w-16 h-16 object-cover mx-auto"
//                         />
//                       </td>
//                       <td
//                         className="border px-4 py-2 cursor-pointer"
//                         onClick={() => removeBlog(blog._id)}
//                       >
//                         X
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Dashboard;




import { useEffect, useState, useContext } from "react";
// using sonner instead of react-toastify
import { toast } from "sonner";
import { HiPlusCircle, HiViewList, HiTrash, HiCloudUpload } from "react-icons/hi";
import api, { BASE_URL } from "../api/api"; 
import { StoreContext } from "../context/StoreContext";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
  });
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
     
      const res = await api.post("/blog/create", data);
      
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ title: "", category: "", description: "", image: null });
        setActiveTab("list");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // fetch only blogs for authenticated user (use existing deployed route)
        const res = await api.get("/blog/user/blogs");
        // userBlogs returns an array (status 200) or wraps in data; handle both
        if (res.data?.success) {
          setBlogs(res.data.blogs || []);
        } else if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else if (res.data.blogs) {
          setBlogs(res.data.blogs);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchBlogs();
  }, [activeTab]);

  const removeBlog = async (blogId, ownerId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    // client-side guard: only owner can trigger delete
    if (String(ownerId) !== String(user?._id)) {
      toast.error("Not authorized to delete this blog");
      return;
    }
    try {
      const res = await api.delete(`/blog/delete/${blogId}`);
      if (res.data.success) {
        toast.success(res.data.message);
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
    
      <aside className="w-full md:w-72 bg-white border-r border-gray-200 p-6">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">
            Admin <span className="text-orange-600">Portal</span>
          </h2>
          <p className="text-xs text-gray-400 uppercase font-bold mt-1 tracking-widest">Management</p>
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("post")}
            className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all font-medium ${
              activeTab === "post" ? "bg-orange-600 text-white shadow-lg shadow-orange-200" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <HiPlusCircle size={20} /> Post a Blog
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all font-medium ${
              activeTab === "list" ? "bg-orange-600 text-white shadow-lg shadow-orange-200" : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
            }`}
          >
            <HiViewList size={20} /> All Blogs
          </button>
        </nav>
      </aside>

      
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {activeTab === "post" ? (
            <section className="animate-fadeIn">
              <header className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Create New Story</h2>
                <p className="text-gray-500">Fill in the details to publish your next masterpiece.</p>
              </header>

              <form onSubmit={submitHandler} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Blog Title</label>
                    <input
                      name="title" value={formData.title} onChange={onChangeHandler}
                      type="text" placeholder="e.g. The Future of AI" required
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700">Category</label>
                    <select 
                      name="category" value={formData.category} onChange={onChangeHandler}
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Technology">Technology</option>
                      <option value="Lifestyle">Lifestyle</option>
                      <option value="Health">Health</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea
                    name="description" value={formData.description} onChange={onChangeHandler}
                    placeholder="Write your content here..." rows="6" required
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Upload Banner</label>
                  <label className="group flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiCloudUpload size={40} className="text-gray-400 group-hover:text-orange-500 mb-2" />
                      <p className="text-sm text-gray-500">{formData.image ? formData.image.name : "Click to upload image"}</p>
                    </div>
                    <input onChange={fileHandler} type="file" accept="image/*" className="hidden" required />
                  </label>
                </div>

                <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-xl active:scale-[0.98]">
                  Publish Blog
                </button>
              </form>
            </section>
          ) : (
            <section className="animate-fadeIn">
              <header className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Manage Blogs</h2>
                <p className="text-gray-500">You have published {blogs.length} articles.</p>
              </header>

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-black tracking-widest border-b border-gray-100">
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Blog Details</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {blogs.map((blog) => (
                      <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <img
                            src={`${BASE_URL}/images/${blog.image}`}
                            alt=""
                            className="w-20 h-14 object-cover rounded-lg shadow-sm"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-800 line-clamp-1">{blog.title}</p>
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {String(blog.author?.id) === String(user?._id) ? (
                            <button
                              onClick={() => removeBlog(blog._id, blog.author?.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <HiTrash size={20} />
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;