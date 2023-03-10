import './style.scss';
import { deleteCookie, getCookie } from '../../assest/defFunction';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const logOut = () => {
        deleteCookie('user')
        deleteCookie('token')
        navigate('/auth')
        window.location.reload();
    }

    return (
        <div className='head'>
            <div className="container">
                <div className="head__btns">
                    <NavLink className='head__admin head__btn' to={'/admin'}>Admin</NavLink>
                    <button className='head__log head__btn' onClick={logOut}>logout</button>
                </div>
                <div className="head__name">
                    {getCookie('user') && getCookie('user').username}
                </div>
            </div>
        </div>
    )
}

export default Header