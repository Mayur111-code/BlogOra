import { motion, useReducedMotion } from "framer-motion";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const float = prefersReducedMotion
    ? {}
    : { animate: { y: [0, -20, 0] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };

  const floatBadge = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, 10, 0] },
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
      };

  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden bg-white pt-28 mb-12">
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-orange-100/50 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-10 left-[-5%] w-72 h-72 bg-indigo-50/50 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
              <span className="text-orange-600 text-xs font-bold uppercase tracking-widest">
                Explore the Newest Stories
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight"
            >
              Discover Stories <br />
              that{" "}
              <span className="relative inline-block">
                Inspire
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M1 5.5C40.5 2.16667 120 -1.5 199 6.5"
                    stroke="#EA580C"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-500 text-lg lg:text-xl max-w-lg leading-relaxed"
            >
              Join <strong>Blogora</strong> to explore a curated world of tech,
              lifestyle, and creativity. Your journey into the extraordinary
              starts here.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-5 justify-center md:justify-start pt-4"
            >
              <Link
                to="/blogs"
                className="group relative bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold overflow-hidden transition-all hover:shadow-2xl hover:shadow-orange-200"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Reading{" "}
                  <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <Link
                to="/login"
                className="px-10 py-4 rounded-2xl font-bold border-2 border-gray-100 text-gray-800 hover:border-orange-500 transition-all active:scale-95"
              >
                Community
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative flex justify-center"
          >
            <motion.div
              {...float}
              className="relative z-10 w-[300px] lg:w-[400px]"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-orange-500 to-indigo-500 rounded-[2.5rem] blur opacity-20 transition duration-1000"></div>
              <img
                src={assets.hero}
                alt="Blogora hero illustration"
                loading="eager"
                decoding="async"
                className="relative w-full h-[300px] lg:h-[400px] mx-auto object-cover rounded-[2rem] shadow-2xl"
              />

              <motion.div
                {...floatBadge}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block border border-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                    5K+
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Active Readers
                    </p>
                    <p className="text-xs text-gray-500">Growing every day</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
