import { useContext } from 'react';

import UserContext from '../utils/userContext';

function Dashboard() {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <div
            className="hero min-h-screen bg-base-200"
            style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome, {userDetails.user.username}!</h1>
                    <p className="py-6">Housekeeping is a user management portal.</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;