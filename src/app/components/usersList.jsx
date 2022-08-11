import React from 'react';
import PropTypes from 'prop-types';
import UserPage from './userPage';
import Users from './users';
const UsersList = ({match, history}) => {
    const userId = match.params.userId;
    return (
        <>
            {userId ? <UserPage id={userId} history={history}/> : <Users />}
        </>
    );
};
UsersList.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
export default UsersList;
