import React from "react";

import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute  = ({...props}) => {
    return (
        <Route>
            {() => 
            props.loginIn ? props.children : <Redirect to="./sign-in"/>
            }
        </Route>
    )
}