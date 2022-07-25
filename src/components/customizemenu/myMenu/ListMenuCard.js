import React, { useContext, useState } from "react";
import { UiContext } from "../../../context/UiContext";
import ReactStars from "react-rating-stars-component";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../../context/RestaurantContext";
import Modal from "../../util/UtilModal";

function ListMenuCard(props) {
  const { articles, setArticles, restaurant, article } = props;
  const { getIndex } = useContext(UiContext);
  const [showModalRating, setShowModalRating] = useState(false);
  const {
    deleteArticleFromPersonalizeMenu,
    updateArticleOfPersonalizedMenu,
    personalizeArticle,
    setPersonalizeArticle,
  } = useContext(RestaurantContext);
console.log(article,"jeii")
  var index = getIndex(article._id, articles, "_id");

    function IncrementItem() {
    const data = {
      quantity: article.quantity + 1,
    };

    updateArticleOfPersonalizedMenu(article._id, data);
    setArticles((prevArticles) => {
      let items = [...prevArticles];
      let item = { ...items[index] };
      const updatedMenu = {
        ...prevArticles[index],
        quantity: item.quantity + 1,
      };
      items[index] = updatedMenu;

      return items;
    });
  }

  function DecreaseItem() {
    if (article.quantity > 1) {
      const data = {
        quantity: article.quantity - 1,
      };
      updateArticleOfPersonalizedMenu(article._id, data);
      setArticles((prevArticles) => {
        let items = [...prevArticles];
        let item = { ...items[index] };
        const updatedMenu = {
          ...prevArticles[index],
          quantity: item.quantity - 1,
        };
        items[index] = updatedMenu;

        return items;
      });
    }
  }


  function removeArticle() {
    deleteArticleFromPersonalizeMenu(article._id);

    setArticles((prevArticles) => {
      let items = [...prevArticles];

      const indexArticle = items.findIndex((el) => el.id === article.id);

      items.splice(indexArticle, 1);

      return items;
    });
  }


  function pmArticle() {
    setPersonalizeArticle({
      ...personalizeArticle,
      id: article._id,
      name: article.name,
      image: article.image,
      size: "S",
      quantity: article.quantity,
      price: article.price,
      rate: article.rate,
      duration: article.duration,
      ingredients: article.ingredients,
      newIngredients: [],
    });
  }

  const articleOptionPrice= article && article.articleOptions.map((el)=>el.optionPrice);

  

  var sum = 0;
  for( var i = 0; i <articleOptionPrice.length; i++ ){
      sum += articleOptionPrice[i] ; 
  }
  console.log("somme",sum)
  const openModalRating = () => {
    setShowModalRating(true);
  };

  const firstExample = {
    size: 30,
    value: article.rate,
    edit: false,
  };
console.log("artiiiicle:", article);


  return (
    <div className="seconde-panel3">
      <div className="details-menu">
        <div className="details-menu-top">
          <div className="details-menu-img">
            <img src={`https://${article.image}`} />
          </div>
          <div className="details-menu-left-side">
            <div className="menu-name">
              <span>{article.name} </span>
            </div>
            <div className="ingredients-menu">
              <span>{article.ingredients.map((el) => `${el}, `)}</span>
              <span>{article.articleOptions.map((el)=> `${el.optionName}, `) }</span>
            </div>
            <div className="evaluation-menu">
              <span className="evaluation-title">Evaluez cet article</span>
              <div onClick={openModalRating}>
                <ReactStars {...firstExample} />
              </div>
            </div>
            <div className="details-menu-personalize">
              <div className="time-menu">
                <i className="fal fa-clock" />
                <span>{article.duration} min</span>
              </div>
              <NavLink
                exact
                to={
                  `/profileRestaurant/` +
                  restaurant._id +
                  `/customizeArticle/` +
                  article._id
                }
              >
                <button className="button-personalize" onClick={pmArticle}>
                  Personnaliser
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="details-menu-bottom">
          <div className="quantity-title">
            <span>Quantité</span>
          </div>
          <div className="quantity-numbrer">
            <i className="far fa-minus-square" onClick={DecreaseItem} />
            <span>{article.quantity}</span>
            <i className="far fa-plus-square" onClick={() => IncrementItem()} />
          </div>
          <div className="total-price">
            <span className="price-title">Prix total</span>
            <span className="price-number">
              { sum ? article.price.toFixed(2) * article.quantity + sum
          
          : article.price.toFixed(2) * article.quantity  } dt
            </span>
          </div>
          <i className="fal fa-trash-alt" onClick={() => removeArticle()} />
        </div>
      </div>
      <Modal
        showModal={showModalRating}
        setShowModal={setShowModalRating}
        page="createRating"
        evaluatedId={article._id}
        ratingType="ARTICLE"
      />
    </div>
  );
}

ListMenuCard.propTypes = {};

export default ListMenuCard;
