"use client";

import { motion } from "framer-motion";
import { fadeIn, hoverScale } from "@/lib/animations";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-white/0 via-white/5 to-white/0 blur-xl" />
        </div>

        <div className="text-center">
          <motion.div
            variants={fadeIn("up")}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm mb-8">
              <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
              <span className="text-white text-sm font-medium">Start your journey today</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Ready to take your first test?
            </h2>
            
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of students who have already improved their test scores with our platform.
            </p>
            
            <motion.div 
              className="mt-10"
              whileHover={hoverScale}
            >
              <Button 
                variant="default" 
                size="xl" 
                className="rounded-full bg-white text-blue-600 hover:bg-white/90 group"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            
            <p className="mt-6 text-sm text-blue-200">
              No credit card required. Start with our free tier today.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}