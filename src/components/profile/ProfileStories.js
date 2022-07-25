import React from 'react'
import PropTypes from 'prop-types'
import Stories from '../stories/Stories'
import ProfileStoryItem from './ProfileStoryItem'

function ProfileStories(props) {
    const {stories,profileImage} = props
    return (
        <div className="user-info-stories">
              {!props.isntme?(<div className="story add">
                <div className="story-image">
                  <span>+</span>
                </div>
                <span className="story-user">
                  Aujourd’hui
                </span>
              </div>):(<></>)}
              {
                  stories.map(el => (<ProfileStoryItem profileImage={profileImage} story={el}/>))
              }
                 <div className="all-stories">
                <span>Toutes mes stories</span>
              </div>
        </div> 
    )
}

ProfileStories.propTypes = {

}

export default ProfileStories

