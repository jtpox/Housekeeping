import { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import UserContext from '../../utils/userContext';

import { getUserDetails, updateUser } from '../../api/user';

function EditUser() {
    const params = useParams();
    const { userId } = params;

    const { userDetails, setUserDetails } = useContext(UserContext);

    const [editUser, editUserDetails] = useState({});

    useEffect(() => {
        // getUsers(userDetails.token).then(users => updateUserList(users.data));
        getUserDetails(userDetails.token, userId).then(user => editUserDetails(user.data));
    }, []);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: editUser.username,
            password: '',
            email: editUser.email,
            mobile_number: editUser.mobile_number,
            user_group: editUser.user_group,
            department: editUser.department,
        },
        enableReinitialize: true,
        onSubmit: values => {
            setErrorMessage('');
            setSuccessMessage('');
            if(
                values.username === ''
                && values.password === ''
                && values.email === ''
                && values.mobile_number === ''
                && values.user_group === ''
                && values.department === ''
            ) {
                setErrorMessage('All fields are required.');
            } else {
                // setSuccessMessage('Details have been updated.')
                updateUser(
                    userDetails.token,
                    userId,
                    values.username,
                    values.password,
                    values.email,
                    values.mobile_number,
                    values.user_group,
                    values.department,
                ).then(res => {
                    if(res.data.errors) {
                        let errors = '';
                        res.data.errors.map(error => errors += `<li>${error.msg}</li>`);
                        setErrorMessage(`<ul>${errors}</ul>`);
                    } else {
                        setSuccessMessage('User has been updated.')
                    }
                }).catch(err => {
                    console.log(err);
                    // setErrorMessage(err)
                });
            }
        }
    });

    return (
        <div className="hero min-h-screen">
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    
                    <div className="card w-96 bg-base-200 shadow-xl">
                        <form
                            className="card-body"
                            onSubmit={formik.handleSubmit}>
                            <h2 className="card-title">Edit User ({editUser.username})</h2>

                            {errorMessage !== '' &&
                            <div className="form-control">
                                <div className="alert alert-error shadow-lg">
                                    <div
                                        className="prose"
                                        dangerouslySetInnerHTML={{ __html: errorMessage }}></div>
                                </div>
                            </div>}

                            {successMessage !== '' &&
                            <div className="form-control">
                                <div className="alert alert-success shadow-lg">
                                    <div>
                                        {successMessage}
                                    </div>
                                </div>
                            </div>}

                            {userDetails.user.user_group === 'admin' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="username"
                                    id="username"
                                    className="input input-bordered"
                                    value={formik.values.username}
                                    onChange={formik.handleChange} />
                            </div>}

                            {userDetails.user.user_group === 'admin' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    id="password"
                                    className="input input-bordered"
                                    value={formik.values.password}
                                    onChange={formik.handleChange} />
                            </div>}

                            {userDetails.user.user_group === 'admin' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    id="email"
                                    className="input input-bordered"
                                    value={formik.values.email}
                                    onChange={formik.handleChange} />
                            </div>}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Mobile Number</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="mobile number"
                                    id="mobile_number"
                                    className="input input-bordered"
                                    value={formik.values.mobile_number}
                                    onChange={formik.handleChange} />
                            </div>

                            {userDetails.user.user_group === 'admin' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Group</span>
                                </label>
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    id="user_group"
                                    value={formik.values.user_group}
                                    onChange={formik.handleChange}>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>}

                            {userDetails.user.user_group === 'admin' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Department</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="department"
                                    id="department"
                                    className="input input-bordered"
                                    value={formik.values.department}
                                    onChange={formik.handleChange} />
                            </div>}

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>

                            <div className="form-control mt-3">
                                <Link
                                    className="btn btn-sm btn-default"
                                    to="/user/manage">
                                    Back
                                </Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditUser;