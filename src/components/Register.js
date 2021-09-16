import  { Link } from "react-router-dom";
import React from "react";

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
        props.register(password, email)
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
                        <input required className="form__input" placeholder="Email" onChange={handleChangeEmail} value={email}/>
                        <input required className="form__input" placeholder="Пароль" onChange={handleChangePassword} value={password}/>
                    </label>
                    <button type="submit" className="form__button" aria-label="Зарегестрироваться">Зарегистрироваться</button>
                </form>
                <Link to="/sign-in" className="signin__link">Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}
