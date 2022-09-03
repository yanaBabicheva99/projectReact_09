import React from 'react';
import UserPage from '../page/userPage/index';
import {useParams} from 'react-router-dom';
import UsersListPage from '../page/usersListPage/index';

const Users = () => {
    const params = useParams();
    const {userId} = params;
    return (
        <>
            {userId ? <UserPage id={userId} /> : <UsersListPage />}
        </>
    );
};
export default Users;
