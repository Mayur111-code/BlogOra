import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { BASE_URL } from "../api/api"; 

const BlogCard = ({
  id,
  title,
  category,
  image,
  author_name,
  author_image,
  date,
}) => {
 

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-500 flex flex-col h-full">
     
      <Link to={`/blog/${id}`} className="relative overflow-hidden block aspect-[16/10]">
        <img
          src={`${BASE_URL}/images/${image}`} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Blog+Image"; }}
        />
      
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-orange-600 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm uppercase tracking-wider">
            {category}
          </span>
        </div>
      </Link>


      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/blog/${id}`} className="group-hover:text-orange-600 transition-colors">
          <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3 line-clamp-2">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-grow">
          Discover the latest insights and deep dives into {category?.toLowerCase() || "this category"} that you won't find anywhere else...
        </p>

     
        <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-50"
              src={author_image ? `${BASE_URL}/images/${author_image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt={author_name}
              onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"; }}
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