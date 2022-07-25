import React from 'react';

function DetailCommandeItem (props) {
    const {article} = props;
 console.log(article," articles")
const articleOptionName=article.articleOptions.map((el)=>el.optionName)
const articleOptionPrice=article.articleOptions.map((el)=>el.optionPrice)


var sum = 0;
var somme=0;
const articleQuantity=article.quantity;
const articlePrice= article.articleC.price;



console.log("somme",articleQuantity,articlePrice,somme)
console.log("option",articleOptionPrice)
for(var i=0;i<articleOptionPrice.length;i++){
    if(articleOptionPrice){
    sum+=articleOptionPrice[i];
}
else 
sum+=0;
}
 somme = articleQuantity * articlePrice+sum;
console.log("sommeTotal",somme)
console.log("some",sum)
    return (
        <div className="details-commande-food">
            <div className="left-side"> 
                <img src={`https://${article.articleC.image}`} className="details-commande-img" />
                <div className="main">
                    <span className="food-name">{article.articleC.name} - {article.size}</span>
                    <span className="food-description">{article.articleC.ingredients }</span>
                    <span className="food-description"> {articleOptionName}</span>
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
                <div className="price">
                    <span className="price-title">Prix Total</span>
                    <span className="price-number"> {somme} dt</span>
                </div>
            </div>
        </div>            
    )
}

export default DetailCommandeItem 

