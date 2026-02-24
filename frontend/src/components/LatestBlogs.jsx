import { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";
import { Container, SectionTitle } from "./shared/Container"; 
import { Link } from "react-router-dom";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);

  const displayBlogs = blogData?.slice(-6).reverse() || [];

  return (
    <section className="py-16">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionTitle subtitle="Fresh off the press: our newest stories.">
            Latest Blogs
          </SectionTitle>
          <Link to="/blogs" className="hidden md:block text-orange-600 font-bold hover:underline mb-12">
            View All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              title={blog.title}
              image={blog.image}
              category={blog.category}
              author_name={blog.author.name}
              author_image={blog.author.image}
              date={new Date(blog.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
        
        
        <div className="mt-10 md:hidden flex justify-center">
           <Link to="/blogs" className="w-full text-center bg-gray-100 text-gray-800 py-4 rounded-xl font-bold">
             View All Posts
           </Link>
        </div>
      </Container>
    </section>
  );
};
export default LatestBlogs;