"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Rocket, HeartHandshake } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const team = [
  { name: "Aayush", gender: "M", img: "/avatars/1.png" },
  { name: "Pranjal", gender: "F", img: "/avatars/2.png" },
  { name: "Akshat", gender: "M", img: "/avatars/3.png" },
  { name: "Anhad", gender: "M", img: "/avatars/4.png" },
];

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white px-6 py-20">
        <section className="max-w-7xl mx-auto space-y-24">

          {/* Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              We're Building Social Commerce For Bharat 🚀
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              WishCare is on a mission to change how India shops online — by blending trust, social proof, and reels into one powerful experience.
            </p>
          </motion.div>

          {/* What makes us different */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-purple-700">Why We Exist 💡</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg leading-relaxed">
                <li>Overloaded by fake reviews? We let you ask your <b>friends</b> directly.</li>
                <li>Can’t decide? Watch a reel by a <b>real buyer</b> before you buy.</li>
                <li>Love shopping together? Get <b>group discounts</b> with your squad.</li>
                <li>Build your wishlist, follow your friends and trust the social feed.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <Avatar key={i} className="w-16 h-16 border shadow-md hover:scale-105 transition-transform">
                  <AvatarImage src={`/avatars/${i + 1}.png`} />
                  <AvatarFallback>U{i + 1}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </motion.div>

          {/* Differentiators */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white border border-purple-100 p-10 rounded-xl shadow-lg space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-purple-700">How We're Different 🧠</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  icon: <BadgeCheck className="w-10 h-10 mx-auto text-pink-500" />,
                  title: "Verified Social Proof",
                  desc: "See real reviews, ask your friends, and skip fake ratings.",
                },
                {
                  icon: <HeartHandshake className="w-10 h-10 mx-auto text-purple-500" />,
                  title: "Community Driven",
                  desc: "Follow users, get inspired by wishlists & real trends.",
                },
                {
                  icon: <Rocket className="w-10 h-10 mx-auto text-indigo-500" />,
                  title: "Reels + Commerce",
                  desc: "Watch product reels directly from sellers and influencers.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-md transition">
                  {feature.icon}
                  <h3 className="font-semibold text-lg mt-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl font-bold text-purple-700">Meet The Team 👨‍💻👩‍💻</h2>
            <p className="text-gray-600 mb-6">We are a bunch of passionate creators building something big!</p>
            <div className="flex flex-wrap justify-center gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <Avatar className="w-20 h-20 shadow-md">
                    <AvatarImage src={member.img} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium text-gray-800">{member.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border border-purple-200 rounded-2xl p-10 text-center shadow-lg"
          >
            <h3 className="text-3xl font-bold mb-4 text-purple-800">🌟 Our Vision</h3>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed">
              To revolutionize Indian e-commerce by making it personal, social, and fun.
              We’re not just building another store — we’re building a platform where
              your trust network fuels your next purchase.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/category">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full text-lg shadow-md hover:scale-105 transition">
                Start Exploring
              </Button>
            </Link>
          </motion.div>

        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
