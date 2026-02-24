import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Container } from "../components/shared/Container";
import { HiArrowLeft, HiOutlineClock, HiOutlineCalendar } from "react-icons/hi";
import { BASE_URL } from "../api/api"; 
const SingleBlog = () => {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);

  const blog = blogData.find((b) => b._id === id);


  if (!blog) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <main className="py-12 bg-white min-h-screen">
      <Container>
        
        <Link 
          to="/blogs" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-8 transition-colors font-medium"
        >
          <HiArrowLeft /> Back to Blogs
        </Link>

        <article className="max-w-4xl mx-auto">
         
          <div className="space-y-4 mb-8">
            <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
              {blog.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-4 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-100"
                  src={`${BASE_URL}/images/${blog.author.image}`} // api.js wala BASE_URL use kiya
                  alt={blog.author.name}
                />
                <div>
                  <p className="text-sm text-gray-400 font-medium">Written by</p>
                  <p className="text-gray-900 font-bold">{blog.author.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-500">
                <HiOutlineCalendar size={20} />
                <span className="text-sm font-medium">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <HiOutlineClock size={20} />
                <span className="text-sm font-medium">5 min read</span>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <img
              className="w-full h-[300px] md:h-[500px] object-cover rounded-3xl shadow-2xl"
              src={`${BASE_URL}/images/${blog.image}`} // api.js wala BASE_URL use kiya
              alt={blog.title}
            />
          </div>

          <div className="prose prose-lg max-w-none prose-orange">
            <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-line">
              {blog.description}
            </p>
          </div>

          <div className="mt-16 p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-gray-900">Enjoyed this article?</h4>
              <p className="text-gray-500">Share it with your network or leave a comment.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-bold hover:border-orange-500 transition-all">
                Share
              </button>
              <button className="bg-gray-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
};

export default SingleBlog;