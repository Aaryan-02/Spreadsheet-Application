import Cell from './Cell';
import styles from './Grid.module.css';
import { useSpreadsheetStore } from '../store/useSpreadsheetStore';

export default function Grid() {
    const cells = Array.from({ length: 1000 }, (_, i) => i);
    const { currentPage, cellsPerPage, theme } = useSpreadsheetStore((state) => ({
        currentPage: state.currentPage,
        cellsPerPage: state.cellsPerPage,
        theme: state.theme,
    }));

    const startIndex = (currentPage - 1) * cellsPerPage;
    const endIndex = startIndex + cellsPerPage;

    const cellsToDisplay = Object.keys(cells).slice(startIndex, endIndex);

    return (
        <div className={`flex-1 overflow-auto p-4 pb-0 ${styles.container}`}>
            <div className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-0 border ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
                {cellsToDisplay.map((index) => (
                    <Cell key={index} cellId={index} />
                ))}
            </div>
        </div>
    );
}
