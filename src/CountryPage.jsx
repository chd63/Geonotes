import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./CountryPage.css"
import { Link } from 'react-router-dom';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);


function CountryPage() {
    // get constants to set state
    let [isLocked, setIsLocked] = useState(false);

    const handleLockToggle = () => {
        setIsLocked(!isLocked);
    }

    const layouts = {
    lg: [ // Large screens (e.g., desktops)
        { i: 'general', x: 0, y: 0, w: 4, h: 5 },
        { i: 'notes', x: 4, y: 0, w: 4, h: 5 },
        { i: 'social', x: 8, y: 0, w: 4, h: 5 },
    ],
    md: [ // Medium screens (e.g., tablets)
        { i: 'general', x: 0, y: 0, w: 6, h: 10 },
        { i: 'notes', x: 6, y: 0, w: 6, h: 10 },
        { i: 'social', x: 0, y: 10, w: 12, h: 10 },
    ],
    sm: [ // Small screens (e.g., phones)
        { i: 'general', x: 0, y: 0, w: 12, h: 10 },
        { i: 'notes', x: 0, y: 10, w: 12, h: 10 },
        { i: 'social', x: 0, y: 20, w: 12, h: 10 },
    ],
    };

    const {countryName} = useParams();
    return(
        <div className="country-page-container">
            <div className = "top-header">  
            <Link to="/" className="home_button">Home</Link>
            <button onClick={handleLockToggle}>{isLocked ? 'Unlock Layout' : 'Lock Layout'}</button> 
            <h1 className="header_name">Notes for {countryName} </h1>
            <Link to="/" className="login_button">Log In</Link>              
            </div>  


            <div className="main-content-row">
                <ResponsiveGridLayout
                    className="main-content-row"
                    layouts={layouts}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
                    isDraggable={!isLocked}
                    isResizable={!isLocked}
                >
                <div key="general" className="general-info-container">
                    <div>
                        <h2>Parsed Info</h2>
                    </div>
                </div>

                <div key="notes" className="notes-container">
                    <div>
                        <h2>Notes</h2>
                    </div>
                    <textarea className="notes-textarea" placeholder='write something ...'></textarea>
                    <button>Submit</button>
                </div>

                <div key="social" className="social-container">
                    <div>
                        <h2>Social</h2>
                    </div>
                </div>
                </ResponsiveGridLayout>
            </div>

                
        </div>
    );

}



export default CountryPage;