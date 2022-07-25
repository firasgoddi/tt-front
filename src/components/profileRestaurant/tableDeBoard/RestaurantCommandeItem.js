
import React, {useContext,useEffect,useState} from 'react';
import { NavLink,useHistory } from 'react-router-dom';

import DetailCommande from './DetailCommande'
import { RestaurantContext } from '../../../context/RestaurantContext';
import { useParams } from "react-router";
function RestaurantCommandeItem(props) {
    const {commande,setRestaurantCommande} = props;
    const { updateCommande } = useContext(RestaurantContext);
    console.log(commande,"kkee")
    const history = useHistory();
    let id=useParams()
    console.log("deeej",id.id)
    const [clicked, setClicked] = useState("");
     
    console.log(commande.createdAt,"dateOfj")
const dat =commande.createdAt
    let date = new Intl.DateTimeFormat('fr-GB', { dateStyle: 'full', timeStyle: 'short' }, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(dat)
      
      const handleClickChange = (status) => {
          const data={
              status:status
          }
        setRestaurantCommande({ ...commande, status: status })
        setClicked(status);
        console.log(commande._id,"ddzz")
        updateCommande(commande._id,data)
        history.push('/profileRestaurant/'+id.id)
    };
    return(
<div className="details-commande">

      <div className="details-commande-header">
          <div className="left-side">
              <div className="ref-commande">
                  <span> <span style={{color: '#ff6900'}}> Ref. commande:</span> {}</span>
              </div>
              <div className="restaurant-location">
                  <img  />
                  <div className="restaurant-description">
                      <span className="restaurant-name">  </span>
                      <div>
                          <i className="fal fa-map-marker-alt" />
                          <span className="restaurant-address"></span>
                        
                      </div>
                  </div>
              </div>
              <NavLink exact to={`/detail-commande/${commande._id}`}>
                  <button className="button-details-commande">Détail commande</button>
              </NavLink>
          </div>
          <div className="main">
              <span>Date &amp; Heure de l’opération</span>
              <span>Sur place / Take away</span>
              <span>Modalité de payement</span>
                     
              </div>
              <div className="right-side">
                    <span>{date} </span>
                    <span>{commande.commandeTakenMethod}</span>
                    <span>{commande.paymentMethod}</span>
             
                </div>
      </div>
      
      <div className="steps-commande">
          <div onClick={() => handleClickChange("BEING_CONFIRMED")} className={ commande.status === "BEING_CONFIRMED" ? "step-description-active" : "step-description" }>
              <span className="step-number">01</span>
              <span className="step-title">EN cours de confirmation</span>
          </div>
          <div  onClick={() => handleClickChange("IN_PREPARATION")} className={ commande.status === "IN_PREPARATION" ? "step-description-active" : "step-description" }>
              <span className="step-number">02</span>
              <span className="step-title">En cours de préparation</span>
          </div>
          <div onClick={() => handleClickChange("IN_DELIVERING")} className={commande.status === "IN_DELIVERING"? "step-description-active" : "step-description" }>
              <span className="step-number">03</span>
              <span className="step-title">En cours de livraison</span>
          </div>
          <div onClick={() => handleClickChange("DELIVERED")} className={commande.status === "DELIVERED" ? "step-description-active" : "step-description" }>
              <span className="step-number">04</span>
              <span className="step-title">Livrée !</span>
          </div>
      </div>
      
  </div>
    )}
  
export default RestaurantCommandeItem;