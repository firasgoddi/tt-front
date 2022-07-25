import React, { useState } from "react";
import {
  RESTAURANT,
  CREATE_RESTAURANT,
  GET_RESTO_FOLLOWERS,
  UPDATE_RESTAURANT,
  RESTAURANT_BY_USER_ID,
  MENU_BY_ID,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  CATEGORY_BY_ID,
  DELETE_ARTICLE,
  ADD_ARTICLE_TO_PERSONALIZED_MENU,
  DELETE_ARTICLE_FROM_PM,
  PERSONALIZED_MENU_BY_ID,
  UPDATE_ARTICLE_Of_PM,
  PM_BY_USER_ID_RESTAURANT_ID,
  ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
  UPDATE_CATEGORY,
  PM_BY_USER_ID,
  UPDATE_ARTICLE_AVATAR,
  UPDATE_RESTAURANT_AVATAR,
  UPDATE_RESTAURANT_BACKGROUND_IMAGE,
  DELETE_PERSONALIZED_MENU,
  CREATE_ARTICLE_OPTION,
  ARTICLE_OPTION_BY_ARTICLE_ID,
  UPDATE_ARTICLE_OPTIONS,
  UPDATE_COMMANDE_STATUS,
  GET_COMMANDES_BY_RESTAURANTID,
  SEARCH_RESTAURANT_BY_KEYWORD,
  RATINGS_BY_RESTAURANT_ID,
  CREATE_RATING_LIKE,
  DELETE_RATING_LIKE,
  CREATE_RATING_COMMENT,
  PROMOTION_RESTAURANT_BY_ID,
  PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID,
  CREATE_RESERVATION,
  RESERVATION_BY_RESTAURANT_ID,
  GET_RESTAURANTS_BY_IDS,
  RESTAURANT_LAST_VISITORS,
  CREATE_UNWASTABLE_LIST,
  GET_UNWASTABLE_BY_RESTAURANTID,
  DELETE_DELETE_UNWASTABLE_LIST,
  UPDATE_UNWASTABLE_MENU,
 
} from "../graphql/restaurant/restaurant";
import { GET_USER } from "../graphql/user/user";
import client from "../apollo/client";
import { Redirect, useHistory } from "react-router";

const RestaurantContext = React.createContext();

