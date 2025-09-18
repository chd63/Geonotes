import React from "react";

import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

// Official world countries GeoJSON
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function handleClick(geo) {
  alert(`You clicked on ${geo.properties.name}`);
  console.log(geo);
}

function App() {

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
      <ZoomableGroup>

      <Geographies geography={geoUrl}>
        {({geographies}) =>
            geographies.map((geo) => ( 
              <Geography 
                key={geo.rsmKey} 
                geography={geo} 
                onClick={() => handleClick(geo)}
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
    </div>
  );
}

export default App;
