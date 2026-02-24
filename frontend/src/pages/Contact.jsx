import { assets } from "../assets/assets";
import { Container, SectionTitle } from "../components/shared/Container";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { useState } from "react";

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "89cb5bcb-e445-48f2-a724-98259664cf4d"); 

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully! ✅");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <main className="py-16 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionTitle subtitle="Have a question?">Contact Us</SectionTitle>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="flex-1 w-full space-y-8">
            <img src={assets.contact} alt="Contact" className="rounded-3xl shadow-lg w-full h-64 object-cover mb-6" />
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
                <HiMail size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Email Us</p>
                <p className="text-xl font-semibold text-gray-800 tracking-tight">mayurborse7440@gmail.com</p>
              </div>
            </div>
            
          </div>

          
          <div className="flex-1 w-full bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input 
                  type="text" name="name" required
                  placeholder="Your Name" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input 
                  type="email" name="email" required
                  placeholder="mayur@example.com" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  name="message" required rows="5" 
                  placeholder="How can I help you?" 
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 transition-all active:scale-[0.98]"
              >
                Send Message
              </button>

              {result && (
                <p className={`text-center mt-4 font-medium ${result.includes('Successfully') ? 'text-green-600' : 'text-gray-600'}`}>
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default Contact;