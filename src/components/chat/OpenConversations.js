import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { UiContext } from '../../context/UiContext'

function OpenConversations(props) {
    const {conversationListOpen, setConversationListOpen} = useContext(UiContext)
    function OpenConversations(){
        setConversationListOpen((prev)=>!prev)
    }
    return (
      <div className="conversation" >
        <div className="open-button"  onClick={OpenConversations}>
                    <i className="far fa-comment-dots" />
                    <span>Discussions rapide</span>
                    <div className="number">
                      +13
                      <img src="../assets/img/svg/Ellipse 462.png" alt="" />
                    </div>
                  </div>
        </div>
    )
}

OpenConversations.propTypes = {

}

export default OpenConversations

