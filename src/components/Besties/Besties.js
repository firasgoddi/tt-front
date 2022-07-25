import React, {useState} from 'react';
import BestiesSideBar from "./BestiesSideBar"; 
import RestaurantCardPost from '../post/RestaurantCardPost';
import PromoTakTak from '../ads/PromoTakTak';


function Besties(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const searchResults=[
    {name:'restaurant',location:'Tunis',isBesty:true,isAlcool:false,isFollowed:true,image:'https://picsum.photos/400',profileImage:'https://picsum.photos/300'},
    {name:'restaurant',location:'Tunis',isBesty:true,isAlcool:true,isFollowed:true,image:'https://picsum.photos/400',profileImage:'https://picsum.photos/300'},
    {name:'restaurant',location:'Tunis',isBesty:true,isAlcool:true,isFollowed:true,image:'https://picsum.photos/400',profileImage:'https://picsum.photos/300'},
    {name:'restaurant',location:'Tunis',isBesty:true,isAlcool:false,isFollowed:false,image:'https://picsum.photos/400',profileImage:'https://picsum.photos/300'}
  ]

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

const items=searchResults.map(el=><RestaurantCardPost restaurantPost={el}/>)
    return (
        <div className="my-besties-page">
     
        <div className="my-besties-page-content container">
    
          <div className="my-besties-page-content-feed">
           
            <div className="feed-main">
              <div className="search-result">
                <span className="number-result">Sousse, 03 restaurants trouvés</span>
                <div className="filter">
                  <div onClick={handleClick} >
                    <span>Les plus évalués </span>
                    <i className="fal fa-sort-down" aria-hidden="true" />
                  </div>
                  <div
                    className="filter-pane"
                    data-dropdown
                    data-auto-focus="true"
                    style={{ display: anchorEl ? "block" : "none" }}
                  >
                    <ul className="filtre-my-besties-items">
                      <li>
                        <div className="filter-header" onClick={handleClose}>
                          Filtrez l’affichage des restaurants
                          <i className="fal fa-sort-up" aria-hidden="true" />
                        </div>
                      </li>
                      <li>
                        <div className="filter-content">
                          <span className="content-title">Nouveaux</span>
                          <span className="content-title">Les plus évalués</span>
                          <span className="content-title">Les plus appreciés</span>
                          <span className="content-title">Les plus visités</span>
                          <span className="content-title">Les plus visités</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {items}
              <PromoTakTak />
            </div>
            <BestiesSideBar />
          </div>
        </div>       
      </div>
    )
}

Besties.propTypes = {

}

export default Besties

