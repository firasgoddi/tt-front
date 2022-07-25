import React, {useState, useContext} from 'react';
import { UiContext } from "../../context/UiContext";

function MessagesLeftSideBar(props) {
    const { conversations, setShowConversation, getIndex } = useContext(UiContext);
    const [selected, setSelected] = useState()

    function updateConversation(id) {
        
        var index = getIndex(id, conversations, 'id');
        
        setShowConversation(index)
        setSelected(id)
    };

    return (
        <div className="inbox-page">
            <div className="inbox-page-sidemenu sidemenu-inbox" id="sidemenu">
                <div className="sidemenu-header">
                    <div className="sidemenu-logo">
                        <a href="login.html">  
                            <img src="../assets/img/svg/logo-gradient.svg" alt="logo"/>
                        </a>   
                    </div>
                    <div className="input-wrapper">
                        <img className="woman-restaurant" src="../assets/img/woman-restaurant.png" alt="search" />
                        <i className="fal fa-search" />
                        <input type="text" placeholder="Rechercher un Resto" className="search-rest" />
                        <i className="fal fa-eraser eraser" />
                    </div>
                </div>
                <div className="sidemenu-main">
                    <div className="sidemenu-main-tite">
                        <div className="sidemenu-main-tite-left">
                            <span>Afficher tous les profils</span>
                        </div>
                        <div className="sidemenu-main-tite-right">
                            <span>Ajuster filtres</span>
                            <i className="fal fa-filter" />
                            <div className="dropdown">
                                <div className="dropdown-content">
                                    <div id="afficher">
                                        <span href="#">Afficher</span>
                                    </div>
                                    <div id="tout">
                                        <span href="#">Tout</span> <p>34</p>
                                    </div>
                                    <div id="foodlist">
                                        <span href="#">FoodList uniquement</span>
                                        <p style={{color: '#484848', opacity: '0.5'}}>20</p>
                                    </div>
                                    <div id="restaurantU">
                                        <span href="#">Restaurants uniquement</span>
                                        <p style={{color: '#484848', opacity: '0.5'}}>14</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="list-online-profil" style={{height: 550}}>
                        {conversations.map((item) => (
                            <div className="online-profile" onClick={() => updateConversation(item.id) }
                                style={ selected === item.id ? {backgroundColor : "#FFA500", color: "white", padding: 5} : {backgroundColor : "white", padding: 5}}>
                                <img src={item.profileImage} className="online-profile-img" alt="profileImage"/>
                                <span className="online-profile-name">{item.userName}</span>
                                <span className="time">{item.time} min</span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="svg-writing" width={29} height={18} viewBox="0 0 29 18"
                                    style={{ display: item.writing ? "block" : "none", color: '#ff6900' }} >
                                    <defs>
                                        <style dangerouslySetInnerHTML={{__html: "\n              .a{fill:#ff6900;}.b{fill:#fff;}" }} />
                                    </defs>
                                    <g transform="translate(-1254 -323)">
                                        <path className="a" style={{color: '#ff6900'}} d="M2,0H24a2,2,0,0,1,2,2V16a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0Z" transform="translate(1254 323)" />
                                        <circle className="b" cx={2} cy={2} r={2} transform="translate(1271 330)" />
                                        <circle className="b" cx={2} cy={2} r={2} transform="translate(1265 330)" />
                                        <circle className="b" cx={2} cy={2} r={2} transform="translate(1259 330)" />
                                        <path className="a" d="M0,0H5L0,5Z" transform="translate(1278 323)" style={{color: '#ff6900'}} />
                                    </g>
                                </svg>
                                <div className="online" style={{ display: item.writing ? "none" : "block", color: '#ff6900' }}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

MessagesLeftSideBar.propTypes = { }

export default MessagesLeftSideBar