import React from 'react';

function MessagesSideBar(props) {
    const {conversation} = props;

    const renderFile = (param) => {
        switch (param.type) {
            case "photo":
                return  <img src={param.content} key={param.id} alt="photo"/> ;
            case "video":
                return null ;
            default:
                return null;
        }
    };

    return (
        <div className="discussion-right-side">
            <div className="discussion-right-side-header">
                <img src={conversation.profileImage} alt="profileImage"/>
            </div>
            <div className="discussion-right-side-main">
                <span className="discussion-right-side-main-name">{conversation.userName}</span>
                <div className="location">
                    <i className="far fa-map-marker-alt map" />
                    <span>{conversation.adresse}</span>
                </div>
                <div className="hashtag">
                    <span>#friends</span>
                    <span>#food</span>
                    <span>#pasta</span>
                </div>
            </div>
            <div className="discussion-right-side-bottom">
                <span>Fichiers partagés</span>
                <div className="discussion-right-side-bottom-img">
                    {conversation.fichiersPartages.map((item) => (
                        renderFile(item)
                    ))}
                </div>
            </div>
        </div>
    )
}

MessagesSideBar.propTypes = { }

export default MessagesSideBar