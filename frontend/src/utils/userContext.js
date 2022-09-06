import { createContext } from 'react';

const UserContext = createContext({
    userDetails: {},
    setUserDetails: () => {}
});

export default UserContext;