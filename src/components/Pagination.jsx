import React from 'react';
import { getPaginationRange } from '../utils/paginationRange';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = getPaginationRange(currentPage, totalPages);

  return (
    <div className='flex justify-center items-center gap-2 mt-10 flex-wrap'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100'>
        Prev
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className='px-2'>
              ...
            </span>
          );
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded
              ${
                page === currentPage
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }
            `}>
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100'>
        Next
      </button>
    </div>
  );
}

export default Pagination;
