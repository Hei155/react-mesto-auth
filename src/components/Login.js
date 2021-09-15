import React from "react";
import * as auth from '../auth'
import { withRouter, useHistory } from 'react-router-dom'; 


function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.authorize(password, email)
        .then(() => {
            props.submit(true);
            props.setStatus(true);
            props.changeLoginStatus(true);
            props.changeHeaderLink('Выйти')
            history.push('/');
        })
        .catch((err) => {
            console.log(err)
            props.submit(true);
            props.setStatus(false);
        })
    }

    React.useEffect(() => {
        props.changeHeaderLink('Регистрация')
    }, [])

    return (
        <section className="register">
            <div className="register__container">
                <h2 className="register__title">Вход</h2>
                <form className="register__form" onSubmit={handleSubmit}>
                    <label className="register__field">
                        <input required className="form__input" placeholder="Email" onChange={handleChangeEmail}/>
                        <input required className="form__input" placeholder="Пароль" onChange={handleChangePassword}/>
                    </label>
                    <button type="submit" className="form__button" aria-label="Зарегестрироваться">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);   