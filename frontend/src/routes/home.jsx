import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';

import UserContext from '../utils/userContext';

import { authenticate } from '../api/user';

function Home(props) {
    const { userDetails, setUserDetails } = useContext(UserContext);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            authenticate(values.email, values.password).then(result => {
                localStorage.setItem('housekeeping', JSON.stringify(result.data));
                setUserDetails(result.data);
            }).catch(err => {
                setErrorMessage('Invalid login details.');
            });
        }
    });

    if(userDetails.token) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div
            className="hero min-h-screen"
            style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-center">
                    <h1 className="text-5xl font-bold">Authenticate Now</h1>
                    <p className="py-6">Log in to access housekeeping.</p>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    <form
                        className="card-body"
                        onSubmit={formik.handleSubmit}>
                        {errorMessage !== '' &&
                        <div className="form-control">
                            <div className="alert alert-error shadow-lg">
                                <div>
                                    {errorMessage}
                                </div>
                            </div>
                        </div>}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                id="email"
                                className="input input-bordered"
                                value={formik.values.email}
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
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Home;