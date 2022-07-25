import React, { useState, useContext, useEffect } from "react";
import { UiContext } from "../../context/UiContext";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = (theme) => ({
  styleClicked: {
    border: "1px solid #ff6900",
  },
  styleUnClicked: {
    border: "1px solid #ffffff",
  },
});
function ModePayement(props) {
  const { classes } = props;
  const { handleBack, setPaymentPannel, facture, setFacture, points } =
    useContext(UiContext);
  const [clicked, setClicked] = useState("");
  const [loading, setLoading] = useState(false);
  const { getPersonalizedMenuByUserIdRestaurantId } =
    useContext(RestaurantContext);

  const {
    activeUser,
    commandeUnwastable,
    createUnwastableCommande,
    setCommandeUnwastable,
    myCommande,
  } = useContext(UserContext);

  let history = useHistory();

  let { id } = useParams();
  const annulerCommande = () => {
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, infosAdditionnelles: "encours" };
    });
    setPaymentPannel((prevPayementPannel) => {
      return { ...prevPayementPannel, modePayement: "waiting" };
    });
  };

  const handleChange = (e) => {
    setFacture({ ...facture, winTak: !facture.winTak });
  };

  const handleClickChange = (mode) => {
    setCommandeUnwastable({ ...commandeUnwastable, paymentMethod: mode });
    setClicked(mode);

    console.log(mode, "fjee");
  };
  var sum = 0;
  const totalPrice = myCommande.map((el) => el.price);
  for (var i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i];
  }
  console.log(totalPrice, "kfkf");
  console.log(sum, "jdd");
  const articleId = myCommande && myCommande.map((el) => el._id);
  console.log(articleId, "risk202");
  const listId = myCommande && myCommande.map((el) => el.unwastableMenuIds);
  console.log(listId[0], "JEASZE");

  const quantity = myCommande && myCommande.map((el) => el.quantity);
  console.log(quantity, "caazazj");
  console.log(commandeUnwastable, "izkooo");
  const submitCommande = () => {
    const data = {
      articlesId: articleId,
      ownerFirstname: commandeUnwastable.ownerFirstname,
      ownerLastName: commandeUnwastable.ownerLastName,
      ownerPhoneNumber: commandeUnwastable.ownerPhoneNumber,
      ownerEmail: commandeUnwastable.ownerEmail,
      userId: activeUser.userId,
      adresse1: commandeUnwastable.adresse1,
      adresse2: commandeUnwastable.adresse2,
      description: commandeUnwastable.description,
      unwastableMenuIds: listId[0],
      paymentMethod: commandeUnwastable.paymentMethod,
      total_price: sum,
      restaurantId: id,
      quantity: quantity,
      commandeTakenMethod: "ON_THE_SPOT",
    };
    console.log(data, "newCommande");

    createUnwastableCommande(data);
    history.push("/payerResidus/" + id + "/result");
  };
  return (
    <div className="orbit-slide">
      <button className="go-next" onClick={submitCommande}>
        Continuer
      </button>

      <div className="orbit-slide-three-header">
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
          <span className="total-to-pay-price"> {sum}DT</span>
        </div>
      </div>
      <div className="paiement-solde-wintak">
        <div className="solde-wintak-left-side">
          <span>Votre solde TakTak</span>
          <span>Jusqu’au {points.dateExpirer} </span>
          <img className="triangle" src="../assets/img/svg/Polygone 2.png" />
        </div>
        <div className="solde-wintak-right-side">
          <img src="../assets/img/svg/row_1.png" alt="" />
          <div className="solde">
            <span>{points.somme}</span>
            <span>WinTak</span>
          </div>
          <div className="price">
            <span>= {points.argent} DT</span>
          </div>
          <button className="button-sold-wintak">
            <span>Utiliser mon solde WinTak</span>
            <input
              className="checkbox"
              type="checkbox"
              id="checkbox-1"
              name="winTak"
              onChange={handleChange}
            />
            <label htmlFor="checkbox-1" />
          </button>
        </div>
      </div>
      <div className="remains-to-pay-description">
        <span>
          Le reste est à payer en utilisant un moyen de paiement parmi la liste
          ci-dessous.
        </span>
      </div>
      <div className="remains-to-pay">
        <div className="the-amount">
          <span className="the-amount-title">Reste à payer</span>
          <span className="the-amount-number">
            {" "}
            {facture.winTak ? sum : sum - points.argent}DT
          </span>
        </div>

        <div className="means-of-payment">
          <div
            className={
              clicked === "edinar"
                ? { border: "1px solid #ff6900" }
                : { border: "1px solid #ffffff" }
            }
          >
            <div
              className="method-of-payment"
              onClick={() => handleClickChange("EDINAR")}
            >
              <img src="../assets/img/e-dinar.png" />
              <span>E-dinar</span>
            </div>
          </div>
          <div
            style={
              clicked === "virement"
                ? { border: "1px solid #ff6900" }
                : { border: "1px solid #ffffff" }
            }
          >
            <div
              className="method-of-payment"
              onClick={() => handleClickChange("VIREMENT_BANCAIRE")}
            >
              <img src="../assets/img/virement-bank.png" />
              <span>Virement bancaire</span>
            </div>
          </div>
          <div
            style={
              clicked === "mobiPoste"
                ? { border: "1px solid #ff6900", borderRadius: 5 }
                : { border: "1px solid #ffffff" }
            }
          >
            <div
              className="method-of-payment"
              onClick={() => handleClickChange("MOBI_POSTE")}
            >
              <img src="../assets/img/Mobi-poste.png" />
              <span>Mobi-Poste</span>
            </div>
          </div>
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

        <div className="confirm">
          <button onClick={submitCommande}>Confirmer</button>
        </div>
      </div>
    </div>
  );
}

ModePayement.propTypes = {};

export default withStyles(styles)(ModePayement);
