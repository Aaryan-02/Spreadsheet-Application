import Cell from './Cell';
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
        <div className={`grid gap-0 border ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
            style={{
                height: '100%',
                width: '100%',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gridAutoRows: 'minmax(44px, auto)'
            }}>
            {cellsToDisplay.map((index) => (
                <Cell key={index} cellId={index} />
            ))}
        </div>
    );
}
