import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 to-white overflow-hidden rounded-3xl my-6 mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-20 gap-10">
        
       
        <div className="flex-1 space-y-6 text-center md:text-left">
          <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase">
            New Perspectives
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight">
            Discover Stories that <span className="text-orange-600">Inspire</span> & Inform.
          </h1>
          <p className="text-gray-600 text-lg max-w-lg">
            Join Blog Ora to explore the latest insights from tech, lifestyle, and creative minds around the world.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/blogs" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-orange-700 transition-all hover:-translate-y-1">
              Start Reading
            </Link>
            <button className="bg-white border-2 border-gray-100 text-gray-800 px-8 py-4 rounded-xl font-bold hover:border-orange-200 transition-all">
              <Link to="/login">Join Our Community</Link>
            </button>
          </div>
        </div>

      
        <div className="flex-1 relative group">
          <div className="absolute -inset-4 bg-orange-200/50 rounded-full blur-3xl group-hover:bg-orange-300/50 transition-colors"></div>
          <img 
            src={assets.hero} 
            alt="Hero" 
            className="relative w-full h-auto object-cover rounded-2xl drop-shadow-2xl transform hover:scale-[1.02] transition-transform duration-500" 
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;