import React, {useContext} from 'react';
import { UiContext } from "../../context/UiContext";

function HeaderMessagerie(props) {
    const {conversation, index} = props;
    const { setConversations } = useContext(UiContext);

    function removeDiscussion() {

        setConversations((prevConversations) => {

            let items = [...prevConversations];

            let updateConversation = {...prevConversations[index] , messages: [] }
            items[index] = updateConversation;

            return (items) ;
        })
    }

    return (
        <div className="discussion-left-side-header">
            <div className="discussion-header-details-user">
                <img src="../assets/img/svg/User.png" />
                <span>{conversation.userName}</span>
            </div>
            <div className="discussion-header-parameter">
                <div className="banish">
                    <i className="fa fa-ban" />
                    <span>Bannir le contact</span>
                </div>
                <div className="move" onClick={() => removeDiscussion()}>
                    <i className="fal fa-trash-alt" />
                    <span>Supprimer la discussion</span>
                </div>
                <span className="fal fa-ellipsis-v" />
            </div>
        </div>
    )
}

HeaderMessagerie.propTypes = { }

export default HeaderMessagerie