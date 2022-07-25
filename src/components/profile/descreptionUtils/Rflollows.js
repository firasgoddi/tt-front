import React, { useContext } from "react";
import Rcards from "./Rcards";
import { UserContext } from "../../../context/UserContext";

function Rflollows(props) {
 
  const { rFollowing, userRestaurantFollowing } = useContext(
    UserContext
  );
  const {isntme} = props;

  let tab;
if (!isntme){
  if (rFollowing) {
    tab = rFollowing.map((el) => <Rcards restaurant={el} />);
    console.log(rFollowing, 'trah')
  }
  else tab =<div className="you-may-like-element"> <h1>no restaurant followed yet</h1></div>
} else {
  if (userRestaurantFollowing) {
    tab = userRestaurantFollowing.map((el) => <Rcards restaurant={el} />);
  }
  else tab = <span>no restaurant followed yet</span>
}
 //make it in local state please
  return (
    <div>
      <div className="restaurants-followed profile-section" >
        <h3 className="restaurants-followed-title profile-title">
          Restaurants suivis
        </h3>
        <div className="you-may-like">
          <div className="you-may-like-body">{tab}</div>
        </div>
      </div>
    </div>
  );
}



export default Rflollows;
