import React, { useState, useEffect, useContext } from "react";

import { Button, Card, Collapse, List } from "@material-ui/core";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";

function LikeButton(props) {
	const { post, user } = props;
	const id = post && post._id;
	console.log("djdjdqsjd", post.likes);
	const postLikeid = post && post.likes && post.likes.map((likes) => likes._id);
	console.log(postLikeid, "jeKK");
	console.log(user, "USER", post, "POST");
	// const likes= post && post.relatedPosts && post.relatedPosts.likes &&  post.relatedPosts.likes.map((likes)=>likes._id);
	// console.log(likes,"LikesId");

	const { activeUser } = useContext(UserContext);
	const { createPostLike, getPostLikes, deletePostLike } =
		useContext(PostContext);
	const [liked, setLiked] = useState(false);
  let likes;
   likes=post && post.likes &&  post.likes.length
  console.log(likes,"ddeeee")
 const [likeslength, setLikeslength] = useState(likes)
  
	function likePost() {
		createPostLike(activeUser.userId, post._id);
		setLiked(true);
    	setLikeslength((prev) => (prev+1));
	};

	function dislikePost() {
		postLikeid && deletePostLike(postLikeid[0]);
		setLiked(false);
    	setLikeslength((prev) => (prev-1));
	};

	useEffect(() => {
		if (
			activeUser &&
			activeUser.userId &&
			post.likes &&
			post.likes.find((like) => like.userId === activeUser.userId)
		) {
			setLiked(true);
			console.log("likes",liked)
		} else setLiked(false);
	}, [activeUser, post.likes]);

	const likeButton = liked ? (
		<i  className="icon-heart" onClick={dislikePost}> </i>
	) : (
		<i style={{color : "lightgrey"}} className="icon-heart" onClick={likePost}> </i>
	);

	return (
		<Button>
			{likeButton}
      		<span style={{ fontSize: "2.2rem" }}>
				{likeslength}
			</span>
		</Button>
	);
}

export default LikeButton;
