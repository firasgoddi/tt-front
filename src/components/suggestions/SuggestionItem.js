import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FollowButton from "../post/FollowButton";
import { Avatar, Collapse } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import a from '../profile/avatar1.png'
import "./suggestion.css";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    width: "20%",
    marginRight: 10,
    marginLeft: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title: {
    fontSize: 14,
  },
  pos: {},
});

function SuggestionItem(props) {
  const classes = useStyles();
  const { user } = props;
  const { activeUser, Followuser, users, following, unfollowUser } =
    useContext(UserContext);
  


  
  const [isfollowed, setIsfollowed] = useState(false);

  useEffect(() => {
    if (following) {
      let tabIds = following.map((el) => el._id);
      if (tabIds.includes(user._id)) {
        setIsfollowed(true);
      } else setIsfollowed(false);
    }
  }, [following]);
  function addUserFollower() {
    Followuser(user._id);
   
  }
  function unFollowuser() {
    unfollowUser(user._id);
   
  }



  return (
    <div className="profile-follow-card" style={{marginRight : "7px"}}>
      <div className="profile-follow-card-header">
      <NavLink exact to={`/profile/${user._id}`}>
       {user.avatar ? <img
          className="avatar"
          style={{ borderRadius: "50%", cursor : "pointer" }}
          src={`https://${user.avatar}`}
        /> : <img
        className="avatar"
        style={{ borderRadius: "50%" , cursor : "pointer" }}
        src={a}
      /> }
      </NavLink>
      </div>
      <div className="profile-follow-card-body">
        <div className="profile-follow-card-body-header">
          <div className="profile">
            <span className="profile-name">
              {user.firstName.length > 18
                ? user.firstName.substring(0, 18 - 3) + "..."
                : user.firstName}
            </span>
            <span className="profile-location">
              <i className="icon-marker" />
              {user.city}
            </span>
          </div>
        </div>
        <div className="profile-follow-card-body-invisible">
          {!isfollowed ? (
            <button onClick={() => {
              addUserFollower();
            }}>
              <i className="fal fa-user-plus" />
              Suivre
            </button>
          ) : (
            <button  onClick={() => {
              unFollowuser(user._id);
            }}>
               <i className="icon-checked" />
               Suivi
            </button>
          )}
        </div>
      </div>
    </div>
    //     <Card
    //     className="profile-follow-card"
    //       style={
    //         hoverOverCard
    //           ? { backgroundColor: "#fd6a00" ,marginRight : 20}
    //           : { backgroundColor: "white" ,  marginRight : 20}
    //       }
    //       // className={classes.root}
    //       onMouseEnter={() => setHoverOverCard(true)}
    //       onMouseLeave={() => setHoverOverCard(false)}
    //     >
    //       <CardContent>

    //         {!hoverOverCard ? (
    //           <div  className="profile-follow-card">
    //              <CardContent className="profile-follow-card-header">
    //              <Avatar src={`https://${user.avatar}`} />
    //            </CardContent>

    //           <div className="profile-follow-card-body" >

    //             <span
    //               className="profile-name"
    //               style={{
    //                 display: "block",
    //                 fontWeight: "bold",
    //                 fontSize: "1.4rem",
    //               }}
    //             >{ ((user.firstName).length > 10) ?
    //               (((user.firstName).substring(0,10-3)) + '...') :
    //               user.firstName }

    //             </span>
    //             <Typography>
    //               <span
    //                 style={{
    //                   fontWeight: "normal",
    //                   fontSize: " 1.4rem",
    //                   textAlign: " left",
    //                   color: " #484848",
    //                   opacity: 0.8,
    //                 }}
    //                 className="profile-location"
    //               >
    //                 <i className="icon-marker" />
    //                 {user.city}
    //               </span>
    //             </Typography>
    //           </div>
    //           </div>
    //         ) : (
    //           <div  className="profile-follow-card">
    //           <CardContent className="profile-follow-card-header">
    //           <Avatar src={`https://${user.avatar}`} />
    //         </CardContent>

    //  <div className="profile-follow-card-body" >
    //             {FollowedButton}

    //             </div>

    //           </div>
    //         )}
    //       </CardContent>
    //     </Card>
  );
}

SuggestionItem.propTypes = {};

export default SuggestionItem;
