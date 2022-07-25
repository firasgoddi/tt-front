import React, { useState, useContext, useRef, useEffect } from "react";
import { Collapse, GridList, GridListTile } from "@material-ui/core";
import { UiContext } from "../../context/UiContext";
import CommentsBox from "./CommentsBox";
import PostFooter from "./PostFooter";
import { InView } from "react-intersection-observer";
import FollowButton from "./FollowButton";
import { UserContext } from "../../context/UserContext";

import UnfollowButton from "./UnfollowButton";
import { NavLink } from "react-router-dom";

import "./post.css";
function PostStandard(props) {
  const { post, user } = props;
  // const { content, comments } = post;
  console.log(props);
  const { handleOpenPostModal } = useContext(UiContext);
  const { rFollowing, following, activeUser } = useContext(UserContext);
  const [tab, setTab] = useState([]);
  // useEffect(() => {
  //   console.log("plus one following");
  // }, [following, rFollowing]);
  // if(following && rFollowed){

  let tabRestaurant;

  function buttonDisplayFollow() {
    if (following && rFollowing) {
      const tabIds = following.concat(rFollowing);
      let tab = [];
      console.log(tabIds, "tab concat");
      if (tabIds) {
        tab = tabIds.map((el) => el._id);
      }

      return tab.includes(post.userId) || tab.includes(post.taggedRestaurant);
    }

    return false;
  }

  function RenderItem(param) {
    const {
      mediaPlayerRunning,
      setTimelineVideoRunning,
      setMediaPlayerRunning,
    } = useContext(UiContext);

    const postVideo = useRef(null);

    const handlePauseVideo = () => {
      postVideo.current.pause();
    };

    useEffect(() => {
      if (mediaPlayerRunning) {
        if (postVideo.current) {
          handlePauseVideo();
        }
      }
    }, [mediaPlayerRunning]);

    const onPlaying = () => {
      setMediaPlayerRunning(false);
      setTimelineVideoRunning(true);
    };

    switch (param.postMediaType) {
      case "IMAGE":
        return (
          <img
            style={{ cursor: "pointer" }}
            button
            src={`https://${param.media}`}
          />
        );
      case "VIDEO":
        return (
          <InView
            as="div"
            style={{ width: "100%" }}
            onChange={handlePauseVideo}
          >
            <video
              ref={postVideo}
              width={"100%"}
              height={"100%"}
              light={true}
              poster={param.videoThumbNail}
              style={{ zIndex: 1, height: "100%", width: "100% !important" }}
              controls
              onPlay={() => onPlaying()}
            >
              <source src={`https://${param.media}`} type="video/mp4" />
            </video>
          </InView>
        );

      default:
        return null;
    }
  }
  console.log(post.relatedPosts, "kkdddeee");
  console.log("brassommik", post);
  const postsMedia = post.relatedPosts;

  const renderPost = (param) => {
    if (param && param.length) {
      switch (param.length) {
        case 1:
          return (
            <GridList cellHeight={"auto"} cols={1}>
              {param.map((el) => (
                <GridListTile key={param._id}>{RenderItem(el)}</GridListTile>
              ))}
            </GridList>
          );
        case 2:
          return (
            <GridList cellHeight={"auto"} cols={2}>
              {param.map((el) => (
                <GridListTile key={param._id}>
                  {" "}
                  <NavLink exact to={`/posts/${post._id}`}>
                    {RenderItem(el)}
                  </NavLink>
                </GridListTile>
              ))}
            </GridList>
          );

        case 3:
          return (
            <div className="card post-card" style={{ height: "auto" }}>
              <div className="post-card-header">
                <div className="post-card-photo more" />
                <div className="post-photos">
                  <div className="post-photo-container photo-one">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[0])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[1])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[2])}
                    </NavLink>
                    <div className="more-photos ">{/* <span>+ 3</span> */}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return (
            <div className="card post-card" style={{ height: "auto" }}>
              <div className="post-card-header">
                <div className="post-card-photo more" />
                <div className="post-photos">
                  <div className="post-photo-container photo-one">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[0])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[1])}
                    </NavLink>
                  </div>
                  <div className="post-photo-container">
                    <NavLink exact to={`/posts/${post._id}`}>
                      {" "}
                      {RenderItem(param[2])}
                    </NavLink>
                    <div className="more-photos last-photo">
                      <span> + {param.length - 2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

        // default:
        //   return (
        //     <div className="post-card" style={{marginBottom: "3rem" ,     border: "1px solid #e8e8e8",
        //     boxShadow:" 2px 2px 2px rgb(0 0 0 / 5%)",
        //     borderRadius:" 5px",
        //     marginTop: '2rem'}}>
        //       <div className="post-card-header">
        //         <div className="post-card-photo more" />
        //         <div className="post-photos">
        //           <div className="post-photo-container photo-one">
        //             {RenderItem(param[0])}
        //           </div>
        //           <div className="post-photo-container">
        //             {RenderItem(param[1])}
        //           </div>
        //           <div className="post-photo-container">
        //             {RenderItem(param[2])}
        //             <div
        //               className="more-photos last-photo"
        //               button
        //               onClick={(e) => handleOpenPostModal(e, param)}
        //               style={{ cursor: "pointer" }}
        //             >
        //               <span>+ {param.length - 3}</span>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   );
      }
    }
  };

  console.log("finalPost", post);

  // const finalPostMedia=post && post.map((post)=>post.media)
  // console.log("finalPostMedia",finalPostMedia);
  return (
    <div>
      {post && post.user && post.title && (
        <div
          className="post-card"
          style={{
            marginBottom: "3rem",
            border: "1px solid #e8e8e8",
            boxShadow: " 2px 2px 2px rgb(0 0 0 / 5%)",
            borderRadius: " 5px",
            marginTop: "2rem",
          }}
        >
          <div className="post-card-header">
            <div className="post-card-photo">
              {post.relatedPosts
                ? renderPost(post.relatedPosts)
                : renderPost([
                    {
                      comments: post.comments,
                      likes: post.likes,
                      media: post.media,
                      postMediaType: post.postMediaType,
                    },
                  ])}
            </div>
          </div>
          <div className="post-card-body">
            <div className="user-who-post-wrapper">
              <div className="user-who-post">
                <div className="user-who-post-info">
                  <div className="user-who-post-info-avatar">
                    <img src={`https://${post.user.avatar}`} />
                  </div>
                  <div className="user-who-post-info-info">
                    <span className="user-username">{post.user.firstName}</span>
                    <div className="user-about">
                      <i className="fal fa-map-marker-alt" aria-hidden="true" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                </div>
                {activeUser.userId === post.userId ? (
                  <></>
                ) : buttonDisplayFollow() ? (
                  <UnfollowButton user={activeUser} post={post} />
                ) : (
                  <FollowButton user={activeUser} post={post} />
                )}
              </div>
              <div className="post-card-body-description">{post.title}</div>
            </div>
          </div>
          <div className="divider" />

          <PostFooter post={post} user={user} />
        </div>
      )}
    </div>
  );
}

PostStandard.propTypes = {};

export default PostStandard;
