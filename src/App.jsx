import React, { useState } from "react";

import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

// Official world countries GeoJSON
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";



function handleClick(geo,setPosition,setSelectedCountry) {
  handleZoomIn(geo,setPosition,setSelectedCountry);
  console.log(geo);
}

function handleZoomIn(geo,setPosition,setSelectedCountry) {
  // we are going to need some logic to look at the name of the
  // country and then set the coordinates to the centroid of that country
  // we also need to set zoom level according to country size
  let estimated_centroid = [0,0];


  try{
    estimated_centroid = geo.geometry.coordinates[0][0];
  }
  catch(e){
    console.log(arr);
    estimated_centroid = geo.geometry.coordinates[0][0][0][0];
  }


  console.log(estimated_centroid);
  
  const centroid =  estimated_centroid ;
  const newZoom = 5; // Example zoom level

  setPosition({
    coordinates: centroid,
    zoom: newZoom,
  });
  setSelectedCountry(geo.properties.name);
}

function App() {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [selectedCountry, setSelectedCountry] = useState(null);

  

  return (
    <div className="center-container">
      <h1 className="header">GeoNotes Prototype</h1>
      <div className= "map" >
      <ComposableMap projectionConfig={{scale: 160 }} viewBox="0 0 800 440">
                      <rect
          x={0}
          y={0}
          width={800}
          height={440}
          stroke="gray"
          strokeWidth="3"
          fill="none"
      />
      <ZoomableGroup
      zoom={position.zoom}
      center={position.coordinates}
      onMoveEnd={(newPosition) => setPosition(newPosition)}>

      <Geographies geography={geoUrl}>
        {({geographies}) =>
            geographies.map((geo) => ( 
              <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                onClick={() => handleClick(geo,setPosition,setSelectedCountry)}
                style = {{
                  default: { fill: "#D6D6DA", outline: "none" },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" }
                }}
              />
            

        ))}
      </Geographies>
      </ZoomableGroup>
      </ComposableMap> 
    
      </div> 
      <div className="notes-container">
        <h2>Notes on {selectedCountry || "Selected Country"}</h2>
        <textarea
          placeholder="Add your notes here..."
          rows="10"
          cols="30"
        />
      </div>
    </div>
  );
}

export default App;
