// import { Link } from "react-router-dom";
// const BlogCard = ({
//   id,
//   title,
//   category,
//   image,
//   author_name,
//   author_image,
//   date,
// }) => {
//   return (
//     <div className="border-1 border-gray-300 shadow-md p-3 rounded-md">
//       <Link to={`/blog/${id}`}>
//         <img
//           src={`http://localhost:4000/images/${image}`}
//           alt=""
//           className="flex items-center justify-center w-full mx-auto cursor-pointer transform duration-300 hover:scale-105"
//         />
//       </Link>
//       <p className="text-[#4B6BFB] font-semibold my-3 ">{category}</p>
//       <h1 className="text-xl font-bold">{title}</h1>
//       <div className="flex gap-3 items-center my-3">
//         <img
//           className="w-8 h-8 rounded-full"
//           src={`http://localhost:4000/images/${author_image}`}
//           alt=""
//         />
//         <p className="text-lg font-bold text-gray-600">{author_name}</p>
//         <p className="text-lg font-bold text-gray-600">
//           {new Date(date).toLocaleDateString("en-US", {
//             month: "long",
//             day: "2-digit",
//             year: "numeric",
//           })}
//         </p>
//       </div>
//     </div>
//   );
// };
// export default BlogCard;




import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
  const url = "http://localhost:4000";

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <Link to={`/blog/${id}`} className="relative overflow-hidden block aspect-[16/10]">
        <img
          src={`${url}/images/${image}`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/blog/${id}`} className="group-hover:text-orange-600 transition-colors">
          <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3 line-clamp-2">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          Discover the latest insights and deep dives into {category.toLowerCase()} that you won't find anywhere else...
        </p>

        {/* Footer: Author & Date */}
        <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-50"
              src={`${url}/images/${author_image}`}
              alt={author_name}
            />
            <div className="flex flex-col">
              <p className="text-sm font-bold text-gray-800 leading-none">{author_name}</p>
              <p className="text-[11px] text-gray-400 font-medium mt-1">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <Link 
            to={`/blog/${id}`} 
            className="text-orange-600 p-2 rounded-full bg-orange-50 hover:bg-orange-600 hover:text-white transition-all duration-300"
          >
            <HiOutlineArrowNarrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;