"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Users, FileText, Clock } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Students",
    value: 10000,
    suffix: "+",
    icon: Users,
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    id: 2,
    name: "Questions Attempted",
    value: 1000000,
    suffix: "+",
    icon: FileText,
    color: "text-indigo-500 dark:text-indigo-400",
  },
  {
    id: 3,
    name: "Avg. Time/Question",
    value: 22,
    suffix: "s",
    icon: Clock,
    color: "text-purple-500 dark:text-purple-400",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up")}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Our Impact
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            TestPro by the Numbers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            We're proud of our growing community and the impact we've made on students worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const incrementTime = Math.floor(duration / end);
    const timer = setInterval(() => {
      start += 1;
      const progress = Math.min(start / end, 1);
      setCount(Math.floor(progress * end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-700 shadow-lg px-6 py-10"
    >
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gray-100 dark:bg-gray-600 rounded-full opacity-50" />
      
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <stat.icon className={`h-8 w-8 ${stat.color}`} />
        </div>
        <div className="ml-4 text-lg font-semibold text-gray-500 dark:text-gray-300">
          {stat.name}
        </div>
      </div>
      
      <div className="mt-2 flex items-baseline">
        <div className="text-5xl font-extrabold text-gray-900 dark:text-white">
          {count.toLocaleString()}
        </div>
        <div className="ml-1 text-2xl font-semibold text-gray-600 dark:text-gray-300">
          {stat.suffix}
        </div>
      </div>
    </motion.div>
  );
}