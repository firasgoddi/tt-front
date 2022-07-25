import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Collapse, List } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Picker from "emoji-picker-react";
import "react-dropzone-uploader/dist/styles.css";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Dropzone from "react-dropzone-uploader";
import { UserContext } from "../../context/UserContext";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { CallMerge } from "@material-ui/icons";
import "./createpost.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Multiselect from "./createPost/Multiselect";
const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const text = files.length > 0 ? "Add more files" : "Choose files";

  return (
    <div className="buttondiv">
      <label
        className="btnAddFiles"
        style={{
          cursor: "pointer",
          marginTop: 30,

          width: "13rem",
          height: "7rem",
          background: "#ff6900",
          fontWeight: "bold",
          fontSize: "1.6rem",
          color: "#484848",
          borderRadius: "5px",
          textAlign: "center",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {text}

        <input
          style={{ display: "none" }}
          type="file"
          accept={accept}
          multiple
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    </div>
  );
};

const CustomInput = ({ setUpload }) => {
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        setUpload(chosenFiles);
        console.log("chosenFiles", chosenFiles);
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  };
  function handleChangeStatus({ meta, file }, status) {
    console.log(status, meta, file);
  }
  return (
    <Dropzone
      onChangeStatus={handleChangeStatus}
      // accept="image/* video/*"
      InputComponent={Input}
      // maxSizeBytes={26,214,400}
      canRemove={true}
      getFilesFromEvent={getFilesFromEvent}
    />
  );
};
function CreatePost(props) {
  const [loading, setLoading] = useState(false);
  const [typeOfPoste, setTypeOfPost] = useState("1");
  const {
    activeUser,
    createPost,
    restaurants,
    setRestaurants,
    getUsers,
    createPostImage,
    createPostText,
    users,
    getRestaurants,
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [autocomplete, setAuto] = useState(null);
  const [options, setOptions] = useState([]);

  const [val, setVal] = useState({});
  const [postForm, setPostForm] = useState({
    content: "",
    taggedRestaurant: "",
    postType: "",
    title: "",
    media: "",
    taggedUser: [],
    postMediaType: "",
  });

  console.log(activeUser.userId, "userID");
  console.log("ss", restaurants);
  const handleOpen = () => {
    setOpen(!open);
    getRestaurants();
    restaurants && setOptions(restaurants);
    getUsers();

    users && setOptions(users);
  };
  function handleChange(e) {
    setPostForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    console.log("firas", postForm);
  }

  const handleAutocomplete = (event, newValue) => {
    console.log(
      "users tesrt",
      newValue.map((option) => option._id)
    );
    if (newValue != null) {
      console.log(
        "users tesrt",
        newValue.map((option) => option._id)
      );
      const p = newValue.map((option) => option._id);
      setAuto(newValue);
      // const tab=postForm.taggedUser.push(newValue[1]._id);
      // setPostForm((prev) => ({ ...prev, taggedRestaurant: newValue._id }));
      setPostForm((prev) => ({ ...prev, taggedUser: p }));
      console.log(postForm, "all");
    }
  };
  const handleAutocompleteRestaurant = (event, newValue) => {
    if (newValue != null) {
      console.log("djjd", newValue);

      setAuto(newValue);

      setPostForm((prev) => ({ ...prev, taggedRestaurant: newValue._id }));
    }
  };
  const [upload, setUpload] = useState([]);
  const handleSubmit = (files, allFiles) => {
    // console.log(  files.map((f) => f.meta));
    // allFiles.forEach((f) => f.remove());
    // console.log("upload",files)
    setUpload(allFiles);
  };

  const handleChangeDropZone = (allFiles) => {
    console.log("all files", allFiles.nativeEvent.target.files);
    setUpload(allFiles.nativeEvent.target.files);
    return true;
  };
  function handleClick(e) {
    setTypeOfPost(e.target.name);
    setOpen(!open);
  }

  function createComplete() {
    setLoading(false);
    setOpen(!open);
  }
  function submitPost() {
    setLoading(true);
    let postType = {
      content: "",
      taggedRestaurant: "",
      postType: "",
      title: "",
      taggedUser: [],
      postMediaType: "",
    };
    console.log(postType, "uplaod in submit");
    console.log(upload, "uploads");
    postType = postForm;

    if (upload.length === 0) {
      console.log("postFormTEXT", postType);

      postType.postType = "TEXT";
      console.log("postFormTEXT", postType.postType);
      postType.postMediaType = "";
      postType.media = "";
      createPostText(
        postType.taggedRestaurant,
        postType.title,
        postType.content,
        postType.postType
      ).then((data) => setLoading(false));
    }
    const objectFile = upload.map((type) => type.fileObject);
    console.log(objectFile, "iiii");
    if (upload.length === 1) {
      console.log("before post", postForm);
      const typeImage = upload.map((type) => type.type);
      console.log("jpg", typeImage);
      if (typeImage.indexOf("jpg")) {
        postType.postType = "MEDIA";
        postType.postMediaType = "IMAGE";
        console.log("After post", postType);
        postType.media = objectFile;
        createPostImage(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.postMediaType,
          postType.media
        ).then((data) => setLoading(false));
      } else {
        postType.media = objectFile;
        postType.postType = "MEDIA";
        postType.postMediaType = "VIDEO";
        console.log("After post", postType);

        createPostImage(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.postMediaType,
          postType.media
        ).then((data) => setLoading(false));
      }
    }
    if (upload.length > 1) {
      console.log("before post", postForm);
      const typeImage = upload.map((type) => type.type);
      console.log("jpg", typeImage);
      if (objectFile.indexOf("jpg")) {
        postType.media = objectFile;
        postType.postType = "ALBUM";
        postType.postMediaType = "IMAGE";
        console.log("After post", postType);

        createPost(
          postType.taggedRestaurant,
          postType.title,
          postType.content,
          postType.postType,
          postType.taggedUser,
          postType.postMediaType,
          postType.media
        ).then((data) => {
          createComplete();
        });
      }
    }

    setPostForm({
      content: "",
      taggedRestaurant: "",
      postType: "",
      title: "",
      media: "",
      taggedUser: [],
      postMediaType: "",
    });
    setUpload([]);
    setOpen(false);
    props.setFeedLoader(true);
  }

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [userFocused, setUserFocused] = useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const getUploadParams = () => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log("ss", status, meta);
  };

  useEffect(() => {
    console.log("postUpload", upload);
  }, [upload]);
  let input;
  if (typeOfPoste == "1") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div className="tabs-panel is-active" id="panel1">
          <div className="tab-one collapsed">
            <div>
              <div button onClick={handleOpen} className="tab-one-header">
                <input
                  type="text"
                  name="title"
                  placeholder="Dites quelques choses !"
                  className="input-post"
                  className="tab-one-header"
                  id="title"
                  value={postForm.title}
                  onChange={handleChange}
                />

                <i className="icon-camera" />
              </div>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Card style={{ padding: 10 }} className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                    value={postForm.content}
                    id="content"
                    onChange={handleChange}
                    name="content"
                  />
                  <div id="dropzone">
                    <CustomInput
                      setUpload={(files) => setUpload([...upload, ...files])}
                    />
                  </div>
                  <div className="tab-one-bottom">
                   
                      {users && (<Multiselect options={users} selectedOptions={postForm.taggedUser} handleMultiselect={(e,n) => handleAutocomplete(e,n)}labelText="identifier des amis"/>)}
                    
                      {restaurants && (
                        <Multiselect options={restaurants} selectedOptions={postForm} handleMultiselect={(e,n) => handleAutocompleteRestaurant(e,n)} labelText="identifier Restaurant"/>
                        
                      )}

                    {loading === false ? (
                      <button
                        disabled={!postForm.content && !postForm.title}
                        className="upload-now"
                        onClick={() => {
                          submitPost();
                        }}
                        className="upload-now"
                        style={{alignSelf:'flex-start'}}
                      >
                        Postez
                      </button>
                    ) : (
                      <CircularProgress
                        size={100}
                        thickness={1.6}
                        style={{ color: "#ff6900" }}
                      ></CircularProgress>
                    )}
                  </div>

                  {/* <div className="tab-one-bottom">
                    <div className="location-icon">
                      <i className="fal fa-location" />
                    </div>
                  </div> */}

                  <div></div>
                </Card>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (typeOfPoste == "2") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div id="panel2">
          <div className="tab-one collapsed">
            <div className="tab-one-header">
              <input
                button
                onClick={handleOpen}
                type="text"
                placeholder="Titre"
              />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card style={{ padding: 10 }} className="tab-one-body">
                <div className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                  />
                  <div id="dropzone6">
                    <span className="here">Déposer une photo ici</span>
                  </div>
                  <div className="tab-one-footer">
                    <div className="duration">
                      <span>Durée</span>
                      <span>00 : 00 : 00</span>
                    </div>
                    <button className="upload">Postez maintenant</button>
                  </div>
                </div>
              </Card>
            </Collapse>
          </div>{" "}
        </div>{" "}
      </div>
    );
  } else if (typeOfPoste == "3") {
    input = (
      <div className="tabs-content" data-tabs-content="feed-tabs">
        <div id="panel3">
          <div className="tab-one collapsed">
            <div className="tab-one-header">
              <input
                button
                onClick={handleOpen}
                type="text"
                placeholder="Titre"
              />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Card style={{ padding: 10 }} className="tab-one-body">
                <div className="tab-one-body">
                  <input
                    className="description"
                    type="text"
                    placeholder="Description"
                  />
                  <div id="dropzone7">
                    <span className="here">Déposer une photo ici</span>
                  </div>
                  <button className="upload-promo">Postez maintenant</button>
                </div>
              </Card>
            </Collapse>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", zIndex: 10 }}>
      <ul className="tabs feed-tabs" data-tabs id="feed-tabs">
        <li
          className={typeOfPoste == 1 ? "tabs-title is-active" : "tabs-title"}
        >
          <a
            name="1"
            aria-selected={typeOfPoste == 1 ? true : false}
            onClick={handleClick}
          >
            Post
          </a>
        </li>
        <li
          className={typeOfPoste == 2 ? "tabs-title is-active" : "tabs-title"}
        >
          <a
            data-tabs-target="panel2"
            name="2"
            aria-selected={typeOfPoste == 2 ? true : false}
            onClick={handleClick}
          >
            Vente Flash
          </a>
        </li>
        <li
          className={typeOfPoste == 3 ? "tabs-title is-active" : "tabs-title"}
        >
          <a
            data-tabs-target="panel3"
            name="3"
            aria-selected={typeOfPoste == 3 ? true : false}
            onClick={handleClick}
          >
            Promo
          </a>
        </li>
      </ul>

      {input}
    </div>
  );
}

CreatePost.propTypes = {};

export default CreatePost;
