import React from 'react';
import { NavLink } from 'react-router-dom';

function RedigerVotreArticle(props) {
    
    return (
        <div style={{marginBottom: 70}}>
            <div className="write-your-article">
                Rédiger votre article
            </div>
            <div className="write-post-header">
                <NavLink exact to={`/blog`}>
                    <button>
                        <i className="icon-arrow-left back-to-page-two" />
                    </button>
                </NavLink>
                <div className="categories-dropdown">
                    <div className="choose-categorie">
                        <span>Choisir une catégorie pour votre article</span>
                        <i className="fal fa-sort-down sort-down" />
                    </div>
                    <div className="dropdown-categorie" id="country-dropdown">
                        <form>
                            <div className="dropdown-top">
                                <span>Choisir une catégorie</span> <i className="fal fa-sort-up sort-up" />
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
            <div className="add-cover">
                <span className="add">Ajouter une couverture</span>
                <div className="add-cover-invisible">
                    <span>Utilisez les formats .jpg .png</span>
                    <span>La taille du fichier ne  doit pas passer plus 1 Mo.</span>
                    <span>Meilleure résolution 1087⨯200</span>
                </div>
            </div>
            <div className="post-draft">
                <span className="draft-title"> Titre de votre article </span>
                <div className="textarea">
                    <textarea defaultValue={"Corps de votre article "} />
                    <div className="icons">
                        <i className="icon-draft-word" /> <span className="description-icon">Texte</span>
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
    )
}

RedigerVotreArticle.propTypes = {

}

export default RedigerVotreArticle