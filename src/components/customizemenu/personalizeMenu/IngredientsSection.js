import React, { useContext, useEffect, useState } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UiContext } from "../../../context/UiContext";

function IngredientsSection(props) {
  const { classes,article } = props;
  const { personalizeArticle, setPersonalizeArticle} =
    useContext(RestaurantContext);

    const { getIndex } = useContext(UiContext);
    const getUrlFromPath = () => {
      const paths = window.location.href.split("/");
      let url = paths[6];
      console.log(url,"dddddddd")
      return url;
    
    };
  console.log(article,"jf")
  const option =article && article.map((el)=>el.article)
  console.log(option,"jef")
  const option2 =option && option.map((el)=>el.articleOptions)
  console.log(option2 && option2[0],"jeeef")
  useEffect(() => {

  }, [personalizeArticle]);

  var index = getIndex(getUrlFromPath(), article, '_id');
  const removeIngredient = (item) => {
    setPersonalizeArticle((prevPersonalizeArticle) => {
      let items = {...prevPersonalizeArticle};
      let ingredientsList = [...items.articleOptions];
      const index = ingredientsList.findIndex((el) => el === item);
      ingredientsList.splice(index, 1);
      const updatedArticle = {...prevPersonalizeArticle , articleOptions: ingredientsList };
      return updatedArticle;
    });
  };

  const removeNewIngredient = (item) => {
    setPersonalizeArticle((prevPersonalizeArticle) => {
      let items = {...prevPersonalizeArticle};
      let ingredientsList = [...items.articleOptions];

      const index = ingredientsList.findIndex((el) => el === item);

      ingredientsList.splice(index, 1);

      const updatedArticle = {...prevPersonalizeArticle , articleOptions: ingredientsList };
      return updatedArticle;
    });

  };

  return (
    <div className="customize-order-Ingredients">
      <div className="customize-order-Ingredients-header">
        <span className="title">Ingrédients</span>
        <div className="time">
          <i className="fal fa-clock" />{article &&
          <span>{article.duration} min</span>}
        </div>
      </div>
      <div className="list-of-ingredients">
        {personalizeArticle.ingredients.map((item) => (
          <div className="ingredients" key={item}>
            {item}
            <i className="fa fa-times" onClick={() => removeIngredient(item)} />
          </div>
        ))}
      </div>
      <div className="new-ingredients-added">
        <div className="new-ingredients-added-header">
          <span className="title">
            (
            {personalizeArticle.newIngredients ? (
              <span style={{ color: "#FD6A00", fontWeight: "bold" }}>
                {personalizeArticle.articleOptions.length}
              </span>
            ):(
              <span style={{ color: "#FD6A00", fontWeight: "bold" }}>
                0
              </span>
            )}
            ) nouveaux ingrédients ajoutés
          </span>
          <div className="question-icon">
            <i className="fa fa-question" />
          </div>
        </div> 
        <div className="list-of-ingredients">
          {personalizeArticle.articleOptions && personalizeArticle.articleOptions.map((item) => (
            <div id="dashed" key={item}>
              {item.optionName}
              <span>+{item.optionPrice} dt</span>
              <i
                className="fa fa-times"
                onClick={() => removeNewIngredient(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

IngredientsSection.propTypes = {};

export default IngredientsSection;
