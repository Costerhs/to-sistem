import './style.scss'
import React, { useEffect, useState } from 'react'
import { userApi } from '../../assest/api';
import { setCookie } from '../../assest/defFunction';
import { useNavigate } from 'react-router-dom';


const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();

    const postData = () => {
        setIsLoad(true)
        if (isSignUp) {
            userApi.registration(userData, setIsLoad);
        } else {
            userApi.getToken(userData.username, userData.password)
                .then(res => {
                    setCookie('token', res.data)
                    userApi.setUserData(userData.username, setIsLoad);
                    navigate('/')
                })
            //так как токен меняется каждые 5 минут я буду хранить пароль в куки и при ошибках заново получать токен
            //другого варианта получить пароль нету
            setCookie('password', userData.password)
        }
    }

    return (
        <div className="login">
            <div className="container">
                <form action="" className="form" noValidate>
                    <h1>{isSignUp ? 'SIGN UP' : 'SIGN IN'}</h1>
                    <div className="login__mode-block">
                        <div className="login__mode ">
                            <input type="radio" name="login-mode" onClick={() => setIsSignUp(false)} checked={!isSignUp} id="signin" className="login__radio signIn" />
                            <label htmlFor="signin" className="login__label">SIGN IN </label>
                        </div>
                        <div className="login__mode">
                            <input type="radio" name="login-mode" onClick={() => setIsSignUp(true)} checked={isSignUp} id="login" className="login__radio signUp" />
                            <label htmlFor="login" className="login__label">SIGN UP </label>
                        </div>
                    </div>
                    {Object.entries(userData).map((el, index) => {
                        let key = el[0];
                        if (el[0] == 'email' && !isSignUp) return null

                        return <div className="login__user" key={index}>
                            <input type="text" value={userData[key]} onChange={(event) => setUserData(elem => elem = { ...userData, [key]: event.target.value })} required className="login__inp" id={key} />
                            <div className="error-text"></div>
                            <label htmlFor={key} className="user__label">{key}</label>
                        </div>
                    })}
                    <button type='button' onClick={postData} className="login__submit">SEND</button>
                </form>

            </div>
            {isLoad && <div className='load'>
                <p className='load__text'>...loading</p>
            </div>}
        </div>

    )
}

export default Auth