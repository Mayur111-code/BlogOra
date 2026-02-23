// import { useContext } from "react";
// import BlogCard from "./BlogCard";
// import { StoreContext } from "../context/StoreContext";
// const LatestBlogs = () => {
//   const { blogData } = useContext(StoreContext);
//   return (
//     <div>
//       <h1 className="text-3xl my-3 text-gray-700 font-bold text-center sm:text-start">
//         Latest Blogs
//       </h1>
//       <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
//         {blogData
//           .slice(-6)
//           .reverse()
//           .map((blog, index) => (
//             <BlogCard
//               key={index}
//               id={blog._id}
//               title={blog.title}
//               image={blog.image}
//               category={blog.category}
//               author_name={blog.author.name}
//               author_image={blog.author.image}
//               date={blog.createdAt}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };
// export default LatestBlogs;




import { useContext } from "react";
import BlogCard from "./BlogCard";
import { StoreContext } from "../context/StoreContext";
import { Container, SectionTitle } from "./shared/Container"; // Adjust path as needed
import { Link } from "react-router-dom";

const LatestBlogs = () => {
  const { blogData } = useContext(StoreContext);
  
  // Logic: Get latest 6 blogs
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
              date={new Date(blog.createdAt).toLocaleDateString()} // Human readable date
            />
          ))}
        </div>
        
        {/* Mobile-only view all button */}
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