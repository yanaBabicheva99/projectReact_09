import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import QualitiesList from '../../ui/qualities/qualitiesList';
import {Link} from 'react-router-dom';
import CommentsList from '../../ui/commentsList';

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
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link to={`/users/${id}/edit`}>
                                    <button
                                        className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                                    >
                                        <i className="bi bi-gear"></i>
                                    </button>
                                </Link>
                                <div
                                    className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                >
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${(
                                            Math.random() + 1
                                        )
                                            .toString(36)
                                            .substring(7)}.svg`}
                                        className="rounded-circle shadow-1-strong me-3"
                                        alt="avatar"
                                        width="65"
                                        height="65"
                                    />
                                    <div className="mt-3">
                                        <h4>{userById.name}</h4>
                                        <p className="text-secondary mb-1"> {userById.profession.name}</p>
                                        <div className="text-muted">
                                            <i
                                                className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                role="button"
                                            ></i>
                                            <i
                                                className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                role="button"
                                            ></i>
                                            <span className="ms-2">{userById.rate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div
                                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                            >
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    <QualitiesList qualities={userById.qualities}/>
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div
                                className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                            >
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">{userById.completedMeetings}</h1>
                            </div>
                        </div>
                    </div>

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
