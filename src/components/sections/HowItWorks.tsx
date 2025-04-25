"use client";

import { motion } from "framer-motion";
import { fadeIn, slideIn } from "@/lib/animations";
import { UserCircle2, List, BarChart2 } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Sign Up",
    description: "Create your account in seconds and set up your learner profile.",
    icon: UserCircle2,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Choose a Test",
    description: "Browse our catalog of tests tailored for various learning needs.",
    icon: List,
    color: "bg-indigo-500",
  },
  {
    id: 3,
    name: "View Results",
    description: "Get instant feedback and detailed analysis of your performance.",
    icon: BarChart2,
    color: "bg-purple-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Simple Process
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How It Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Getting started with TestPro is quick and easy. Follow these simple steps.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-1 h-full bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-16 md:space-y-0 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={slideIn(index % 2 === 0 ? "left" : "right", "spring", 0.1 * index, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 md:items-center ${
                  index % 2 === 0 ? "md:rtl" : "md:ltr"
                }`}
              >
                {/* Step number and line for mobile */}
                <div className="md:hidden flex items-center justify-center mb-6">
                  <div className={`h-12 w-12 rounded-full ${step.color} flex items-center justify-center text-white text-xl font-bold`}>
                    {step.id}
                  </div>
                </div>

                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center">
                    <div className={`hidden md:flex h-16 w-16 rounded-full ${step.color} items-center justify-center text-white text-2xl font-bold`}>
                      {step.id}
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{step.name}</h3>
                  <p className="mt-3 text-lg text-gray-500 dark:text-gray-300">{step.description}</p>
                </div>

                <div className="mt-8 md:mt-0 flex justify-center">
                  <div className="relative h-64 w-64 rounded-xl bg-white dark:bg-gray-700 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <step.icon className="h-24 w-24 text-gray-300 dark:text-gray-600" />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 h-2 w-20 bg-gray-200 dark:bg-gray-600 rounded-full" />
                    <div className="absolute top-10 left-4 h-2 w-12 bg-gray-200 dark:bg-gray-600 rounded-full" />
                    <div className="absolute bottom-4 right-4 h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}