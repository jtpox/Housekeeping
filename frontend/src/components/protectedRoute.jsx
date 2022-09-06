import { Navigate } from 'react-router-dom';

function ProtectedRoute(props, { children }) {
    const [userDetails, setUserDetails] = props.data.userDetails;
    console.log(userDetails);

    /* if(
        props.data.inverse
        && userDetails.token
    ) {
        return <Navigate to="/dashboard" />;
    } */

    if(!userDetails.token) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;