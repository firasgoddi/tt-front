import React, { useContext, useState } from "react";
import { UiContext } from "../../context/UiContext";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
function VotreCommandeItem(props) {
  const { article, setArticles, articles } = props;
  const { getIndex } = useContext(UiContext);
  console.log(article, "jdj");
  const { myCommande, setMyCommande } = useContext(UserContext);

  const [quantity, setQuantity] = useState(1);

  function removeArticle() {
    setMyCommande((prevCommande) => {
      let items = [...prevCommande];
      const indexArticle = items.findIndex((el) => el.id === article._id);
      items.splice(indexArticle, 1);
      return items;
    });
  }

  return (
    <div className="paiement-recap">
      <img src={`https://${article.image}`} className="paiement-recap-img" />
      <div className="paiement-recap-main">
        <span className="food-name">{article.name}</span>
        {<span className="food-description"> {article.ingredients} </span>}
      </div>
      <div className="paiement">
        <div className="Qte">
          <span className="Qte-title">Quantité</span>
          <i className="fal fa-minus-square moins" />
          <span className="Qte-number">{quantity}</span>
          <i className="fal fa-plus-square plus" />
        </div>
        <div className="price">
          <span className="total-price">Prix total</span>
          <span className="price-number">{article.price * quantity} dt</span>
        </div>
      </div>
      <div className="remove">
        <i className="fal fa-trash-alt" onClick={removeArticle} />
      </div>
    </div>
  );
}

VotreCommandeItem.propTypes = {};

export default VotreCommandeItem;
