import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { Container, SectionTitle } from "../components/shared/Container";

const STATS = [
  { label: "Articles", value: "500+" },
  { label: "Readers", value: "10k+" },
  { label: "Authors", value: "50+" },
  { label: "Countries", value: "20+" },
];

const REASONS = [
  "Curated content from industry experts",
  "Community-driven storytelling",
  "Latest trends in Tech & Lifestyle",
  "Clean, distraction-free reading experience",
];

const About = () => {
  return (
    <main className="py-16 bg-white pt-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionTitle subtitle="Our Journey & Vision">About Blogora</SectionTitle>
          <p className="text-gray-600 text-lg leading-relaxed mt-6">
            Welcome to{" "}
            <span className="text-orange-600 font-bold">Blogora</span>, your
            premier destination for insightful articles on technology,
            lifestyle, and everything in between. We believe in the power of
            words to change perspectives and spark innovation.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full -z-10 animate-pulse"></div>
            <img
              src={assets.about}
              alt="About Blogora"
              loading="lazy"
              decoding="async"
              className="rounded-3xl shadow-2xl w-full object-cover transform hover:-rotate-1 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-100 rounded-3xl -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex-1 space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to share knowledge and inspire creativity through
              engaging and well-researched content. Whether you&apos;re a tech
              enthusiast, a passionate writer, or someone looking for daily
              inspiration, we&apos;ve curated a space just for you.
            </p>

            <h3 className="text-2xl font-bold text-gray-800">Why Blogora?</h3>
            <ul className="space-y-4">
              {REASONS.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-gray-700"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full text-xs font-bold"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-gray-50 rounded-3xl"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-orange-600">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </Container>
    </main>
  );
};

export default About;
