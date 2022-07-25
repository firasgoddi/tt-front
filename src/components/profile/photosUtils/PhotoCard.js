import React, { useContext } from "react";
import { UiContext } from "../../../context/UiContext";

function PhotoCard(props) {
  const { handleOpenPostModal } = useContext(UiContext);
  const content = props.photos;
  
  return (
    <div className="photo" style={{ cursor: "pointer" }}  onClick={(e) => {handleOpenPostModal(e, content, props.photo.item)}}>
      <img button src={props.photo.item} />
      <div className="hover">
        <i className="fal fa-trash-alt remove" />
        <div className="hover-bottom">
          <div className="left">
            <i className="fal fa-heart heart" />
            {props.photo.likes}
          </div>
          <div className="right">
            <i className="fal fa-comment-dots comment" /> {props.photo.comments.length}
          </div>
        </div>
      </div>
    </div>
  );
}

PhotoCard.propTypes = {};

export default PhotoCard;
