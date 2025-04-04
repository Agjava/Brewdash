import React, { useState, useEffect } from 'react';
import './App.css'; // We'll heavily modify this CSS

// Simple Icon Components (replace with actual icons if you have them)
const DashboardIcon = () => <span>📊</span>; // Placeholder
const SearchIcon = () => <span>🔍</span>;    // Placeholder
const AboutIcon = () => <span>ℹ️</span>;     // Placeholder

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [uniqueTypes, setUniqueTypes] = useState([]);

  const API_URL = 'https://api.openbrewerydb.org/v1/breweries?per_page=100';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const validData = data.filter(b => b.id && b.name && b.brewery_type && b.state);
        setBreweries(validData);
        setFilteredBreweries(validData);
        const types = [...new Set(validData.map(b => b.brewery_type))].sort();
        setUniqueTypes(types);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Failed to load brewery data: ${error.message}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let currentList = [...breweries];
    if (searchTerm) {
      currentList = currentList.filter(brewery =>
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      currentList = currentList.filter(brewery =>
        brewery.brewery_type === filterType
      );
    }
    setFilteredBreweries(currentList);
  }, [searchTerm, filterType, breweries]);

  // --- Summary Statistics ---
  const totalBreweries = breweries.length;
  const breweriesInView = filteredBreweries.length;
  const countByType = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});
  const microCount = countByType.micro || 0;
  const brewpubCount = countByType.brewpub || 0;
  const regionalCount = countByType.regional || 0; // Added another type for the third card

  // --- Event Handlers ---
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="astro-app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo">🍺</span> {/* Simple logo */}
          <h1>BrewDash</h1> {/* Changed name */}
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a href="#"><DashboardIcon /> Dashboard</a></li>
            <li><a href="#"><SearchIcon /> Search</a></li>
            <li><a href="#"><AboutIcon /> About</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Mimic Header Cards */}
        <header className="main-header-cards">
          <div className="header-card">
            <h3>Total Breweries</h3>
            <p>{totalBreweries}</p>
          </div>
          <div className="header-card">
            <h3>Micro Breweries</h3>
            <p>{microCount}</p>
          </div>
          <div className="header-card">
            <h3>Brewpubs</h3>
            <p>{brewpubCount}</p>
          </div>
           {/* You could add more cards here if needed */}
        </header>

        {/* Controls Area */}
        <section className="controls-area">
           <div className="search-filter-bar">
             <div className="search-input">
                <label htmlFor="search">Search Name</label>
                <input
                  type="text"
                  id="search"
                  placeholder="Enter brewery name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
             </div>
             <div className="filter-input">
                 <label htmlFor="type-filter">Brewery Type</label>
                 <select id="type-filter" value={filterType} onChange={handleTypeChange}>
                    <option value="all">All Types</option>
                    {uniqueTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
             </div>
              {/* Placeholder for a search button if needed, though it filters live */}
             {/* <button className="search-button">Search</button> */}
           </div>
        </section>

        {/* Data List Area */}
        <section className="data-list-area">
          <h2>Brewery List ({breweriesInView} matching)</h2>
          {loading && <div className="status-message loading">Loading breweries...</div>}
          {error && <div className="status-message error">{error}</div>}
          {!loading && !error && (
            <>
              {filteredBreweries.length > 0 ? (
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Website</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBreweries.slice(0, 100).map(brewery => (
                        <tr key={brewery.id}>
                          <td>{brewery.name}</td>
                          <td>{brewery.brewery_type}</td>
                          <td>{brewery.city || 'N/A'}</td>
                          <td>{brewery.state || 'N/A'}</td>
                          <td>
                            {brewery.website_url ? (
                              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                                Visit Site
                              </a>
                            ) : (
                              'N/A'
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="status-message no-results">No breweries match your criteria.</p>
              )}
              {/* Display at least 10 items requirement check */}
              {filteredBreweries.length < 10 && breweries.length >= 10 && !loading && (
                 <p className='info-note'>Note: Fewer than 10 breweries match the current filters, but the full dataset contains {breweries.length}.</p>
              )}
              {breweries.length < 10 && breweries.length > 0 && !loading && (
                 <p className='info-note'>Note: The API returned fewer than 10 breweries ({breweries.length}).</p>
              )}
               {breweries.length === 0 && !loading && !error && (
                  <p className='info-note'>Note: No breweries were loaded from the API.</p>
               )}
            </>
          )}
        </section>

        {/* Optional Footer */}
         <footer className="main-footer">
            Data sourced from Open Brewery DB
         </footer>
      </main>
    </div>
  );
}

export default App;