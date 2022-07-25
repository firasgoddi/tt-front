import React, { useState, useEffect } from "react";

import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { Redirect, useHistory } from "react-router-dom";
import {
  GET_USER_Followers,
  GET_USER,
  GET_USERS,
  GET_USER_FOLLOWING,
  RESTAURANT_FOLLOWED_BY_USERID,
  FOLLOW_USER_USER,
  FOLLOW_USER_RESTAURANT,
  UNFOLLOW_USER,
  UNFOLLOW_RESTAURANT,
  UPDATE_AVATAR,
  GET_CHECKINS_BY_USERID,
  GET_USER_FOLLOWERS_BY_USERID,
  GET_USER_FOLLOWING_BY_USERID,
  IS_FOLLOWING,
  GET_COMMANDES_BY_USERID,
  CREATE_COMMANDE,
  GET_UNWASTABLES,
  CREATE_UNWASTABLE_COMMANDE,
} from "../graphql/user/user";
import {
  GET_RESTAURANT,
  GET_RESTAURANTS,
  GET_RESTAURANT_FOLLOWERS,
  GET_RESTAURANT_FOLLOWING,
} from "../graphql/restaurant/restaurant";
import { LOAD_ME, UPDATE_USER } from "../graphql/auth/mutations";

import client from "../apollo/client";
import {
  CREATE_POST,
  CREATE_POST_MEDIA,
  GET_FEED,
  GET_POSTS,
} from "../graphql/post/post";
import { formatError } from "graphql";

const UserContext = React.createContext();

