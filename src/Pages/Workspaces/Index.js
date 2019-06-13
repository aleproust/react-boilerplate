import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Settings from './Pages/Settings/Settings';
import Dashboard from './Pages/Dashboard/Dashboard';

class IndexWorkspace extends Component {
    state = {
    }
    render() {
        return <div>
            <Navigation workspaceId={this.props.match.params.workspaceid}></Navigation>
            <Route path={`${this.props.match.path}/dashboard`} component={Dashboard} />
            <Route path={`${this.props.match.path}/settings`} component={Settings} />
        </div>
    }
}


export default IndexWorkspace