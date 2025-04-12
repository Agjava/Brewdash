import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './DashboardPage.css'; // Create this CSS file for styling

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const DashboardPage = ({ breweries, loading, error }) => {

  // --- Chart Data Preparation ---

  // 1. Data for Brewery Types Pie Chart
  const breweryTypeCounts = breweries.reduce((acc, brewery) => {
    const type = brewery.brewery_type || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(breweryTypeCounts).map(([name, value]) => ({ name, value }));

  // 2. Data for Breweries per State Bar Chart (Top N States)
  const breweryStateCounts = breweries.reduce((acc, brewery) => {
    const state = brewery.state_province || 'Unknown'; // Group states, handle missing state/province
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const barChartData = Object.entries(breweryStateCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count) // Sort descending by count
    .slice(0, 10); // Take top 10 states, adjust as needed


  // --- Render Logic ---

  if (loading) {
    return <div className="status-message">Loading breweries...</div>;
  }

  if (error) {
    return <div className="status-message error">Error fetching data: {error}</div>;
  }

  if (!breweries || breweries.length === 0) {
      return <div className="status-message">No breweries found matching your criteria. Try adjusting the filters!</div>;
  }


  return (
    <div className="dashboard-page">
      <h1>Brewery Dashboard</h1>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <h2>Brewery Types Distribution</h2>
          {pieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} breweries`, name]}/>
                {/* <Legend /> */} {/* Optional: Legend can make small charts cluttered */}
              </PieChart>
            </ResponsiveContainer>
          ) : (
             <p>No data available for pie chart.</p>
          )}
        </div>

        <div className="chart-container">
          <h2>Top 10 States by Brewery Count</h2>
           {barChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false}/>
                <Tooltip formatter={(value) => [`${value} breweries`, 'Count']} />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
             <p>No data available for bar chart.</p>
          )}
        </div>
      </div>

      {/* Brewery List Section */}
      <div className="brewery-list-section">
        <h2>Breweries List ({breweries.length} found)</h2>
        <ul className="brewery-list">
          {breweries.map((brewery) => (
            <li key={brewery.id} className="brewery-list-item">
              {/* Use Link to navigate to the detail page */}
              <Link to={`/brewery/${brewery.id}`}>
                <strong>{brewery.name}</strong> - {brewery.city}, {brewery.state_province} ({brewery.brewery_type})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;