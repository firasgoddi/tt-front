import React,{useContext} from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import PersonalizeMenu from "./PersonalizeMenu";

function PersonaliserArticle() {
  const { personalizeArticle, updateArticleOfPersonalizedMenu,articlesOfPmId } =
  useContext(RestaurantContext);
  

  return (

     
      <PersonalizeMenu   
        />

  );
}

export default PersonaliserArticle;
