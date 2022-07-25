import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UiContext } from '../../context/UiContext';

function ExprimerVousPost(props) {
    const {posts, getIndex} = useContext(UiContext);

    const getUrlFromPath = () => {
        const paths = window.location.href.split("/");
        let url = paths[5];
        
        return url;
    };

    var index = getIndex(getUrlFromPath(), posts, 'idPost');
    
    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                Exprimez-vous
            </div>
            <div style={{marginTop: 20}}>
                <div className="blog-post-details-header">
                    <div className="details-back">
                        <NavLink exact to={`/blog`}>
                            <span className="icon-arrow-left back-to-page-one" />
                        </NavLink>
                        <p> Voyage Culinaire </p>
                    </div>
                    <NavLink exact to={`/blog/nouveauArticle`} style={{color: "#fff"}}>
                        <button>
                            <i className="fal fa-pencil" />
                            <span style={{marginLeft: 10}}>Nouveau article</span>
                        </button>
                    </NavLink>
                </div>
                <div className="blog-post with-details">
                    <div className="blog-post-media">
                        <img src={"../"+posts[index].picture} />
                    </div>
                    <div className="blog-post-content">
                        <div className="post-content-header">
                            <div className="post-header-poster">
                                <img src="../../assets/img/avatar.png" />
                                <div className="poster-info">
                                    <span className="poster-name">
                                        {posts[index].userName}
                                    </span>
                                    <span className="poster-location">
                                        <i className="icon-marker"> </i>
                                        {posts[index].address}
                                    </span>
                                </div>
                            </div>
                            <div className="post-info">
                                <span>{posts[index].date} . 2 min de lecture</span>
                            </div>
                        </div>
                        <div className="post-content-content">
                            <div className="content-title-new-article">
                                {posts[index].title}
                            </div>
                            <p> {posts[index].description} </p>
                        </div>
                    </div>    
                </div>
                <div className="divider" />
                <div className="card post-card">
                    <div className="post-card-footer">
                        <div className="post-card-social-info">
                            <div className="post-card-likes">
                                <i className="icon-heart" />
                                <span className="likes-number">{posts[index].likes}</span>
                            </div>
                            <div className="post-card-comments">
                                <i className="icon-comment" />
                                <span className="comments-number">{posts[index].comments}</span>
                                <span className="comments-show-more">Afficher commentaires</span>
                            </div>
                            <div className="post-card-comment-button">
                                <i className="icon-send"> </i>
                            </div>
                        </div>
                        <div className="post-card-comment">
                            <div className="post-card-comment-avatar">
                                <img src="../../assets/img/avatar.png" />
                                <i className="fal fa-caret-down" aria-hidden="true" />
                            </div>
                            <div className="post-card-comment-input">
                                <input placeholder="Commenter ce post" className="post-card-comment-input-field" type="text" />
                                <div className="comment-options">
                                    <i className="icon-camera" />
                                    <i className="icon-smile" />
                                    <i className="icon-mic" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>        
        </div>
    )
}

ExprimerVousPost.propTypes = {

}

export default ExprimerVousPost