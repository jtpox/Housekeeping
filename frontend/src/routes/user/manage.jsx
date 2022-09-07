import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../utils/userContext';

import { getUsers, deleteUser } from '../../api/user';

function ManageUsers() {
    const { userDetails, setUserDetails } = useContext(UserContext);

    const [userList, updateUserList] = useState([]);

    useEffect(() => {
        getUsers(userDetails.token).then(users => updateUserList(users.data));
    }, []);

    function removeUser(index) {
        if(confirm('Are you sure you want to delete the user?')) {
            const { id: userId } = userList[index];
            deleteUser(userDetails.token, userId).then(result => {
                // Deep clone the array.
                const newUserList = JSON.parse(JSON.stringify(userList));
                newUserList.splice(index, 1);
                updateUserList(newUserList);
            });
        }
    }

    return (
        <div className="container mx-auto">
            <div className="prose mt-5">
                <h1 className="text-left">
                    Manage Users
                </h1>

                <p>
                    <Link
                        className="btn btn-primary btn-xs"
                        to="/user/new">
                        New User
                    </Link>
                </p>
            </div>

            <div className="overflow-x-auto mt-5">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Department</th>
                            <th>User Group</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {userList.map((user, index) => (
                            <tr
                                className="hover"
                                key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile_number}</td>
                                <td>{user.department}</td>
                                <td>{user.user_group}</td>
                                <td>
                                    <div className="flex flex-wrap items-center justify-center gap-2">
                                        <Link
                                            className="btn btn-primary btn-xs"
                                            to={`/user/${user.id}`}>
                                            Edit
                                        </Link>

                                        <button
                                            type="button"
                                            className="btn btn-error btn-xs"
                                            onClick={() => removeUser(index)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageUsers;