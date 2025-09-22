import React from "react";
import Link from "next/link";

const Menu = () => {
  return (
    <nav className="bg-white border-b border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl text-blue-600">
              POC AI Chatbot
            </div>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
            <Link
              href="/ai-chatbot"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Ai Chatbot
            </Link>
            <Link
              href="/text-editor"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Editor
            </Link>
          </div>
          {/* Mobile menu button (optional) */}
          <div className="md:hidden">
            {/* Add a hamburger menu here if needed */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
