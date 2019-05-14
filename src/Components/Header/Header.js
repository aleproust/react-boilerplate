import React from "react";
import "./Header.scss";
import { Button } from "antd";
import Navigation from "../Navigation/Navigation";


const Header = ({ isAuthenticated, loginClicked, avatar }) => (
    <header className="Header">
        <div className="Header-logo">Le logo</div>
        <Navigation></Navigation>
        <div className="Header-user">
            {!isAuthenticated ? <Button type="primary" onClick={loginClicked}>Login with github</Button>: 
                <img className="Header-user-avatar" alt="" src={avatar}></img>}
        </div>
    </header>
  );
  
  export default Header;