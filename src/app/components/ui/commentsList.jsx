import React, {useState, useEffect, useCallback} from 'react';
import SelectField from '../common/form/selectField';
import PropTypes from 'prop-types';
import api from '../../api';
import Comment from './comment';

const CommentsList = ({id, users}) => {
    const [data, setData] = useState({userId: '', content: ''});
    const [comment, setComment] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(id).then(data => setComment(data));
    }, []);

    const handleChange = (item) => {
        setData(prevState => ({...prevState, [item.name]: item.value}));
    };

    const handleChangeArea = ({target}) => {
        setData(prevState => ({...prevState, [target.name]: target.value}));
    };

    const handleAddComment = () => {
        api.comments.add({...data, pageId: id}).then(data => setComment(prevState => [...prevState, data]));
        setData({userId: '', content: ''});
    };

    const handleRemove = useCallback((id) => {
        api.comments.remove(id).then(data => setComment(comment.filter(com => com._id !== data)));
    }, [comment]);

    return (
        <>
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
                            >Сообщение</label
                            >
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
                        onClick={handleAddComment}
                    >
                    Опубликовать
                    </button>
                </div>
            </div>

            {comment.length > 0 &&
               <Comment
                   comment={comment}
                   users={users}
                   remove={handleRemove}
               />
            }
        </>
    );
};
CommentsList.propTypes = {
    id: PropTypes.string,
    users: PropTypes.array.isRequired
};

export default CommentsList;
