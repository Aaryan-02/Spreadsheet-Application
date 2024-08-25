import Grid from '../components/Grid';
import Toolbar from '../components/Toolbar';
import Pagination from '../components/Pagination';
import { useSpreadsheetStore } from '../store/useSpreadsheetStore';

export default function Home() {
  const { theme } = useSpreadsheetStore();
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="px-10 md:px-0">
          <Toolbar />
          <Grid />
          <Pagination />
        </div>
      </div>
    </div>
  );
}
