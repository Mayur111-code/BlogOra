import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Container } from "../components/shared/Container";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Standard social icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
       
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={assets.logo} alt="Logo" className="w-8 brightness-0 invert" />
              <p className="text-2xl text-white">
                Blog <span className="font-bold text-orange-500">Ora</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              At Blogora, we believe knowledge should have no boundaries. We craft content 
              to inform, inspire, and empower you every day across technology, lifestyle, and more.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-orange-500 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {["Home", "Blogs", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
                    className="hover:text-orange-500 hover:translate-x-1 transition-all inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Categories</h3>
            <ul className="flex flex-col gap-4">
              {["Technology", "Lifestyle", "Business", "Health"].map((cat) => (
                <li key={cat}>
                  <Link to={`/blogs`} className="hover:text-orange-500 hover:translate-x-1 transition-all inline-block">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase text-xs">Email</span>
                <span className="text-white text-base">blogora@gmail.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-gray-500 font-bold uppercase text-xs">Phone</span>
                <span className="text-white text-base">+1 234 567 890</span>
              </li>
              <li className="mt-6">
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase">Stay Updated</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="Email" className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs w-full focus:outline-none focus:border-orange-500" />
                    <button className="bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-bold">Join</button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

 
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
  <p className="text-center md:text-left">
    © {currentYear} Blogora The Blog App. All rights reserved.{" "}
    <span className="mx-1">|</span>
    Powered by{" "}
    <a
      href="https://web-craft-services.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-white hover:underline underline-offset-4 transition-colors"
    >
      WebCraft
    </a>
  </p>

  <ul className="flex gap-6">
    <li className="hover:text-white cursor-pointer transition-colors underline-offset-4 hover:underline">
      Privacy Policy
    </li>

    <li className="hover:text-white cursor-pointer transition-colors underline-offset-4 hover:underline">
      Terms & Conditions
    </li>
  </ul>
</div>
      </Container>
    </footer>
  );
};

export default Footer;