import React, {useState} from 'react';
import BookingRestaurant from '../booking/BookingRestaurant';

function ReservationEncours(props) {
    const [reservations, setReservations] = useState([
        {
            id: "1",
            idRestaurant: "1",
            nameRestaurant: "Magic Kindle 01",
            imageRestaurant: "assets/img/icon-restaurant.png",
            backgroundImageRestaurant: "assets/img/f1eb1-process.png",
            dateReservation: "Lundi 12 Mars 2010",
            heureReservation: "19:00 – 21:00",
            personnes: [
                {
                    id: '1',
                    name: 'Ahmed',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '2',
                    name: 'Alex Sharp',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '3',
                    name: 'Sarah Walker',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '4',
                    name: 'Mongi',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '5',
                    name: 'Sami',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '6',
                    name: 'Joe Doe',
                    profileImage: 'https://picsum.photos/200/200.jpg',
                }
            ],
            payement: "Espèce",
            note: "Pas à l’entrée SVP"
        },
        {
            id: "2",
            idRestaurant: "2",
            nameRestaurant: "Magic Kindle 02",
            imageRestaurant: "assets/img/icon-restaurant.png",
            backgroundImageRestaurant: "assets/img/f1eb1-process.png",
            dateReservation: "Lundi 12 Mars 2010",
            heureReservation: "19:00 – 21:00",
            personnes: [
                {
                    id: '1',
                    name: 'Ahmed',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '2',
                    name: 'Alex Sharp',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '3',
                    name: 'Sarah Walker',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '4',
                    name: 'Mongi',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '5',
                    name: 'Sami',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '6',
                    name: 'Joe Doe',
                    profileImage: 'https://picsum.photos/200/200.jpg',
                }
            ],
            payement: "Espèce",
            note: "Pas à l’entrée SVP"
        },
        {
            id: "3",
            idRestaurant: "3",
            nameRestaurant: "Magic Kindle 03",
            imageRestaurant: "assets/img/icon-restaurant.png",
            backgroundImageRestaurant: "assets/img/f1eb1-process.png",
            dateReservation: "Lundi 12 Mars 2010",
            heureReservation: "19:00 – 21:00",
            personnes: [
                {
                    id: '1',
                    name: 'Ahmed',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '2',
                    name: 'Alex Sharp',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '3',
                    name: 'Sarah Walker',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '4',
                    name: 'Mongi',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '5',
                    name: 'Sami',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '6',
                    name: 'Joe Doe',
                    profileImage: 'https://picsum.photos/200/200.jpg',
                }
            ],
            payement: "Espèce",
            note: "Pas à l’entrée SVP"
        },
        {
            id: "4",
            idRestaurant: "4",
            nameRestaurant: "Magic Kindle 04",
            imageRestaurant: "assets/img/icon-restaurant.png",
            backgroundImageRestaurant: "assets/img/f1eb1-process.png",
            dateReservation: "Lundi 12 Mars 2010",
            heureReservation: "19:00 – 21:00",
            personnes: [
                {
                    id: '1',
                    name: 'Ahmed',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '2',
                    name: 'Alex Sharp',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '3',
                    name: 'Sarah Walker',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '4',
                    name: 'Mongi',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '5',
                    name: 'Sami',
                    profileImage: 'assets/img/avatar.png',
                },
                {
                    id: '6',
                    name: 'Joe Doe',
                    profileImage: 'https://picsum.photos/200/200.jpg',
                }
            ],
            payement: "Espèce",
            note: "Pas à l’entrée SVP"
        },
    ]);

    return (
        <div className="booking-page-process">
            <div className="booking-page-content">
                <div className="booking-page-content-feed container">
                    <div className="feed-main">
                        <div className="first-process">
                            <div className="eprimez-vous"> Réservation encours </div>
                            <div className="header">
                                <img src="assets/img/svg/booking-person.svg" className="booking-person" />
                                <span>Hey! Mongi, vous avez réservé <span style={{color: '#D40562'}}>
                                    {reservations.length}</span> rendez-vous réservés !</span>
                            </div>
                            <div className="details-restaurants">
                                <div className="list">
                                    {reservations.map((reservation) => (
                                        <BookingRestaurant reservation={reservation} setReservations={setReservations} />
                                    ))}
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>   
            </div>
        </div>
    )
}


export default ReservationEncours
