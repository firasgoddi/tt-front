import React, {useState} from "react";
import Modal from "../../util/UtilModal";
import ReactStars from "react-rating-stars-component";

function MenuItemCard(props) {
    const { item } = props;
    const [show, setShow] = useState(false)
    console.log(item,"jd")
    const priceOption=item.articleOptions.map((el)=>el.optionPrice)
    console.log(priceOption,"jeeed")
    var sum = 0;
for( var i = 0; i < priceOption.length; i++ ){
    sum += priceOption[i] ; 
}
console.log("somme",sum)
    const [showModalRating, setShowModalRating] = useState(false);
    
    const openModalRating = () => {
        setShowModalRating(true);
    };
    
    const firstExample = {
        size: 30,
        value: item.articleRate,
        edit: false,
    };


    return (
        <div className="menu-customization-confirmation">
            <div className="customize-order-confirmation-high-top">
                <div className="customize-order-high-top-left-side">
                    <div className="vertical-line" />
                    <div>
                        <span className="food-name">{item.name}</span>
                        <div className="evalutaion">
                            <span className="evalutaion-title">Evaluez cet article</span>
                            <div onClick={openModalRating}>
                                <ReactStars {...firstExample} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="customize-order-img">
                <img src={`https://${item.image}`} style={{height: 250}} />
                <div className="details-menu-bottom">
                    <div className="quantity-title">
                        <span>Quantité</span>
                        <div className="quantity-numbrer">
                            <span>{item.quantity}</span>
                        </div>
                    </div>
                    <div className="time">
                        <i className="fal fa-clock" />
                        <span>{item.duration} min</span>
                    </div>
                    <div className="total-price">
                        <span className="price-title">Prix total</span>
                        <span className="price-number">{ sum ? item.price.toFixed(2) * item.quantity + sum
          
          : item.price.toFixed(2) * item.quantity } dt</span>
                    </div>
                </div>
            </div>
            <div className="menu-customization-confirmation-bottom">
                <div className="confirmation-bottom-content">
                    <span className="title">Ingrédients</span>
                    <i className="fa fa-plus  f4-plus" onClick={() => setShow(true)} style={{ display: show===false ? "block" : "none" }}/>
                    <i className="fa fa-minus  f4-minus" onClick={() => setShow(false)} style={{ display: show===true ? "block" : "none" }}/>
                    <div className="menu-customization-confirmation-ingredients" style={{ display: show===true ? "block" : "none" }}>
                        <div className="list-of-ingredients">
                            {item.ingredients.map((el) => (
                                <div className="ingredients" key={el}>
                                    {el}<i className="fa fa-times"/>
                                </div>
                            ))}
                        </div>
                        <div className="menu-customization-confirmation-new-ingredients">
                            <div className="list-header">
                                <span className="title">( <span style={{color: '#FD6A00', fontWeight: 'bold'}}> {item && item.articleOptions &&item.articleOptions.length}  nouveaux ingrédiants ajoutés</span>)
                                  </span>
                            </div>
                            <div className="list-of-new-ingredients">
                                {item.articleOptions && item.articleOptions.map((el) => (
                                        <div> <span>{el.optionName}</span> <i className="fa fa-times" /></div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                showModal={showModalRating}
                setShowModal={setShowModalRating}
                page="createRating"
                evaluatedId={item._id}
                ratingType="ARTICLE"
            />
        </div>
    );
}

export default MenuItemCard;
