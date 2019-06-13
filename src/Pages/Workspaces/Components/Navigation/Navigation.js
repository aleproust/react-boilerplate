import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation({workspaceId}) {
    return <>
       <div className="Header-actions-item"><Link style={{color:"black"}} to={`/workspaces/${workspaceId}/dashboard`}>Dashboard</Link></div>
        <div className="Header-actions-item"><Link style={{color:"black"}} to={`/workspaces/${workspaceId}/settings`}>Settings</Link></div>
    </>
}