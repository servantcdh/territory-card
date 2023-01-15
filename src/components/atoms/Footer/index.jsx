import React from "react";

const Footer = ({ className }) => {
  return (
    <footer className={`fixed bottom-0 w-screen h-8 bg-amber-400 font-display text-gray-600 text-sm text-center ${className}`}>
      <p
        onClick={() =>
          window.open("https://github.com/servantcdh/territory-card", "_blank")
        }
        className="underline hover:cursor-pointer"
      >
        JW Territory Card
      </p>
    </footer>
  );
};

export default Footer;
