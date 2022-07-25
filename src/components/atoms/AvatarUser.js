import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";

function AvatarUser(props) {
  const { activeUser } = props;


  let a = activeUser.avatar ? (
    <Avatar src={`https://${activeUser.avatar}`} />
  ) : (
    <Avatar style={{ fontSize: 15 }}>
      {activeUser.firstName &&
        activeUser.firstName[0].concat(activeUser.lastName[0]).toUpperCase()}
    </Avatar>
  );

  const [loaded, setLoaded] = useState(a);
  useEffect(() => {
    setLoaded(a);
  }, [activeUser.avatar]);
  return (
    // <span className="user-avatar">
    //         <img src={props.avatarImage} />
    // </span>
  props.link ?   <NavLink exact to={`/profile/${activeUser.userId}`}>
      <div>{activeUser && loaded}</div>
    </NavLink> :       <div>{activeUser && loaded}</div>
  );
}

AvatarUser.propTypes = {};
AvatarUser.defaultProps = {
link : true    
}

export default AvatarUser;
