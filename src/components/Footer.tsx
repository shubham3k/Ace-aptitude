import Link from "next/link";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from "lucide-react";

const navigation = {
  platform: [
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  links: [
    { name: "Login", href: "#" },
    { name: "Register", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  legal: [
    { name: "Terms", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Cookies", href: "#" },
    { name: "Settings", href: "#" },
  ],
};

const social = [
  {
    name: "Twitter",
    href: "#",
    icon: Twitter,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: "#",
    icon: Github,
  },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                TestPro
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Elevate your testing experience with smart, AI-powered aptitude assessments.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <a href="mailto:info@testpro.com" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  info@testpro.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <a href="tel:+1234567890" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  123 Test Avenue, San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.platform.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mt-8">
              Social
            </h3>
            <div className="mt-4 flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()} TestPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}