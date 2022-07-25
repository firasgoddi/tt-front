import React from 'react';
import MyMsg from './MyMsg';
import OtherMsg from './OtherMsg';

function MessagesList(props) {
    const {conversation} = props;

    const renderMessage = (param) => {
        switch (param.type) {
            case "sent":
                return  <MyMsg param={param} />;
            case "received":
                return  <OtherMsg param={param} />;
            default:
                return null;
        }
    };

    return (
        <div className="discussion-left-side-main" style={{height: 550, overflow: 'scroll'}}>
            <div className="discussion">
                {conversation.messages.map((message) => (
                    renderMessage(message)
                ))}
                
                <div className="writing" style={{ display: conversation.writing ? "block" : "none" }}>
                    <img className="user-img" src="../assets/img/svg/User.png" />
                    <img className="icon-writing" src="../assets/img/svg/Groupe 199.png" />
                </div>
            </div>
        </div>
    )
}

MessagesList.propTypes = { }

export default MessagesList