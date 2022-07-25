import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../context/UiContext";

function CardResidus(props) {
  const { article, setMyCommande, myCommande, selectedCategory } = props;
  const [action, setAction] = useState("ajouter");
  console.log(article, "unwastedArticle");
  const commande = {
    id: article._id,
    duration: article.duration,
    name: article.name,
    image: article.image,
    price: article.price,
    newPrice: article.price,
    quantite: 1,
  };

  function ajouterArticle() {
    setMyCommande((prevCommande) => {
      return [...prevCommande, { ...commande }];
    });
    setAction("remove");
  }

  function removeArticle() {
    setMyCommande((prevCommande) => {
      let items = [...prevCommande];

      const indexArticle = items.findIndex((el) => el.id === article._id);

      items.splice(indexArticle, 1);
      return items;
    });
    setAction("ajouter");
  }
  //TODO Correct the add to myCommande switch button Jouter remove problem d 'index
  useEffect(() => {
    setAction("ajouter");
    myCommande.forEach((el) => {
      if (el.id === article._id) {
        setAction("remove");
      }
    });
  }, [selectedCategory, myCommande]);

  let button;
  if (action === "remove") {
    button = (
      <div className="remove" onClick={() => removeArticle()}>
        <span>Supprimer</span>
        <i className="fa fa-minus" />
      </div>
    );
  } else if (action === "ajouter") {
    button = (
      <div className="add one" onClick={() => ajouterArticle()}>
        <span>Ajouter</span>
        <i className="fa fa-plus" />
      </div>
    );
  }

  return (
    <div className="card">
      <div className="cardTop">
        <img
          // className="circle-white"
          src={`https://${article.image}`}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.name}</span>
          <div className="sub-title">
            <p>{article.ingredients}</p>
            {/* <p>Mayonnaise, Jus de citron, Parmesan, Gousse d’aille, Poivre.</p> */}
          </div>
          <div className="price">
            <span>{article.price} dt</span>
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <div className="time">
                  <i className="fal fa-clock" />
                  <span>{article.duration} min</span>
                </div>
                <div className="add-remove">
                  <div className="food-done">
                    <img
                      className="circle-white"
                      src="assets/img/white-circle.png"
                    />
                    <img className="added" src="assets/img/svg/done.png" />
                  </div>

                  {button}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardResidus.propTypes = {};

export default CardResidus;
