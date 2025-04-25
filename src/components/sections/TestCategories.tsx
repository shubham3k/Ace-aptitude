"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, hoverScale } from "@/lib/animations";
import { Calculator, BrainCircuit, Book, Code, GraduationCap, Lightbulb, Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Quantitative Aptitude",
    count: 124,
    icon: Calculator,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    name: "Logical Reasoning",
    count: 98,
    icon: BrainCircuit,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    id: 3,
    name: "Verbal Ability",
    count: 75,
    icon: Book,
    color: "from-purple-400 to-purple-600",
  },
  {
    id: 4,
    name: "Coding Tests",
    count: 56,
    icon: Code,
    color: "from-red-400 to-red-600",
  },
  {
    id: 5,
    name: "Academic Exams",
    count: 42,
    icon: GraduationCap,
    color: "from-orange-400 to-orange-600",
  },
  {
    id: 6,
    name: "General Knowledge",
    count: 87,
    icon: Lightbulb,
    color: "from-amber-400 to-amber-600",
  },
  {
    id: 7,
    name: "Corporate Assessment",
    count: 63,
    icon: Building2,
    color: "from-green-400 to-green-600",
  },
  {
    id: 8,
    name: "International Tests",
    count: 29,
    icon: Globe,
    color: "from-teal-400 to-teal-600",
  },
];

export default function TestCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  return (
    <section id="tests" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Test Library
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Explore Our Test Categories
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Choose from a wide range of carefully crafted tests to enhance your skills and knowledge.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={fadeIn("up", 0.1 * index)}
              whileHover={hoverScale}
              className="group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10" 
                style={{ backgroundImage: `linear-gradient(to right, hsl(var(--primary)), hsl(var(--primary)))` }} />
              
              <div className="relative h-full bg-white dark:bg-gray-800 p-6 z-20">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300 group-hover:text-white/80 transition-colors duration-300">
                    {category.count} tests available
                  </p>
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full bg-white text-primary hover:bg-white/90 hover:text-primary border-white"
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}