import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BreweryDetailPage.css'; // Create this CSS file for styling

const BreweryDetailPage = () => {
  const { id } = useParams(); // Get the brewery ID from the URL parameter
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL_DETAIL = `https://api.openbrewerydb.org/v1/breweries/${id}`;

  useEffect(() => {
    const fetchBreweryDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL_DETAIL);
        if (!response.ok) {
            if (response.status === 404) {
                 throw new Error(`Brewery with ID ${id} not found.`);
            }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBrewery(data);
      } catch (e) {
        console.error("Failed to fetch brewery details:", e);
        setError(e.message);
        setBrewery(null); // Reset brewery data on error
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBreweryDetail();
    } else {
        setError("No Brewery ID provided."); // Should not happen with proper routing
        setLoading(false);
    }

    // Dependency array includes 'id' so it refetches if the id changes
  }, [id, API_URL_DETAIL]);

  if (loading) {
    return <div className="status-message">Loading brewery details...</div>;
  }

  if (error) {
    return (
        <div className="detail-page">
            <div className="status-message error">Error: {error}</div>
            <Link to="/" className="back-link">← Back to Dashboard</Link>
        </div>
    );
  }

  if (!brewery) {
    // This case might be redundant if error handles 'not found', but good practice
    return (
         <div className="detail-page">
            <div className="status-message">Brewery details could not be loaded.</div>
             <Link to="/" className="back-link">← Back to Dashboard</Link>
        </div>
    );
  }

  // Display brewery details
  return (
    <div className="detail-page">
      <h1>{brewery.name}</h1>
      <div className="detail-grid">
        <p><strong>Type:</strong> {brewery.brewery_type || 'N/A'}</p>
        <p><strong>Address:</strong> {brewery.street ? `${brewery.street},` : ''} {brewery.address_2 ? `${brewery.address_2},` : ''} {brewery.address_3 ? `${brewery.address_3},` : ''} {brewery.city}, {brewery.state_province} {brewery.postal_code}</p>
        <p><strong>Country:</strong> {brewery.country || 'N/A'}</p>
        <p><strong>Phone:</strong> {brewery.phone ? <a href={`tel:${brewery.phone}`}>{brewery.phone}</a> : 'N/A'}</p>
        <p><strong>Website:</strong> {brewery.website_url ? <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a> : 'N/A'}</p>
        <p><strong>State:</strong> {brewery.state || 'N/A'}</p>
        <p><strong>City:</strong> {brewery.city || 'N/A'}</p>
      </div>

       {/* Add more details as needed */}
       {/* Example: Map Link */}
        {brewery.latitude && brewery.longitude && (
            <p><strong>Location:</strong> <a href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`} target="_blank" rel="noopener noreferrer">View on Google Maps</a> ({brewery.latitude}, {brewery.longitude})</p>
        )}


      <Link to="/" className="back-link">← Back to Dashboard</Link>
    </div>
  );
};

export default BreweryDetailPage;