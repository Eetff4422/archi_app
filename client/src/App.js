import React from 'react';
import Map from './Map';
import mapImage from './france.png';


//  const bottomRightCorner = { latitude: 43.7034, longitude: 7.2663 };
const topLeftCorner = { latitude: 48.5403, longitude: -4.6575 }; //Ploudalmézeau
//const topLeftCorner = { latitude: 51.0383, longitude: 2.3775 };
const bottomRightCorner = { latitude: 43.7034, longitude: 7.2663 };

function determineQuadrant(x, y, rect) {
  const isTop = y < rect.height / 2;
  const isLeft = x < rect.width / 2;
  
  if (isTop && isLeft) {
    return 'topLeft';
  } else if (isTop && !isLeft) {
    return 'topRight';
  } else if (!isTop && isLeft) {
    return 'bottomLeft';
  } else {
    return 'bottomRight';
  }
}
function convertToLat(x, y) {
  const rect = document.querySelector('.Map').getBoundingClientRect();
  const quadrant = determineQuadrant(x,y,rect);
  let margeErreurLat;
  if (quadrant === 'topLeft') {
    console.log('topLeft');
    margeErreurLat = 0.98;
  }else if(quadrant === 'bottomLeft'){
    console.log('bottomLeft');
    margeErreurLat = -0.5;
  }else if(quadrant === 'bottomRight'){
    console.log('bottomRight');
    margeErreurLat = -0.9;
  }else if(quadrant === 'topRight'){
    console.log('topRight');
    margeErreurLat = 2.78;
  }
  const mapHeight = rect.height;
  return topLeftCorner.latitude - ((topLeftCorner.latitude - bottomRightCorner.latitude) * (y - rect.top) / mapHeight) + margeErreurLat;
}

function convertToLon(x, y) {
  const rect = document.querySelector('.Map').getBoundingClientRect();
  const mapWidth = rect.width;
  const quadrant = determineQuadrant(x,y,rect);
  let margeErreurLon;
  if (quadrant === 'topLeft') {
    margeErreurLon = -0.6;
  }else if(quadrant === 'bottomLeft'){
    margeErreurLon = -0.53;
  }else if(quadrant === 'bottomRight'){
    margeErreurLon = 0.94;
  }else if(quadrant === 'topRight'){
    margeErreurLon = 1.0;
  }  const longitudeRange = bottomRightCorner.longitude - topLeftCorner.longitude;
  const lonRatio = (x - rect.left) / mapWidth;
  return topLeftCorner.longitude + longitudeRange * lonRatio + margeErreurLon ;
}

function App() {
  return (
    <div className="app">
      <Map
        image={mapImage}
        convertToLat={convertToLat}
        convertToLon={convertToLon}
      />
    
    </div>
  );
}

export default App;
