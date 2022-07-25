import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../post/CreatePost";
import PostStandard from "../post/PostStandard";

import HomeSideBar from "../home/HomeSideBar";
import { UiContext } from "../../context/UiContext";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import Suggestions from "../suggestions/Suggestions";
import VenteFlash from "../post/VenteFlash";
import PromoTakTak from "../ads/PromoTakTak";
import MobileAppAd from "../ads/MobileAppAd";
import Reviews from "../post/Reviews";
import RestaurantBook from "../post/RestaurantBook";
import GesionResidus from "../post/GesionResidus";
import Stories from "../stories/Stories";
import { PersonalVideo } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
//  import Flickity from 'react-flickity-component'
// const Flickity = require('flickity');

function Home(props) {
  const { activeUser, getPosts } = useContext(UserContext);
  const { rFollowing } = useContext(UserContext);
  const { setFeed, feed } = useContext(PostContext);
  const [posts, setPosts] = useState(null);
  const [feedLoader, setFeedLoader] = useState(true);


  useEffect(() => {
    getPosts(setFeed).then((posts) => {
      console.log("feed then", posts);
      let arr = posts;
      setPosts(arr.sort((a, b) => {
	let na = new Date(a.createdAt) 
		let nb = new Date(b.createdAt)
	 return nb - na}));
      setFeedLoader(false);
    });
  }, [props]);

  

  console.log(feed, "feeeddd11");
  posts && console.log("postsees", posts);
  return (
    <div>
      <div className="feeds-page" id="feeds-page">
        <div className="feeds-page-content container">
          <div className="feeds-page-content-feed">
            <div className="feed-main">
              <div className="stories">
                <Stories />
              </div>
              <CreatePost setFeedLoader={setFeedLoader} />
              {/* {posts1 && posts1.relatedPosts && (
                <PostModal
                  data={posts1.relatedPosts}
                  index={indexOfClickedElement}
                  open={openModalPost}
                  handleClose={handleClosePostModal}
                />
              )} */}{" "}
              {feedLoader ? (
                <div
                 
                  style={{
					  display : "flex",
					  justifyContent:"center",
					  alignItems : "center",
                    marginBottom: "3rem",
                    border: "1px solid #e8e8e8",
                    boxShadow: " 2px 2px 2px rgb(0 0 0 / 5%)",
                    borderRadius: " 5px",
                    marginTop: "2rem",
					height : "30rem"
                  }}
                >
                  <CircularProgress
                    size={70}
                    thickness={1}
                    style={{ color: "#ff6900" }}
                  />{" "}
                </div>
              ) : (
                <div>
                  {posts &&
                    posts.map((post) => (
                      <PostStandard post={post} user={activeUser} />
                    ))}{" "}
                </div>
              )}
              {/* <VenteFlash
                post={posts[2]}
                user={activeUser}
                rfollowingList={rFollowing}
              /> */}
              <Suggestions />
              <RestaurantBook />
              <MobileAppAd />
              <Reviews />
              <PromoTakTak />
              <hr className="separator" />
              <GesionResidus />
            </div>
            <HomeSideBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
