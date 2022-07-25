import React from 'react';
import { NavLink } from 'react-router-dom';

function BlogPost(props) {
    const { post } = props;
    
    return (
        <div className="card-blog">
            <div className="card-blog-header">
                <img src={post.picture} />
            </div>
            <div className="card-blog-body">
                <div className="content-body">
                    <div className="post-content-header">
                        <div className="post-header-poster">
                            <img src="../assets/img/avatar.png" />
                            <div className="poster-info">
                                <span className="poster-name">
                                    {post.userName}
                                </span>
                                <span className="poster-location">
                                    <i className="icon-marker"> </i>
                                    {post.address}
                                </span>
                            </div>
                        </div>
                        <div className="post-info">
                            <span>{post.date} . 2 min de lecture</span>
                        </div>
                    </div>
                    <div className="post-content-content">
                        <div className="content-title">
                            {post.title}
                        </div>
                        <p>
                            {post.description}
                        </p>
                    </div>
                </div>
                <div className="blog-post-invisible">
                    <div className="last-visit-restaurant-profil">
                        <img src="../assets/img/Ellipse 379.png" />
                        <img src="../assets/img/Ellipse 382.png" />
                        <img src="../assets/img/svg/Ellipse 380.png" />
                        <span> <strong>{post.participants[0].firstName}</strong>,
                        <strong>{post.participants[1].firstName}</strong> et {post.participants.length - 2} autres personnes</span>
                    </div>
                    <div className="post-card-social-info">
                        <div className="left-side">
                            <div className="post-card-likes">
                                <NavLink exact to={`/blog/exprimerVous/`+ post.idPost }>
                                    <i className="icon-heart" />
                                    <span className="likes-number">{post.likes}</span>
                                </NavLink>
                            </div>
                            <div className="post-card-comments">
                                <NavLink exact to={`/blog/exprimerVous/`+ post.idPost }>
                                    <i className="icon-comment" />
                                    <span className="comments-number">{post.comments}</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="post-card-comment-button">
                                <NavLink exact to={`/blog/exprimerVous/`+ post.idPost }>
                                    <i className="icon-send"/>
                                </NavLink>
                                <i className="fal fa-share-alt share" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

BlogPost.propTypes = {

}

export default BlogPost