import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import client from "../apollo/client";
import {
  POST_COMMENTS_BY_POST_ID,
  CREATE_POST_COMMENT,
  DELETE_POST_COMMENT,
  UPDATE_POST_COMMENT,
  CREATE_POST_LIKE,
  POST_LIKES,
  DELETE_POST_LIKE,
  GET_POST_BY_ID,
  CREATE_RATING,
  GET_RATINGS_BY_USERID,
  UPDATE_RATING,
} from "../graphql/post/post";
import { GET_USER } from "../graphql/user/user";
import { GET_RESTAURANT } from "../graphql/restaurant/restaurant";

const PostContext = React.createContext();

function PostContextProvider({ children }) {
  async function getComments(id, setData) {
    let arr;
    await client
      .query({
        query: POST_COMMENTS_BY_POST_ID,
        variables: {
          postId: id,
        },
      })
      .then(async (data) => {
        if (data.data.postComments) {
          console.log("data22", data);
          // setData(data.data.postComments);

          arr = await data.data.postComments.map(async (comment) => {
            let item = {};

            if (comment.handlerType && comment.handlerType === "USER") {
              return await client
                .query({
                  query: GET_USER,
                  variables: {
                    id: comment.handlerId,
                  },
                })
                .then(async (user) => {
                  console.log("UserDetail", user);
                  let userDetails;
                  userDetails = {
                    _id: user.data.user._id,
                    firstName: user.data.user.firstName,
                    avatar: user.data.user.avatar,
                  };
                  item = { ...comment, user: userDetails };
                  return item;
                });
            } else if (
              comment.handlerType &&
              comment.handlerType === "RESTAURANT"
            ) {
              return await client
                .query({
                  query: GET_RESTAURANT,
                  variables: {
                    id: comment.handlerId,
                  },
                })
                .then(async (data) => {
                  console.log("restayrant comment detail", data);
                  const RestaurantDetails = {
                    _id: data.data.restaurant._id,
                    name: data.data.restaurant.name,
                    description: data.data.restaurant.description,
                    location: data.data.restaurant.location,
                    avatar: data.data.restaurant.avatar,
                  };
                  item = { ...comment, user: RestaurantDetails };
                  return item;
                });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err, "error load ");
      });
    arr = await Promise.all(arr);

    setData(arr);
    return arr;
  }

  async function createComment(
    handlerType,
    handlerId,
    postId,
    content,
    setData
  ) {
    const data = {
      handlerType: handlerType,
      handlerId: handlerId,
      postId: postId,
      content: content,
    };
    await client
      .mutate({
        mutation: CREATE_POST_COMMENT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("PostCommentData", data);
        // setData(data.data.createPostComment);
      })
      .catch((err) => {
        console.log(err, "error create Comment");
      });
  }
  async function updateComment(commentId, content, setData) {
    const data = {
      content,
    };
    await client
      .mutate({
        mutation: UPDATE_POST_COMMENT,
        variables: {
          _id: commentId,
          input: data,
        },
      })
      .then(async (data) => {
        console.log(data);
        setData((comments) => {
          return {
            ...comments,
            content: data.data.updatePostComment.content,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function deleteComment(id, setData, comments, setCommentsLength) {
    await client
      .mutate({
        mutation: DELETE_POST_COMMENT,
        variables: {
          _id: id,
        },
      })
      .then(async (data) => {
        console.log("true", data.data.deletePostComment);
        if (data.data.deletePostComment && comments) {
          var array = [...comments];
          let tab = array.map((el) => el._id);
          var index = tab.indexOf(id);
          if (index != -1) array.splice(index, 1);
          setData(array);
          setCommentsLength(array.length);
        }
      })
      .catch((err) => {
        console.log(err, "error delete Comment");
      });
  }

  async function createPostLike(userId, postId) {
    const data = {
      userId: userId,
      postId: postId,
    };
    await client
      .mutate({
        mutation: CREATE_POST_LIKE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("PostLike", data.data.createPostLike);
      });
  }
  async function getPostLikes(postId, setData) {
    const data = {
      postId: postId,
    };
    await client
      .query({
        query: POST_LIKES,
        variables: {
          postId: data,
        },
      })

      .then(async (data) => {
        console.log("data", data);
        setData(data.data.postLikes);
        return data;
      });
  }
  async function deletePostLike(id, setData, likes) {
    await client
      .mutate({
        mutation: DELETE_POST_LIKE,
        variables: {
          _id: id,
        },
      })
      .then(async (data) => {
        console.log("true", data.data.deletePostLike);
        if (data.data.deletePostLike && likes) {
          var array = [...likes];
          let tab = array.map((el) => el._id);
          var index = tab.indexOf(id);
          if (index != -1) likes.splice(index, 1);
          setData(array);
        }
      })
      .catch((err) => {
        console.log(err, "error delete Comment");
      });
  }
  async function getPostById(id, setData) {
    await client
      .query({
        query: GET_POST_BY_ID,
        variables: {
          _id: id,
        },
      })

      .then(async (data) => {
        console.log("data", data);
        setData(data.data.postById);
        return data;
      });
  }
  const [feed, setFeed] = useState(null);
  async function getPostByIdFromFeed(id) {
    console.log(feed, "feed");
    if (feed) return feed.find((el) => el._id == id);
  }

  async function createRating(
    evaluatedId,
    ratingType,
    rateValue,
    comment,
    setLoading,
    setShowModal
  ) {
    const data = {
      evaluatedId: evaluatedId,
      ratingType: ratingType,
      rateValue: rateValue,
      comment: comment,
    };
    setLoading(true);
    await client
      .mutate({
        mutation: CREATE_RATING,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("rating created", data.data);
        setLoading(false);
        setShowModal(false);
      });
  }

  async function getRatingsByUserId(id, setData) {
    await client
      .query({
        query: GET_RATINGS_BY_USERID,
        variables: {
          userId: id,
        },
      })

      .then(async (data) => {
        console.log("GET_RATINGS_BY_USERID", data);
        setData(data.data.ratingsByUserId);
      });
  }

  async function updateRating(
    ratingId,
    rateValue,
    comment,
    setLoading,
    setShowModal
  ) {
    const data = {
      rateValue: rateValue,
      comment: comment,
    };
    await client
      .mutate({
        mutation: UPDATE_RATING,
        variables: {
          _id: ratingId,
          input: data,
        },
      })
      .then(async (data) => {
        console.log("rating updated", data.data);
        setLoading(false);
        setShowModal(false);
      });
  }
  return (
    <PostContext.Provider
      value={{
        getComments,
        createComment,
        deleteComment,
        updateComment,
        createPostLike,
        getPostLikes,

        feed,
        setFeed,
        getPostByIdFromFeed,
        deletePostLike,
        getPostById,
        createRating,
        getRatingsByUserId,
        updateRating,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export { PostContextProvider, PostContext };
