import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ isLoaded, isAuthenticated, component: Component, ...rest }) => {
    return (
        !isLoaded ? null : <Route
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