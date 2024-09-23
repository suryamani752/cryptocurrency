import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`${
            currentPage === index + 1 ? "bg-blue-600" : "bg-gray-300"
          } p-4 outline-none border rounded-full text font-medium`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
