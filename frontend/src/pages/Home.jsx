// import Hero from "../components/Hero";
// import LatestBlogs from "../components/LatestBlogs";
// const Home = () => {
//   return (
//     <div>
//       <Hero />
//       <LatestBlogs />
//     </div>
//   );
// };
// export default Home;


import Hero from "../components/Hero";
import LatestBlogs from "../components/LatestBlogs";

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <LatestBlogs />
      {/* You can easily add a Newsletter or Footer section here next */}
    </main>
  );
};
export default Home;