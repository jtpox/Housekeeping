import { useState, useContext } from 'react';

import { useFormik } from 'formik';

import UserContext from '../../utils/userContext';

function EditUser() {
    const { userDetails, setUserDetails } = useContext(UserContext);
    
    return (
        <div>
            Test
        </div>
    );
}

export default EditUser;