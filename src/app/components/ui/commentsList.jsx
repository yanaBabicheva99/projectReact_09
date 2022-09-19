import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import Comment from './comment';

const CommentsList = ({id}) => {
    const [users, setUsers] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data.map(user => ({value: user._id, label: user.name}))));
    }, []);

    const getName = (id) => {
        const user = users.find(user => user.value === id);
        return user.label;
    };
    const getTime = (time) => {
        const date = new Date(Number(time));
        const dateNow = new Date();
        const yearDif = dateNow.getFullYear() - date.getFullYear();
        if (yearDif === 0) {
            const dayDif = dateNow.getDay() - date.getDay();
            if (dayDif === 0) {
                const hourDif = dateNow.getHours() - date.getHours();
                if (hourDif === 0) {
                    const minutesDif = dateNow.getMinutes() - date.getMinutes();
                    if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад';
                    if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад';
                    if (minutesDif >= 10 && minutesDif < 30) {
                        return '30 минут назад';
                    }
                    return `${date.getHours()}:${date.getMinutes()}`;
                }
            }
            return `${date.getDay()} ${date.toLocaleString('default', {
                month: 'long'
            })}`;
        }
        return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    };

    useEffect(() => {
        api.comments.fetchCommentsForUser(id).then(data => setComment(data));
    }, []);

    const handleAddComment = (data) => {
        api.comments.add({...data, pageId: id}).then(data => setComment(prevState => [...prevState, data]));
    };

    const handleRemove = (id) => {
        api.comments.remove(id).then(data => setComment(comment.filter(com => com._id !== data)));
    };

    const commentsSort = [...comment].sort((a, b) => Number(b.created_at) - Number(a.created_at));
    return (
        <>
            <Comment handleAddComment={handleAddComment} />
            {
                commentsSort.length > 0 &&
                <div className="card mb-3">
                    <div className="card-body">
                        <h2>Comments</h2>
                        <hr/>
                        { users.length > 0
                            ? <>
                                {
                                    commentsSort.map(com => (
                                        <div
                                            key={com._id}
                                            className="bg-light card-body mb-3"
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <div className="d-flex flex-start">
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
                                                        <div
                                                            className="
                                        flex-grow-1 flex-shrink-1
                                         "
                                                        >
                                                            <div className="mb-4">
                                                                <div
                                                                    className="
                                                 d-flex
                                                 justify-content-between
                                                 align-items-center
                                                "
                                                                >
                                                                    <p className="mb-1">
                                                                        {getName(com.userId) + ' '}
                                                                        <span className="small">
                                                         - {getTime(com.created_at)}
                                                                        </span>
                                                                    </p>
                                                                    <button
                                                                        className="
                                                      btn btn-sm
                                                     text-primary
                                                     d-flex
                                                     align-items-center
                                                      "
                                                                        onClick={() => handleRemove(com._id)}
                                                                    >
                                                                        <i
                                                                            className="
                                                                    bi bi-x-lg
                                                                "
                                                                        ></i>
                                                                    </button>
                                                                </div>
                                                                <p className="small mb-0">
                                                                    {com.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                            : <p>loading...</p>
                        }
                    </div>
                </div>
            }
        </>
    );
};
CommentsList.propTypes = {
    id: PropTypes.string
};

export default CommentsList;
