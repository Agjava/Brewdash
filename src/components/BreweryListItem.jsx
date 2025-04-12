import React from 'react';
import './BreweryListItem.css'; 


function BreweryListItem({ brewery }) {
  return (
    <li className="brewery-list-item">
      <h3>{brewery.name}</h3>
      <p>{brewery.city}, {brewery.state}</p>
      <p>Type: {brewery.brewery_type}</p>
    </li>
  );
}

export default BreweryListItem;