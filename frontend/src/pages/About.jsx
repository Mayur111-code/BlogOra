import { assets } from "../assets/assets";
import { Container, SectionTitle } from "../components/shared/Container";

const About = () => {
  return (
    <main className="py-16 bg-white">
      <Container>
      
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle subtitle="Our Journey & Vision">About Blog Ora</SectionTitle>
          <p className="text-gray-600 text-lg leading-relaxed mt-6">
            Welcome to <span className="text-orange-600 font-bold">Blog Ora</span>, 
            your premier destination for insightful articles on technology, lifestyle, 
            and everything in between. We believe in the power of words to change 
            perspectives and spark innovation.
          </p>
        </div>

       
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 relative">
         
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full -z-10 animate-pulse"></div>
            <img 
              src={assets.about} 
              alt="About Us" 
              className="rounded-3xl shadow-2xl w-full object-cover transform hover:-rotate-1 transition-transform duration-500"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gray-100 rounded-3xl -z-10"></div>
          </div>

          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to share knowledge and inspire creativity through engaging 
              and well-researched content. Whether you're a tech enthusiast, a 
              passionate writer, or someone looking for daily inspiration, we've 
              curated a space just for you.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-800">Why Blog Ora?</h3>
            <ul className="space-y-4">
              {[
                "Curated content from industry experts",
                "Community-driven storytelling",
                "Latest trends in Tech & Lifestyle",
                "Clean, distraction-free reading experience"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-6 h-6 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 p-10 bg-gray-50 rounded-3xl">
          {[
            { label: "Articles", value: "500+" },
            { label: "Readers", value: "10k+" },
            { label: "Authors", value: "50+" },
            { label: "Countries", value: "20+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-black text-orange-600">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default About;