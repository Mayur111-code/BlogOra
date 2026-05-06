import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { StoreContext } from "../context/StoreContext";
import { Container } from "../components/shared/Container";

const CATEGORIES = [
  "All",
  "Technology",
  "Lifestyle",
  "Travel",
  "Health",
  "Business",
];

const Blogs = () => {
  const { blogData } = useContext(StoreContext);
  const [activeCategory, setActiveCategory] = useState("All");

  const blogs = Array.isArray(blogData) ? blogData : [];
  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <main className="pb-20">
      <Hero />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 mb-12 text-center"
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-orange-50 border border-orange-100">
            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em]">
              Curated Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
            All <span className="text-orange-600">Stories.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Welcome to{" "}
            <span className="text-gray-900 font-bold">Blogora</span> — explore
            different perspectives, stay updated, and grow with every article
            you read.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100 w-fit mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 sm:px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                activeCategory === cat
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-900 rounded-full shadow-lg shadow-gray-200"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div
                  key={blog._id || blog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <BlogCard
                    id={blog._id || blog.id}
                    title={blog.title}
                    image={blog.image}
                    category={blog.category}
                    author_name={blog.author?.name}
                    author_image={blog.author?.image}
                    date={blog.createdAt || blog.date}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-20"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <p className="text-gray-400 text-xl font-medium">
                  No stories found in {activeCategory}.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Container>
    </main>
  );
};

export default Blogs;
