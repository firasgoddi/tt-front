import React, {useState} from 'react';

function Reservation(props) {
    const {reservation, restaurant} = props;
    const [show, setShow] = useState(reservation.confirmation);

    console.log("restooo:", restaurant);
    console.log("booking:", reservation);

    function confirmerReservation() {
        
    }

    return (
        <div className="my-booking-ele">
            <div className="my-booking-ele-top">
                <div className="you-may-like-element">
                    <div className="you-may-like-element-info">
                        <div className="info-header">
                            <img src={restaurant.avatar}/>
                            <div className="name">
                                <span className="restaurant-name">{restaurant.name}</span>
                                <span className="restaurant-location"><i className="icon-marker" />{restaurant.address},
                                    {restaurant.cuisine}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span> Contacter Client <i className="fal fa-comments" /></span>
                <span onClick={() => confirmerReservation()} > Confirmer <i className="fal fa-check" /></span>
                <span> Décliner <i className="fal fa-times" /></span>
            </div>
            <div className="my-booking-ele-main" style={{ display: show ? "block" : "none"}}>
                <span>Vous avez confirmé cette réservation ça fait 2 jours. Le client a bien reçu une notification ! </span>
            </div>
            <div className="my-booking-ele-bottom">
                <div>
                    <span className="my-booking-label"> Date &amp; Heure</span>
                    <span className="my-booking-value"> {reservation.date} – {reservation.timeFrom}</span>
                </div>
                <div>
                    <span className="my-booking-label"> Nombre de personnes</span>
                    <span className="my-booking-value">
                        <span className="number">{reservation.peopleNumber}</span>
                        <div className="peoples">
                            <div className="people">
                                <img src="../../assets/img/avatar.png" />
                            </div>
                            <div className="people">
                                <img src="../../assets/img/avatar.png" />
                            </div>
                            <div className="people">
                                <img src="../../assets/img/avatar.png" />
                            </div>
                        </div>
                        <span className="number-sur-taktak"> Dont 3 son sur TakTak</span>
                    </span>
                </div>
                <div>
                    <span className="my-booking-label"> Modalité de payement</span>
                    <span className="my-booking-value"> {reservation.payment} </span>
                </div>
                <div>
                    <span className="my-booking-label"> Votre note spéciale</span>
                    <span className="my-booking-value"> «&nbsp; {reservation.note} &nbsp;»</span>
                </div>
            </div>
        </div>
    )
}

export default Reservation
