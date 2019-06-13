import React, { Component } from 'react';


class WorkspacesSettings extends Component {
    render(){
        return <>
        <h1>SETTINGS FOR WORKSPACES {this.props.match.params.workspaceid}</h1>
     </>
    }
}


export default WorkspacesSettings