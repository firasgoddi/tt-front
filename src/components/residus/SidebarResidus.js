import React, { useContext, useEffect, useState } from "react";
import CardListItem from "./CardListItem";
import { RestaurantContext } from "../../context/RestaurantContext";

function SidebarResidus(props) {
  const { myCommande, setMyCommande, restaurantId, setUnwastableData } = props;

  function resetList() {
    setMyCommande([]);
  }
  const [retour, setRetour] = useState({});
  const { createUnwastableList } = useContext(RestaurantContext);

  function createUnwastable() {
    const data = myCommande.map((el) => ({
      articleId: el.id,
      quantity: parseInt(el.quantite),
      price: parseFloat(el.newPrice),
    }));

    console.log(data, "createUnwastableInput");
    myCommande && createUnwastableList(restaurantId, data, setUnwastableData);
  }
  // useEffect(() => {
  //   console.log(retour, "retourUnwastable");
  // }, [retour]);
  return (
    <>
      <div className="my-list">
        <span className="left-side">
          Ma liste (
          <span style={{ color: "#ff6900" }}>
            {myCommande && myCommande.length && myCommande.length}
          </span>
          )
        </span>
        <span className="right-side" onClick={resetList}>
          Supprimer tout
        </span>
      </div>
      <div className="content-list">
        {myCommande.map((article, index) => (
          <CardListItem
            index={index}
            article={article}
            myCommande={myCommande}
            setMyCommande={setMyCommande}
            previous={false}
          />
        ))}
        <button className="confirmation" onClick={createUnwastable}>
          Confirmer
        </button>
      </div>
    </>
  );
}

SidebarResidus.propTypes = {};

export default SidebarResidus;
