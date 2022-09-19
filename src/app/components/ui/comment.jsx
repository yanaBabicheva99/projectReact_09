import React, {useEffect, useState} from 'react';
import SelectField from '../common/form/selectField';
import api from '../../api';
import PropTypes from 'prop-types';

const FormComment = ({handleAddComment}) => {
    const [data, setData] = useState({userId: '', content: ''});
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.users.fetchAll().then(data => setUsers(data.map(user => ({value: user._id, label: user.name}))));
    }, []);
    const handleChange = (item) => {
        setData(prevState => ({...prevState, [item.name]: item.value}));
    };

    const handleChangeArea = ({target}) => {
        setData(prevState => ({...prevState, [target.name]: target.value}));
    };

    const handleSendData = () => {
        handleAddComment(data);
        setData({userId: '', content: ''});
    };
    return (
        <div className="card mb-2">
            <div
                style={{display: 'flex', flexDirection: 'column'}}
                className="card-body"
            >
                <div>
                    <h2>New comment</h2>
                    <SelectField
                        defaultOption='Выбирите пользователя'
                        value={data.userId}
                        name='userId'
                        options={users}
                        onChange={handleChange}
                    />
                    <div className="mb-4">
                        <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                        >Сообщение</label>
                        <textarea
                            value={data.content}
                            name='content'
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            onChange={handleChangeArea}
                        ></textarea>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    style={{alignSelf: 'flex-end'}}
                    onClick={handleSendData}
                >
                    Опубликовать
                </button>
            </div>
        </div>
    );
};
FormComment.propTypes = {
    handleAddComment: PropTypes.func.isRequired
};

export default FormComment;
