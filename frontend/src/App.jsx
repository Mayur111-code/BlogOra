import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleBlog from "./pages/SingleBlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// switched from react-toastify to sonner for lightweight toasts
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
const App = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
      </Routes>
      <Footer />
      {/* Sonner toaster is mounted once at root for global notifications */}
      <Toaster position="top-right" />
    </div>
  );
};
export default App;
