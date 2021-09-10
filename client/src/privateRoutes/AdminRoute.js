import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";




const AdminRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.auth);
    console.log(auth.user.role)
    return (
        <Route
            {...rest}
            render={(props) =>
                auth.isAuth && auth.user.role !='admin' ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

export default AdminRoute;