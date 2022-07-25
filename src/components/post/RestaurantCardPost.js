import React from 'react'
import PropTypes from 'prop-types'

function RestaurantCardPost(props) {
    const {restaurantPost}=props
    return (
        <div className="card restaurant-post-card">
            {
                restaurantPost.isBesty?   <div className="restaurant-my-besty-button">
                <button>
                  <span className="button-my-besty">My Besty</span>
                  <span className="button-enlever">Enlever</span>
                  <i className="fal fa-star" aria-hidden="true" />
                </button>
              </div>:<></>
            }
             
                <div className="restaurant-post-card-header">
                  <div className="restaurant-post-card-photo">
                    <img src={restaurantPost.image} alt="restaurant-post " />
                  </div>
                </div>
                <div className="restaurant-post-card-body" >
                  <div className="restaurant-who-post-wrapper" >
                    <div className="restaurant-who-post">
                      <div className="restaurant-who-post-info">
                        <div className="restaurant-who-post-info-avatar">
                          <img src={restaurantPost.profileImage} />
                        </div>
                        <div className="restaurant-who-post-info-info">
                          <span className="restaurant-username">{restaurantPost.name}</span>
                          <div className="restaurant-about">
                            <i className="icon-marker" />
                            <span>{restaurantPost.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="restaurant-who-post-options">
                          {restaurantPost.isAlcool? <div className="cup-button">
                          <i className="fal fa-wine-glass-alt" />
                        </div>:<></>}
                       {restaurantPost.isFollowed? <div className="followed">
                          <i className="icon-checked" />
                          <span>Déjà suivi</span>
                        </div>:    <div className="follow-button">
                          <i className="fal fa-utensils-alt" />
                          <span>Suivre</span>
                        </div>}
                       
                        <div className="more-options">
                          <i className="icon-dots-horizontal" />
                        </div>
                      </div>
                    </div>
                    <div className="restaurant-post-card-body-description" style={{marginBottom: 50, height: "50px"}}>
                      Proin sit amet ipsum eget ante venenatis posuere. Maecenas
                      diam risus, accumsan at facilisis sit amet, eleifend et
                      arcu. Nam viverra pharetra condimentum. Vestibulum dui
                      metus, fringilla sed facilisis ut, congue ut tortor.
                    </div>
                  </div>
                </div>
              </div>
              
    )
}

RestaurantCardPost.propTypes = {

}

export default RestaurantCardPost

