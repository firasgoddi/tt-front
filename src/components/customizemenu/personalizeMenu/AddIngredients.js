import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import { UiContext } from "../../../context/UiContext";

function AddIngredients(props) {
  const { article, classes } = props;
  
  const { menuPersonaliser, setMenuPersonaliser,getIndex } = useContext(UiContext);
  const { personalizeArticle,setPersonalizeArticle,updateArticleOfPersonalizedMenu,articlesOfPmId } = useContext(RestaurantContext);
  const [input, setInput] = useState("");
  const [selectedOption,setSelectedOption]=useState()
  const [show, setShow] = useState({
    cereales: false,
    legumes: false,
    fruits: false,
    poissons: false,
    epices: false,
    divers: false,
  });
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
console.log(option2 ,"jeeef")


var index = getIndex(getUrlFromPath(), article, '_id');
  const updateState = (value) => {
    let newItem = {
      id: menuPersonaliser.articleOptions.length,
      name: menuPersonaliser.articleOptions.name,
      prix: menuPersonaliser.articleOptions.price
    };

    setMenuPersonaliser((prevMenuPersonaliser) => {
      let items = { ...prevMenuPersonaliser };
      let listIngredients = items.articleOptions;
      const updatedIngredients = [...listIngredients, newItem];
      items = {
        ...prevMenuPersonaliser,
        nouveauIngredients: updatedIngredients,
      };
      return items;
    });
  };
  const handleClickChange = (value) => {
    setSelectedOption(value);
  
    //getCategoryById(value, setCategoryArticles);
    setPersonalizeArticle((prevPersonalizeArticle) => {
      let items = { ...prevPersonalizeArticle };
      const articleOptions={
        id:value._id,
        optionName:value.optionName,
        optionAvatar:value.optionAvatar,
        optionPrice:value.optionPrice
        
      }
      let listIngredients = [...items.articleOptions];
   
      
      const updatedIngredients = [...listIngredients, articleOptions];
      items = {
        ...prevPersonalizeArticle,
        articleOptions: updatedIngredients,
      };  
      console.log(items,"firas")
      return items;
     
    });
    setInput("");
  };
console.log("function",personalizeArticle)
  const handleChangeNewIngredients = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    const data ={
      
    }
    if (event.key === "Enter") {
      const value = event.target.value;
   setPersonalizeArticle((prevPersonalizeArticle) => {
      let items = { ...prevPersonalizeArticle };
      const articleOptions={
        id:value._id,
        optionName:value.optionName,
        optionAvatar:value.optionAvatar,
        optionPrice:value.optionPrice
        
      }
      let listIngredients = [...items.articleOptions];
   
      
      const updatedIngredients = [...listIngredients, articleOptions];
      items = {
        ...prevPersonalizeArticle,
        articleOptions: updatedIngredients,
      };  
      console.log(items,"firas")
      return items;
     
    });

      setInput("");
    }
  };

  return (
  
    <div className="customize-order-add-Ingredients">
      <div className="first-title">
        <span>Ajouter des ingrédients</span>
      </div>
      <input
        type="text"
        placeholder="Saisir tag et taper ENTREE pour confirmer"
        onChange={handleChangeNewIngredients}
        value={input}
        onKeyDown={handleKeyDown}
      />
  
      <div className="seconde-title">
        <span>Ou-bien choisir des listes suivantes</span>
      </div>
     
      <div className="list-of-ingredients-to-choose">
        <div className="confirmation-bottom-content">
          <i className="fal fa-ball-pile" />

          <span className="title">Divers</span>
          
          <span className="numbers-of-ingr">Il existe {option2 && option2[index].length} ingrédients</span>
        
          <i
            className="fa fa-plus  show-plus"
            style={{
              display: show.divers === false ? "block" : "none",
              marginTop: -50,
            }}
            onClick={() => setShow({ ...show, divers: true })}
          />
          <i
            className="fa fa-minus  close-ing"
            style={{
              display: show.divers === true ? "block" : "none",
              marginTop: -50,
            }}
            onClick={() => setShow({ ...show, divers: false })}
          />
          <span className="numbers-in-the-list" style={{ marginTop: -50 }}>
            ( <span style={{ color: "#FF6900" }}> 00</span> ) dans la liste
          </span>
         
          <div
            className="menu-customization-confirmation-ingredients"
            style={{ display: show.divers === true ? "block" : "none" }}
          >
           
            <div className="list-of-ingredients" >
            { option2 && option2[index].map((item)=>(
              <div className="card-ingredients"key={item} id={item._id}
              onClick={(e) => handleClickChange(item)}
              style={
                selectedOption === item._id
                  ? {
                      border: "1px solid #ff6900",
                      borderRadius: 5,
                      width: "93% !important",
                    }
                  : { border: "1px solid #b9b5b5" }
              }s>
                
                <div className="card-ingredients-header">
                  <img
                    className="avatar"
                    src={`https://${item.optionAvatar}`}
                    
                  />
                </div>
                <div className="card-ingredients-body">
                  <span className="username">{item.optionName}</span>
                </div>
                <div className="card-ingredients-footer">
                  <div className="follow-button">
                    <span>{item.optionPrice} </span>
                  </div>
                </div>
              </div>
                ))}
            </div>
          
          </div>
        
        </div>
        
      </div>
      
    </div>
  );
          
}

export default AddIngredients;
