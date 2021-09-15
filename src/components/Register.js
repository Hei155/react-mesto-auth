import  { Link } from "react-router-dom";
import React from "react";
import * as auth from '../auth';

export function Register(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.register(password, email)
        .then(() => {
            props.setStatus(true);
            props.submit(true);
        })
        .catch((err) => {
            console.log(err)
            props.submit(true);
            props.setStatus(false);
        })
    }

    React.useEffect(() => {
        props.changeHeaderLink('Войти')
    }, [])

    return (
        <section className="register">
            <div className="register__container">
                <h2 className="register__title">Регистрация</h2>
                <form className="register__form" onSubmit={handleSubmit}>
                    <label className="register__field">
                        <input required className="form__input" placeholder="Email" onChange={handleChangeEmail}/>
                        <input required className="form__input" placeholder="Пароль" onChange={handleChangePassword}/>
                    </label>
                    <button type="submit" className="form__button" aria-label="Зарегестрироваться">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="signin__link">Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}
