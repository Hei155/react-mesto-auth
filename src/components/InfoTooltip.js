import succes from "../images/UnionTrue.svg"
import error from "../images/UnionFalse.svg"
import  { withRouter } from "react-router-dom";

function InfoTooltil(props) {
    function handleClose() {
        props.setPopup(false);
    }
    return (
        <section className={`popup popup_type_info ${props.isPopupOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
            <button className="popup__container-close" type="button" onClick={handleClose}></button>
                <img className="popup__picture" src={props.popupStatus ? succes : error} alt="Успех"></img>
                <p className="popup__status">{props.popupStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </section>
    )
}

export default withRouter(InfoTooltil)