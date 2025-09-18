import React from 'react';

interface CustomPaginationProps {
  currentPage: number;
  totalPagesState: number;
  setCurrentPage: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalEntries: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPagesState,
  setCurrentPage,
  startIndex,
  endIndex,
  totalEntries
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="font-semibold text-sm text-[#000000]">
        Showing {startIndex} to {endIndex} of {totalEntries} entries
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {Array.from({ length: Math.min(5, totalPagesState) }, (_, i) => {
          let pageNum;
          if (totalPagesState <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPagesState - 2) {
            pageNum = totalPagesState - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 text-sm transition-colors text-[#8A8A8A] ${
                pageNum === currentPage ? 'border rounded border-[#000000]' : 'hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setCurrentPage(Math.min(totalPagesState, currentPage + 1))}
          disabled={currentPage === totalPagesState}
          className="px-3 py-1 text-sm rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomPagination;
