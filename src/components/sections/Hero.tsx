"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { fadeIn, slideIn } from "@/lib/animations";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/30 rounded-full filter blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            variants={fadeIn("right")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Ace Your Next Test</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                with Confidence
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Take smart, AI-powered aptitude tests curated by experts. Get personalized insights and improve your skills.
            </p>
            
            
            <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Trusted by <span className="font-semibold">10,000+</span> students
              </div>
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  );
}