import React from "react";
import "./Header.scss";
import { Button } from "antd";
import * as ROUTES from "../../Constants/routes"
import { Link } from 'react-router-dom';


const Header = ({ loginClicked }) => (
    <header className="Header">
        <div className="Header-logo">Le logo</div>
        <div className="Header-actions">
            <div className="Header-actions-item"><Link to={ROUTES.PROJECTS}>Projects</Link></div>
            <div className="Header-actions-item"><Link to={ROUTES.INFRASTRUCTURE}>Infrastructure</Link></div>
            <div className="Header-actions-item"><Link to={ROUTES.SETTINGS}>Settings</Link></div>
        </div>
        <div className="Header-user">
            <Button type="primary" onClick={loginClicked}>Login with github</Button>
        </div>
    </header>
  );
  
  export default Header;