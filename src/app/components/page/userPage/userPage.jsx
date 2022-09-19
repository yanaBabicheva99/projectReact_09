import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import CommentsList from '../../ui/commentsList';
import UserCard from '../../ui/userCard/userCard';

const UserPage = ({id}) => {
    const [userById, setUserById] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.getById(id).then(data => {
            setUserById(data);
        });
        api.users.fetchAll().then(data => setUsers(data.map(user => ({value: user._id, label: user.name}))));
    }, []);

    return (

        <div className="container">
            {userById && users
                ? <div className="row gutters-sm">
                    <UserCard id={id} userById={userById} />
                    <div className="col-md-8">
                        <CommentsList users={users} id={id} />
                    </div>
                </div>
                : <h1>Loading...</h1>
            }

        </div>

    );
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
