"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer, hoverScale } from "@/lib/animations";
import { Brain, BarChart3, LockKeyhole } from "lucide-react";

const features = [
  {
    name: "Smart Adaptive Tests",
    description:
      "Our AI-powered testing engine adjusts difficulty based on your performance, creating a personalized learning experience.",
    icon: Brain,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Detailed Analytics",
    description:
      "Get comprehensive insights into your strengths and weaknesses with our advanced analytics dashboard.",
    icon: BarChart3,
    color: "from-indigo-400 to-indigo-600",
  },
  {
    name: "Secure & Scalable",
    description:
      "Enterprise-grade security ensures your data is safe, while our platform can handle millions of simultaneous test-takers.",
    icon: LockKeyhole,
    color: "from-purple-400 to-purple-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Key Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Our platform combines cutting-edge technology with expert knowledge to help you achieve your testing goals.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              variants={fadeIn("up", 0.1 * index)}
              whileHover={hoverScale}
              className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="absolute -top-6 left-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="pt-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.name}</h3>
                <p className="mt-4 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}