import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { authenticate } from '../api/user';

function Home(props) {
    const [userDetails, setUserDetails] = props.data.userDetails;

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    if(userDetails.token) {
        return <Navigate to="/dashboard" />;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: values => {
            authenticate(values.email, values.password).then(result => {
                console.log(result);
            });
        }
    });

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="text-center lg:text-center">
                    <h1 className="text-5xl font-bold">Authenticate Now</h1>
                    <p className="py-6">Log in to access housekeeping.</p>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
                    <form
                        className="card-body"
                        onSubmit={formik.handleSubmit}>
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
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Home;