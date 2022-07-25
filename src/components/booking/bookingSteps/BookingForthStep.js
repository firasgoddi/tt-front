import React, {useState, useContext, useEffect} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    styleClicked: {
        border: '2px solid #ff6900',
    }, 
    styleUnClicked: {
        border: '1px solid #ffffff',
    }
});

function BookingForthStep(props) {
    const { classes, restaurant } = props;
    const { myReservation, setMyReservation, getPromosList } = useContext(RestaurantContext);
    const [clicked, setClicked] = useState("");

    const [promos, setPromos] = useState(null);
    useEffect(async () => {
        await getPromosList(restaurant._id, setPromos);
    }, [props]);

    const handleClickChange = (name, valeur) => {
        setMyReservation({ ...myReservation, promotionId: valeur })
        setClicked(name);
    };

    return (
        <div className="orbit-slide">
            <div className="slide-title">
                Oyeah, On a des promos pour vous !
            </div>
            <div className="promotions">
                {promos && promos.map((promo) => (
                    <div key={promo._id} className={clicked=== promo.name ? classes.styleClicked : classes.styleUnClicked} >
                        <div className="promo" onClick={() => handleClickChange(promo.name, promo.percentage)} >
                            <img src={"../"+promo.content} alt="promo tak tak" />
                        </div>
                    </div>
                ))}

                <div className={clicked=== "none" ? classes.styleClicked : classes.styleUnClicked}>
                    <div className="promo no-thanks"  onClick={() => handleClickChange("none", 0)}>
                        <img src="../../assets/img/svg/happy.svg" style={{marginTop: 60}} />
                        <span className="thanks">Merci !</span>
                        <span className="thanks-msg" style={{marginBottom: 51}}>Je ne suis pas intéressé.</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(BookingForthStep)
