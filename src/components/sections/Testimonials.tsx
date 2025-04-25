"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    content:
      "TestPro helped me ace my college entrance exams. The adaptive tests identified my weak areas, and the practice materials were exactly what I needed to improve.",
    name: "Emily Chen",
    title: "Computer Science Student",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
  },
  {
    id: 2,
    content:
      "As a hiring manager, TestPro has made our recruitment process so much more efficient. We can now evaluate candidates' aptitude with greater precision and confidence.",
    name: "Michael Rodriguez",
    title: "HR Director, TechCorp",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
  },
  {
    id: 3,
    content:
      "The detailed analytics and progress tracking features are incredible. I've seen a measurable improvement in my test scores since using TestPro's platform.",
    name: "Sarah Johnson",
    title: "MBA Candidate",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      next();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            What Our Users Say
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Join thousands of satisfied users who have improved their test results with TestPro.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl overflow-hidden shadow-lg"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-40" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/30 rounded-full filter blur-3xl opacity-40" />
            </div>

            <div className="relative py-12 px-6 md:px-12 min-h-[400px] flex items-center">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/4 mb-6 md:mb-0 flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                          <img
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < testimonials[currentIndex].rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300 dark:text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-3/4 md:pl-8">
                      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic">
                        "{testimonials[currentIndex].content}"
                      </p>
                      <div className="mt-6">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {testimonials[currentIndex].name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonials[currentIndex].title}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation controls */}
            <div className="absolute bottom-6 w-full flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-blue-600 dark:bg-blue-400 w-6"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow controls */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={next}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}