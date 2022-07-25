import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ArticleQuantite from "./ArticleQuantite";
import IngredientsSection from "./IngredientsSection";
import AddIngredients from "./AddIngredients";
import { RestaurantContext } from "../../../context/RestaurantContext";

function PersonalizeMenu(props) {
  const {article}=props;
  const { personalizeArticle, updateArticleOfPersonalizedMenu,articlesOfPmId ,setPersonalizeArticle} =
    useContext(RestaurantContext);
console.log(articlesOfPmId,"articlesOfPmId")
  const getUrlFromPath = () => {
    const paths = window.location.href.split("/");
    let url = paths[4];

    return url;
  };

  const confirmUpdateMenu = () => {
    const array3 = personalizeArticle.articleOptions.map((el)=>el.id)
    console.log(array3,"jjfeee")
    const data = {
      quantity: personalizeArticle.quantity,
      rate: personalizeArticle.rate,
      size: personalizeArticle.size,
      ingredients: array3,
      ingredients: personalizeArticle.ingredients,
      newIngredients: personalizeArticle.newIngredients,
      articleOptionsId: array3
    };
    updateArticleOfPersonalizedMenu(personalizeArticle.id, data);
    // setPersonalizeArticle((prev) => {
    //   let items = { ...prev };
    
    // })
  };

  return (
    <div className="third-panel3">
      <div className="menu-to-confirmed">
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPath() + `/personalizedMenu`}
        >
          <div className="arrow-left-iconTh3">
            <i className="fal fa-long-arrow-alt-left" />
          </div>
        </NavLink>
        <span className="personalization-of-ingredients">
          Personnalisation des ingrédients
        </span>
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPath() + `/customizeMenu`}
        >
          <button className="confirm" onClick={confirmUpdateMenu}>
            Confirmer
          </button>
        </NavLink>
      </div>
      <div className="customize-order">
       
        <ArticleCard article={personalizeArticle} />
        
    
        <ArticleQuantite article={personalizeArticle}  />
        <IngredientsSection  article={articlesOfPmId} />
     
        <AddIngredients article={articlesOfPmId} 
         /> 
       
       
      </div>
      <div className="menu-to-confirmed-bottom">
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPath() + `/personalizedMenu`}
        >
          <div className="arrow-left-iconTh3">
            <i className="fal fa-long-arrow-alt-left" />
          </div>
        </NavLink>
        <NavLink
          exact
          to={`/profileRestaurant/` + getUrlFromPath() + `/customizeMenu`}
        >
          <button
            className="confirm"
            onClick={confirmUpdateMenu}
            style={{ marginLeft: "80%" }}
          >
            Confirmer
          </button>
        </NavLink>
      </div>
    </div>
  );
}

PersonalizeMenu.propTypes = {};

export default PersonalizeMenu;
