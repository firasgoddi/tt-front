import React from 'react';

function AchevementProfile(props) {
    const {} = props;

    return (
        <div className="achievement">
            <div className="achievement-avatar">
                <img src="../assets/img/avatar.png" />
            </div>
            <div className="achievement-info">
                <span className="info-title">Achèvement du profil</span>
                <div className="achievement-items">
                    <span className="item filled" />
                    <span className="item filled" />
                    <span className="item filled" />
                    <span className="item filled" />
                    <span className="item" />
                    <span className="item" />
                </div>
                <span className="steps-left-feeds">Encore 2 étapes</span>
            </div>
            <i className="icon-small-arrow-right" />
        </div>
    )
}

AchevementProfile.propTypes = { }

export default AchevementProfile