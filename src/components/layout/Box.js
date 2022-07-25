import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, useHistory } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { Avatar } from "@material-ui/core";
import AvatarUser from "../atoms/AvatarUser";

function Box(props) {
  const { showBox, handleClick } = props;
  const [displayBox, setDisplayBox] = useState(false);
  const [history, setHistory] = useState(useHistory());
  const { profileRestaurant, setProfileRestaurant } =
    useContext(RestaurantContext);
  const id = 1;
  const { logout, activeUser } = useContext(UserContext);
  useEffect(() => {
    setDisplayBox(!showBox);
    //console.log(showBox)
  }, [showBox]);
  if (displayBox) {
    return null;
  }

  const off = async (e) => {
    // e.preventDefault();

    await logout();
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setProfileRestaurant({ ...profileRestaurant, name: value });
  };

  return (
    <div className="box">
      {activeUser && (
        <div className="box-inner">
          <div className="box-top">
            {activeUser && activeUser.firstName && (
              <span className="identify-profile">
                Bonjour,<strong> {activeUser.firstName}</strong>
              </span>
            )}

            <button className="close-box" onClick={handleClick}>
              <AvatarUser activeUser={activeUser} link={false} />
            </button>
          </div>
          <div className="change-compte-pro">
            <i className="fal fa-repeat-alt" />
            <a href="">Passer au compte professionnel</a>
          </div>
          <div className="profile-list-setting">
            <div className="profile-list-one-items">
              <NavLink exact to={`/profile/${activeUser.userId}`}>
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-user" />
                  <a href="user-foodlist-profile.html">Mon profile</a>
                </div>
              </NavLink>
              <NavLink exact to="/">
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-utensils-alt" />
                  <a>Mon Journal</a>
                </div>
              </NavLink>
              <NavLink exact to="/besties">
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-star" />
                  <a>Mes Besties</a>
                </div>
              </NavLink>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-book-heart" />
                <a> Mes sauvegardes</a>
              </div>
              <NavLink exact to="/suivi-commande">
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-box-heart" />
                  <a> Mes commandes</a>
                </div>
              </NavLink>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-utensils" />
                <a> Mes menus</a>
              </div>
            </div>
            {/* <div className="profile-list-two-items">
       <div className="item" onClick={()=>props.setShowBox(false)}>
         <i className="fal fa-history" />
         <a>Historique des visites</a>
       </div>
       <div className="item" onClick={()=>props.setShowBox(false)}>
         <i className="fal fa-calendar-alt" />
         <a>Événement</a>
       </div>
       <div className="item" onClick={()=>props.setShowBox(false)}>
         <i className="fal fa-id-badge" />
         <a> Programme Ambassadeur </a>
       </div>
       <div className="item" onClick={()=>props.setShowBox(false)}>
         <i className="fal fa-stars" />
         <a> Programme Micro-Influencer </a>
       </div>
     </div> */}
            <div className="profile-list-three-items">
              <NavLink exact to={`/gestionResidus`}>
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-comment-alt-exclamation" />
                  <a>Unwastable!</a>
                </div>
              </NavLink>
              <NavLink exact to={`/gestionResidusUser`}>
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-comment-alt-exclamation" />
                  <a>Unwastable User!</a>
                </div>
              </NavLink>
              <NavLink exact to={`/mangerAvec`}>
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-cookie-bite" />
                  <a href="eat-with-stranger.html">EatMeet </a>
                </div>
              </NavLink>
            </div>
            <div className="profile-list-three-items">
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-users" />
                <a>Amis à proximité</a>
              </div>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-user-plus" />
                <a>Trouver un ami </a>
              </div>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-address-card" />
                <a>Référez un ami</a>
              </div>
              <NavLink
                exact
                to={`/messagerie`}
                //to ={`/messagerie/${activeUser.userId}`}
              >
                <div className="item" onClick={() => props.setShowBox(false)}>
                  <i className="fal fa-envelope" />
                  <a>Messages </a>
                </div>
              </NavLink>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-circle" />
                <a>stories </a>
              </div>
            </div>
            <div className="profile-list-three-items">
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-phone" />
                <a>Customer service</a>
              </div>
              <div className="item" onClick={() => props.setShowBox(false)}>
                <i className="fal fa-cog" />
                <a>Settings</a>
              </div>
              <NavLink exact to={`/`}>
                <div onClick={off} className="item">
                  <i className="fal fa-sign-out-alt" />
                  <a>Logout</a>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="box-bottom">
            <div className="header">
              <i className="fal fa-utensils-alt" />
              <span>Ajouter un Resto</span>
            </div>
            <div className="bottom-content">
              <div className="left-side">
                <i className="fal fa-image" />
              </div>
              <div className="right-side">
                <input
                  type="text"
                  placeholder="Nom du resto"
                  name="name"
                  value={profileRestaurant.name}
                  onChange={handleChange}
                />
                <NavLink exact to={`/createRestaurant`}>
                  <i
                    className="fal fa-long-arrow-right"
                    onClick={() => props.setShowBox(false)}
                  />
                </NavLink>
                <div className="line"> </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Box.propTypes = {};

export default Box;