function UserContextProvider({ children }) {
  const history = useHistory();
  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [userFollowing, setUserFollowing] = useState(null);
  const [rFollowing, setrFollowing] = useState(null);
  const [userRestaurantFollowing, setUserRestaurantFollowing] = useState(null);
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [myRestaurantsList, setMyRestaurantsList] = useState(null);
  const [restoFollowers, setRestoFollowers] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticationError, setAuthenticationError] = useState(null);
  const [authenticationSuccess, setAuthenticationSuccess] = useState(null);
  const [myCheckins, setMyCheckins] = useState(null);
  const [posts, setPosts] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [users, setUsers] = useState(null);
  const [unwastable, setUnwastable] = useState();
  const [usersCache, setUsersCache] = useState({});
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "",
    password: "",
    verifiedPassword: "",
    token: "",
  });

  const [errors, setErrors] = useState({
    signUpError: null,
    loginError: null,
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    verifiedPassword: null,
    tokenError: null,
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remeberMe: false,
    keepMe: false,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [commande, setCommande] = useState({
    ownerFirstname: "",
    ownerLastName: "",
    articlesId: [],
    ownerPhoneNumber: "",
    ownerEmail: "",
    userId: "",
    adresse1: "",
    adresse2: "",
    description: "",
    commandeTakenMethod: "",
    paymentMethod: "",
    restaurantId: "",
    total_price: 0,
    quantity: [],
    articleOptions: [[]],
  });
  const [commandeUnwastable, setCommandeUnwastable] = useState({
    ownerFirstname: "",
    ownerLastName: "",
    articlesId: [],
    ownerPhoneNumber: "",
    ownerEmail: "",
    userId: "",
    adresse1: "",
    adresse2: "",
    description: "",
    paymentMethod: "",
    restaurantId: "",
    total_price: 0,
    quantity: [],
    unwastableMenuIds: [],
  });
  const [myCommandes, setMyCommandes] = useState(null);
  const [myCommande, setMyCommande] = useState([]);
  const [loadCommande, setLoadCommande] = useState(false);
  function toggleAuthentication() {
    setIsAuthenticated(!isAuthenticated);
  }
  async function getFollowers() {
    await client
      .query({
        query: GET_USER_Followers,
      })
      .then((data) => {
        data && setFollowers(data.data.userFollowers);
        console.log("followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getUsers() {
    await client
      .query({
        query: GET_USERS,
      })
      .then(async (data) => {
        (await data) && setUsers(data.data.users);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getFollowersByUserId(id) {
    await client
      .query({
        query: GET_USER_FOLLOWERS_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        data && setUserFollowers(data.data.followerByUserId);
        console.log("otherUserFollowers", data);
        // console.log("followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowing(id, isntme) {
    await client
      .query({
        query: GET_USER_FOLLOWING,
      })
      .then((data) => {
        data && setFollowing(data.data.userFollowing);
        console.log("following list", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowingByUserId(id) {
    await client
      .query({
        query: GET_USER_FOLLOWING_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        data && setUserFollowing(data.data.followingByUserId);
        console.log("otherUserFollowing", data);
        // console.log("followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getUserRestaurantFollowed(id) {
    await client
      .query({
        query: RESTAURANT_FOLLOWED_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        console.log("data", data);
        setrFollowing(data.data.restaurantsFollowedByUserId);
        //setRFollowed(data.data.restaurantsFollowedByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getRestaurantFollowers(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWERS,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurantd followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getRestaurantFollowing(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWING,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurant followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function Followuser(id) {
    await client
      .mutate({
        mutation: FOLLOW_USER_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        console.log(data);
        console.log(data.data.followUser.userId, "idFOLLOW");
        /*setFollowers(data.data.userFollowers)*/
        await client
          .query({
            query: GET_USER,
            variables: {
              id: data.data.followUser.userId,
            },
          })
          .then((data) => {
            console.log("mutationuserFollower", data);
            const userDetails = {
              _id: data.data.user._id,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              avatar: data.data.user.avatar,
            };

            following &&
              setFollowing((prevState) => [...prevState, userDetails]);
          })
          .catch((err) => {
            console.log(err, "error load me on follow action");
          });
      });
  }
  async function FollowRestaurant(id, restoId) {
    const data = {
      restaurantId: id,
      followerId: restoId,
    };
    await client
      .mutate({
        mutation: FOLLOW_USER_RESTAURANT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log(data);
        console.log(data.data.followRestaurant.restaurantId, "idRestoFOLLOW");
        await client
          .query({
            query: GET_RESTAURANT,
            variables: {
              id: data.data.followRestaurant.restaurantId,
            },
          })
          .then(async (data) => {
            console.log("mutationuserFollower", data);
            const RestaurantDetails = {
              _id: data.data.restaurant._id,
              name: data.data.restaurant.firstName,
              description: data.data.restaurant.description,
              location: data.data.restaurant.location,
              avatar: data.data.restaurant.avatar,
            };

            // following && setFollowing((prevState) => [...prevState, userDetails]);

            rFollowing &&
              setrFollowing((prevState) => [...prevState, RestaurantDetails]);
            console.log("New Restaurant Follower", rFollowing);
          });
      });
  }
  async function unfollowUser(id) {
    await client
      .mutate({
        mutation: UNFOLLOW_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        console.log("dk", data);
        console.log(following, "DDDDD");
        if (data.data.unfollowUser && following) {
          var array = [...following];
          let tab = array.map((el) => el._id);
          console.log(tab, "III");
          var index = tab.indexOf(tab[0]);
          if (index != -1)
            //  following.splice(index,1)
            setFollowing((prev) => {
              return [...prev].splice(index, 1);
            });
        }
      })

      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getFollowersByUserId(id) {
    await client
      .query({
        query: GET_USER_FOLLOWERS_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        data && setUserFollowers(data.data.followerByUserId);
        console.log("otherUserFollowers", data);
        // console.log("followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowing(id, isntme) {
    await client
      .query({
        query: GET_USER_FOLLOWING,
      })
      .then((data) => {
        data && setFollowing(data.data.userFollowing);
        console.log("following list", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getFollowingByUserId(id) {
    await client
      .query({
        query: GET_USER_FOLLOWING_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        data && setUserFollowing(data.data.followingByUserId);
        console.log("otherUserFollowing", data);
        // console.log("followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getUserRestaurantFollowed(id) {
    await client
      .query({
        query: RESTAURANT_FOLLOWED_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        console.log("data", data);
        setrFollowing(data.data.restaurantsFollowedByUserId);
        //setRFollowed(data.data.restaurantsFollowedByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getRestaurantFollowers(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWERS,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurantd followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getRestaurantFollowing(id) {
    await client
      .query({
        query: GET_RESTAURANT_FOLLOWING,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("Restaurant followers", data);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function Followuser(id) {
    await client
      .mutate({
        mutation: FOLLOW_USER_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        console.log(data);
        console.log(data.data.followUser.userId, "idFOLLOW");
        /*setFollowers(data.data.userFollowers)*/
        await client
          .query({
            query: GET_USER,
            variables: {
              id: data.data.followUser.userId,
            },
          })
          .then((data) => {
            console.log("mutationuserFollower", data);
            const userDetails = {
              _id: data.data.user._id,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              avatar: data.data.user.avatar,
            };

            following &&
              setFollowing((prevState) => [...prevState, userDetails]);
          })
          .catch((err) => {
            console.log(err, "error load me on follow action");
          });
      });
  }
  async function FollowRestaurant(id, restoId) {
    const data = {
      restaurantId: id,
      followerId: restoId,
    };
    await client
      .mutate({
        mutation: FOLLOW_USER_RESTAURANT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log(data);
        console.log(data.data.followRestaurant.restaurantId, "idRestoFOLLOW");
        await client
          .query({
            query: GET_RESTAURANT,
            variables: {
              id: data.data.followRestaurant.restaurantId,
            },
          })
          .then(async (data) => {
            console.log("mutationuserFollower", data);
            const RestaurantDetails = {
              _id: data.data.restaurant._id,
              name: data.data.restaurant.firstName,
              description: data.data.restaurant.description,
              location: data.data.restaurant.location,
              avatar: data.data.restaurant.avatar,
            };

            // following && setFollowing((prevState) => [...prevState, userDetails]);

            rFollowing &&
              setrFollowing((prevState) => [...prevState, RestaurantDetails]);
            console.log("New Restaurant Follower", rFollowing);
          });
      });
  }
  async function unfollowUser(id) {
    await client
      .mutate({
        mutation: UNFOLLOW_USER,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        console.log("dk", data);
        console.log(following, "DDDDD");
        if (data.data.unfollowUser && following) {
          var array = [...following];
          let tab = array.map((el) => el._id);
          console.log(tab, "III");
          var index = tab.indexOf(tab[0]);
          if (index != -1)
            //  following.splice(index,1)
            setFollowing((prev) => {
              return [...prev].splice(index, 1);
            });
        }
      });
    console.log(following, "kff");
  }

  async function getRestaurants() {
    await client
      .query({
        query: GET_RESTAURANTS,
      })

      .then(async (data) => {
        console.log("restaurants11", data);
        (await data) && setRestaurants(data.data.restaurants);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }
  async function getPosts(a) {
    let arr;
    await client
      .query({
        query: GET_FEED,
      })
      .then(async (data) => {
        console.log("POSTS", data);
        a(data.data.postsFeed);

        arr = await data.data.postsFeed.map(async (post) => {
          let item = {};
          return await client
            .query({
              query: GET_USER,
              variables: {
                id: post.userId,
              },
            })
            .then(async (user) => {
              console.log("UserDetail", user);
              const UserDetails = {
                _id: user.data.user._id,
                firstName: user.data.user.firstName,
                avatar: user.data.user.avatar,
              };
              item = { ...post, user: UserDetails };
              return item;
            })
            .catch((err) => {
              console.log(err, "err");
            });
        });
      });

    arr = await Promise.all(arr);
    return arr;
  }
  async function unFollowRestaurant(id) {
    await client
      .mutate({
        mutation: UNFOLLOW_RESTAURANT,
        variables: {
          actionId: id,
        },
      })
      .then(async (data) => {
        //Remove Restaurant Following
      });
  }

  async function loaduser() {
    const accessToken = localStorage.getItem("accessToken");
    await client
      .query({
        query: LOAD_ME,
        context: {
          headers: {
            "access-token": accessToken,
          },
        },
      })
      .then((data) => {
        setIsAuthenticated(true);
        console.log(data);
        setActiveUser((user) => {
          return {
            ...user,
            avatar: data.data.me.avatar,
            userId: data.data.me._id,
            local: data.data.me.local,
            firstName: data.data.me.firstName,
            lastName: data.data.me.lastName,
            gender: data.data.me.gender,
            tags: data.data.me.tags,
            uFollowersCount: data.data.me.uFollowersCount,
            rFollowersCount: data.data.me.rFollowersCount,
            uFollowsCount: data.data.me.uFollowsCount,
            description: data.data.me.description,
            birthDate: data.data.me.birthDate,
            phoneNumber: data.data.me.phoneNumber,
            location: data.data.me.location,
            city: data.data.me.city,
            languages: data.data.me.languages,
            photos: data.data.me.photos,
            stories: data.data.me.stories,
            followers: data.data.me.followers,
            following: data.data.me.following,
            // resetPasswordToken: String
            // resetPasswordExpires: Float
            fullName: data.data.me.fullName,
            // isVerified: Boolean!
            // isOnline: Boolean!
            // isLocked: Boolean!
            // reason: String!
            // isActive: Boolean!
            // stripeId: String
            // type: UserType!
            // ccLast4: String
            // createdAt: String
            // updatedAt: String
            // deletedAt: String
          };
        });
        getFollowing(data.data.me._id);
        let id = data.data.me._id;
        return id;
      })

      .then(async (id) => {
        getFollowers(id);
        return id;
      })
      .then(async (id) => {
        getUserRestaurantFollowed(id);
        return id;
      })
      .then(async (id) => {
        return id;
      })
      .catch((err) => {
        alert(err);
        setIsAuthenticated(false);
      });
  }
  async function createPostText(
    taggedRestaurant,
    title,
    content,
    postType,
    taggedUsers
  ) {
    let dataPost = {
      taggedUsers: taggedUsers,
      taggedRestaurant: taggedRestaurant,
      title: title,
      postType: postType,
      content: content,
    };
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        console.log("POstDATAtext", data);
        (await data) && setPosts(data.data.createPost);
      });
  }

  async function createPostImage(
    taggedRestaurant,
    title,
    content,
    postType,
    taggedUsers,
    postMediaType,
    media
  ) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: CREATE_POST_MEDIA,
          variables: {
            file: media[0],
          },
        })
        .then((res) => {
          console.log("dataRes", res.data);
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    console.log(url, "DATAPOST22");
    let dataPost = {
      media: url,
      taggedUsers: taggedUsers,
      taggedRestaurant: taggedRestaurant,
      title: title,
      postType: postType,
      content: content,
      postMediaType: postMediaType,
    };
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        console.log("POstDATAtext", data);
        (await data) && setPosts(data.data.createPost);
      });
  }
  async function createPost(
    taggedRestaurant,
    title,
    content,
    postType,
    taggedUsers,
    postMediaType,
    media
  ) {
    let dataPost = {
      media: media,
      taggedUsers: taggedUsers,
      taggedRestaurant: taggedRestaurant,
      title: title,
      postType: postType,
      content: content,
      postMediaType: postMediaType,
    };

    dataPost.media = await Promise.all(
      dataPost.media
        .map(async (media) => {
          let item;
          const url = await new Promise((resolve, reject) => {
            client
              .mutate({
                mutation: CREATE_POST_MEDIA,
                variables: {
                  file: media,
                },
              })
              .then((res) => {
                console.log("dataRes", res.data);
                if (res.data && res.data.createPostMedia) {
                  resolve(res.data.createPostMedia);
                } else reject("http://test.com");
              });
          });
          console.log(url, "jje");
          return url;
        })
        .filter((res) => res != null)
    );

    console.log(dataPost, "DATAPOST");
    await client
      .mutate({
        mutation: CREATE_POST,
        variables: {
          input: dataPost,
        },
      })
      .then(async (data) => {
        console.log("POstDATAtext", data);
        (await data) && setPosts(data.data.createPost);
      });
  }
  const [userById, setUserById] = useState({
    userId: "1",
    avatar: "https://picsum.photos/200/300",
    local: { email: "", password: "" },
    firstName: "none",
    lastName: "none",
    gender: "",
    tags: "",
    uFollowersCount: "",
    rFollowersCount: "",
    uFollowsCount: "",
    description: "",
    birthDate: "",
    phoneNumber: "",
    city: "",
    languages: "",
    photos: "",
    stories: [],
    followers: "",
    following: "",
    // resetPasswordToken: String
    // resetPasswordExpires: Float
    fullName: "",
    // isVerified: Boolean!
    // isOnline: Boolean!
    // isLocked: Boolean!
    // reason: String!
    // isActive: Boolean!
    // stripeId: String
    // type: UserType!
    // ccLast4: String
    // createdAt: String
    // updatedAt: String
    // deletedAt: String
  });
  const [activeUser, setActiveUser] = useState({
    userId: "",
    avatar: "",
    local: { email: "", password: "" },
    firstName: "activeUser",
    lastName: "activeUser",
    gender: "",
    tags: [],
    uFollowersCount: "",
    rFollowersCount: "",
    uFollowsCount: "",
    description: "",
    birthDate: "",
    birthDateDisplay: true,
    phoneNumber: "",
    city: "",
    languages: "",
    photos: "",
    stories: "",
    followers: "",
    following: "",
    // resetPasswordToken: String
    // resetPasswordExpires: Float
    fullName: "",
    // isVerified: Boolean!
    // isOnline: Boolean!
    // isLocked: Boolean!
    // reason: String!
    // isActive: Boolean!
    // stripeId: String
    // type: UserType!
    // ccLast4: String
    // createdAt: String
    // updatedAt: String
    // deletedAt: String
  });

  //load another User Page
  async function loadUserById(userId, setTheUser) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: userId,
        },
      })
      .then(async (data) => {
        console.log("loaduserbyUserId", data);
        if (data.data.user) {
          await setTheUser((user) => {
            return {
              ...user,
              userId: data.data.user._id,
              avatar: data.data.user.avatar,
              local: data.data.user.local,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              gender: data.data.user.gender,
              tags: data.data.user.tags,
              uFollowersCount: data.data.user.uFollowersCount,
              rFollowersCount: data.data.user.rFollowersCount,
              uFollowsCount: data.data.user.uFollowsCount,
              description: data.data.user.description,
              birthDate: data.data.user.birthDate,
              phoneNumber: data.data.user.phoneNumber,
              city: data.data.user.city,
              languages: data.data.user.languages,
              photos: data.data.user.photos,
              stories: data.data.user.stories,
              followers: data.data.user.followers,
              following: data.data.user.following,
              // resetPasswordToken: String
              // resetPasswordExpires: Float
              fullName: data.data.user.fullName,
              // isVerified: Boolean!
              // isOnline: Boolean!
              // isLocked: Boolean!
              // reason: String!
              // isActive: Boolean!
              // stripeId: String
              // type: UserType!
              // ccLast4: String
              // createdAt: String
              // updatedAt: String
              // deletedAt: String
            };
          });
          // console.log("idd", data.data.user._id, userId);
          getFollowingByUserId(userId);
          return userId;
        }
      })

      .then(async (userId) => {
        getFollowersByUserId(userId);
        return userId;
      })
      .then(async (userId) => {
        getUserRestaurantFollowed(userId);
        return userId;
      })
      .then(async (userId) => {
        return userId;
      })
      .catch((err) => {
        alert(err);
      });
  }
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoginForm({
      email: "",
      password: "",
      remeberMe: false,
      keepMe: false,
    });
    toggleAuthentication();
    client.resetStore();
  }

  async function getCheckinsByUserId(id, setCheckins) {
    await client
      .query({
        query: GET_CHECKINS_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        console.log(data.data.checkInsByUserId);
        setCheckins(data.data.checkInsByUserId);
      })
      .catch((err) => {
        console.log(err, "checkins error");
      });
  }

  async function updateProfile(id, data) {
    await client
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
        setActiveUser((user) => {
          return {
            ...user,
            firstName: data.firstName,
            lastName: data.lastName,
            description: data.description,
            birthDate: data.birthDate,
            location: data.location,
            city: data.city,
            languages: data.languages,
            email: data.email,
            phoneNumber: data.phoneNumber,
            tags: data.tags,
          };
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function isFollowing(id, setData) {
    console.log("isFollowingggggId", id);
    await client
      .query({
        query: IS_FOLLOWING,
        variables: {
          actionId: id,
        },
      })
      .then((data) => {
        console.log("isFollowinggggg", data.data.isFollowing);
        setData(data.data.isFollowing);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function QueryGetUserById(userId) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: userId,
        },
      })
      .then(async (data) => {
        console.log("QueryGetUserById", data);
        // if (data.data.user) {

        //   return data.data.user;
        // }
      });
  }
  async function getUserById(userId) {
    let user;
    if (usersCache[userId]) {
      user = usersCache[userId];
    } else {
      QueryGetUserById({ variables: { userId } }).then((res) => {
        let allUsers = { ...usersCache, [userId]: res.data.user };
        setUsersCache(allUsers);
        user = res.data.user;
      });
    }
    return user;
  }

  async function createCommande(inputData) {
    const data = {
      ownerFirstname: inputData.ownerFirstname,
      articlesId: inputData.articlesId,
      ownerPhoneNumber: inputData.ownerPhoneNumber,
      ownerEmail: inputData.ownerEmail,
      ownerLastName: inputData.ownerLastName,
      userId: inputData.userId,
      adresse1: inputData.adresse1,
      adresse2: inputData.adresse2,
      description: inputData.description,
      commandeTakenMethod: inputData.commandeTakenMethod,
      paymentMethod: inputData.paymentMethod,
      restaurantId: inputData.restaurantId,
      total_price: inputData.total_price,
      quantity: inputData.quantity,
      articleOptions: inputData.articleOptions,
    };
    await client
      .mutate({
        mutation: CREATE_COMMANDE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("createCommande", data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function createCommande(inputData) {
    const data = {
      ownerFirstname: inputData.ownerFirstname,
      articlesId: inputData.articlesId,
      ownerPhoneNumber: inputData.ownerPhoneNumber,
      ownerEmail: inputData.ownerEmail,
      ownerLastName: inputData.ownerLastName,
      userId: inputData.userId,
      adresse1: inputData.adresse1,
      adresse2: inputData.adresse2,
      description: inputData.description,
      commandeTakenMethod: inputData.commandeTakenMethod,
      paymentMethod: inputData.paymentMethod,
      restaurantId: inputData.restaurantId,
      total_price: inputData.total_price,
      quantity: inputData.quantity,
      articleOptions: inputData.articleOptions,
    };
    await client
      .mutate({
        mutation: CREATE_COMMANDE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("createCommande", data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getCommande(id, setData) {
    await client
      .query({
        query: GET_COMMANDES_BY_USERID,
        variables: {
          userId: id,
        },
      })
      .then(async (data) => {
        console.log("GET_COMMANDES_BY_USERID", data);
        setData(data.data.commandeByUserId);
        setMyCommandes(data.data.commandeByUserId);
      });
  }
  async function getUnwastables(setData) {
    await client
      .query({
        query: GET_UNWASTABLES,
      })
      .then(async (data) => {
        setData(data.data.unwastables);
        setUnwastable(data.data.unwastables);
      });
  }

  async function createUnwastableCommande(inputData) {
    const data = {
      ownerFirstname: inputData.ownerFirstname,
      articlesId: inputData.articlesId,
      ownerPhoneNumber: inputData.ownerPhoneNumber,
      ownerEmail: inputData.ownerEmail,
      ownerLastName: inputData.ownerLastName,
      userId: inputData.userId,
      adresse1: inputData.adresse1,
      adresse2: inputData.adresse2,
      description: inputData.description,
      commandeTakenMethod: inputData.commandeTakenMethod,
      paymentMethod: inputData.paymentMethod,
      restaurantId: inputData.restaurantId,
      total_price: inputData.total_price,
      quantity: inputData.quantity,
      unwastableMenuIds: inputData.unwastableMenuIds,
    };
    await client
      .mutate({
        mutation: CREATE_UNWASTABLE_COMMANDE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("createCommande", data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  return (
    <UserContext.Provider
       value={{
        getUnwastables,
        setUnwastable,
        unwastable,
        createCommande,
        getCommande,
        myCommandes,
        setMyCommandes,
        commande,
        setCommande,
        followers,
        following,
        userFollowers,
        userFollowing,
        userRestaurantFollowing,
        setUserFollowing,
        setUserFollowers,
        setFollowers,
        setFollowing,
        getFollowers,
        getFollowing,
        getFollowingByUserId,
        getFollowersByUserId,
        getRestaurantFollowers,
        getUserRestaurantFollowed,
        rFollowing,
        setrFollowing,
        createPost,
        Followuser,
        getRestaurantFollowing,
        FollowRestaurant,
        unfollowUser,
        unFollowRestaurant,
        loaduser,
        userById,
        setUserById,
        activeUser,
        setActiveUser,
        logout,
        loadUserById,
        errors,
        setErrors,
        setAuthenticationSuccess,
        authenticationError,
        setAuthenticationError,
        signUpForm,
        setSignUpForm,
        loginForm,
        setLoginForm,
        authenticationSuccess,
        toggleAuthentication,
        isAuthenticated,
        setIsAuthenticated,
        getPosts,
        posts,
        getRestaurants,
        restaurants,
        setRestaurants,
        getUsers,
        users,
        setUsers,
        createPostText,
        createPostImage,
        getCheckinsByUserId,
        myCheckins,
        selectedUser,
        setSelectedUser,
        updateProfile,
        isFollowing,
        getUserById,
        createCommande,
        getCommande,
        commande,
        setCommande,
        myCommande,
        setMyCommande,
        loadCommande,
        setLoadCommande,
        createUnwastableCommande,
        commandeUnwastable,
        setCommandeUnwastable,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
