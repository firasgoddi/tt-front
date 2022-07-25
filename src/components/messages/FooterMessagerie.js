import React from 'react';

function FooterMessagerie(props) {

    return (
        <div className="discussion-left-side-bottom">
            <div className="send-msg">
                <input type="text" placeholder="Dites quelques choses!" />
                <i className="fal fa-paper-plane" />
            </div>
            <div className="icons">
                <i className="fal fa-camera-retro camera" />
                <i className="fal fa-microphone micro" />
                <img src="../assets/img/svg/GIF.png" />
                <img src="../assets/img/svg/smile.png" />
            </div>
        </div>
    )
}

FooterMessagerie.propTypes = { }

export default FooterMessagerie