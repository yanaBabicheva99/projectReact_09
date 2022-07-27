import React, {useState, useEffect} from 'react';
import User from './user';
import Pagination from './pagination';
import {paginate} from '../utils/paginate';
import PropTypes from 'prop-types';
import GroupList from './groupList';
import api from '../api';
import SearchStatus from './searchStatus';

const Users = ({users, ...rest}) => {
    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const filteredUsers = selectedProf
        ? users.filter(user => user.profession === selectedProf)
        : users;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <>
            <SearchStatus length={count} />
            {professions && (
                <>
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty='_id'
                        contentProperty='name'
                        selectedItem={selectedProf}
                    />
                    <button className='btn btn-primary btn-sm m-2' onClick={clearFilter}>Очистить</button>
                </>
            ) }
            {count > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User key={user._id} {...rest} {...user} />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
