import React from 'react';
import { NavLink } from "react-router-dom";

function BookingRestaurant(props) {
    const {reservation, setReservations} = props;

    function removeReservation () {

        setReservations((prevReservations) => {

            let items = [...prevReservations];

            const indexReservation = items.findIndex(
                el => el.id === reservation.id
            );

            items.splice(indexReservation, 1);

            return items;
        })
    }

    return (
        <div className="my-booking-ele">
            <div className="my-booking-ele-top">
                <div className="you-may-like-element">
                    <div className="you-may-like-element-info">
                        <div className="info-header">
                            <img src={reservation.imageRestaurant} />
                            <div className="name">
                                <span className="restaurant-name">{reservation.nameRestaurant}</span>
                                <span className="time">
                                    <i className="fal fa-history" style={{marginRight: '1rem'}} />
                                    il y a 2 heures
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <span onClick= {() => removeReservation()}> Décliner <i className="fal fa-times" /></span>
            </div>
            <img src={reservation.backgroundImageRestaurant} alt="" />
            <div className="my-booking-ele-bottom">
                <div>
                    <span className="my-booking-label"> Date &amp; Heure</span>
                    <span className="my-booking-value"> {reservation.dateReservation} / {reservation.heureReservation}</span>
                </div>
                <div>
                    <span className="my-booking-label"> Nombre de personnes</span>
                    <span className="my-booking-value">
                        <span className="number">{reservation.personnes.length}</span>
                        <div className="peoples">
                            <div className="people">
                                <img src="assets/img/avatar.png" />
                            </div>
                            <div className="people">
                                <img src="assets/img/avatar.png" />
                            </div>
                            <div className="people">
                                <img src="assets/img/avatar.png" />
                            </div>
                        </div>
                        <span className="number-sur-taktak"> Dont 3 son sur TakTak</span>
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Modalité de payment</span>
                    <span className="my-booking-value"> {reservation.payment}</span>
                </div>
                <div>
                    <span className="my-booking-label"> Votre note spéciale</span>
                    <span className="my-booking-value"> {reservation.note} </span>
                </div>
            </div>
            <div className="divider " />
            <a className="my-booking-footer" href="booking-process.html">
                <NavLink exact to={`/bookingProcess/`+reservation.idRestaurant}>
                    <button className="cancel"> 
                        <i className="fal fa-window-close" /> Annuler la réservation
                    </button>
                </NavLink>
                <button className="phone"><i className="fal fa-phone-volume" />+216 73 367 283</button>
                <div className="comment"><i className="fal fa-comment-dots" /></div>
            </a>
        </div>
                  
    )
}

BookingRestaurant.propTypes = {

}

export default BookingRestaurant