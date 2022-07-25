import React, {useState, useContext,useEffect} from 'react';
import { UiContext } from '../../context/UiContext';
import { NavLink } from 'react-router-dom';
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles';
const styles = (theme) => ({
    styleClicked: {
        border: '1px solid #ff6900',
    }, 
    styleUnClicked: {
        border: '1px solid #ffffff',
    }
});
function ModePayement(props) {
    const { classes } = props;
    const { handleBack, setPaymentPannel, listChoixArticles, facture, setFacture, points } = useContext(UiContext);
    const [clicked, setClicked] = useState("");
    const [loading, setLoading] = useState(false);
    const { getPersonalizedMenuByUserIdRestaurantId } = useContext(RestaurantContext);

    const { activeUser,createCommande,commande,setCommande } = useContext(UserContext);
const {articles}=props

let history = useHistory();
    console.log(articles,"jdj")
   
    let { id } = useParams();
    console.log(id,"kikk")
   
    const annulerCommande = () => {
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, infosAdditionnelles: "encours"} })
        setPaymentPannel((prevPayementPannel) => { return {...prevPayementPannel, modePayement: "waiting"} })
    };
    console.log("Poir",articles && parseFloat(articles.reduce((a,article) =>  a = a + article.prix , 0 ) - points.argent).toFixed(2));
    const handleChange = (e) => {
        setFacture({ ...facture, winTak: !facture.winTak });
    };
    const total=articles && articles.reduce((a,article) =>  a = a + article.prix , 0 ) - points.argent.toFixed(2);
    
    const handleClickChange = (mode) => {

        setCommande({ ...commande, paymentMethod: mode })
        setClicked(mode);
        
        console.log(mode,"fjee")
    };
  
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
const article= articles && articles.map(el=>(el.articleId));
const quantity= articles && articles.map(el=>(el.quantity));
const articleOption=articles && articles.map((el)=>el.articleOptions);
let optionsId=[];
var opt;
for(var i=0; i<articles.length;i++){
   
 opt=articles[i].articleOptions;
console.log(opt,"opt")
let arr=[];
if(opt){
for(var j=0;j<opt.length;j++){
    arr.push(opt[j]._id)
}
 optionsId.push(arr)
}

}
console.log(optionsId,"arr")

console.log("optioneee,",quantity)

    const submitCommande = () => {
        const data = {
            articlesId: article, 
            ownerFirstname:commande.ownerFirstname,
            ownerLastName: commande.ownerLastName,
            ownerPhoneNumber: commande.ownerPhoneNumber,
            ownerEmail:commande.ownerEmail,
            userId:activeUser.userId,
            adresse1:commande.adresse1,
            adresse2:commande.adresse2,
            description:commande.description,
            commandeTakenMethod:"TAKE_AWAY",
            paymentMethod:commande.paymentMethod,
            total_price:commande.total_price,
            restaurantId:id,
           quantity:quantity,
           articleOptions:optionsId
          };
          console.log(data,"newCommande")
   
           createCommande(data) 
            history.push('/payer/'+id+'/result') 
       

      
       }
    return (
        <div className="orbit-slide">
       
                <button className="go-next"  onClick={submitCommande} >
                    Continuer
                </button>
            
            <div className="orbit-slide-three-header">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
                { articles && 
                <div className="total-to-pay">
                    <span className="total-to-pay-title">Total à payer</span>
                    <span className="total-to-pay-price">  {somme2}DT</span>
                </div>
                }
            </div>
            <div className="paiement-solde-wintak">
                <div className="solde-wintak-left-side">
                    <span>Votre solde TakTak</span>
                    <span>Jusqu’au {points.dateExpirer} </span>
                    <img className="triangle" src="../assets/img/svg/Polygone 2.png" />
                </div>
                <div className="solde-wintak-right-side">
                    <img src="../assets/img/svg/row_1.png" alt="" />
                    <div className="solde">
                        <span>{points.somme}</span>
                        <span>WinTak</span>
                    </div>
                    <div className="price">
                        <span>= {points.argent} DT</span>
                    </div>
                    <button className="button-sold-wintak">
                        <span>Utiliser mon solde WinTak</span>
                        <input className="checkbox" type="checkbox" id="checkbox-1" name="winTak" onChange={handleChange}/>
                        <label htmlFor="checkbox-1" />
                    </button>
                </div>
            </div>
            <div className="remains-to-pay-description">
                <span>Le reste est à payer en utilisant un moyen de paiement parmi la liste ci-dessous.</span>
            </div>
            <div className="remains-to-pay">
            {articles &&<div className="the-amount">
              
                    <span className="the-amount-title">Reste à payer</span>
                    <span className="the-amount-number">{facture.winTak ? somme2- points.argent 
                        : somme2 } DT</span>
                </div>
                 }
                <div className="means-of-payment">
                    <div className={clicked=== "edinar" ? {border: '1px solid #ff6900'} : {border: '1px solid #ffffff'}}>
                        <div className="method-of-payment"   onClick={() => handleClickChange("EDINAR")}>
                            <img src="../assets/img/e-dinar.png" />
                            <span>E-dinar</span>
                        </div>
                    </div>
                    <div style={clicked=== "virement" ? {border: '1px solid #ff6900'} : {border: '1px solid #ffffff'}}>
                        <div className="method-of-payment"   onClick={() => handleClickChange("VIREMENT_BANCAIRE")}>
                            <img src="../assets/img/virement-bank.png" />
                            <span>Virement bancaire</span>
                        </div>
                    </div>
                    <div style={clicked=== "mobiPoste" ? {border: '1px solid #ff6900', borderRadius: 5} : {border: '1px solid #ffffff'}}>
                        <div className="method-of-payment" onClick={() => handleClickChange("MOBI_POSTE")}>
                            <img src="../assets/img/Mobi-poste.png" />
                            <span>Mobi-Poste</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-three-bottom">
                <div className="return" onClick={() => {handleBack(); annulerCommande()}}>
                    <i className="fal fa-long-arrow-alt-left" />
                    <span>Retour</span>
                </div>
               
                    <div className="confirm">
                        <button onClick={submitCommande} >Confirmer</button>
                    </div>
               
            </div>
        </div>            
    )
}

ModePayement.propTypes = { }

export default withStyles(styles)(ModePayement) 

