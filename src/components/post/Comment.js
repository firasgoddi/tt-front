import React, { useRef, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import AvatarUser from "../atoms/AvatarUser";
import { Typography } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Fade from "@material-ui/core/Fade";
import AvatarRestaurant from "../atoms/AvatarRestaurant";
import Picker from "emoji-picker-react";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { BlockRounded } from "@material-ui/icons";

import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { Avatar } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
function Comment(props) {
  const { activeUser } = useContext(UserContext);
  const { deleteComment, updateComment } = useContext(PostContext);
  const id = props.comment._id;
  const content = props.comment.content;
  const comment = props.comment;
  console.log(id, "h");

  function deleteC() {
    deleteComment(
      id,
      props.setComments,
      props.comments,
      props.setCommentsCount
    );
    handleClose();
  }
  function updateComments() {
    updateComment(id, content, comment);
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [props.comment]);
  console.log(props.comment, "content");
  return (
    <div className="who-comment">
      <div className="who-comment-info">
        {props.comment.user.avatar &&
        props.comment.handlerType === "RESTAURANT" ? (
          <img
            img
            src={`https://${props.comment.user.avatar}`}
            style={{
              borderRadius: "2px !important",
              marginBottom: "4px",
              marginRight: "4px",
            }}
          />
        ) : (
          <img
            img
            src={`https://${props.comment.user.avatar}`}
            style={{
              borderRadius: "50% !important",
              marginBottom: "4px",
              marginRight: "4px",
            }}
          />
        )}
        <span className="who-comment-info-username">
          {props.comment.handlerType === "USER"
            ? props.comment.user.firstName
            : props.comment.user.name}
        </span>
        <span
          style={{
            marginLeft: "15px",
            fonWeight: "italic",
            fontSize: "1.2rem",
            color: "grey",
          }}
        >
          {moment(props.comment.createdAt).fromNow()}
          <br />
        </span>
        {activeUser && activeUser.userId === props.comment.handlerId && (
          <div className="user-who-post-options">
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <div className="more-options">
                    <i
                      className="icon-dots-horizontal"
                      style={{ fontSize: "3px",float: 'right' }}
                      {...bindTrigger(popupState)}
                    />
                  </div>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <Box style={{ height: 60, width: 120 }}>
                      <Grid container direction="row">
                        <Grid item xs={3}></Grid>

                        <Grid item xs={8}>
                          <Typography
                            style={{
                              fontSize: 14,
                              marginTop: 5,
                              marginButtom: 10,
                            }}
                            button
                          >
                            Modifier
                          </Typography>
                          <Typography
                            style={{
                              fontSize: 14,
                              marginTop: 5,
                              marginButtom: 10,
                            }}
                            onClick={() => handleClickOpen()}
                          >
                            Supprimer
                          </Typography>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <Typography variant="h5">
                              Supprimer le commentaire
                            </Typography>
                            <DialogContent>
                              <Typography>
                                Souhaitez-vous vraiment supprimer ce commentaire
                                ?
                              </Typography>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Annuler
                              </Button>
                              <Button
                                onClick={deleteC}
                                color="primary"
                                autoFocus
                              >
                                Supprimer
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </Grid>
                      </Grid>
                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
        )}

        <span style={{ fontSize: "1.4rem" }}>{comment.content}</span>
      </div>
    </div>
  );
}
Comment.propTypes = {};

export default Comment;
