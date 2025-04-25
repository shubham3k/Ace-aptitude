"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Laptop, Sun, MoonStar } from "lucide-react";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Features", href: "#features", current: false },
  { name: "How It Works", href: "#how-it-works", current: false },
  { name: "Tests", href: "#tests", current: false },
  { name: "Testimonials", href: "#testimonials", current: false },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        controls.start({
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, controls]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="fixed w-full z-50 transition-all duration-300"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                TestPro
              </span>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href.startsWith("#")) {
                    scrollToSection(item.href.substring(1));
                  }
                }}
                className="text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </Button>
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="gradient" className="rounded-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.href.startsWith("#")) {
                    scrollToSection(item.href.substring(1));
                  }
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Link href="/login" className="w-full mr-2">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/register" className="w-full ml-2">
                <Button variant="gradient" className="w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="pt-2 flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}