import React, {useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import ReactStars from "react-rating-stars-component";

function BookingEighthStep(props) {
    const { classes, restaurant } = props;
    const { myReservation } = useContext(RestaurantContext);
    
    const firstExample = {
        size: 15,
        value: restaurant.restaurantRate,
        edit: false,
    };

    return (
        <div className="orbit-slide">
            <div className=" booking-details">
                <div className="booking-details-left">
                    <span>Détails de votre réservation</span>
                    <div className="my-booking">
                        <div className="my-booking-ele-top">
                            <div className="you-may-like-element-booking">
                                <div className="you-may-like-element-media-booking">
                                    <img src="../../assets/img/1b2fca47f0a29674b998927c1d7741f3.png" />
                                </div>
                                <div className="you-may-like-element-info-booking">
                                    <div className="info-header">
                                        <img src={`https://${restaurant.avatar}`} />
                                        <div className="name">
                                            <span className="restaurant-name">{restaurant.name}</span>
                                            <span className="restaurant-location">
                                                <i className="icon-marker" />{restaurant.address}, {restaurant.cuisine}
                                            </span>
                                            <div>
                                                <ReactStars {...firstExample} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-booking-ele-bottom">
                            <div>
                                <span className="my-booking-label"> Date &amp; Heure</span>
                                <span className="my-booking-value"> {myReservation.date} - {myReservation.timeFrom} </span>
                            </div>
                            <div>
                                <span className="my-booking-label"> Nombre de personnes</span>
                                <span className="my-booking-value">
                                    <span className="number">{myReservation.peopleNumber}</span>
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
                                <span className="my-booking-value"> {myReservation.payment}</span>
                            </div>
                            <div>
                                <span className="my-booking-label"> Votre note spéciale</span>
                                <span className="my-booking-value"> 
                                    {/*Pas à l’entrée SVP & diminuez volume TV :)*/}
                                    {myReservation.note}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="booking-details-right">
                    <img src="../../assets/img/svg/sodexo.svg" />
                </div>
            </div>
        </div>
    )
}

export default BookingEighthStep
