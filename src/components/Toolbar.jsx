import { useSpreadsheetStore } from '../store/useSpreadsheetStore';
import { IoClose } from "react-icons/io5";
import { BsTextLeft, BsTextCenter, BsTextRight } from 'react-icons/bs';
import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

export default function Toolbar() {
    const { search, searchResults, clearSearch, theme, toggleTheme, undo, redo, updateCellFormatting, selectedCellId, setNumericOnly } = useSpreadsheetStore();

    const [searchInput, setSearchInput] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [alignment, setAlignment] = useState('left');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchInput(query);
        search(query);
    };

    const handleClearSearch = () => {
        setSearchInput('');
        clearSearch();
    };

    const handleTextAlign = (alignment) => {
        setAlignment(alignment);
        setDropdownOpen(false);
        if (selectedCellId !== null) {
            updateCellFormatting(selectedCellId, { textAlign: alignment });
        } else {
            console.log("No cell selected");
        }
    };

    const handleFontSizeChange = (e) => {
        const size = e.target.value;
        setFontSize(size);
        if (selectedCellId !== null) {
            updateCellFormatting(selectedCellId, { fontSize: `${size}px` });
        } else {
            console.log("No cell selected");
        }
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setCheckboxChecked(isChecked);
        setNumericOnly(isChecked); 
    };

    return (
        <div className="p-4 bg-indigo-200 dark:bg-gray-800 shadow-md rounded-lg">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center justify-center md:justify-between">
                <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center md:items-start">
                    <div className="relative">
                        <button
                            className="flex items-center md:px-5 md:py-3.5 px-2 py-2 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-500 transition-all duration-300"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className={`flex items-center ${alignment === 'left' && 'text-left'} ${alignment === 'center' && 'text-center'} ${alignment === 'right' && 'text-right'}`}>
                                {alignment === 'left' && <BsTextLeft className="md:text-lg text-sm" />}
                                {alignment === 'center' && <BsTextCenter className="md:text-lg text-sm" />}
                                {alignment === 'right' && <BsTextRight className="md:text-lg text-sm" />}
                                <span className="md:ml-4 md:mr-2 ml-1 mr-1 md:text-md text-sm">Align</span>
                            </div>
                            <IoMdArrowDropdown />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 md:w-32 w-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md z-10">
                                <button
                                    onClick={() => handleTextAlign('left')}
                                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 w-full text-left"
                                >
                                    <BsTextLeft className="md:text-lg text-sm mr-2" />
                                    <span className='md:text-md text-sm'>Left</span>
                                </button>
                                <button
                                    onClick={() => handleTextAlign('center')}
                                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 w-full text-left"
                                >
                                    <BsTextCenter className="md:text-lg text-sm mr-2" />
                                    <span className='md:text-md text-sm'>Center</span>
                                </button>
                                <button
                                    onClick={() => handleTextAlign('right')}
                                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 w-full text-left"
                                >
                                    <BsTextRight className="md:text-lg text-sm mr-2" />
                                    <span className='md:text-md text-sm'>Right</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="md:p-1.5 p-1 pl-2 pr-2 bg-indigo-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md flex items-center">
                        <label htmlFor="fontSizeInput" className="mr-3 text-gray-800 dark:text-gray-200 font-semibold text-md">Font Size:</label>
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            <input
                                type="number"
                                id="fontSizeInput"
                                min="8"
                                max="72"
                                value={fontSize}
                                onChange={handleFontSizeChange}
                                className="px-3 py-1 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border-none rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 w-20"
                            />
                        </div>
                    </div>
                    <div className="md:p-2.5 p-1  pl-2 pr-2 flex items-center bg-indigo-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
                        <label htmlFor="numericOnly" className="inline-flex items-center cursor-pointer">
                            <span className="mr-3 text-md font-semibold text-gray-900 dark:text-gray-300">Numeric Only</span>
                            <input
                                type="checkbox"
                                id="numericOnly"
                                checked={checkboxChecked}
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-indigo-700">
                                <div className={`absolute left-1 top-0.5 bg-white border border-gray-300 rounded-full w-5 h-5 transition-transform duration-300 ${checkboxChecked ? 'translate-x-full' : ''}`}></div>
                            </div>
                        </label>
                    </div>
                </div>
                <div className='flex justify-center md:justify-start'>
                    <button
                        onClick={toggleTheme}
                        className="md:px-4 px-2 md:py-2 py-1 rounded-lg transition-colors duration-200"
                        style={{ backgroundColor: theme === 'light' ? '#1F2937' : '#F3F4F6', color: theme === 'light' ? '#fff' : '#000' }}
                    >
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </button>
                </div>
            </div>

            <div className="flex gap-3 mt-2 md:mt-4 justify-center md:justify-start">
                <button
                    onClick={undo}
                    className="md:px-4 px-2 md:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
                >
                    Undo
                </button>
                <button
                    onClick={redo}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200"
                >
                    Redo
                </button>
            </div>
            <div className='md:mt-4 relative mt-2 md:w-96 w-full'>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearch}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <IoClose
                    className="absolute right-2 top-2 text-gray-500 cursor-pointer text-2xl"
                    onClick={handleClearSearch}
                />
            </div>

            {searchInput && searchResults.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-4 border dark:border-gray-600 rounded shadow text-gray-900 dark:text-white mt-2">
                    <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                    <ul>
                        {searchResults.map(([cellId, value]) => (
                            <li key={cellId}>
                                <strong>Cell {cellId}:</strong> {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
