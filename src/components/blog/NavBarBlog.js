import React, {useState} from 'react';

function NavBarBlog(props) {
  const [filter, setFilter] = useState("Voyage culinaire");
  const [styleSelected, setStyleSelected] = useState("tabs-title is-active");
  const [styleNotSelected, setStyleNotSelected] = useState("tabs-title");

  const filterPosts = (type) => {
    setFilter(type);
  };

    return (
        <div className="blog-header container">
            <ul className="tabs" data-tabs id="example-tabs">
              <span className="all-categories"> <i className="fal fa-caret-circle-down" /> Toutes les catégories</span>
              
              <li className= { filter === "Recettes" ? styleSelected : styleNotSelected }
                onClick={() => filterPosts("Recettes")}>
                <a 
                  //href="#panel1" aria-selected="true"
                  ><strong> Recettes</strong> (23)</a>
              </li>

              <li className={ filter === "Voyage culinaire" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("Voyage culinaire")}>
                <a 
                  //data-tabs-target="panel2" href="#panel2" className="voyage"
                  > <strong> Voyage culinaire</strong> (14)</a>
              </li>

              <li className={ filter === "Régime" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("Régime")}>
                <a 
                  //href="#panel1" aria-selected="true"
                  > <strong>Régime</strong> (31)</a>
              </li>

              <li className= { filter === "Desserts & Sucrés" ? styleSelected : styleNotSelected }
                 onClick={() => filterPosts("Desserts & Sucrés")}>
                <a 
                  //href="#panel1" aria-selected="true"
                  > <strong>Desserts &amp; Sucrés</strong> (12)</a>
              </li>

              <span className="most-valued">Les plus évalués<i className="fal fa-caret-down" /></span>
            </ul>
          </div>
    )
}

NavBarBlog.propTypes = {

}

export default NavBarBlog