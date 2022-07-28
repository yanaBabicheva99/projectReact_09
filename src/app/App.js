import React, {useState, useEffect} from 'react';
import Users from './components/users';
import api from './api';
import Loader from './Loader/loader';

function App() {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return {...user, bookmark: !user.bookmark};
                }
                return user;
            })
        );
        console.log(id);
    };

    return (
        <div>
            {users
                ? <Users onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} users={users} />
                : <div
                    style={{height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Loader />
                </div>
            }
        </div>
    );
}

export default App;
