import React from 'react';
import PropTypes from 'prop-types';
import style from './textFieldStyle/textField.module.css';
const TextField = ({label, type, value, name, error, onChang, placeholder, customStyle}) => {
    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };
    return (
        <>
            {customStyle
                ? <div className={style.wrapper}>
                    {/* <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21"> */}
                    {/*    <path d="M21 19.59l-5-5A9 9 0 1014.6 16l5 5zM4 13.94a7 7 0 119.89 0 7 7 0 01-9.89 0z"></path> */}
                    {/* </svg> */}
                    <input
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        id={name}
                        onChange={(e) => onChang(e)}
                        className={style.input}
                    />
                </div>
                : <div className='mb-4'>
                    <label htmlFor={name}>{label}</label>
                    <input
                        name={name}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        id={name}
                        onChange={(e) => onChang(e)}
                        className={getInputClasses()}
                    />
                    {error && <div className='invalid-feedback'>{error}</div>}
                </div>}

        </>
    );
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChang: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    customStyle: PropTypes.bool
};
TextField.defaultProps = {
    type: 'text',
    placeholder: '',
    label: '',
    customStyle: false
};
export default TextField;
