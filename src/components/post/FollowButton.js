import React, { useState, useContext, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import avatar from "../../../src/assets/img/svg/unfollow.svg";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../context/UserContext";

function FollowButton(props) {
  const {
    Followuser,
    followers,
    following,
    rfollowers,
    rFollowing,
    FollowRestaurant,

  } = useContext(UserContext);


  const followerId = props.post.userId;
  console.log(followerId);
  const restoId = props.post.restoId;
  console.log("RestaurantId", restoId);

  console.log("typeName", props.post.__typename);
  if (followers) console.log("userFOllowers", followers);
  if (following) console.log("userFOllowing", following);

  if (rFollowing) console.log("RestaurantFollwing", rFollowing);

  function addUserFollower() {
    Followuser(followerId);
  }
  function addRestaurantFollower() {
    FollowRestaurant(restoId);
  }
function masquer(){
  
}

  switch (props.post.__typename) {
    case "Post":
      return (
        <div className="user-who-post-options">
          <div
            className="follow-button"
            button
            onClick={() => {
              addUserFollower();
            }}
          >
            <i className="icon-add-friend" />
            <button className="save">suivre </button>
          </div>

          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <div className="more-options">
                  <i
                    className="icon-dots-horizontal"
                    {...bindTrigger(popupState)}
                  />
                </div>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box style={{ height: 60, width: 120 }}>
                    <Grid container direction="row">
                      <Grid item xs={3}></Grid>

                      <Grid item xs={8}>
                        <Typography
                          style={{
                            fontSize: 14,
                            marginTop: 5,
                            marginButtom: 10,
                          }}
                          button
                         
                        >
                          Masquer
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            marginTop: 5,
                            marginButtom: 10,
                          }}
                        >
                          Signaler
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      );

    case "restaurant":
      return (
        <div
          className="user-who-post-options"
          button
          onClick={() => {
            addRestaurantFollower();
          }}
        >
          <div className="follow-button">
            <i className="icon-add-friend" />
            <button className="save">suivre </button>
          </div>

          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <div className="more-options">
                  <i
                    className="icon-dots-horizontal"
                    {...bindTrigger(popupState)}
                  />
                </div>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box style={{ height: 40, width: 100 }}>
                    <Grid container direction="row">
                      <Grid item xs={4}>
                        <img
                          src={avatar}
                          style={{
                            borderRadius: "50%",
                            height: 20,
                            width: 20,
                            marginTop: 5,
                            marginLeft: 10,
                            marginButtom: 10,
                          }}
                        />
                      </Grid>

                      <Grid item xs={8}>
                        <Typography
                          style={{
                            fontSize: 14,
                            marginTop: 5,
                            marginButtom: 10,
                          }}
                          button
                        
                        >
                          Unfollow
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        </div>
      );

    default:
      return null;
  }
  /*switch(type){
	case "user" : addUserFollower()
	case "restaurant" : addRestaurantFollower()
}*/
}

FollowButton.propTypes = {};

export default FollowButton;
