// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const videos = [
//   { id: 1, src: "/resv.webm", caption: "QR Menu Experience" },
//   { id: 2, src: "/resv.webm", caption: "Instant Ordering Flow" },
//   { id: 3, src: "/resv.webm", caption: "Kitchen Dashboard" },
// ];

// const VideoCarousel = () => {
//   const [index, setIndex] = useState(0);

//   // Auto-slide every 6 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % videos.length);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePrev = () =>
//     setIndex((prev) => (prev - 1 + videos.length) % videos.length);
//   const handleNext = () => setIndex((prev) => (prev + 1) % videos.length);

//   return (
//     <section className="relative w-full flex flex-col items-center justify-center overflow-hidden py-10 bg-gradient-to-b from-[#F9FAFB] via-white to-[#EFF6FF]">
//       {/* Background Glow */}
//       <div className="absolute -z-10 w-[160px] h-[160px] bg-cyan-400/20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />

//       {/* Carousel Container */}
//       <div className="relative w-[85%] sm:w-[70%] md:w-[55%] lg:w-[45%] aspect-[16/9] overflow-hidden rounded-2xl shadow-xl bg-black/30 backdrop-blur-md">
//         <AnimatePresence mode="wait">
//           <motion.video
//             key={videos[index].id}
//             src={videos[index].src}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className="w-full h-full object-cover rounded-2xl"
//             initial={{ opacity: 0, x: 40 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -40 }}
//             transition={{ duration: 0.6, ease: "easeInOut" }}
//           />
//         </AnimatePresence>

//         {/* Caption */}
//         <motion.div
//           key={videos[index].caption}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           transition={{ duration: 0.5 }}
//           className="absolute bottom-3 left-0 right-0 text-center text-white/90 font-medium text-sm md:text-base"
//         >
//           {videos[index].caption}
//         </motion.div>

//         {/* Controls */}
//         <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-3 md:px-4">
//           <button
//             onClick={handlePrev}
//             className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition"
//           >
//             <ChevronLeft size={22} />
//           </button>
//           <button
//             onClick={handleNext}
//             className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white transition"
//           >
//             <ChevronRight size={22} />
//           </button>
//         </div>
//       </div>

//       {/* Dots Indicator */}
//       <div className="flex mt-5 gap-2">
//         {videos.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`w-2.5 h-2.5 rounded-full transition-all ${
//               i === index ? "bg-cyan-400 scale-110" : "bg-gray-400/50"
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default VideoCarousel;
