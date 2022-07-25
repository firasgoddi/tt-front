import React, { useContext, useEffect, useState } from "react";
import { UiContext } from "../../context/UiContext";
import { NavLink } from "react-router-dom";
import DetailCommandeItem from "./DetailCommandeItem";
import DetailCommandeUnwastable from "./DetailCommandeUnwastable";
import { UserContext } from "../../context/UserContext";
function DetailCommande(props) {
  const { getIndex } = useContext(UiContext);
  const { getCommande, myCommandes } = useContext(UserContext);
  const { activeUser } = useContext(UserContext);

  console.log(myCommandes, "djdj");
  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];
    console.log(url, "dddddddd");
    return url;
  };

  useEffect(() => {}, [myCommandes]);

  var index = getIndex(getUrlFromPath(), myCommandes && myCommandes, "_id");
  const dat = myCommandes[index].createdAt;
  console.log("date", dat);
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

  const totalPrice =
    myCommandes && myCommandes[index] && myCommandes[index].total_price;
  console.log(totalPrice, "jdeaa");
  return (
    <div className="suivi-commande">
      <div className="suivi-commande-content container">
        <div className="suivi-commande-content-second-page">
          <div className="second-page-header">
            <img
              className="man-wintak"
              src="../assets/img/svg/suivi-commande.png"
            />
            <span className="header-title">Détails commande</span>
            <NavLink exact to={`/bookingPageProcess`}>
              <div className="retour">
                <i className="fal fa-long-arrow-alt-left" />
                <span>Retour</span>
              </div>
            </NavLink>
          </div>
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
                  <img
                    src={`https://${myCommandes[index].restaurant.avatar}`}
                  />
                  <div className="restaurant-description">
                    <span className="restaurant-name">
                      {myCommandes[index].restaurant.name}{" "}
                    </span>

                    <div>
                      <i className="fal fa-map-marker-alt" />
                      {myCommandes[index].restaurant.location} ,{" "}
                      {myCommandes[index].restaurant.specialty}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main">
                <span>Date &amp; Heure de l’opération</span>
                <span>Sur place / Take away</span>
                <span>Modalité de payement</span>
              </div>

              {myCommandes && (
                <div className="right-side">
                  <span>{date} </span>
                  <span>{myCommandes[index].commandeTakenMethod}</span>
                  <span>{myCommandes[index].paymentMethod}</span>
                </div>
              )}
            </div>
            {myCommandes && myCommandes[index].unwastableArticleC ? (
              <div className="command-list">
                {myCommandes &&
                  myCommandes[index].unwastableArticleC.map((article) => (
                    <DetailCommandeUnwastable
                      article={article}
                      totalPrice={totalPrice}
                    />
                  ))}
              </div>
            ) : (
              <></>
            )}
            {myCommandes && myCommandes[index].articlesC ? (
              <div className="command-list">
                {myCommandes &&
                  myCommandes[index].articlesC.map((article) => (
                    <DetailCommandeItem article={article} />
                  ))}
              </div>
            ) : (
              <></>
            )}
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "normal",
                    fontSize: "3.0rem",
                    color: " #484848",
                  }}
                >
                  Prix Total
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "normal",
                    fontSize: "3.0rem",
                    color: " #ff6900",
                    marginLeft: "250px",
                    fontWeight: "300",
                  }}
                >
                  {totalPrice} DT{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCommande;
