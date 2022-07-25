import React, { useState, useContext } from "react";
import { RestaurantContext } from "../../../context/RestaurantContext";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Modal from "../../util/UtilModal";
import ReactStars from "react-rating-stars-component";

function Alert(props) {
  return <MuiAlert elevation={7} variant="filled" {...props}  />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),

    },
  },
}));
function MenuCardPM(props) {
  const { restaurantId, article, articlesList } = props;
  const {
    getIndex,
    addArticleToPersonalizeMenu,
    deleteArticleFromPersonalizeMenu,
  } = useContext(RestaurantContext);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [showModalRating, setShowModalRating] = useState(false);

  var index = articlesList && getIndex(article._id, articlesList, "articleId");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function ajouterAuMenu() {
    addArticleToPersonalizeMenu(restaurantId, article._id);
    handleClick()
  }

  function supprimerDuMenu() {
    deleteArticleFromPersonalizeMenu(article._id);
  }


  const openModalRating = () => {
    setShowModalRating(true);
  };

  const firstExample = {
    size: 30,
    value: article.articleRate,
    edit: false,
  };

  return article ? (  
    
    <div className="card" style={{ width: "100%", height: 375 }}>
      
      <div className="cardTop">
        <img
          style={{ objectFit: "contain" }}
          src={`https://${article.image}`}
        ></img>
      </div>
      <div className="cardBottom">
        <div className="cardText">
          <span className="food-name">{article.name}</span>
          <div className="sub-title">
            <p>{article.ingredients.map((el) => `${el},  `)}</p>
          </div>
          <div className="price" style={{ marginTop: -10 }}>
            <span>{article.price} dt</span>
            <Rating name="read-only" value={article.rate} readOnly />
          </div>
          <div className="cardHoverText">
            <div className="menu-info-bottom">
              <div className="menu-info-bottom-content">
                <div className="time">
                  <i className="fal fa-clock" />
                  <span>{article.duration} min</span>
                </div>
                <div className="icons">
                  <i className="fal fa-paper-plane paper" />
                </div>
              </div>
              <div
                className="add-to-menu"
                onClick={() => ajouterAuMenu()}
                style={{  }}
              >
           <Snackbar open={open} autoHideDuration={6000}style={{width:"300%"}} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" >
          Article AjoutÃ©
        </Alert>
      </Snackbar>
 
                <button>
                  <i className="far fa-cart-plus" />
                  Ajouter au menu
                </button>
               
              </div>
              <div
                className="delete-to-menu"
                onClick={() => supprimerDuMenu()}
                style={{ }}
              >
              
                <button>
                  <i className="far fa-cart-plus" />
                  Supprimer du menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    
    <></>
  );
}


export default MenuCardPM;
