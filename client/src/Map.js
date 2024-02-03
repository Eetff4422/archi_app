import React from 'react';
import './Map.css';

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance en kilomètres
}

async function fetchCities(lat, lon) {
  console.log(lat);
  console.log(lon);
  try {
    const response = await fetch(`/cities/${lat}/${lon}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

function Map(props) {
  const { image, convertToLat, convertToLon } = props;

  async function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    const lat = convertToLat(x, y);
    const lon = convertToLon(x, y);

    const cities = await fetchCities(lat, lon);
    updateCityList(cities, lat, lon);
  }

  function handleMouseOver(city, userLat, userLon) {
    const distance = haversineDistance(userLat, userLon, city.latitude, city.longitude);
    const detailsDiv = document.getElementById('city-details');
    detailsDiv.innerHTML = `
      <h3>${city.name}</h3>
      <p>Distance: ${Math.round(distance)} km</p>
      <p>Autres détails...</p>
    `;
    detailsDiv.style.display = 'block';
  }

  function updateCityList(cities, userLat, userLon) {
    const listDiv = document.getElementById('city-list');
    listDiv.innerHTML = '';

    cities.forEach(city => {
      const listItem = document.createElement('div');
      listItem.innerHTML = `<p>${city.name}</p>`;
      listItem.onmouseover = () => handleMouseOver(city, userLat, userLon);
      listDiv.appendChild(listItem);
    });
  }

  const mapStyle = {
    flex: 1,
    width: '50%',
    height: '50%',
    position: 'relative',
  };

  const mapContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  const detailsStyle = {
    flex: 1,
  };

  const listStyle = {
    flex: 1,
  };

  return (
    <div className="map-container" style={mapContainerStyle}>
      <div onClick={handleClick} className="Map" style={mapStyle}>
        <img src={image} alt="Map" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div id="city-details" style={detailsStyle}>
        {/* Détails de la ville s'afficheront ici */}
      </div>
      <div id="city-list" style={listStyle}>
        {/* Liste des villes s'affichera ici */}
      </div>
    </div>
  );
}

export default Map;

