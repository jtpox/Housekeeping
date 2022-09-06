import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../utils/userContext';

function ProtectedRoute({ children }) {
    const { userDetails, setUserDetails } = useContext(UserContext);

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