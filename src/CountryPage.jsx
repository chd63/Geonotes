import React from 'react';
import { useParams } from 'react-router-dom';
import "./CountryPage.css"
import { Link } from 'react-router-dom';
import Split from 'react-split'


function CountryPage() {
    // get constants to set state
    const collapseThreshold = 10;
    let sizes = [33,34,33];


    const {countryName} = useParams();
    return(
        <div className="country-page-container">
            <div className = "top-header">
            <Link to="/" className="home_button">Home</Link>
            <h1 className="header_name">Notes for {countryName} </h1> 
            <Link to="/" className="login_button">Log In</Link>              
            </div>  


            <div className="main-content-row">
                <Split
                sizes={[33, 34, 33]}
                minSize={1}
                expandToMin={false}
                direction="horizontal"
                className="split-container"
                >
                <div className="general-info-container">
                    <div>
                        <h2>Parsed Info</h2>
                    </div>
                </div>

                <div className="notes-container">
                    <div>
                        <h2>Notes</h2>
                    </div>
                    <textarea className="notes-textarea" placeholder='write something ...'></textarea>
                    <button>Submit</button>
                </div>

                <div className="social-container">
                    <div>
                        <h2>Social</h2>
                    </div>
                </div>
                </Split> 
            </div>

                
        </div>
    );

}



export default CountryPage;