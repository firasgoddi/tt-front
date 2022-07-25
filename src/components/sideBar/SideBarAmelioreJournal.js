import React from 'react';

function SideBarAmelioreJournal(props) {
    const {} = props;

    return (
        <div>
            <div className="title-feed-secondary">
                <span>Améliorer votre Journal</span>
            </div>
            <div className="list-to-dos">
                <div className="to-do-item">
                    <i className="fal fa-check-circle" />
                    <span className="to-do">Suivre 10 restaurants</span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" />
                    <span className="to-do">
                        Ajouter 10 personnes à ta liste d’amis
                    </span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" />
                    <span className="to-do">Poster ton premier story</span>
                </div>
                <div className="to-do-item">
                    <i className="fal fa-check-circle" />
                    <span className="to-do">Poster un article dans Blog</span>
                </div>
                <div className="show-missions">
                    <span>Afficher plus de missions</span>
                </div>
                <a className="list-to-dos-footer" href="taktak-points.html">
                    <span className="your-balance">Votre balance</span>
                    <div className="sold-wintak">
                        <span className="sold">367</span>
                        <span className="wintak">WinTak</span>
                    </div>
                    <div className="right">
                        <i className="fal fa-angle-right" />
                     </div>
                </a>
            </div> 
        </div>
    )
}

SideBarAmelioreJournal.propTypes = { }

export default SideBarAmelioreJournal