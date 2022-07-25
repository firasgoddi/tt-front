import React from 'react';
import MyPhotos from './MyPhotos';
import PostPhoto from './PostPhoto';

function Photos(props) {
    const {restaurant} = props;

    return (
        <div className="tabs-panel is-active" id="panel1">
            <PostPhoto />
            <div className="my-photos">
                <div className="my-photos-top">
                    <span className="photos-top-ele active"><i className="icon-media" />Afficher tout</span>
                    <span className="photos-top-ele"><i className="icon-camera" />Vos photos</span>
                    <span className="photos-top-ele"><i className="icon-user-profile" />Photos de vous</span>
                </div>
                {restaurant.photos ? (
                    <div className="my-photos-bottom">
                        <div className="my-photos-bottom-header">
                            <span className="photos">Photos <strong>{restaurant.photos.length}</strong> </span>
                            <span>Les plus récents<i className="fal fa-sort-down" /></span>
                        </div>
                        <div className="my-photos-photos">
                            <div className="add-photos-border">
                                <div className="add-photos">
                                    <i className="fas fa-plus" />
                                </div>
                            </div>
                            {restaurant.photos.map((photo) => (
                                <MyPhotos photo={photo} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

Photos.propTypes = {

}

export default Photos