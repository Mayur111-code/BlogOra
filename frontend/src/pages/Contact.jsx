import { motion } from "framer-motion";
import { useState } from "react";
import { assets } from "../assets/assets";
import { Container } from "../components/shared/Container";
import { HiMail, HiOutlineChatAlt2 } from "react-icons/hi";

const Contact = () => {
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResult("Sending....");

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", "89cb5bcb-e445-48f2-a724-98259664cf4d");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Message Sent Successfully!");
        event.target.reset();
      } else {
        setResult(data.message || "Failed to send message");
      }
    } catch (err) {
      setResult("Network error, please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-32 pb-20 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 px-4 py-1.5 rounded-full mb-4">
            <span className="text-orange-600 text-[10px] font-black uppercase tracking-[0.2em]">
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">
            Let&apos;s <span className="text-orange-600">Connect.</span>
          </h1>
          <p className="text-gray-500 mt-6 text-lg">
            Have a question or just want to say hi? We&apos;d love to hear from
            you. Expect a response within 24 hours.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 space-y-8"
          >
            <div className="relative group overflow-hidden rounded-[2.5rem]">
              <img
                src={assets.contact}
                alt="Contact"
                loading="lazy"
                decoding="async"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-bold text-xl">
                  We&apos;re based in India,
                  <br /> available worldwide.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:bg-orange-50 hover:border-orange-100 group">
                <div className="w-14 h-14 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <HiMail size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                    Email Address
                  </p>
                  <p className="text-lg font-bold text-gray-900 tracking-tight">
                    mayurborse7440@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl border border-gray-100 transition-all hover:bg-orange-50 hover:border-orange-100 group">
                <div className="w-14 h-14 bg-white text-orange-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <HiOutlineChatAlt2 size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                    Support
                  </p>
                  <p className="text-lg font-bold text-gray-900 tracking-tight">
                    Help Center & FAQ
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-[1.2] bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)]"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-orange-500 outline-none transition-all resize-none font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gray-900 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:bg-orange-600 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:bg-gray-400"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>

              {result && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center mt-4 font-bold text-sm uppercase tracking-tighter ${
                    result.includes("Successfully")
                      ? "text-green-500"
                      : "text-orange-600"
                  }`}
                >
                  {result}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </main>
  );
};

export default Contact;
