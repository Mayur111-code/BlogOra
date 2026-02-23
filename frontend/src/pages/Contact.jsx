// import { assets } from "../assets/assets";
// const Contact = () => {
//   return (
//     <div>
//       <h1 className="text-center text-3xl uppercase font-bold my-8">Contact</h1>
//       <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto my-6">
//         {" "}
//         Welcome to <span className="text-blue-600 font-semibold ">MyBlog</span>,
//         your go-to platform for insightful articles on technology, lifestyle,
//         and beyond. Our mission is to share knowledge and inspire creativity
//         through engaging and well-researched content. Whether you're a tech
//         enthusiast, a passionate writer, or someone looking for inspiration,
//         we've got something for you!
//       </p>
//       <div>
//         <img src={assets.contact} alt="" />
//       </div>
//     </div>
//   );
// };
// export default Contact;



// import { assets } from "../assets/assets";
// import { Container, SectionTitle } from "../components/shared/Container";
// import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi"; // Nice icons for contact info

// const Contact = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form logic here
//   };

//   return (
//     <main className="py-16 bg-white">
//       <Container>
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <SectionTitle subtitle="Have a question or want to collaborate?">Contact Us</SectionTitle>
//           <p className="text-gray-600 text-lg mt-4">
//             We'd love to hear from you. Whether you have a question about features, 
//             trials, pricing, or even press, our team is ready to answer all your questions.
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-16 items-start">
          
//           {/* Contact Information & Image */}
//           <div className="flex-1 w-full">
//             <div className="relative mb-10">
//               <img 
//                 src={assets.contact} 
//                 alt="Contact Us" 
//                 className="rounded-3xl shadow-xl w-full h-80 object-cover" 
//               />
//               <div className="absolute inset-0 bg-orange-600/10 rounded-3xl"></div>
//             </div>

//             <div className="space-y-8">
//               <div className="flex items-center gap-5">
//                 <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
//                   <HiMail size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Email Us</p>
//                   <p className="text-xl font-semibold text-gray-800">hello@blogora.com</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-5">
//                 <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center shrink-0">
//                   <HiPhone size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Call Us</p>
//                   <p className="text-xl font-semibold text-gray-800">+1 (555) 000-0000</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-5">
//                 <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-2xl flex items-center justify-center shrink-0">
//                   <HiLocationMarker size={24} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">Visit Us</p>
//                   <p className="text-xl font-semibold text-gray-800">123 Tech Avenue, New York, NY</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="flex-1 w-full bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
//                   <input 
//                     type="text" 
//                     placeholder="John Doe" 
//                     className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
//                   <input 
//                     type="email" 
//                     placeholder="john@example.com" 
//                     className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
//                 <input 
//                   type="text" 
//                   placeholder="How can we help?" 
//                   className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
//                 <textarea 
//                   rows="5" 
//                   placeholder="Type your message here..." 
//                   className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
//                 ></textarea>
//               </div>

//               <button 
//                 type="submit" 
//                 className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 transition-all active:scale-[0.98]"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//         </div>
//       </Container>
//     </main>
//   );
// };

// export default Contact;


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

    // This is the key that tells Web3Forms where to send the email
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
          {/* Left Side: Contact Info */}
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
            {/* ... other contact items (phone/location) ... */}
          </div>

          {/* Right Side: Functional Form */}
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

              {/* Status Message */}
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