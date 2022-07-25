import React from 'react';

function OtherMsg(props) {
    const {param} = props;

    return (
        <div className="message-received">
            <div className="content">
                <img src="../assets/img/svg/User.png"  style={{width: 30, heigth: 30}}/>
                <div className="message">
                    <span>{param.message}</span> 
                    <div className="triangle" />
                </div>
                <span className="fal fa-ellipsis-v" />
            </div>
            <div className="time-send">{param.date} ago</div>
        </div>
    )
}

OtherMsg.propTypes = { }

export default OtherMsg