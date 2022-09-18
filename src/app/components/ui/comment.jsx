import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const Comment = ({comment, users, remove}) => {
    useEffect(() => {
        console.log('yes');
    });
    const getName = (id) => {
        console.log('+');
        const user = users.find(user => user.value === id);
        return user.label;
    };
    // const getTime = (time) => {
    //     console.log(time);
    // };
    // console.log(time);
    // const dataOld = new Date(Number(time));
    // const dataNew = new Date();
    // console.log('old', dataOld);
    // console.log('new', dataNew);
    //
    // const yearOld = dataOld.getFullYear();
    // const monthOld = dataOld.getMonth();
    // const dateOld = dataOld.getDate();
    // const hoursOld = dataOld.getHours();
    // const minutesOld = dataOld.getMinutes();
    // const secondsOld = dataOld.getSeconds();
    //
    // const yearNew = dataNew.getFullYear();
    // const monthNew = dataNew.getMonth();
    // // const dateNew = dataNew.getDate();
    // const hoursNew = dataNew.getHours();
    // const minutesNew = dataNew.getMinutes();
    // const secondsNew = dataNew.getSeconds();
    //
    // const differenceYear = yearNew - yearOld;
    // const differenceMonth = monthNew - monthOld;
    // // const differenceDate = dateNew - dateOld;
    // const differenceHours = hoursNew - hoursOld;
    // const differenceMinutes = minutesNew - minutesOld;
    // const differenceSeconds = Math.ceil(secondsNew - secondsOld);
    // if (differenceYear) {
    //     return (dateOld > 10 ? '' : '0' + dateOld) + '.' +
    //         (monthOld + 1 > 10 ? '' : '0' + monthOld) +
    //         '.' + yearOld;
    // }
    // if (differenceMonth) {
    //     return dataOld + '.' + monthOld;
    // }
    // if (differenceHours) {
    //     return hoursOld + '.' + minutesOld;
    // }
    // if (differenceMinutes) {
    //     if (differenceMinutes > 10) {
    //         return '30 минут назад';
    //     } else if (differenceMinutes > 5) {
    //         return '10 минут назад';
    //     } else if (differenceMinutes > 1) {
    //         return '5 минут назад';
    //     }
    // }
    // if (differenceSeconds > 0 || differenceSeconds < 0) {
    //     console.log('--');
    //     return '1 минуту назад';
    // }

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
                                                        {/* - {getTime(com.created_at)} */}
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
