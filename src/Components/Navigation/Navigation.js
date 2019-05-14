import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import { connect } from 'react-redux';

const Navigation = ({ authUser }) => (
    <div className="Header-actions">{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
    <>
        <div className="Header-actions-item"><Link to={ROUTES.PROJECTS}>Projects</Link></div>
        <div className="Header-actions-item"><Link to={ROUTES.INFRASTRUCTURE}>Infrastructure</Link></div>
        <div className="Header-actions-item"><Link to={ROUTES.SETTINGS}>Settings</Link></div>
    </>

)

const NavigationNonAuth = () => (
    <div className="Header-actions-item"><Link to={ROUTES.LANDING}>Who's bobby</Link></div>
);
const mapStateToProps = state => {
  return {authUser: state.userState.isAuthenticated}
};

export default connect(mapStateToProps)(Navigation);

