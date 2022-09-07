import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import UserContext from '../../utils/userContext';

import { addUser } from '../../api/user';

function NewUser() {
    const { userDetails, setUserDetails } = useContext(UserContext);

    const [detailsForm, setDetailsForm] = useState({
        username: '',
        password: '',
        email: '',
        mobile_number: '',
        user_group: '',
        department: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
            mobile_number: '',
            user_group: 'user',
            department: '',
        },
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
                addUser(
                    userDetails.token,
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
                        setSuccessMessage('New user has been added.')
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
                            <h2 className="card-title">Add User</h2>

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

                            <div className="form-control">
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
                            </div>

                            <div className="form-control">
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
                            </div>

                            <div className="form-control">
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
                            </div>

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

                            <div className="form-control">
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
                            </div>

                            <div className="form-control">
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
                            </div>

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

export default NewUser;