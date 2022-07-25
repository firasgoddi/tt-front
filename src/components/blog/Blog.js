import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import NavBarBlog from './NavBarBlog'
import MesArticles from './MesArticles'
import BlogInviterAmis from './BlogInviterAmis'
import BlogPost from './BlogPost'
import { UiContext } from '../../context/UiContext'

function Blog(props) {

  const {posts} = useContext(UiContext);

  const items = posts.map((post) => (
    <div>
      <BlogPost post={post} />
    </div>
  ));

    return (
      <div className="blog-page">
        <div className="blog-page-content ">
          <div className="eprimez-vous">
            Exprimez-vous
          </div>
          <div className="write-your-article">
            Rédiger votre article
          </div>
          <NavBarBlog />
          
          <div className="blog-page-content-feed container">
            <div className="feed-main">
              <div className="tabs-content" data-tabs-content="example-tabs">
                <div className="tabs-panel is-active" id="panel1">
                  <div className="write-post">
                    <div className="write-post-header">
                      <button className="back-to-page-two"><i className="icon-arrow-left back-to-page-two" /></button>
                      <div className="categories-dropdown">
                        <div className="choose-categorie">
                          <span>    Choisir une catégorie pour votre article</span>
                          <i className="fal fa-sort-down sort-down" />
                        </div>
                        <div className="dropdown-categorie" id="country-dropdown">
                          <form>
                            <div className="dropdown-top">
                              <span>Choisir une catégorie</span>
                              <i className="fal fa-sort-up sort-up" />
                            </div>
                            <div className="categories">
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus visités</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                              <div className="categorie">
                                <span>Les plus appreciés</span>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="write-post-body">
                      <div className="add-cover">
                        <span className="add">    Ajouter une couverture</span>
                        <div className="add-cover-invisible">
                          <span>Utilisez les formats .jpg .png</span>
                          <span>La taille du fichier ne  doit pas passer plus 1 Mo.</span>
                          <span>Meilleure résolution 1087⨯200</span>
                        </div>
                      </div>
                      <div className="post-draft">
                        <span className="draft-title">
                          Titre de votre article
                        </span>
                        <div className="textarea">
                          <textarea defaultValue={"Corps de votre article "} />
                          <div className="icons">
                            <i className="icon-draft-word" />
                            <span className="description-icon">Texte</span>
                            <i className="icon-draft-video" /> <span className="description-icon">Vidèo</span>  
                            <i className="icon-draft-image"> </i> <span className="description-icon">Image</span> 
                          </div>
                        </div>
                        <div className="divider" />
                        <div className="buttons">
                          <button>Brouillon</button>
                          <button>Publier</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*<div className="blog-post-details">
                    <div className="blog-post-details-header">
                      <div className="details-back">
                        <span className="icon-arrow-left back-to-page-one" />
                        <p>
                          Voyage Culinaire
                        </p>
                      </div>
                      <button>
                        <i className="fal fa-pencil" />
                        <span className="button-new-article">Nouveau article</span>
                      </button>
                    </div>
                    <div className="blog-post-details-content">
                      <div className="blog-post with-details">
                        <div className="blog-post-media">
                          <img src="../assets/img/image3.jpg" />
                        </div>
                        <div className="blog-post-content">
                          <div className="post-content-header">
                            <div className="post-header-poster">
                              <img src="../assets/img/avatar.png" />
                              <div className="poster-info">
                                <span className="poster-name">
                                  Salma Mustafa
                                </span>
                                <span className="poster-location">
                                  <i className="icon-marker"> </i>
                                  Marsa, Tunis
                                </span>
                              </div>
                            </div>
                            <div className="post-info">
                              <span>12 janvier 2020 . 2 min de lecture</span>
                            </div>
                          </div>
                          <div className="post-content-content">
                            <div className="content-title-new-article">
                              Lorem ipsum dolor sit amet, consect etur adipiscing
                              elit.
                            </div>
                            <p>
                              Sed at ornare lectus, id fermentum eros. Maecenas
                              nunc nisl, viverra ac vulputate quis, vehicula sed
                              massa. Proin et sem at tortor venenatis mattis eget
                              quis leo. Suspendisse ut ante pulvinar, suscipit
                              sapien vel, efficitur est. Sed justo tellus, pretium
                              eget commodo a, volutpat semper arcu. Maecenas
                              iaculis sodales orci, sit amet tempor justo ultrices
                              ut. Vestibulum porttitor ante id nisl scelerisque,
                              eget efficitur justo interdum. Cras lobortis nisl
                              sit amet vestibulum convallis. Vivamus at libero
                              ligula. Nulla at porta ante. Fusce sit amet lacinia
                              est, ac pellentesque massa. Duis vel pharetra nunc.
                              Morbi pretium felis vel felis accumsan volutpat.
                            </p>
                            <p>
                              Mauris placerat mi ac eros mollis, sit amet porta
                              leo scelerisque. Fusce sagittis pulvinar lorem,
                              vitae tempus dolor aliquet vel. Duis tempus metus
                              nec velit sodales, quis accumsan velit sodales. Nunc
                              sodales bibendum mattis. Mauris porttitor cursus dui
                              ut ultricies.
                            </p>
                            <p>
                              Mauris placerat mi ac eros mollis, sit amet porta
                              leo scelerisque. Fusce sagittis pulvinar lorem,
                              vitae tempus dolor aliquet vel. Duis tempus metus
                              nec velit sodales, quis accumsan velit sodales. Nunc
                              sodales bibendum mattis. Mauris porttitor cursus dui
                              ut ultricies.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="divider" />
                      <div className="card post-card">
                        <div className="post-card-footer">
                          <div className="post-card-social-info">
                            <div className="post-card-likes">
                              <i className="icon-heart" />
                              <span className="likes-number">33</span>
                            </div>
                            <div className="post-card-comments">
                              <i className="icon-comment" />
                              <span className="comments-number">32</span>
                              <span className="comments-show-more">Afficher commentaires</span>
                            </div>
                            <div className="post-card-comment-button">
                              <i className="icon-send"> </i>
                            </div>
                          </div>
                          <div className="post-card-comment">
                            <div className="post-card-comment-avatar">
                              <img src="../assets/img/avatar.png" />
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
    */}
                  <BlogPost post={posts[0]} />

                  <MesArticles />

                  {items}

                  <BlogInviterAmis />

                  {items}
                  
                </div>
                <div className="tabs-panel" id="panel2" />
              </div>
            </div>
          </div>
        
        </div>
       
     
      </div>
    )
}

Blog.propTypes = {

}

export default Blog

