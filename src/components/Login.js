import React from "react";
import { withRouter } from 'react-router-dom'; 


function Login(props) {
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
        props.login(password, email);
       
    }

    React.useEffect(() => {
        props.changeHeaderLink('Регистрация')
    }, [])

    React.useEffect(() => {
        if (localStorage.getItem('email')) {
            const email = localStorage.getItem('email');
            setEmail(email);
        }
    
        if (localStorage.getItem('password')) {
            const password = localStorage.getItem('password');
            setPassword(password);
        }
    }, [])

    return (
        <section className="register">
            <div className="register__container">
                <h2 className="register__title">Вход</h2>
                <form className="register__form" onSubmit={handleSubmit}>
                    <label className="register__field">
                        <input required className="form__input" placeholder="Email" onChange={handleChangeEmail} value={email}/>
                        <input required className="form__input" placeholder="Пароль" onChange={handleChangePassword} value={password}/>
                    </label>
                    <button type="submit" className="form__button" aria-label="Зарегестрироваться">Войти</button>
                </form>
            </div>
        </section>
    )
}

export default withRouter(Login);   