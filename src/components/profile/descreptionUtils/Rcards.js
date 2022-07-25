import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";

function Rcards(props) {
  console.log("elemememem:", props.restaurant);

  return (
    <div>
      <div className="you-may-like-element">
        <div className="you-may-like-element-media">
          {/*<img src={`https://${props.restaurant.profileImage}`} />*/}
          <img src={props.restaurant.profileImage} />
        </div>
        <div className="you-may-like-element-info">
          <div className="info-header">
            <img src={props.restaurant.profileImage} />

            <div className="name">
              <NavLink
                style={{ margin: "0px" }}
                exact
                target="_blank"
                to={`/profileRestaurant/${props.restaurant._id}`}
              >
                <span className="restaurant-name">
                  {props.restaurant.name}{" "}
                </span>
              </NavLink>
              <span className="restaurant-location">
                <i className="icon-marker" />
                {props.restaurant.location}
              </span>
            </div>
            <div style={{ marginLeft: "auto", marginTop: "-1rem" }}>
              <Rating name="read-only" value={props.restaurant.rate} readOnly />
            </div>
          </div>
          <div className="info-body">{props.restaurant.description}</div>
        </div>
      </div>
    </div>
  );
}

Rcards.propTypes = {};

export default Rcards;
