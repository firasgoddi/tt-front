import React from 'react'
import PropTypes from 'prop-types'

function MyStory(props) {
    return (
        <div className="carousel-cell">
                  <div className="story add">
                    <div className="story-image">
                      <span>+</span>
                    </div>
                    <span className="story-user">
                      Vous
                    </span>
                  </div>
        </div>
    )
}

MyStory.propTypes = {

}

export default MyStory

