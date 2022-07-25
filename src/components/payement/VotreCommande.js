import React, {useContext,useEffect, useState } from 'react';
import { UiContext } from '../../context/UiContext';
import VotreCommandeItem from './VotreCommandeItem';
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { Redirect, useHistory } from "react-router-dom";
function VotreCommande(props) {
    const { handleNext, handleBack, setPaymentPannel, listChoixArticles } = useContext(UiContext);
    const { getPersonalizedMenuByUserIdRestaurantId } = useContext(RestaurantContext);
    const { activeUser } = useContext(UserContext);
    const { getIndex} = useContext(UiContext);
    const { createCommande,commande,setCommande,myCommande,setMyCommande } = useContext(UserContext);
    const history = useHistory();
    let { id } = useParams();
    const {articles,setArticles}=props;
    
      useEffect(() => {
          if( articles && articles.length===0)
         history.push(`/profileRestaurant/${id}`)
      }, [articles])
    
      console.log(articles && articles.map(el=>(el.articleId)),"firas")
   console.log(commande,"kjjj")
    const confirmCommande = () => {
        if(articles){
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, votreCommande: "confirmer"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "encours"} })
        setCommande({...commande,total_price:somme2});
    }
    };
    
      
    console.log(articles ,"articles")
    const articleOption=articles && articles.articleOptions && articles.articleOptions.map((el)=>el.articleOptions);
    console.log("option,",articleOption)
    
    const articleOptionPrice = articleOption &&  articleOption.map((el)=>el.optionPrice)
  
    console.log("price44,",articleOptionPrice)
    
       var sum = 0;
       var somme2=0
     if(articles){
        for( var i = 0; i < articles.length; i++ ){
            somme2+=(articles[i].price * articles[i].quantity)
                if(articles[i].articleOptions){
                 for(var j=0;j<articles[i].articleOptions.length;j++)
                 {
          
                    somme2 += articles[i].articleOptions[j].optionPrice ;
        
                }
                   
                    
                    console.log(somme2,"s1111im")
                    }
else{
                    somme2+=articles[i].price * articles[i].quantity
    }
     console.log(somme2,"somme2")
}}
console.log("somme",sum)
    return (
        <div className="orbit-slide">
            <button className="go-next" onClick={() => {handleNext(); confirmCommande()}} >
                Continuer
            </button>
            
             {  articles &&
            <div className="total-to-pay">
                <span className="total-to-pay-title">Total à payer</span>
                    <span className="total-to-pay-price">     

                     {somme2}
                  DT </span>
            </div>
            }
            
            { articles && articles.map((el) => (
                <VotreCommandeItem article={el} articles ={articles} key={el.id} setArticles={setArticles}/>
            )) }
        
            <div className="slide-three-bottom">
          
                <div className="return" onClick={handleBack}> </div>
                
                <div className="go-next" onClick={() => {handleNext(); confirmCommande()}}>
                    <button>Continuer</button>
                </div>

              
            </div>
               
        </div> 
                      
    )
}

VotreCommande.propTypes = { }

export default VotreCommande

