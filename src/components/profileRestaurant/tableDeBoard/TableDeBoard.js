import React, {useContext,useEffect} from 'react';
import { useState } from 'react';
import { useParams } from "react-router";
import { NavLink } from 'react-router-dom';
import { RestaurantContext } from '../../../context/RestaurantContext';
import RestaurantCommandeItem from './RestaurantCommandeItem';
function TableDeBoard(props) {
  const { restaurant } = props;
  let { id } = useParams();
  console.log(id,"jdeee")
  const { getCommandebyRestaurantId,myRestaurant } = useContext(RestaurantContext);
const [restaurantCommande,setRestaurantCommande]=useState([]);
 
useEffect(async () => {
    await getCommandebyRestaurantId(id,setRestaurantCommande);
  }, [props]);
console.log(restaurantCommande,"djdfjffd")
const sort =restaurantCommande &&  restaurantCommande.slice().sort(function(a, b){
  if(a.status < b.status) { return -1; }
  if(a.status > b.status) { return 1; }
  return 0;
})



  const { getReservationByRestaurantId } = useContext(RestaurantContext);

  const [reservationsList, setReservationsList] = useState(null);
  useEffect(async () => {
    await getReservationByRestaurantId(restaurant._id, setReservationsList);
  }, [props]);

  console.log("reservationsList:", reservationsList);


  return (
    <div className="tabs-panel is-active" id="panel5">
      
      <div className="dashboard">
     
      
        <div className="indicators">
          <div className="indicator money">
            <div className="indicator-icon">
              <i className="icon-money" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Revnue Total </span>
                <span className="indicator-value">5,673 dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator cart">
            <div className="indicator-icon">
              <i className="icon-cart" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Revnue Total </span>
                <span className="indicator-value">5,673 dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
          <div className="indicator trend">
            <div className="indicator-icon">
              <i className="icon-trend-up" />
            </div>
            <div className="indicator-info">
              <div className="indicator-texts">
                <span className="indicator-name"> Revnue Total </span>
                <span className="indicator-value">5,673 dt</span>
              </div>
              <span className="icon icon-dots-horizontal" />
            </div>
          </div>
        </div>
        <div className="my-stats-line">
          <div className="my-stats-line-title">
            <span> Visualisation Stats </span>
            <span>
              30 Jours <i className="icon-dot-arrow-bottom" />
            </span>
          </div>
          <div className="my-stats-line-indicators">
            <span className="stats-indicator">
              <span />
              <span>Indicateur 1</span>
            </span>
            <span className="stats-indicator">
              <span /> <span>Indicateur 1</span>
            </span>
          </div>
          <div className="my-stats-line-body">
            <img src="../../assets/img/chart-line.jpg" />
          </div>
        </div>
        <div className="my-stats">
          <div className="my-stats-title">
            <span> Visulisation Stats </span>
            <span>
              30 Jours
              <i className="fal fa-sort-down" aria-hidden="true" />
            </span>
          </div>
          <div className="my-stats-body">
            <div className="chart-container">
              <img src="../../assets/img/svg/chart.svg" />
              <span className="number-of-reservation">1456 Réservations</span>
            </div>
            <div className="chart-info">
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
              <span className="one-info">
                <span className="info-circle" />
                <span className="info-label">Indicateur 1</span>
                <span className="info-value">354 Réservations</span>
              </span>
            </div>
          </div>
        </div>
        <div className="my-booking">
          <div className="my-booking-title">
            <span> Réservations </span>
            <span>Les plus récents </span>
          </div>
          <div className="my-booking-highlight">
            <span className="icon-notifications" />
            <span>
              {" "}
              <strong>5</strong> nouvelles réservations
            </span>
            <div className="my-booking-persons">
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
            </div>
            <button>Examiner</button>
          </div>
          <div className="my-booking-body">
            {/*reservationsList && reservationsList.map((el) => (
              <Reservation reservation={el} restaurant={restaurant} />
            ))*/}
          </div>
        </div>

        <div className="my-booking">
          <div className="my-booking-title">
            <span> Commandes </span>
            <span>Les plus récents </span>
          </div>
          <div className="my-booking-highlight">
            <span className="icon-notifications" />
            <span>
              {" "} 
              <strong>{restaurantCommande && restaurantCommande.length} novelles commandes</strong> 
            </span>
            <div className="my-booking-persons">
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
              <img src="../../assets/img/avatar.png" />
            </div>
            <button>Examiner</button>
          </div>{}
          {  sort && sort.map((commande) => (
                        <RestaurantCommandeItem commande={commande} setRestaurantCommande={setRestaurantCommande} />
                    ))}
        </div>
        
        <div className="divider" />
      </div>
    </div>
  
  );
}

TableDeBoard.propTypes = {};

export default TableDeBoard;