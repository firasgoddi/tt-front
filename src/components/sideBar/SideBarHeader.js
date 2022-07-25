import React from "react";
import { NavLink } from "react-router-dom";

function SideBarHeader(props) {
  const { restaurant } = props;

  return (
    <div>
      <div className="contact">
        <button className="phone-number">
          <i className="fal fa-phone-volume phone-icon" />
          <span className="phone-number-info">{restaurant.phone}</span>
        </button>
        <button className="suivi-nous">
          <div className="suivi-nous-avatar">
            <img src="../../assets/img/svg/fork.png" />
          </div>
          <span>Suivi-nous</span>
        </button>
      </div> 
      <NavLink exact to={`/booking/` + restaurant._id}>
        <button className="reservations">
          <div className="reservation-left-side">
            <a className="reservations-title">
              <i className="icon-chair" />
              Réservez maintenant
            </a>
          </div>
          <div className="reservations-right-side">
            <i className="far fa-comment-dots" />
          </div>
        </button>
      </NavLink>
      <div className="list-icon">
        <div>
          <i className="fal fa-bookmark" />
          <span>Add to Besties</span>
        </div>
        <div>
          <i className="fal fa-pennant" />
          <span>Bookmark</span>
        </div>
        <div>
          {" "}
          <i className="fal fa-share-alt" />
          <span>Bookmark</span>
        </div>
      </div>
    </div>
  );
}

SideBarHeader.propTypes = {};

export default SideBarHeader;
