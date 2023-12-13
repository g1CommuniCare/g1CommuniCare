import React from "react";

const SearchInput = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="h-[50px] w-full">
      <input
        type="text"
        placeholder="Search resources..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="px-5 w-full h-full rounded-3xl flex items-center border border-slate-300 outline-none italic"
      />
    </div>
  );
};

export default SearchInput;
