import { useState, useContext } from 'react';

import UserContext from '../../utils/userContext';

import { addUser } from '../../api/user';

function NewUser() {
    const { userDetails, setUserDetails } = useContext(UserContext);

    return (
        <div>
            Test
        </div>
    );
}

export default NewUser();