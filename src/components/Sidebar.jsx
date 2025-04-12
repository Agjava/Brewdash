import React from 'react';
import './Sidebar.css'; // Create or use existing CSS

// Example filter options - adjust based on API capabilities or your data
const breweryTypes = [
    "micro", "nano", "regional", "brewpub", "large", "planning",
    "bar", "contract", "proprietor", "closed"
];

// Example list of states - could be dynamically generated or a fixed list
const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
    "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming"
    // Add more states or territories as needed
];


const Sidebar = ({ setFilterType, setFilterState, currentFilterType, currentFilterState }) => {

    const handleTypeChange = (event) => {
        setFilterType(event.target.value);
    };

    const handleStateChange = (event) => {
         setFilterState(event.target.value);
    };

    const clearFilters = () => {
        setFilterType('');
        setFilterState('');
        // Optionally reset dropdowns visually if not controlled directly
        const typeSelect = document.getElementById('brewery-type-select');
        const stateSelect = document.getElementById('brewery-state-select');
        if (typeSelect) typeSelect.value = '';
        if (stateSelect) stateSelect.value = '';
    };


  return (
    <aside className="sidebar">
      <h2>Filters</h2>

      {/* Filter by Type */}
      <div className="filter-group">
        <label htmlFor="brewery-type-select">Brewery Type:</label>
        <select
            id="brewery-type-select"
            value={currentFilterType} // Controlled component
            onChange={handleTypeChange}
        >
          <option value="">All Types</option>
          {breweryTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>

       {/* Filter by State */}
      <div className="filter-group">
         <label htmlFor="brewery-state-select">State/Province:</label>
         <select
            id="brewery-state-select"
            value={currentFilterState} // Controlled component
            onChange={handleStateChange}
         >
            <option value="">All States</option>
            {states.map(state => (
                <option key={state} value={state}>{state}</option>
            ))}
         </select>
      </div>

        {/* Clear Filters Button */}
        <button onClick={clearFilters} className="clear-button">
            Clear Filters
        </button>

      {/* Add more filters or sidebar content here */}
      <p className="sidebar-info">
        Use the filters above to narrow down the brewery list and update the charts. Click on a brewery name to see more details.
      </p>
    </aside>
  );
};

export default Sidebar;