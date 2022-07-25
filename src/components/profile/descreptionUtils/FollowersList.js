import React, { useContext } from "react";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
import avatar from "../../../assets/img/svg/taktak_user.svg";
import { UserContext } from "../../../context/UserContext";
import { Avatar } from "@material-ui/core";
function FollowerItem(props) {
  console.log(props.follower, "hereherherherh");
  return (
    <div className="one-follower">
      <div className="one-follower-inner">
        <div className="user-who-post-info-avatar">
          <NavLink
            style={{ margin: "0px" }}
            exact
            target="_blank"
            to={`/profile/${props.follower._id}`}
          >
            {props.follower.avatar ? (
              <Avatar src={`https://${props.follower.avatar}`} />
            ) : (
              <Avatar src={avatar} style={{ borderRadius: "50%" }} />
            )}
          </NavLink>
        </div>

        <div className="user-who-post-info-info">
          <span className="user-username">{props.follower.firstName}</span>
          {/* <div className="user-about">
            <i className="icon-marker" />
            <span> {props.follower.location}</span>
          </div> */}
          {props.follower.city ? (
            <div className="user-about">
              <i className="user-about icon-marker" />
              <span> {props.follower.city}</span>
            </div>
          ) : (
            <div className="user-about"></div>
          )}
        </div>
      </div>
    </div>
  );
}

function FollowersList(props) {
  const { followers, following, userFollowers, userFollowing } =
    useContext(UserContext);
  const { isntme, followOrfollwers } = props;

  let follower;
  let follow;
  // console.log("isntme in followerslist", isntme);
  console.log("isntme in followerslist", isntme, following);
  console.log("isntme in userfollow", isntme);

  switch (isntme) {
    case false:
      if (followers && followers.length > 0) {
        follower = followers.map((el) => {
          return <FollowerItem follower={el} />;
        });
      } else follower = <h1 className="nofollowing">0 amis qui te suivent</h1>;

      if (following && following.length > 0) {
        follow = following.map((el) => {
          return <FollowerItem follower={el} />;
        });
      } else follow = <h1 className="nofollowing">0 amis suivis</h1>;
      break;
    case true:
      if (userFollowers && userFollowers.length > 0) {
        follower = userFollowers.map((el) => {
          return <FollowerItem follower={el} />;
        });
      } else follower = <h1 className="nofollowing">0 amis qui te suivent</h1>;

      if (userFollowing && userFollowing.length > 0) {
        follow = userFollowing.map((el) => {
          return <FollowerItem follower={el} />;
        });
      } else {
        //follow = <h1 className="nofollowing">0 amis suivis</h1>;
        follow = (
          <div className="followers profile-section">
            <div className="followers-list">
              <i className="fal fa-info" />
              <div className="description">
                <span className="info-description">
                  Vous n’avez pas encore suivi aucun profile sur TakTak. Vous
                  pouvez rechercher vos amis et leur envoyer des invitations
                  d’amitié à tout moment ou synchroniser votre liste de contact.
                </span>
                <div>
                  <span className="add-followers">Importez vos amis</span>
                  <span className="search-followers">Rechercher des amis</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      break;
    default:
      // code block
      console.log("break for love");
  }

  let tab = [];
  followOrfollwers ? (tab = follow) : (tab = follower);

  return (
    <div className="followers-list">
      {/* <InfiniteScroll dataLength={1}> */}
      {tab}
      {/* </InfiniteScroll> */}
    </div>
  );
}

FollowersList.propTypes = {};

export default FollowersList;
