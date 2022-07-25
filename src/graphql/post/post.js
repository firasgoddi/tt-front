import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      _id
      media
      content
      relatedPosts {
        _id
        media
      }
    }
  }
`;
export const CREATE_POST_MEDIA = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;
export const GET_FEED = gql`
  query postsFeed {
    postsFeed {
      _id
      createdAt
      userId
      title
      taggedRestaurant
      taggedUsers
      media
      postMediaType
      likes {
        _id
        userId
        createdAt
      }
      comments {
        _id
        handlerId
        postId
        handlerType
        content
        createdAt
        updatedAt
      }
      relatedPosts {
        _id
        userId
        createdAt
        media
        likes {
          _id
          userId
        }
        comments {
          _id
          createdAt
          handlerType
          handlerId
        }
        postMediaType
      }
    }
  }
`;
export const POST_COMMENTS_BY_POST_ID = gql`
  query postComments($postId: ID!) {
    postComments(postId: $postId) {
      _id
      postId
      content
      handlerType
      handlerId
      createdAt
    }
  }
`;
export const CREATE_POST_COMMENT = gql`
  mutation createPostComment($input: CreatePostCommentInput!) {
    createPostComment(input: $input) {
      _id
    }
  }
`;
export const DELETE_POST_COMMENT = gql`
  mutation deletePostComment($_id: ID!) {
    deletePostComment(_id: $_id)
  }
`;

export const UPDATE_POST_COMMENT = gql`
  mutation updatePostComment($_id: ID!, $input: UpdatePostInput) {
    updatePostComment(_id: $_id, input: $input) {
      _id
      content
      userId
    }
  }
`;

export const CREATE_POST_LIKE = gql`
  mutation createPostLike($input: CreatePostLikeInput!) {
    createPostLike(input: $input) {
      _id
      userId
      createdAt
      postId
    }
  }
`;

export const POST_LIKES = gql`
  query postLikes($postId: ID!) {
    postLikes(postId: $postId) {
      _id
      postId
      userId
      createdAt
    }
  }
`;

export const DELETE_POST_LIKE = gql`
  mutation deletePostLike($_id: ID!) {
    deletePostLike(_id: $_id)
  }
`;

export const GET_POST_BY_ID = gql`
  query postById($_id: ID!) {
    postById(_id: $_id) {
      _id
      userId
      title
      taggedRestaurant
      taggedUsers
      postMediaType
      likes {
        _id
        userId
        createdAt
      }
      comments {
        _id
        handlerId
        postId
        handlerType
        content
        createdAt
        updatedAt
      }
      relatedPosts {
        _id
        userId
        createdAt
        media
        likes {
          _id
          userId
        }
        comments {
          _id
          createdAt
          handlerId
          handlerType
        }
        postMediaType
      }
    }
  }
`;

export const CREATE_RATING = gql`
  mutation createRating($input: CreateRatingInput!) {
    createRating(input: $input)
     {
        _id
     }
    } 
`;

export const GET_RATINGS_BY_USERID = gql`
 query ratingsByUserId($userId: ID!) {
    ratingsByUserId(userId: $userId){
      _id
     ratingType
     evaluatedId
    rateValue
     comment 
    }
  }
`;

export const UPDATE_RATING = gql`
  mutation updateRating($_id: String, $input: UpdateRatingInput) {
    updateRating(_id: $_id, input: $input)
    
    } 
`;