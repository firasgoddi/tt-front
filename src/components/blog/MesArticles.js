import React from 'react';
import Article from './Article';
import { NavLink } from 'react-router-dom';

function MesArticles(props) {
    
    const articles = [
        {
            id: 1,
            image: "../assets/img/Rectangle 3178.png",
            description: "Duis tempus metus nec velit sodales, quis accumsan.",
            date: "12 janvier 2020 . 2 min de lecture"
        },
        {
            id: 2,
            image: "../assets/img/Rectangle 3178.png",
            description: "Duis tempus metus nec velit sodales, quis accumsan.",
            date: "12 janvier 2020 . 2 min de lecture"
        },
        {
            id: 3,
            image: "../assets/img/Rectangle 3178.png",
            description: "Duis tempus metus nec velit sodales, quis accumsan.",
            date: "12 janvier 2020 . 2 min de lecture"
        },
    ];

    const items = articles.map((article) => (
        <div>
          <Article article={article} />
        </div>
    ));

    return (
        <div className="my-post">
            <div className="header">
                <span>Mes articles</span>
                <NavLink exact to={`/blog/nouveauArticle`} style={{color: "#fff"}}>
                    <button className="button-new-article">
                        <i className="fal fa-pencil" aria-hidden="true" style={{color: "#fff"}} />
                            Nouveau article
                    </button>
                </NavLink>
            </div>
            <div className="all-post-body">
                {items}
            </div>
            <div className="show-all">
                <span>Voir tout</span> 
            </div>
        </div>                  
    )
}

MesArticles.propTypes = {

}

export default MesArticles