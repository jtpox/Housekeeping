import { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../utils/userContext';

const higherUserGroups = ['manager', 'admin'];

function ShowUserLinks(props) {
    const { userDetails, setUserDetails } = useContext(UserContext);

    function logOut(e) {
        e.preventDefault();
        localStorage.removeItem('housekeeping');
        setUserDetails({});
    }

    const menuClass = (props.mobile)? 'menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52' : 'menu menu-horizontal p-0';

    if(userDetails.token) {
        return (
            <ul className={menuClass}>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/user/details">Edit Details</Link></li>
                {userDetails.token && higherUserGroups.includes(userDetails.user.user_group)?
                    <li><Link to="/user/manage">Manage Users</Link></li> : ''}
                <li><a onClick={logOut}>Log Out</a></li>
            </ul>
        );
    }
}

function Navigation(props) {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ShowUserLinks mobile={true} />
                </div>
                <a className="btn btn-ghost normal-case text-xl">Housekeeping</a>
            </div>

            <div className="navbar-end hidden lg:flex">
                <ShowUserLinks />
            </div>
        </div>
    );
}

export default Navigation;