import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { AddPlacePopup } from './AddPlacePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import InfoTooltil from './InfoTooltip';
import { Footer } from './Footer';
import { ImagePopup } from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useHistory, Switch, Route } from 'react-router-dom'
import { Register } from './Register'
import Login from './Login';
import { ProtectedRoute } from './ProtectedRoute';
import * as auth from '../utils/auth.js';


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isCardSelected, setIsCardSelected] = React.useState(false);
    const [pictureData, setPictureData] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [headerLink, setHeaderLink] = React.useState('Выйти');
    const [cards, setCards] = React.useState([]);
    const [loginIn, setLoginIn] = React.useState(false);
    const [isStatusPopupOpen, setIsStatusPopupOpen] = React.useState(false);
    const [isSucces, setIsSucces] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const history = useHistory();

    function handleCardLike(card) {
        const isLike = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLike)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err)
        })
    }
    React.useEffect(() => {
        api.getInitialCards()
        .then((res) => {
            const arr = res.map((card, i) => {
                return {
                    name: card.name,
                    link: card.link,
                    _id: card._id,
                    likes: card.likes,
                    owner: card.owner
                }
            })
            setCards(arr)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    React.useEffect(() => {
        api.getUserData()
        .then((res) => {
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    function handleCardClick(evt) {
        setPictureData(evt.target)
        setIsCardSelected(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsCardSelected(false);
    }

    function handleUpdateUser({name, about: description}) {
        api.setUserInfo(name, description)
        .then((res) => {
            closeAllPopups();
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleUpdateAvata({avatar}) {
        api.setNewAvatar(avatar)
        .then((res) => {
            closeAllPopups();
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleAddPlace({name, link}) {
        api.setCard(name, link)
        .then((newCard) => {
            closeAllPopups();
            setCards([newCard, ...cards]);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards([...cards].filter(cards => !(cards._id === card._id)))
            })
        .catch((err) => {
            console.log(err)
        })
    }

    function changeLink(name) {
        setHeaderLink(name);
    }

   function checkToken() {
       if (localStorage.getItem('jwt')) {
           const jwt = localStorage.getItem('jwt');
           auth.checkToken(jwt)
                .then((res) => {
                    setEmail(res.data.email);
                    setLoginIn(true);
                    history.push('/');
                    setHeaderLink('Выйти');
                })
                .catch((err) => {
                    console.log(err);
                })
       }
   }

   function register (password, email) {
    auth.register(password, email)
        .then(() => {
            setIsSucces(true);
            setIsStatusPopupOpen(true);
        })
        .catch((err) => {
            console.log(err)
            setIsSucces(false);
            setIsStatusPopupOpen(false);
        })
   }

   function login (password, email) {
    auth.authorize(password, email)
    .then(() => {
        setIsStatusPopupOpen(true);
        setIsSucces(true);
        setLoginIn(true);
        changeLink('Выйти')
        history.push('/');
    })
    .catch((err) => {
        console.log(err)
        setIsStatusPopupOpen(true);
        setIsSucces(false);
    })
   }

   React.useEffect(() => {
        checkToken()
        console.log(localStorage)
   },[])

    return (
    <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header isLoginIn={loginIn} headerLink={headerLink} changeHeaderLink={changeLink} changeEmail={setEmail} email={email}/>
                <Switch>
                    <ProtectedRoute path="/" loginIn={loginIn} exact
                        component={Main}
                        cardList={cards}
                        onCardDelete={handleCardDelete}
                        onCardLike={handleCardLike}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onImage={handleCardClick}
                    />
                    <Route path="/sign-up"> 
                        <Register register={register} changeHeaderLink={changeLink}/>
                    </Route>
                    <Route path="/sign-in">
                        <Login login={login} changeHeaderLink={changeLink}/>
                    </Route>
                </Switch>
                <Footer/>
                <InfoTooltil isPopupOpen={isStatusPopupOpen} setPopup={setIsStatusPopupOpen} isLoginIn={loginIn} popupStatus={isSucces}/>
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}></EditProfilePopup>
                <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}></AddPlacePopup>
                <ImagePopup name="image-picture" isOpen={isCardSelected} onClose={closeAllPopups} src={pictureData.src} alt={pictureData.alt}/>
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvata} name="avatar-edit" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} text={'Сохранить'}></EditAvatarPopup>
            </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
