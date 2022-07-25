import React,{useContext,useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import OpenConversations from './OpenConversations'
import ConversationList from './ConversationList'
import { UiContext } from '../../context/UiContext'
import ChatBox from './ChatBox'
import ChatBoxRestaurant from './ChatBoxRestaurant'
import ConversationListMini from './ConversationListMini'

function Chat(props) {

    const {conversationListOpen, setConversationListOpen,conversationsLoaded,conversationHover} = useContext(UiContext)
// const [chatBox, setChatBox] = useState(conversationsLoaded)
//     useEffect(() => {
//       setChatBox(conversationsLoaded)
    
//     }, [conversationsLoaded])
let list
conversationHover?list=<ConversationList/>:list=<ConversationListMini/>
    return (
        <div>
             <div className="chatt">
              <div className="content-chatt">
               {/* <ChatBoxRestaurant/>
                <ChatBox />
                <ChatBox /> */}
                {conversationsLoaded[0].isOpen?  <ChatBox index={0} />:<></>}
                {conversationsLoaded[1].isOpen?  <ChatBox index={1} />:<></>}
                {conversationsLoaded[2].isOpen?  <ChatBox index={2} />:<></>}
                <div className="conversation-open-img">
                  <div className="item">
                    <div className="close">
                      {" "}
                      <i className="fal fa-times" />{" "}
                    </div>
                    <img src="../assets/img/Composant 108 – 3.png" />
                  </div>
                  <div className="item">
                    <div className="close">
                      {" "}
                      <i className="fal fa-times" />{" "}
                    </div>
                    <img src="../assets/img/Composant 108 – 2.png" />
                  </div>
                  <div className="item">
                    <div className="close">
                      {" "}
                      <i className="fal fa-times" />{" "}
                    </div>
                    <img src="../assets/img/Composant 108 – 1.png" />
                  </div>
                </div>
                <div className="short-list-online">
                  <div className="header">
                    <i className="fas fa-inbox" />
                  </div>
                  <div className="users">
                    <img src="../assets/img/Ellipse 31.png" />
                    <img src="../assets/img/Ellipse 378.png" />
                    <img src="../assets/img/Ellipse 379.png" />
                    <img src="../assets/img/Ellipse 380.png" />
                    <img src="../assets/img/Ellipse 381.png" />
                    <img src="../assets/img/Ellipse 382.png" />
                    <img src="../assets/img/Ellipse 383.png" />
                    <img src="../assets/img/Ellipse 31.png" />
                  </div>
                  <div className="bottom">
                    <img src="../assets/img/svg/Ellipse 462.png" />
                    +13
                  </div>
                </div>
                {!conversationListOpen ? <OpenConversations  />:  <div>{list}</div>}
         
              </div>
            </div>
          
        </div>
    )
}

Chat.propTypes = {

}

export default Chat

