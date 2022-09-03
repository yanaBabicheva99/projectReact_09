import React, {useState, useEffect} from 'react';
import {validator} from '../utils/validator';
import TextField from './textField';

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: ''});
    const [errors, setErrors] = useState({});

    const handelChange = ({target}) => {
        setData(prevSate => ({...prevSate, [target.name]: target.value}));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен не корректно'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число'
            },
            min: {
                message: 'Пароль долже состоять минимум из 8 символов',
                value: 8
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handelSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return null;
        }
        console.log(data);
    };
    return (
        <div className='container mt-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className='mb-4'>Login</h3>
                    <form onSubmit={handelSubmit}>
                        <TextField
                            onChang={handelChange}
                            name='email'
                            label='Электронная почта'
                            value={data.email}
                            error={errors.email}
                        />
                        <TextField
                            onChang={handelChange}
                            name='password'
                            label='Пароль'
                            type='password'
                            value={data.password}
                            error={errors.password}
                        />
                        <button disabled={!isValid} className='btn btn-primary w-100 mx-auto'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginForm;
