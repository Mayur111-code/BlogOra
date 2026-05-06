import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const NotFound = () => (
  <main className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-16 bg-white">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-lg"
    >
      <p className="text-orange-600 text-xs font-black uppercase tracking-[0.3em]">
        Error 404
      </p>
      <h1 className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter mt-2">
        Lost in <span className="text-orange-600">space.</span>
      </h1>
      <p className="text-gray-500 mt-6 text-lg">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-xl active:scale-[0.98]"
        >
          <HiArrowLeft /> Back home
        </Link>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:border-orange-500 hover:text-orange-600 transition-all"
        >
          Browse stories
        </Link>
      </div>
    </motion.div>
  </main>
);

export default NotFound;
