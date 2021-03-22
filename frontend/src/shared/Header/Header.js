import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="navigationHeader">
                <Link to={"/"} style={{textDecoration: "none"}}>
                    <div className="logoContainer">
                        <p className="logoName"> Bzzt </p>
                    </div>
                </Link>

                <div className="navigationContainer">
                    <ul className="navigation">
                    </ul>
                </div>
            </div>
        </header>
    );
};


export default Header;