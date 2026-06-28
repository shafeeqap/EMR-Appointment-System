import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const Pagination = ({ setPage, page, totalPages }) => {
  const maxVisible = 5;

  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  // Adjust if exceeding total pages
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  const visiblePages = [];
  
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }



  return (
    <div className="flex justify-center items-center gap-2 mt-6 pb-15">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 b bg-white border rounded disabled:opacity-50 ${
          page === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <ChevronLeft />
      </button>

      <span className="text-sm">
        {/* Page {page} of {totalPages} */}
        {visiblePages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-2 border rounded cursor-pointer ${
              page === p ? "bg-primary text-white" : "bg-white"
            }`}
          >
            {p}
          </button>
        ))}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 bg-white border rounded disabled:opacity-50 ${
          page === totalPages ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