function RestaurantContextProvider({ children }) {
  const [myRestaurant, setMyRestaurant] = useState(null);
  const [myRestaurantsList, setMyRestaurantsList] = useState([]);
  const [restaurantById, setRestaurantById] = useState({
    _id: "",
    userId: "",
    address: "",
    avatar: null,
    averageCost: "",
    description: "",
    location: "",
    menuId: "",
    name: "",
    openingTime: {
      timeFrom: "",
      timeTo: "",
      days: [],
    },
    payment: [],
    phone: "",
    promoImage: null,
    services: [],
    specialty: [],
    __typename: "",
  });
  const [restaurantCommandes, setRestaurantCommandes] = useState(null);

  const [restoFollowers, setRestoFollowers] = useState(null);
  const [horaireResto, setHoraireResto] = useState();
  const [categories, setCategories] = useState();
  const [articles, setArticles] = useState();
  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [myPersonalizedMenuList, setMyPersonalizedMenuList] = useState(null);
  const [personalizedMenuId, setPersonalizedMenuId] = useState();
  const [articlesOfPmId, setArticlesOfPmId] = useState();
  const [articlesOfPm, setArticlesOfPm] = useState();
  const [pmByUserIdList, setPmByUserIdList] = useState();
  const [personalizeArticle, setPersonalizeArticle] = useState({
    id: 1,
    name: "",
    image: "",
    size: "",
    quantity: 1,
    price: 0,
    rate: 1,
    duration: "15",
    ingredients: [],
    newIngredients: [],
    articleOptions: [],
    articleOptionsId: [],
  });
  const [menuPersonaliser, setMenuPersonaliser] = useState({
    id: 1,
    name: "",
    image: "",
    size: "",
    quantity: 1,
    price: 1,
    rate: 1,
    duration: "15",
    ingredients: [],
    nouveauIngredients: [],
    //newPrice: "6",
  });
  const [profileRestaurant, setProfileRestaurant] = useState({
    profileImage: "https://picsum.photos/100/100.jpg",
    backgroundImage: "https://picsum.photos/100/100.jpg",
    name: "",
    phone: "",
    description: "",
    address: "",
    country: "",
    location: "",
    tags: [],
    services: [],
    openingTime: {
      timeFrom: new Date(),
      timeTo: new Date(),
      days: [],
    },
    specialty: [],
    averageCost: "",
    payment: [],
    accordTaktak: false,
  });
  const [myReservation, setMyReservation] = useState({
    userId: "",
    restaurantId: "",
    date: new Date(),
    timeFrom: "",
    promotionId: "",
    //timeto: "",
    peopleNumber: "",
    guests: [],
    payment: "",
    confirmation: "",
    note: "",
    menuPersonaliserId: "",
  });

  async function getRestaurantData(idResto, setData) {
    await client
      .query({
        query: RESTAURANT,
        variables: {
          id: idResto,
        },
      })
      .then((data) => {
        setData(data.data.restaurant);
        console.log("tawsaret", data.data.restaurant);
        if (data.data.restaurant) {
          setRestaurantById((resto) => {
            return {
              ...resto,
              _id: data.data.restaurant._id,
              userId: data.data.restaurant.userId,
              address: data.data.restaurant.address,
              avatar: data.data.restaurant.avatar,
              averageCost: data.data.restaurant.averageCost,
              description: data.data.restaurant.description,
              location: data.data.restaurant.location,
              menuId: data.data.restaurant.menuId,
              name: data.data.restaurant.name,
              openingTime: {
                timeFrom: data.data.restaurant.timeFrom,
                timeTo: data.data.restaurant.timeTo,
                days: data.data.restaurant.days,
              },
              payment: data.data.restaurant.payment,
              phone: data.data.restaurant.phone,
              promoImage: data.data.restaurant.profileImage,
              services: data.data.restaurant.services,
              specialty: data.data.restaurant.specialty,
              __typename: data.data.restaurant.__typename,
              restaurantRate: data.data.restaurant.restaurantRate,
              countVotes: data.data.restaurant.countVotes,
            };
          });
        }

        return data;
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createRestaurant(inputData, setId, setLoading) {
    const urlAvatar = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RESTAURANT_AVATAR,
          variables: {
            file: inputData.avatar,
          },
        })
        .then((res) => {
          console.log("dataRes", res.data);
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const urlBackground = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_RESTAURANT_BACKGROUND_IMAGE,
          variables: {
            file: inputData.backgroundImage,
          },
        })
        .then((res) => {
          console.log("dataRes", res.data);
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const data = {
      name: inputData.name,
      phone: inputData.phone,
      description: inputData.description,
      address: inputData.address,
      location: inputData.location,
      country: inputData.country,
      tags: inputData.tags,
      services: inputData.services,
      timeFrom: inputData.openingTime.timeFrom,
      timeTo: inputData.openingTime.timeTo,
      days: inputData.openingTime.days,
      specialty: inputData.specialty,
      averageCost: inputData.averageCost,
      payment: inputData.payment,
      accordTaktak: inputData.accordTaktak,
      avatar: urlAvatar,
      backgroundImage: urlBackground,
    };

    await client
      .mutate({
        mutation: CREATE_RESTAURANT,
        variables: {
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
        setMyRestaurantsList((prevMyRestaurantsList) => {
          return {
            ...prevMyRestaurantsList,
            data,
          };
        });

        // getRestaurantByUserId(inputData.userId);
        // history.push('/rrrr')
        setId(res.data.createRestaurant._id);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getRestoFollowers(id) {
    await client
      .query({
        query: GET_RESTO_FOLLOWERS,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setRestoFollowers(data.data.restaurantFollowers);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateRestaurant(id, data, section, setRestaurant) {
    if (section === "header") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => {
          console.log(res);
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              name: data.name,
              country: data.country,
              location: data.location,
              address: data.address,
              tags: data.tags,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "description") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => {
          console.log(res);
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              description: data.description,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "cordonnees") {
      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: data,
          },
        })
        .then(async (res) => {
          console.log(res);
          setRestaurant((prevMyRestaurant) => {
            return {
              ...prevMyRestaurant,
              services: data.services,
              openingTime: {
                timeFrom: data.timeFrom,
                timeTo: data.timeTo,
                days: data.days,
              },
              specialty: data.specialty,
              averageCost: data.averageCost,
              payment: data.payment,
            };
          });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else if (section === "avatar") {
      const url = await new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: UPDATE_RESTAURANT_AVATAR,
            variables: {
              file: data,
            },
          })
          .then((res) => {
            console.log("dataRes", res.data);
            if (res.data && res.data.createPostMedia) {
              resolve(res.data.createPostMedia);
            } else reject("http://test.com");
          });
      });

      let image = {
        avatar: url,
      };

      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: image,
          },
        })
        .then(
          setRestaurant((prev) => {
            return { ...prev, avatar: url };
          })
        );
    } else if (section === "backgroundImage") {
      const url = await new Promise((resolve, reject) => {
        client
          .mutate({
            mutation: UPDATE_RESTAURANT_AVATAR,
            variables: {
              file: data,
            },
          })
          .then((res) => {
            console.log("dataRes", res.data);
            if (res.data && res.data.createPostMedia) {
              resolve(res.data.createPostMedia);
            } else reject("http://test.com");
          });
      });

      let image = {
        backgroundImage: url,
      };

      await client
        .mutate({
          mutation: UPDATE_RESTAURANT,
          variables: {
            id: id,
            input: image,
          },
        })
        .then(
          setRestaurant((prev) => {
            return { ...prev, backgroundImage: url };
          })
        );
    }
  }

  async function getRestaurantByUserId(id, setData) {
    await client
      .query({
        query: RESTAURANT_BY_USER_ID,
        variables: {
          userId: id,
        },
      })
      .then((data) => {
        setMyRestaurantsList(data.data.restaurantByUserId);
        setData(data.data.restaurantByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getMenuData(menuId, setData) {
    await client
      .query({
        query: MENU_BY_ID,
        variables: {
          menuId: menuId,
        },
      })
      .then((data) => {
        setData(data.data.menuById.categories);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createCategory(inputData) {
    const dataInput = {
      menuId: inputData.menuId,
      name: inputData.name,
    };

    await client
      .mutate({
        mutation: CREATE_CATEGORY,
        variables: {
          input: dataInput,
        },
      })
      .then(async (res) => {
        console.log("rreeess", res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function deleteCategory(id, setData) {
    await client
      .mutate({
        mutation: DELETE_CATEGORY,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        setData((prevData) => {
          let items = [...prevData];

          const indexCategory = items.findIndex((el) => el._id === id);

          items.splice(indexCategory, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function updateCategory(id, inputData) {
    const data = {
      name: inputData.name,
    };
    await client
      .mutate({
        mutation: UPDATE_CATEGORY,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        //setCategories([...categories, newItem]);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function createArticle(categoryId, inputData, image) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_ARTICLE_AVATAR,
          variables: {
            file: image,
          },
        })
        .then((res) => {
          console.log("dataRes", res.data);
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    let data = {
      categoryId: categoryId,
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: url,
    };

    let optionsList = {
      options: inputData.options,
    };

    let arr = [];

    await client
      .mutate({
        mutation: CREATE_ARTICLE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("articleCreated : ", data);
        arr = optionsList.options.map(async (option) => {
          const url = await new Promise((resolve, reject) => {
            client
              .mutate({
                mutation: UPDATE_ARTICLE_AVATAR,
                variables: {
                  file: option.image,
                },
              })
              .then((res) => {
                console.log("article option avatar", res.data);
                if (res.data && res.data.createPostMedia) {
                  resolve(res.data.createPostMedia);
                } else reject("http://test.com");
              });
          });

          let dataOption = {
            articleId: data.data.createArticle._id,
            optionName: option.name,
            optionType: option.type,
            optionAvatar: url,
            optionPrice: parseFloat(option.price),
          };

          return dataOption;
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          await client
            .mutate({
              mutation: CREATE_ARTICLE_OPTION,
              variables: {
                input: arr,
              },
            })
            .then((data) => {
              console.log("CREATE_ARTICLE_OPTION:", data);
            })
            .catch((err) => {
              console.log(err, "CREATE_ARTICLE_OPTION error");
            });
        }
      });
  }

  async function updateArticle(idArticle, inputData, image, updatedOptions) {
    const data = {
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: image,
    };

    let arr = [];

    await client
      .mutate({
        mutation: UPDATE_ARTICLE,
        variables: {
          id: idArticle,
          input: data,
        },
      })
      .then(async (data) => {
        setMenuUpdated(true);
        arr = updatedOptions.map(async (option) => {
          if (typeof option.optionAvatar === "string") {
            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: option.optionAvatar,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          } else {
            const url = await new Promise((resolve, reject) => {
              client
                .mutate({
                  mutation: UPDATE_ARTICLE_AVATAR,
                  variables: {
                    file: option.optionAvatar,
                  },
                })
                .then((res) => {
                  if (res.data && res.data.createPostMedia) {
                    resolve(res.data.createPostMedia);
                  } else reject("http://test.com");
                });
            });

            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: url,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          }
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          let updatedOptionsFiltred = arr.filter(
            (el) => el.actionType !== "NOUPDATE"
          );

          await client
            .mutate({
              mutation: UPDATE_ARTICLE_OPTIONS,
              variables: {
                // input: arr.filter((el) => el.actionType !== "NOUPDATE"),
                articleId: idArticle,
                input: updatedOptionsFiltred,
              },
            })
            .then((data) => {
              console.log("UPDATE_ARTICLE_OPTIONS:", data);
            })
            .catch((err) => {
              console.log(err, "UPDATE_ARTICLE_OPTIONS error");
            });
        }
      });
  }

  async function updateArticleWithImage(
    idArticle,
    inputData,
    image,
    updatedOptions
  ) {
    const url = await new Promise((resolve, reject) => {
      client
        .mutate({
          mutation: UPDATE_ARTICLE_AVATAR,
          variables: {
            file: image,
          },
        })
        .then((res) => {
          if (res.data && res.data.createPostMedia) {
            resolve(res.data.createPostMedia);
          } else reject("http://test.com");
        });
    });

    const data = {
      name: inputData.name,
      ingredients: inputData.ingredients,
      price: parseFloat(inputData.price),
      duration: inputData.duration,
      image: url,
    };

    let arr = [];

    await client
      .mutate({
        mutation: UPDATE_ARTICLE,
        variables: {
          id: idArticle,
          input: data,
        },
      })
      .then(async (data) => {
        setMenuUpdated(true);
        arr = updatedOptions.map(async (option) => {
          if (typeof option.optionAvatar === "string") {
            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: option.optionAvatar,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          } else {
            const url = await new Promise((resolve, reject) => {
              client
                .mutate({
                  mutation: UPDATE_ARTICLE_AVATAR,
                  variables: {
                    file: option.optionAvatar,
                  },
                })
                .then((res) => {
                  if (res.data && res.data.createPostMedia) {
                    resolve(res.data.createPostMedia);
                  } else reject("http://test.com");
                });
            });

            let dataOption = {
              optionName: option.optionName,
              optionType: option.optionType,
              optionAvatar: url,
              optionPrice: parseFloat(option.optionPrice),
              actionType: option.actionType,
              articleId: idArticle,
              optionId: option._id ? option._id : "sdfsdfs",
            };

            return dataOption;
          }
        });

        if (arr && arr.length) {
          arr = await Promise.all(arr);
          let updatedOptionsFiltred = arr.filter(
            (el) => el.actionType !== "NOUPDATE"
          );

          await client
            .mutate({
              mutation: UPDATE_ARTICLE_OPTIONS,
              variables: {
                // input: arr.filter((el) => el.actionType !== "NOUPDATE"),
                articleId: idArticle,
                input: updatedOptionsFiltred,
              },
            })
            .then((data) => {
              console.log("UPDATE_ARTICLE_OPTIONS:", data);
            })
            .catch((err) => {
              console.log(err, "UPDATE_ARTICLE_OPTIONS error");
            });
        }
      });
  }

  const [categoryItem, setCategoryItem] = useState();
  async function getCategoryById(id) {
    await client
      .query({
        query: CATEGORY_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setCategory(data.data.categoryById);
        setArticles(data.data.categoryById.articles);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deleteArticle(id) {
    await client
      .mutate({
        mutation: DELETE_ARTICLE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        setArticles((prevArticles) => {
          let items = [...prevArticles];

          const indexArticle = items.findIndex((el) => el._id === id);

          items.splice(indexArticle, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function addArticleToPersonalizeMenu(idResto, idArticle) {
    await client
      .mutate({
        mutation: ADD_ARTICLE_TO_PERSONALIZED_MENU,
        variables: {
          restaurantId: idResto,
          articleId: idArticle,
        },
      })
      .then(async (res) => {
        console.log(res);
      })

      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function deleteArticleFromPersonalizeMenu(id) {
    await client
      .mutate({
        mutation: DELETE_ARTICLE_FROM_PM,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getPersonalizedMenuById(id) {
    await client
      .query({
        query: PERSONALIZED_MENU_BY_ID,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        console.log();
        //setArticlesOfPmId(data.data.personalizedMenuByUserId.articlesOfPmId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateArticleOfPersonalizedMenu(id, data) {
    await client
      .mutate({
        mutation: UPDATE_ARTICLE_Of_PM,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getPersonalizedMenuByUserIdRestaurantId(
    userId,
    restoId,
    setData
  ) {
    await client
      .query({
        query: PM_BY_USER_ID_RESTAURANT_ID,
        variables: {
          userId: userId,
          restaurantId: restoId,
        },
      })
      .then(async (data) => {
        setPersonalizedMenuId(
          data.data.personalizedMenuByUserIdRestaurantId._id
        );

        await client
          .query({
            query: ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
            variables: {
              personalizedMenuId:
                data.data.personalizedMenuByUserIdRestaurantId._id,
            },
          })
          .then((data) => {
            console.log(data.data.articlesOfPmByPersonalizedMenu, "olllz");
            setArticlesOfPmId(data.data.articlesOfPmByPersonalizedMenu);
            setData(data.data.articlesOfPmByPersonalizedMenu);
          });
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getArticlesOfPmByPersonalizedMenu(personalizedMenuId) {
    await client
      .query({
        query: ARTICLES_OF_PM_BY_PERSONALIZED_MENU,
        variables: {
          personalizedMenuId: personalizedMenuId,
        },
      })
      .then((data) => {
        //setArticlesOfPmId(data.data.)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getPersonalizedMenuByUserId(userId, setData) {
    await client
      .query({
        query: PM_BY_USER_ID,
        variables: {
          userId: userId,
        },
      })
      .then(async (data) => {
        setData(data.data.personalizedMenuByUserId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function deletePersonalizedMenu(id, setData) {
    await client
      .mutate({
        mutation: DELETE_PERSONALIZED_MENU,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        setData((prevData) => {
          let items = [...prevData];

          const indexMP = items.findIndex((el) => el._id === id);

          items.splice(indexMP, 1);
          return items;
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getArticleOptionByArticleId(id, setData) {
    await client
      .query({
        query: ARTICLE_OPTION_BY_ARTICLE_ID,
        variables: {
          articleId: id,
        },
      })
      .then((data) => {
        setData(data.data.articleOptionByArticleId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function updateCommande(id, data) {
    await client
      .mutate({
        mutation: UPDATE_COMMANDE_STATUS,
        variables: {
          id: id,
          input: data,
        },
      })
      .then(async (data) => {
        console.log("Datacommande", data.data.updateCommande);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  async function getCommandebyRestaurantId(id, setData) {
    await client
      .query({
        query: GET_COMMANDES_BY_RESTAURANTID,
        variables: {
          restaurantId: id,
        },
      })
      .then(async (data) => {
        console.log("GET_COMMANDES_BY_USERID", data);
        setData(data.data.commandeByRestaurantId);
        setRestaurantCommandes(data.data.commandeByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getRatingsByRestaurantId(id, setData) {
    await client
      .query({
        query: RATINGS_BY_RESTAURANT_ID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        setData(data.data.ratingsByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getUser(id, setData) {
    await client
      .query({
        query: GET_USER,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        setData(data.data.user);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function searchRestaurantByKeyWord(word, setData) {
    await client
      .query({
        query: SEARCH_RESTAURANT_BY_KEYWORD,
        variables: {
          word: word,
        },
      })
      .then((data) => {
        data && setData(data.data.searchByKeyWord);
      })
      .catch((err) => {
        console.log(err, "error search restaurant");
      });
  }

  async function createRatingLike(ratingId) {
    const data = {
      ratingId: ratingId,
    };
    await client
      .mutate({
        mutation: CREATE_RATING_LIKE,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("RatingLike", data.data.createRatingLike);
      });
  }

  async function deleteRatingLike(id) {
    await client
      .mutate({
        mutation: DELETE_RATING_LIKE,
        variables: {
          id: id,
        },
      })
      .then(async (res) => {
        console.log(res);
        /*if (data.data.deleteRatingLike && likes) {
					var array = [...likes];
					let tab = array.map((el) => el._id);
					var index = tab.indexOf(id);
					if (index != -1) likes.splice(index, 1);
					setData(array);
				}*/
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function createRatingComment(ratingId, content) {
    const data = {
      ratingId: ratingId,
      content: content,
    };

    await client
      .mutate({
        mutation: CREATE_RATING_COMMENT,
        variables: {
          input: data,
        },
      })
      .then(async (data) => {
        console.log("RatingCommentData", data);
      })
      .catch((err) => {
        console.log(err, "error create Comment");
      });
  }

  async function getPromosList(id, setData) {
    await client
      .query({
        query: PROMOTION_RESTAURANT_BY_ID,
        variables: {
          restaurantid: id,
        },
      })
      .then((data) => {
        setData(data.data.promotionRestaurantById);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function getMenuPersonaliserList(userId, restaurantId, setData) {
    await client
      .query({
        query: PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID,
        variables: {
          userId: userId,
          restaurantId: restaurantId,
        },
      })
      .then((data) => {
        setData(data.data.personalizedMenuByUserIdRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function createReservation(inputData) {
    const dataInput = {
      //userId: inputData.userId,
      restaurantId: inputData.restaurantId,
      date: inputData.date,
      timeFrom: inputData.timeFrom,
      promotionId: inputData.promotionId,
      peopleNumber: inputData.peopleNumber,
      guests: inputData.guests,
      payment: inputData.payment,
      confirmation: false,
      note: inputData.note,
      //menuPersonaliserId: inputData.menuPersonaliserId,
      confirmation: false,
      status: "INPROGRESS",
    };

    console.log("gggg:", dataInput);

    await client
      .mutate({
        mutation: CREATE_RESERVATION,
        variables: {
          input: dataInput,
        },
      })
      .then(async (res) => {
        console.log("rreeess", res);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }

  async function getReservationByRestaurantId(id, setData) {
    await client
      .query({
        query: RESERVATION_BY_RESTAURANT_ID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("resREs:", data.data);
        setData(data.data.reservationByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  function getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  async function restaurantsByIds(ids, setData) {
    await client
      .query({
        query: GET_RESTAURANTS_BY_IDS,
        variables: {
          ids: ids,
        },
      })
      .then((data) => {
        console.log("restaurantsByIds:", data.data);
        setData(data.data.restaurantsByIds);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  async function isRestaurantOpen(openingTime, setData) {
    const { timeTo, timeFrom, days } = openingTime;
    let opening = new Date(timeFrom).getTime();
    let closing = new Date(timeTo).getTime();
    const now = Date.now();
    const nowTime = new Date(now).getTime();

    const weekDays = new Array(
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    );
    const i = new Date(now).getDay();
    const nowDay = weekDays[i];

    if (days.includes(nowDay)) {
      if (nowTime > opening && nowTime < closing) {
        setData(true);
      } else setData(false);
    } else setData(false);
  }
  const [menuUpdated, setMenuUpdated] = useState(false);

  const [slide, setSlide] = useState(0);
  const [response, setResponse] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
  });

  async function restaurantLastVisitors(id, setData) {
    await client
      .query({
        query: RESTAURANT_LAST_VISITORS,
        variables: {
          id: id,
        },
      })
      .then((data) => {
        console.log("restaurantLastVisitors:", data.data);
        setData(data.data.restaurantLastVisitors);
      })
      .catch((err) => {
        console.log(err, "error restaurantLastVisitors");
      });
  }
  async function createUnwastableList(restaurantId, inputData, setData) {
    console.log("gggg:", inputData);

    await client
      .mutate({
        mutation: CREATE_UNWASTABLE_LIST,
        variables: {
          restaurantId: restaurantId,
          input: inputData,
        },
      })
      .then(async (res) => {
        console.log("CREATE_UNWASTABLE_LIST", res);
        setData(res.data.createUnwastableMenu);
      })
      .catch((error) => {
        console.log("CREATE_UNWASTABLE_LIST", error);
        alert(error);
      });
  }

  async function getUnwastableByRestaurantId(id, setData) {
    await client
      .query({
        query: GET_UNWASTABLE_BY_RESTAURANTID,
        variables: {
          restaurantId: id,
        },
      })
      .then((data) => {
        console.log("unwastableListsbyRestaurantID:", data.data);
        setData(data.data.unwastableByRestaurantId);
      })
      .catch((err) => {
        console.log(err, "unwastableLists error");
      });
  }

  async function deleteUnwastableList(
    id,
    unwastableMenuId,
    setLoading,
    setData
  ) {
    setLoading(true);
    await client
      .mutate({
        mutation: DELETE_DELETE_UNWASTABLE_LIST,
        variables: {
          id: id,
          unwastableMenuId: unwastableMenuId,
        },
      })
      .then(async (res) => {
        console.log(res, "deleteUnwastableList");
        setLoading(false);
        // index >= 0 &&
        //   setPreviousLists((prev) => {
        //     let arr = [...prev];
        //     arr.splice(0, 1);
        //     return arr;
        //   });
        // setData(res.data)
      })
      .catch((error) => {
        console.log(error, "deleteUnwastableListError");
        alert(error);
      });
  }

  async function updateUnwastableList(
    UnwastableId,
    unwastableMenuId,
    input,
    setData,
    setLoading
  ) {
    setLoading(true);
    await client
      .mutate({
        mutation: UPDATE_UNWASTABLE_MENU,
        variables: {
          id: UnwastableId,
          unwastableMenuId: unwastableMenuId,
          input: input,
        },
      })
      .then(async (res) => {
        console.log(res, "updateUnwastableList");
        setData(res.data);
      })
      .then(
        setTimeout(() => {
          setLoading(false);
        }, 1000)
      )
      .catch((error) => {
        console.log(error, "updateUnwastableListError");
        alert(error);
      });
  }

  return (
    <RestaurantContext.Provider
      value={{
        restaurantCommandes,
        setRestaurantCommandes,
        getCommandebyRestaurantId,
        profileRestaurant,
        setProfileRestaurant,
        myRestaurant,
        setMyRestaurant,
        getRestaurantData,
        myRestaurantsList,
        setMyRestaurantsList,
        createRestaurant,
        restoFollowers,
        setRestoFollowers,
        getRestoFollowers,
        updateRestaurant,
        getRestaurantByUserId,
        horaireResto,
        setHoraireResto,
        categories,
        setCategories,
        getMenuData,
        createCategory,
        deleteCategory,
        articles,
        setArticles,
        selectedCategory,
        setSelectedCategory,
        createArticle,
        updateArticle,
        updateArticleWithImage,
        category,
        setCategory,
        getCategoryById,
        deleteArticle,
        restaurantById,
        setRestaurantById,
        addArticleToPersonalizeMenu,
        deleteArticleFromPersonalizeMenu,
        myPersonalizedMenuList,
        setMyPersonalizedMenuList,
        getPersonalizedMenuById,
        updateArticleOfPersonalizedMenu,
        getPersonalizedMenuByUserIdRestaurantId,
        personalizedMenuId,
        setPersonalizedMenuId,
        articlesOfPmId,
        setArticlesOfPmId,
        getArticlesOfPmByPersonalizedMenu,
        articlesOfPm,
        setArticlesOfPm,
        personalizeArticle,
        setPersonalizeArticle,
        menuPersonaliser,
        setMenuPersonaliser,
        updateCategory,
        getPersonalizedMenuByUserId,
        pmByUserIdList,
        setPmByUserIdList,
        deletePersonalizedMenu,
        getArticleOptionByArticleId,
        getIndex,
        menuUpdated,
        setMenuUpdated,
        categoryItem,
        updateCommande,
        setCategoryItem,
        getRatingsByRestaurantId,
        getUser,
        searchRestaurantByKeyWord,
        createRatingLike,
        deleteRatingLike,
        createRatingComment,
        myReservation,
        setMyReservation,
        getPromosList,
        getMenuPersonaliserList,
        createReservation,
        getReservationByRestaurantId,

        slide,
        setSlide,
        response,
        setResponse,

        restaurantsByIds,
        isRestaurantOpen,
        restaurantLastVisitors,

        createUnwastableList,
        getUnwastableByRestaurantId,
        deleteUnwastableList,
        updateUnwastableList,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export { RestaurantContextProvider, RestaurantContext };
