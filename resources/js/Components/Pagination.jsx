import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`w-8 h-8 flex items-center justify-center rounded-full ${
                            currentPage === i
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 3; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                currentPage === i
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(
                    <span
                        key="ellipsis1"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <i className="bi bi-three-dots"></i>
                    </span>
                );
                pageNumbers.push(
                    <button
                        key={totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                );
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(
                    <button
                        key={1}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                );
                pageNumbers.push(
                    <span
                        key="ellipsis2"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <i className="bi bi-three-dots"></i>
                    </span>
                );
                for (let i = totalPages - 2; i <= totalPages; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                currentPage === i
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
            } else {
                pageNumbers.push(
                    <button
                        key={1}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                );
                pageNumbers.push(
                    <span
                        key="ellipsis3"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <i className="bi bi-three-dots"></i>
                    </span>
                );
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                currentPage === i
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
                pageNumbers.push(
                    <span
                        key="ellipsis4"
                        className="w-8 h-8 flex items-center justify-center"
                    >
                        <i className="bi bi-three-dots"></i>
                    </span>
                );
                pageNumbers.push(
                    <button
                        key={totalPages}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200"
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                );
            }
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-left"></i>
            </button>
            {renderPageNumbers()}
            <button
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
    );
}
