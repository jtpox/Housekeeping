import { Link } from 'react-router-dom';

const higherUserGroups = ['manager', 'admin'];

function ShowManagementLinks(props) {
    const [userDetails, setUserDetails] = props.data.userDetails;
    if(
        userDetails.user
        && higherUserGroups.includes(userDetails.user.user_group)
    ) {
        return (
            <ul className="menu menu-horizontal p-0">
                <li><a>Manage Users</a></li>
            </ul>
        );
    }
}

function ShowUserLinks(props) {
    const [userDetails, setUserDetails] = props.data.userDetails;
    if(userDetails.token) {
        return (
            <ul className="menu menu-horizontal p-0">
                <li><Link to="/user/details">Edit Details</Link></li>
                <ShowManagementLinks data={props.data} />
            </ul>
        );
    }
}

function Navigation(props) {
    const [userDetails, setUserDetails] = props.data.userDetails;
    return (
        <div className="navbar bg-neutral">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">Housekeeping</Link>
            </div>
            <div className="flex-none">
                <ShowUserLinks data={props.data} />
            </div>
        </div>
    );
}

export default Navigation;