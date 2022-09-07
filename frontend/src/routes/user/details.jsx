import { useState, useContext } from 'react';
import { useFormik } from 'formik';

import UserContext from '../../utils/userContext';

import { editDetails } from '../../api/user';

function UserDetails() {
    const { userDetails, setUserDetails } = useContext(UserContext);

    const [detailsForm, setDetailsForm] = useState({
        mobile_number: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            mobile_number: userDetails.user.mobile_number,
        },
        onSubmit: values => {
            setErrorMessage('');
            setSuccessMessage('');
            if(
                values.mobile_number === ''
            ) {
                setErrorMessage('All fields are required.');
            } else {
                editDetails(
                    userDetails.token,
                    values.mobile_number
                ).then(res => setSuccessMessage('Details have been updated.')).catch(err => setErrorMessage(err));
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
                            <h2 className="card-title">Edit Details</h2>

                            {errorMessage !== '' &&
                            <div className="form-control">
                                <div className="alert alert-error shadow-lg">
                                    <div>
                                        {errorMessage}
                                    </div>
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

                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserDetails;