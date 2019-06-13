import React, { Component } from 'react';

class WorkspacesDashboard extends Component {
    render(){
        return <>
        <h1>DASHBOARD FOR {this.props.match.params.workspaceid}</h1>
     </>
    }
}
export default WorkspacesDashboard