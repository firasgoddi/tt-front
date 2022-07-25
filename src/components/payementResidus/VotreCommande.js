import React, { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/UiContext";
import VotreCommandeItem from "./VotreCommandeItem";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { Redirect, useHistory } from "react-router-dom";
function VotreCommande(props) {
  const { handleNext, handleBack, setPaymentPannel, listChoixArticles } =
    useContext(UiContext);
  const { getPersonalizedMenuByUserIdRestaurantId } =
    useContext(RestaurantContext);
  const { activeUser } = useContext(UserContext);
  const { getIndex } = useContext(UiContext);
  const { myCommande, setMyCommande } = useContext(UserContext);
  const history = useHistory();
  let { id } = useParams();
  const { articles, setArticles } = props;

  console.log(articles, "jje");
  useEffect(() => {
    if (myCommande && myCommande.length === 0)
      history.push(`/gestionResidusUser`);
  }, [myCommande]);

  const confirmCommande = () => {
    if (myCommande) {
      setPaymentPannel((prevPayementPannel) => {
        return { ...prevPayementPannel, votreCommande: "confirmer" };
      });
      setPaymentPannel((prevPayementPannel) => {
        return { ...prevPayementPannel, infosAdditionnelles: "encours" };
      });
    }
  };

  const totalPrice = myCommande.map((el) => el.price);
  console.log(totalPrice, "kfkf");
  var sum = 0;
  for (var i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i];
  }
  console.log(sum, "jjeeee");
  return (
    <div className="orbit-slide">
      <button
        className="go-next"
        onClick={() => {
          handleNext();
          confirmCommande();
        }}
      >
        Continuer
      </button>

      {myCommande && (
        <div className="total-to-pay">
          <span className="total-to-pay-title">Total à payer</span>
          <span className="total-to-pay-price">
            {sum.toFixed(2)}
            DT{" "}
          </span>
        </div>
      )}

      {myCommande &&
        myCommande.map((el) => (
          <VotreCommandeItem
            article={el}
            articles={articles}
            key={el.id}
            setArticles={setArticles}
          />
        ))}

      <div className="slide-three-bottom">
        <div className="return" onClick={handleBack}>
          {" "}
        </div>

        <div
          className="go-next"
          onClick={() => {
            handleNext();
            confirmCommande();
          }}
        >
          <button>Continuer</button>
        </div>
      </div>
    </div>
  );
}

VotreCommande.propTypes = {};

export default VotreCommande;
