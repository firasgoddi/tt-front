import React from "react";
import { NavLink } from "react-router-dom";

function CommandeItem(props) {
  const { commande } = props;
  const dat = commande.createdAt;

  let date = new Intl.DateTimeFormat(
    "fr-GB",
    { dateStyle: "full", timeStyle: "short" },
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  ).format(dat);

  return (
    <div className="details-commande">
      <div className="details-commande-header">
        <div className="left-side">
          <div className="ref-commande">
            <span>
              {" "}
              <span style={{ color: "#ff6900" }}> Ref. commande:</span> {}
            </span>
          </div>
          <div className="restaurant-location">
            <img src={`https://${commande.restaurant.avatar}`} />
            <div className="restaurant-description">
              <span className="restaurant-name">
                {" "}
                {commande.restaurant.name}
              </span>
              <div>
                <i className="fal fa-map-marker-alt" />
                <span className="restaurant-address">
                  {commande.restaurant.location} ,{" "}
                  {commande.restaurant.specialty}
                </span>
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
        {commande && (
          <div className="right-side">
            <span>{date} </span>
            <span>{commande.commandeTakenMethod}</span>
            <span>{commande.paymentMethod}</span>
          </div>
        )}
      </div>
      {commande && (
        <div className="steps-commande">
          <div
            className={
              commande.status === "BEING_CONFIRMED"
                ? "step-description-active"
                : "step-description"
            }
          >
            <span className="step-number">01</span>
            <span className="step-title">EN cours de confirmation</span>
          </div>
          <div
            className={
              commande.status === "IN_PREPARATION"
                ? "step-description-active"
                : "step-description"
            }
          >
            <span className="step-number">02</span>
            <span className="step-title">En cours de préparation</span>
          </div>
          <div
            className={
              commande.status === "IN_DELIVERING"
                ? "step-description-active"
                : "step-description"
            }
          >
            <span className="step-number">03</span>
            <span className="step-title">En cours de livraison</span>
          </div>
          <div
            className={
              commande.status === "DELIVERED"
                ? "step-description-active"
                : "step-description"
            }
          >
            <span className="step-number">04</span>
            <span className="step-title">Livrée !</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommandeItem;
