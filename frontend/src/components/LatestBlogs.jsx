import { useContext } from "react";
import { motion } from "framer-motion";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";
import { Container } from "./shared/Container";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);
  const blogs = Array.isArray(blogData) ? blogData : [];
  const displayBlogs = blogs.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", bounce: 0.3 },
    },
  };

  return (
    <section className="py-20 relative bg-gray-50/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-100 px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-gray-900 text-[10px] font-black uppercase tracking-widest">
                Fresh Off The Press
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Latest <span className="text-orange-600">Stories.</span>
            </h2>
          </div>

          <Link
            to="/blogs"
            className="hidden md:flex items-center gap-2 text-gray-500 font-bold hover:text-orange-600 transition-colors group pb-2"
          >
            View All Posts{" "}
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayBlogs.map((blog) => (
            <motion.div
              variants={cardVariants}
              key={blog._id}
              className="h-full"
            >
              <BlogCard
                id={blog._id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                author_name={blog.author?.name}
                author_image={blog.author?.image}
                date={blog.createdAt}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:hidden flex justify-center"
        >
          <Link
            to="/blogs"
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
          >
            View All Posts <HiArrowRight />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default LatestBlogs;
