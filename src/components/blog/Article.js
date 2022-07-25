import React from 'react';

function Article(props) {
    const {article} = props;

    return (
        <div className="item">
            <img src={article.image} alt="" />
            <div className="post-content">
                <p className="title">{article.description}</p>
                <div className="bottom">
                    <span>{article.date}</span>
                </div>
            </div>
            <span className="published">Publié</span>
        </div>
    )
}

Article.propTypes = {

}

export default Article