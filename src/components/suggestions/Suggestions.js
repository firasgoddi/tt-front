import React,{useContext,useState,useEffect} from "react";
import PropTypes from "prop-types";
import SuggestionItem from "./SuggestionItem";
import Slider from "infinite-react-carousel";
import { UserContext } from "../../context/UserContext";

function Suggestions(props) {
 
  const {getUsers,following,users} = useContext(UserContext);

  const settings = {
    slidesPerRow: 4,
    slidesToShow: 1,
    
    
   
  };
  useEffect(async () => {
   await getUsers()
   
  }, [props])
  
  const tabUsers = users &&  users.map((el)=>{
      return <SuggestionItem
      user={el}
    />
  })
  console.log(tabUsers,"deee")
  return (
    <div className="interesting-profiles">
    <div className="interesting-profiles-header">
      <h3 className="interesting-profiles-header-title">
        Profils intéressants à suivre
      </h3>
      <span className="interesting-profiles-header-show-more">
        Voir tout
      </span>
    </div>
      
    <div className="interesting-profiles-body">
        
      <div className="wrapper">
        <div className="carousel">
     
        {users && users.length &&  <div >
            <Slider {...settings}>
             
              {tabUsers}
            </Slider>
         
          </div>
             }
        </div>
      </div>
    </div>
    </div>
  );
}

Suggestions.propTypes = {};

export default Suggestions;
