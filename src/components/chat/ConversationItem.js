import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import {UiContext} from '../../context/UiContext'
function ConversationItem(props) {
  const {loadConversations} = useContext(UiContext)
  const {conversationHover} = useContext(UiContext)
  let item 
  {conversationHover? item =    <div className="online-profile" button onClick={(e)=>loadConversations(e)}>
  <img
    src={props.conversation.user.profileImage}
    className="online-profile-img"
   
    style={props.conversation.isRestaurant?{borderRadius:"20%"}:{borderRadius:"50%"}}
  />
  <span className="online-profile-name">
    {props.conversation.user.name}
  </span>
  <span className="time-disconnected">{props.conversation.lastTimeChecked}</span>
  {props.conversation.lastTimeChecked?<img
    src="../assets/img/svg/Ellipse 317.png"
    className="online"
    alt=""
  />:<></>}
</div>
: item=   <div className="online-profile" button onClick={(e)=>loadConversations(e)}> <img
src={props.conversation.user.profileImage}
className="online-profile-img"

style={props.conversation.isRestaurant?{borderRadius:"20%"}:{borderRadius:"50%"}}
/>{props.conversation.lastTimeChecked?<img
    src="../assets/img/svg/Ellipse 317.png"
    className="online"
    alt=""
  />:<></>}</div>}
    return (
      <div className="online-profile" button onClick={(e)=>loadConversations(e)}>
      <img
        src={props.conversation.user.profileImage}
        className="online-profile-img"
       
        style={props.conversation.isRestaurant?{borderRadius:"20%"}:{borderRadius:"50%"}}
      />
      <span className="online-profile-name">
        {props.conversation.user.name}
      </span>
      <span className="time-disconnected">{props.conversation.lastTimeChecked}</span>
      {props.conversation.lastTimeChecked?<img
        src="../assets/img/svg/Ellipse 317.png"
        className="online"
        alt=""
      />:<></>}
    </div>
    
    )
}

ConversationItem.propTypes = {

}

export default ConversationItem

