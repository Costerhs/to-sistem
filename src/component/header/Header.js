import './style.scss';
import React from 'react'
import { getCookie } from '../../assest/defFunction';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className='head'>
            <div className="container">
                <div className="head__btns">
                    <NavLink className='head__admin head__btn' to={'/admin'}>Admin</NavLink>
                    <button className='head__log head__btn'>logout</button>
                </div>
                <div className="head__name">
                    {getCookie('user').username}
                </div>
            </div>
        </div>
    )
}

export default Header