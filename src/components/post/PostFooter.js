import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Collapse, GridList, GridListTile } from "@material-ui/core";

import CommentsBox from "./CommentsBox";
import AvatarUser from "../atoms/AvatarUser";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import AvatarRestaurant from "../atoms/AvatarRestaurant";
import Picker from "emoji-picker-react";
import { id } from "date-fns/locale";
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import LikeButton from "../post/LikeButton"
import { RestaurantContext } from "../../context/RestaurantContext";
function PostFooter(props) {
	const { myRestaurantsList } =
    useContext(RestaurantContext);
	const [openComments, setopenComments] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [anchorEmoji, setAnchorEmoji] = React.useState(null);
	const open = Boolean(anchorEl);
	const open2 = Boolean(anchorEmoji);
	const commentInputRef = useRef(null);
	const { activeUser } = useContext(UserContext);
	const [likes, setLikes] = useState();
	const [handler, setHandler] = useState()
	const { createComment, getComments, createPostLike, getPostLikes } =
		useContext(PostContext);

		const [selectedUser, setSelectedUser] = useState(activeUser)
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClickEmoji = (event) => {
		setAnchorEmoji(event.currentTarget);
	};


	console.log('pfselectedUser',selectedUser)
	const { post, user } = props;
	const id = props.post._id;
	console.log(id, "IDOFPOST");

	const [comments, setComments] = useState([]);
	useEffect(() => {
		likes && getPostLikes(id, setLikes);
	}, [post, setComments,setLikes]);

	const { content } = post;
	console.log(comments, "comments");
	// const [commentValueInput, setCommentValueInput] = useState({
	//     handlerType: selectedUser.__typename === "Restaurant" ? "RESTAURANT" : "USER",
	// 	handlerId: selectedUser.__typename === "Restaurant" ? selectedUser._id  :  selectedUser.userId,
	// 	content: "",
	// 	postId: id,
	// });
	const [commentValueInput, setCommentValueInput] = useState({
	    handlerType: "",
		handlerId: "",
		content: "",
		postId: id,
	});

	useEffect(() => {
		setCommentValueInput((prev) => {
			if(Object.keys(selectedUser).includes("__typename")) {
				return {...prev, handlerType:  "RESTAURANT" ,
				handlerId: selectedUser._id  }
			}
			else return {...prev, handlerType:  "USER" ,
			handlerId: selectedUser.userId  }
		})
	}, [selectedUser.avatar])
	const handleSubmit = (e) => {
		e.preventDefault();
		alert("you have searched for - " + commentValueInput);
		// or you can send data to backend
	};
	function handleOpenComments() {
		setopenComments(!openComments);
		getComments(id, setComments);
	}
	console.log(comments , 'botiishere<<')
	//emojihandler

	const [chosenEmoji, setChosenEmoji] = useState(null);
	const [emojiPicker, setEmojiPicker] = useState(false);
	const [message, setMessageForm] = useState("");
	const onEmojiClick = (event, emojiObject) => {
		const cursor = commentInputRef.current.selectionStart;
		const text =
			message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
		setMessageForm(text);
	};
	function emojiPickerOpen() {
		setEmojiPicker(!emojiPicker);
	}
	function handleChange(e, emojiObject) {
		setCommentValueInput((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
			
		console.log("dndn", commentValueInput);
	}

	let commentscount;
	commentscount= post && post.comments && post.comments.length ;
	const [commentsCount, setCommentsCount] = useState(commentscount)
	

	const handleClose = (el) => {
		console.log("aeae",el)
		setAnchorEl(null);
		setSelectedUser(el)
		setCommentValueInput((prev)=> ({...prev,handlerId : el._id, handlerType : "RESTAURANT"}))
		setAnchorEmoji(null);
		// if (chosenEmoji) {
		// 	const { emoji } = chosenEmoji;
		// 	console.log(emoji);
		// 	setCommentValueInput((prev) => prev.concat(emoji));
		// 	setChosenEmoji(null);
		// }
	};

function submit() {
	createComment(
		commentValueInput.handlerType,
		commentValueInput.handlerId,
		commentValueInput.postId,
		commentValueInput.content,
		setComments
	);
	let user ={}
	setCommentsCount((prev) => (prev+1));
			if (selectedUser.__typename==="Restaurant") 
	        	user = { _id: selectedUser._id,
				firstName: selectedUser.name,
				avatar: selectedUser.avatar}
	    else user = {
		_id: selectedUser.userId,
		firstName: selectedUser.firstName,
		avatar: selectedUser.avatar}
	
	
	setComments((prev)=>{
					return [...prev,  {createdAt: Date.now() , content : commentValueInput.content,  user : {...user} }]})
				
				setCommentValueInput({
					handlerId:  activeUser.userId ,
					content: "",
					postId: id,
				})
	
	// setCommentValueInput("")
}
	function onKeyUp(e) {
		if (e.charCode === 13 && commentValueInput.content !== "") {
			console.log("dd", commentValueInput);
			submit();
		}

		;
	}

	// function likePost() {
	// 	createPostLike(activeUser.userId,post._id);
	//  }
	//  let likesCount;
	//  likesCount=  post && post.likes &&  post.likes.length
	//  console.log("length",likesCount)
	//  useEffect(() => {
	// 	console.log("length22",likesCount)
		 
	//  }, [likesCount])
	return (
		<div className="post-card-footer">
			<div className="post-card-social-info">
				<div className="post-card-likes">
				{/* <i className="icon-heart"  onClick={()=>likePost()}/>
            <span className="likes-number">{post && post.likes.count}</span> */}
					<LikeButton user={user} post={post} />
				
				</div>
				<div className="post-card-comments">
			
					<i className="icon-comment" />
					
						<span className="comments-number">
							{commentsCount}
						</span>
				

					{commentsCount  ? <span
						button
						onClick={handleOpenComments}
						className="comments-show-more"
					>
						Afficher commentaires
					</span> : <span
						button
					
						className="comments-show-more"
						>
							
						</span> }
				</div>
				<div className="post-card-comment-button">
					<i className="icon-send"> </i>
				</div>
			</div>
			<div className="post-card-comment">
				<div className="post-card-comment-avatar">
					{/* <AvatarUser style={selectedUser.typeName==="Restaurant"?{borderRadius : "50%"} : {borderRadius : "50%"}} activeUser={selectedUser} link={false} /> */}

					<AvatarUser style={selectedUser.typeName==="Restaurant"?{borderRadius : "50%"} : {borderRadius : "50%"}} activeUser={selectedUser} link={false} />
			
					<ArrowDropDownIcon
						onClick={handleClick}
						fontSize="medium"
						className="fal fa-sort-down"
					/>

					<Menu
						id="fade-menu"
						anchorEl={anchorEl}
						keepMounted
						open={open}
						onClose={()=>handleClose(selectedUser)}
						TransitionComponent={Fade}
					>
						<MenuItem onClick={()=>handleClose(activeUser)}>
							<AvatarUser activeUser={user} link={false} />
						</MenuItem>

						{myRestaurantsList.map((el,index) => <MenuItem onClick={()=>{handleClose(el)}}>
							<AvatarRestaurant activeUser={el}  link={false}  />
						</MenuItem>)}
						
					</Menu>
				</div>
				<div className="post-card-comment-input">
					<input
						placeholder="Commenter ce post"
						className="post-card-comment-input-field"
						type="text"
						value={commentValueInput.content}
						ref={commentInputRef}
						onChange={handleChange}
						onKeyPress={onKeyUp}
						name="content"
					/>

					<div className="comment-options">
						<i className="icon-camera" />
						<i className="icon-smile" onClick={handleClickEmoji} />
						<Menu
							id="emoji"
							anchorEl={anchorEmoji}
							keepMounted
							open={open2}
							onClose={handleClose}
							TransitionComponent={Fade}
						>
							<MenuItem>
								<Picker
									onEmojiClick={onEmojiClick}
									disableAutoFocus={true}
									native
								/>
								{/* {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />} */}
							</MenuItem>
						</Menu>
					</div>
				</div>
			</div>

			<Collapse in={openComments} timeout="auto" unmountOnExit>
				{comments && <CommentsBox comments={comments} setComments={setComments} setCommentsCount = {setCommentsCount} />}
			</Collapse>
		</div>
	);
}

PostFooter.propTypes = {};

export default PostFooter;