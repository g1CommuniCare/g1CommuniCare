import React from "react";

const Header = ({ pageTitle = "", pageContent = "" }) => {
  return (
    <header className="w-[550px] py-16">
      <h1 className="text-5xl font-semibold mb-3">{pageTitle}</h1>
      <p>{pageContent}</p>
    </header>
  );
};

export default Header;
