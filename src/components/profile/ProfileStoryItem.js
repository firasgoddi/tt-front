import React from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";

import StorieFeedItem from "../stories/StorieFeedItem";
const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: 400,
    },
  }));
function ProfileStoryItem(props) {
    const {story,profileImage}=props
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div className="story" >
                <div className="story-image" >
                  <img onClick={handleOpen} src={profileImage} />
                </div>
                <span className="story-user">
                 {story.date}
                </span>

                <Modal
        style={{ zIndex: "99999999999999999999" }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div id="transition-modal-title">
            <StorieFeedItem />
          </div>
        </Fade>
      </Modal>
        </div>
    )
}

ProfileStoryItem.propTypes = {

}

export default ProfileStoryItem

