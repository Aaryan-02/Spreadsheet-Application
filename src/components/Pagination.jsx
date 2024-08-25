import { useSpreadsheetStore } from '../store/useSpreadsheetStore';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

export default function Pagination() {
    const { currentPage, cellsPerPage, setPage, theme } = useSpreadsheetStore((state) => ({
        currentPage: state.currentPage,
        cellsPerPage: state.cellsPerPage,
        setPage: state.setPage,
        theme: state.theme,
    }));

    const cells = Array.from({ length: 1000 }, (_, i) => i);
    const totalPages = Math.ceil(Object.keys(cells).length / cellsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setPage(page);
        }
    };

    const range = 2; 
    let startPage = Math.max(1, currentPage - range);
    let endPage = Math.min(totalPages, currentPage + range);
    if (endPage - startPage + 1 < 5) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, startPage + 4);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }
    }

    const buttonStyles = theme === 'dark'
        ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 hover:border-cyan-400'
        : 'bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-300 hover:border-cyan-500';

    const activeButtonStyles = theme === 'dark'
        ? 'border-cyan-400 text-cyan-300'
        : 'border-cyan-500 text-indigo-500';

    return (
        <div className='flex justify-center mt-8'>
            <div className="inline-flex rounded-xl">
                <ul className="flex items-center">
                    <li className="md:px-2 px-1">
                        <button
                            aria-disabled={currentPage === 1}
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`w-9 h-9 flex items-center justify-center rounded-md border ${buttonStyles} disabled:border-gray-600 disabled:text-gray-400 transition-colors duration-200`}
                        >
                            <IoIosArrowBack />
                        </button>
                    </li>
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                        <li key={pageNum} className="md:px-2 px-1">
                            <button
                                onClick={() => handlePageChange(pageNum)}
                                className={`w-9 h-9 rounded-md border ${pageNum === currentPage ? activeButtonStyles : buttonStyles} transition-colors duration-200`}
                            >
                                {pageNum}
                            </button>
                        </li>
                    ))}
                    <li className="md:px-2 px-1">
                        <button
                            aria-disabled={currentPage === totalPages}
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`w-9 h-9 flex items-center justify-center rounded-md border ${buttonStyles} disabled:border-gray-600 disabled:text-gray-400 transition-colors duration-200`}
                        >
                            <IoIosArrowForward />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
