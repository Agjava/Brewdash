import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import BreweryDetailPage from './pages/BreweryDetailPage';
import Sidebar from './components/Sidebar'; // Assuming you have this component

function App() {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState(''); // Example filter state
  const [filterState, setFilterState] = useState(''); // Example state filter

  const API_URL = 'https://api.openbrewerydb.org/v1/breweries';

  // Fetch all breweries initially - This data will be used by the dashboard
  useEffect(() => {
    const fetchBreweries = async () => {
      setLoading(true);
      setError(null);
      try {
        // Build query parameters based on filters
        const params = new URLSearchParams();
        if (filterType) params.append('by_type', filterType);
        if (filterState) params.append('by_state', filterState.replace(/ /g, '_')); // API uses underscore for spaces in state names
        params.append('per_page', 50); // Limit results for performance, adjust as needed

        const response = await fetch(`${API_URL}?${params.toString()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure data is always an array, even if API returns null/undefined for no results
        setBreweries(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Failed to fetch breweries:", e);
        setError(e.message);
        setBreweries([]); // Ensure breweries is an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, [filterType, filterState]); // Re-fetch when filters change

  return (
    <div className="app-container">
      {/* Sidebar is outside Routes to be persistent */}
      <Sidebar
          setFilterType={setFilterType}
          setFilterState={setFilterState}
          currentFilterType={filterType}
          currentFilterState={filterState}
      />

      <main className="main-content">
        {/* Routes define the pages */}
        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage
                breweries={breweries}
                loading={loading}
                error={error}
              />
            }
          />
          {/* Dynamic route for brewery details */}
          {/* Note: We pass the full list here IF we want to avoid fetching again */}
          {/* Alternatively, BreweryDetailPage can fetch its own data using the ID */}
          <Route
            path="/brewery/:id"
            element={<BreweryDetailPage />}
          />
          {/* Add more routes here if needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;