import React, {useContext} from 'react';
import { RestaurantContext } from '../../../context/RestaurantContext';

function MyPhotos(props) {
    const {photo} = props;
    const {setMyRestaurant} = useContext(RestaurantContext);

    function removePhoto() {

        setMyRestaurant((prevMyRestaurant) => {


            let items = {...prevMyRestaurant};
            let listPhotos = [...items.photos];


            const indexPhoto = listPhotos.findIndex(
                el => el._id === photo._id
            );

            listPhotos.splice(indexPhoto, 1);

            const updatedPhotos = { ...prevMyRestaurant, photos: listPhotos };
            items = updatedPhotos;

            return items;
        })
    }

    return (
        <div className="photo">
            <img src={photo.content} />
            <div className="hover">
                <i className="fal fa-trash-alt remove" onClick={() => removePhoto()}/>
                <div className="hover-bottom">
                    <div className="left"><i className="fal fa-heart heart" />{photo.likes}</div>
                    <div className="right"><i className="fal fa-comment-dots comment" />{photo.comments.length}</div>
                </div>
            </div>
        </div>
    )
}

MyPhotos.propTypes = {

}

export default MyPhotos
