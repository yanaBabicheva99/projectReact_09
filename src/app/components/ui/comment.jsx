import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({comment, users, remove}) => {
    comment = [...comment].sort((a, b) => Number(b.created_at) - Number(a.created_at));
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

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2>Comments</h2>
                <hr/>
                {comment.length && comment.map(com => (
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
                                                    onClick={() => remove(com._id)}
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
                ))}
            </div>
        </div>
    );
};
Comment.propTypes = {
    comment: PropTypes.array.isRequired,
    users: PropTypes.array,
    remove: PropTypes.func.isRequired
};

export default React.memo(Comment);
