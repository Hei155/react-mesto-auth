import React from 'react';
import logo from '../images/Vector.svg';
import { Link } from 'react-router-dom'

export function Header(props) {
    function signOut(){
        localStorage.removeItem('jwt');
        props.changeEmail('');
      }

    let link;
    if (props.headerLink === 'Войти') {
        link = "/sign-in"
    }
    else if (props.headerLink === 'Выйти') {
        link = "/sign-in"
    }
    else if (props.headerLink === 'Регистрация') {
        link = "/sign-up"
    }
    return (
        <header className="header">
            <img src={logo} alt="Лого" className="header__logo"/>
            <div className="header__container">
                <p className="header__email">{props.email}</p>
                <Link className="header__link" to={link} onClick={props.headerLink === 'Выйти' ? signOut : null}>{props.headerLink}</Link>
            </div>
        </header>
    )
}