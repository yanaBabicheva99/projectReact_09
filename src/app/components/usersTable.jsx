import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import BookMark from './bookmark';
import Qualitie from './qualitie';
const UsersTable = ({users, onSort, selectedSort, onToggleBookMark, onDelete, ...rest}) => {
    const columns = {
        name: {path: 'name', name: 'Имя'},
        qualities: {
            name: 'Качества',
            component: (user) => (
                user.qualities.map(qual => (
                    <Qualitie key={qual._id} {...qual} />
                ))
            )
        },
        profession: {path: 'profession.name', name: 'Профессия'},
        completedMeetings: {path: 'completedMeetings', name: 'Встретился, раз'},
        rate: {path: 'rate', name: 'Оценка'},
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <table className="table">
            <TableHeader {...{selectedSort, onSort, columns}}/>
            <TableBody {...{data: users, columns}} />
        </table>
    );
};
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    rest: PropTypes.object,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default UsersTable;
