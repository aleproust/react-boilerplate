import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ isLoaded, isAuthenticated, component: Component, ...rest }) => {
    if(!isLoaded){
        return null;
    }
    return (
     <Route
            {...rest}
            render={props =>

                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;