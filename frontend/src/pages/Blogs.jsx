// import Hero from "../components/Hero";
// import BlogCard from "../components/BlogCard";
// import { useContext } from "react";
// import { StoreContext } from "../context/StoreContext";
// const Blogs = () => {
//   const { blogData } = useContext(StoreContext);
//   return (
//     <div>
//       <Hero />
//       <h1 className="text-3xl text-center font-bold my-6">All Blogs</h1>
//       <p className="text-base px-3 sm:text-lg leading-6 max-w-2xl mx-auto">
//   Welcome to Blogora — your ultimate destination for knowledge, inspiration, 
//   and discovery. From the latest technology trends and educational insights 
//   to travel experiences, health tips, and sports updates, we bring diverse 
//   content that informs and inspires. Explore different perspectives, stay 
//   updated, and grow with every article you read.
// </p>
//       <div className="grid my-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-3 sm:px-4">
//         {blogData.map((blog, index) => (
//           <BlogCard
//             key={index}
//             id={blog.id}
//             title={blog.title}
//             image={blog.image}
//             category={blog.category}
//             author_name={blog.author.name}
//             author_image={blog.author.image}
//             date={blog.date}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Blogs;



import { useContext, useState } from "react";
import Hero from "../components/Hero";
import BlogCard from "../components/BlogCard";
import { StoreContext } from "../context/StoreContext";
import { Container, SectionTitle } from "../components/shared/Container";

const Blogs = () => {
  const { blogData } = useContext(StoreContext);
  const [activeCategory, setActiveCategory] = useState("All");

  // Unique categories for the filter bar
  const categories = ["All", "Technology", "Lifestyle", "Travel", "Health", "Business"];

  // Filter logic (assuming your blog object has a .category property)
  const filteredBlogs = activeCategory === "All" 
    ? blogData 
    : blogData.filter(blog => blog.category === activeCategory);

  return (
    <main className="pb-20">
      {/* Hero Section - Consider passing a prop to Hero if you want a different title for this page */}
      <Hero />

      <Container>
        <div className="mt-16 mb-12 text-center">
          <SectionTitle>All Stories</SectionTitle>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Welcome to <span className="text-orange-600 font-semibold">Blogora</span> — your ultimate destination for knowledge and discovery. 
            Explore different perspectives, stay updated, and grow with every article you read.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-100"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id || blog.id}
                id={blog._id || blog.id}
                title={blog.title}
                image={blog.image}
                category={blog.category}
                author_name={blog.author.name}
                author_image={blog.author.image}
                date={blog.createdAt || blog.date}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No blogs found in this category yet.</p>
          </div>
        )}
      </Container>
    </main>
  );
};

export default Blogs;