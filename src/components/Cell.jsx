import { useSpreadsheetStore } from '../store/useSpreadsheetStore';

export default function Cell({ cellId }) {
    const { cellData, searchResults, updateCellData, theme, cellFormatting, setSelectedCellId, numericOnly } = useSpreadsheetStore((state) => ({
        cellData: state.data[cellId] || '',
        cellFormatting: state.cellFormatting[cellId] || {},
        searchResults: state.searchResults,
        updateCellData: state.updateCellData,
        setSelectedCellId: state.setSelectedCellId,
        theme: state.theme,
        numericOnly: state.numericOnly,
    }));

    const isHighlighted = searchResults.some(([id]) => id === cellId.toString());
    const { textAlign, fontSize } = cellFormatting;

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!numericOnly || /^[0-9]*\.?[0-9]*$/.test(newValue)) {
            updateCellData(cellId, newValue);
        }
    };

    const handleFocus = () => {
        setSelectedCellId(cellId);
    };

    return (
        <input
            type="text"
            className={`border p-3 text-sm w-full h-full focus:outline-none focus:border-indigo-700 
        ${isHighlighted ? 'bg-indigo-200 font-semibold' : theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'} 
        hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`
            }
            value={cellData}
            onChange={handleChange}
            onFocus={handleFocus}
            style={{ textAlign: textAlign || 'left', fontSize: fontSize || '16px' }}
        />
    );
}
