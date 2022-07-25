import React from "react";

function DetailCommandeUnwastable(props) {
  const { article, totalPrice } = props;
  console.log(totalPrice, " articles");

  return (
    <div className="details-commande-food">
      <div className="left-side">
        <img
          src={`https://${article.articleC.image}`}
          className="details-commande-img"
        />
        <div className="main">
          <span className="food-name">{article.articleC.name}</span>
          <span className="food-description">
            {article.articleC.ingredients}
          </span>

          <div className="time">
            <i className="fal fa-clock" />
            <span>{article.articleC.duration} min</span>
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="quantity">
          <span className="Qnt-title">Quantité</span>
          <span className="Qnt-number">{article.quantity}</span>
        </div>
      </div>
    </div>
  );
}

export default DetailCommandeUnwastable;
