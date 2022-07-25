import React, { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/UiContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";

function InfosAdditionnelles(props) {
  const {
    handleNext,
    handleBack,
    setPaymentPannel,
    listChoixArticles,
    facture,
    setFacture,
  } = useContext(UiContext);
  const { getPersonalizedMenuByUserIdRestaurantId } =
    useContext(RestaurantContext);
  const {
    activeUser,
    createCommande,
    commandeUnwastable,
    setCommandeUnwastable,
    myCommande,
  } = useContext(UserContext);
  const { articles } = props;

  console.log("firas", articles);
  function handleNext2() {
    if (handleNext) {
      if (
        commandeUnwastable.ownerFirstname === "" &&
        commandeUnwastable.ownerLastName === "" &&
        commandeUnwastable.ownerEmail === "" &&
        commandeUnwastable.ownerPhoneNumber === "" &&
        commandeUnwastable.adresse1 === ""
      ) {
        alert("champs vides");
      }
    }
  }
  const confirmCommande = () => {
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, infosAdditionnelles: "confirmer" };
    });
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, modePayement: "encours" };
    });
  };

  const annulerCommande = () => {
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, votreCommande: "encours" };
    });
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, infosAdditionnelles: "waiting" };
    });
  };
  var sum = 0;
  const totalPrice = myCommande.map((el) => el.price);
  for (var i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i];
  }
  console.log(totalPrice, "kfkf");
  console.log(sum, "jdd");

  return (
    <div className="orbit-slide ">
      <button
        className="go-next"
        onClick={() => {
          handleNext();
          handleNext2();
          confirmCommande();
        }}
      >
        Continuer
      </button>
      <div className="orbit-slide-two-header">
        <div
          className="return"
          onClick={() => {
            handleBack();
            annulerCommande();
          }}
        >
          <i className="fal fa-long-arrow-alt-left" />
          <span>Retour</span>
        </div>

        <div className="total-to-pay">
          <span className="total-to-pay-title">Total à payer</span>
          <span className="total-to-pay-price"> {sum.toFixed(2)} DT</span>
        </div>
      </div>

      <div className="invoice-details">
        <div className="invoice-details-header">
          <span className="title">Détails facture</span>
          <span className="description">Tout les champs sont obligatoires</span>
        </div>
        <div className="renseignements">
          <input
            type="text"
            placeholder="Prénom"
            value={commandeUnwastable.ownerFirstname}
            name="ownerFirstname"
            onChange={props.handleChange}
          />

          <input
            type="text"
            placeholder="Nom"
            value={commandeUnwastable.ownerLastName}
            name="ownerLastName"
            onChange={props.handleChange}
          />
        </div>

        <div className="renseignements">
          <input
            type="email"
            placeholder="E-mail"
            value={commandeUnwastable.ownerEmail}
            name="ownerEmail"
            onChange={props.handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
          />
          <input
            type="text"
            placeholder="N° Mobile"
            value={commandeUnwastable.ownerPhoneNumber}
            name="ownerPhoneNumber"
            onChange={props.handleChange}
          />
        </div>
        <div className="renseignements">
          <input
            type="text"
            placeholder="Adresse 1"
            value={commandeUnwastable.adresse1}
            name="adresse1"
            onChange={props.handleChange}
          />
          <input
            type="text"
            placeholder="Adresse 2"
            value={commandeUnwastable.adresse2}
            name="adresse2"
            onChange={props.handleChange}
          />
        </div>
        <div className="note">
          <span>Une note spéciale à communiquer?</span>
          <textarea
            placeholder=" Message"
            value={commandeUnwastable.description}
            name="description"
            onChange={props.handleChange}
          />
        </div>
      </div>
      <div className="slide-three-bottom">
        <div
          className="return"
          onClick={() => {
            handleBack();
            annulerCommande();
          }}
        >
          <i className="fal fa-long-arrow-alt-left" />
          <span>Retour</span>
        </div>
        <div
          className="go-next"
          onClick={() => {
            handleNext();
            handleNext2();
            confirmCommande();
          }}
        >
          <button>Continuer</button>
        </div>
      </div>
    </div>
  );
}

InfosAdditionnelles.propTypes = {};

export default InfosAdditionnelles;
