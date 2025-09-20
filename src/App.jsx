import React, { use, useState } from "react";
import "./App.css";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import {Routes, Route, useNavigate} from "react-router-dom";
import CountryPage from "./CountryPage";

import allowedCountries from "./json_files/geoguessr_countries.json"

// Official world countries GeoJSON
const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";




function MapView() {
  // TODO: get rid of these later if you dont need them
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });


  const navigate = useNavigate();

  function handleClick(geo) {
    //handleZoomIn(geo,setPosition,setSelectedCountry);
    console.log(geo.properties.name.toLowerCase());
    let  countryName = geo.properties.name.toLowerCase();
    navigate('/country/' + countryName);

  }


  return (
    <div className="center-container">
      <h1 className="header">GeoNotes Prototype</h1>

      {/* Tooltip */}
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.y + 10,
            left: tooltipPosition.x + 10,
            backgroundColor: "white",
            padding: "4px 8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: "12px",
            zIndex: 10,
          }}
        >
          {tooltipContent}
        </div>
      )}


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
        {({ geographies }) =>
          geographies.map((geo) => {
            // check if the country is allowed (case-insensitive)
            
            const isAllowed = allowedCountries.some(country =>
              country.toLowerCase().includes(geo.properties.name.toLowerCase())
            );

            // uncomment to debug allowed countries
            
            //if(isAllowed) console.log(geo.properties.name.toLowerCase());
            //console.log(geo.properties.name.toLowerCase());

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}

                // follow the cursor and display country name in tooltip
                onClick={isAllowed ? () => handleClick(geo) : undefined}

                      onMouseEnter={(event) => {
                        setTooltipContent(geo.properties.name);
                        setTooltipPosition({
                          x: event.clientX,
                          y: event.clientY,
                        });
                      }}
                      onMouseMove={(event) => {
                        setTooltipPosition({
                          x: event.clientX,
                          y: event.clientY,
                        });
                      }}
                      onMouseLeave={() => setTooltipContent("")}

                // only allow click if allowed    
                style={{
                  default: {
                    fill: isAllowed ? "#4CAF50" : "#D6D6DA", // green for allowed, gray otherwise
                    outline: "none",
                    cursor: isAllowed ? "pointer" : "not-allowed"
                  },
                  hover: {
                    fill: isAllowed ? "#43A047" : "#D6D6DA", // slightly darker green on hover
                    outline: "none",
                    cursor: isAllowed ? "pointer" : "not-allowed"
                  },
                  pressed: {
                    fill: isAllowed ? "#388E3C" : "#D6D6DA", // pressed green
                    outline: "none"
                  }
                }}
              />
              
            );
            
          })
        }
      </Geographies>
      </ZoomableGroup>
      </ComposableMap> 
      
      </div> 
    </div>
  );
  
}

// ok so this may be changed in the future but we are moving to make
// the main page a router, it will return at / the map function 
// at /country/:countryName the country page

function App() {
  return(
    <Routes>
      <Route path="/" element={<MapView/>}/>

      <Route path="/country/:countryName" element={<CountryPage/>}/>
    </Routes>
  )
}



export default App;
