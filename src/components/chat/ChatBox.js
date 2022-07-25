import React,{useContext} from 'react'
import PropTypes from 'prop-types'
import { UiContext } from '../../context/UiContext'

function ChatBox(props) {
  const {closeChatBox} = useContext(UiContext)
    return (
        <div className="convesation-open">
        <div className="discussion-header">
          <div className="discussion-header-details-user">
            <div className="img-user">
              <img src="../assets/img/svg/User.png" />
            </div>
          </div>
          <span>Bahiya Mestiri</span>
          <i style={{cursor : "pointer"}} className="fas fa-times" button onClick={(e)=>closeChatBox(props.index,e)}/>
        </div>
        <div className="discussion-main">
          <div className="discussion">
            <div className="message-sent">
              <div className="content">
                <div className="content-msg">
                  <div className="triangle" />
                  <div className="message">Hi! wenek? </div>
                  <img src="../assets/img/svg/message-sent-pt.png" />
                </div>
                <div className="content-msg">
                  <div className="triangle" />
                  <div className="message">
                    {" "}
                    Pellentesque efficitur varius lobortis. Curabitur
                    posuere magna
                  </div>
                  <img src="../assets/img/svg/message-sent-pt.png" />
                </div>
              </div>
              <div className="time-send">24 minutes</div>
            </div>
            <div className="message-received">
              <div className="content">
                <img
                  className="img-user"
                  src="../assets/img/svg/User.png"
                />
                <div className="message">
                  <span>
                    Ut ac nulla sit amet lectus malesuada congue.
                  </span>
                  <div className="triangle" />
                </div>
                <img
                  className="three-pts"
                  src="../assets/img/svg/message-sent-pt.png"
                />
              </div>
              <div className="time-send">42 minutes ago</div>
            </div>
          </div>
       
        </div>
        <div className="discussion-bottom">
          <div className="send-msg">
            <input type="text" placeholder="Dites quelques choses!" />
            <img src="../assets/img/svg/enter.png" />
          </div>
          <div className="icons">
            <img src="../assets/img/svg/camera.png" />
            <img src="../assets/img/svg/micro.png" />
            <img src="../assets/img/svg/GIF.png" />
            <img src="../assets/img/svg/smile.png" />
          </div>
        </div>
      </div>
     
    )
}

ChatBox.propTypes = {

}

export default ChatBox

