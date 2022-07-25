import { set } from "date-fns";
import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../context/UiContext";

function CardResidusUser(props) {
  const { article, setMyCommande, myCommande, list,selectedCategory ,unwastable} = props;
  const [action, setAction] = useState("ajouter");
  console.log(article , "unwastedArticle");
  
   const { getIndex } = useContext(UiContext);
   const [articles, setArticles] = useState([]);
   const [quantity,setQuantity]=useState(1); 
   const [restaurant, setRestaurant] = useState([]);
    var index = getIndex(unwastable.restaurant,unwastable,"_id");
const listId=unwastable && unwastable[0].list.map((el)=>el._id)
console.log(unwastable,"sss")
console.log(unwastable && unwastable.restaurant && unwastable.restaurant[index]._id,"zzzeee")



console.log(restaurant,"eeez")
  const commande = {
    _id:article.article._id,
    name: article.article.name,
    image: article.article.image,
    ingredients: article.article.ingredients,
    price: article.price,
    restaurantId:unwastable[0].restaurantId,
    unwastableMenuIds:listId,
    quantity:1
  };
console.log(myCommande,"eeeee")

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
          src={`https://${article.article.image}`}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.article.name}</span>
          <div className="sub-title">
            <p>{article.article.ingredients}</p>
         
          </div>
          <div className="price">
            <span>{article.price} dt</span>
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <div className="time">
                  <i className="fal fa-clock" />{article && article.article && 
                  <span>{article.article.duration} min</span>}
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

CardResidusUser.propTypes = {};

export default CardResidusUser;
