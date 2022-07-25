import { gql } from "@apollo/client";

export const GET_RESTAURANT = gql`
  query restaurant($id: ID!) {
    restaurant(_id: $id) {
      _id
      name
      avatar
      description
      location
    }
  }
`;
export const GET_RESTAURANTS_BY_IDS = gql`
  query restaurant($ids: [ID!]) {
    restaurantsByIds(ids: $ids) {
      _id
      name
      avatar
      description
      location
      backgroundImage
      restaurantRate
      openingTime {
        days
        timeFrom
        timeTo
      }
      services
    }
  }
`;
export const GET_RESTAURANTS = gql`
  query restaurants {
    restaurants {
      _id
      name
      avatar
      description
      location
    }
  }
`;

export const GET_RESTAURANT_FOLLOWERS = gql`
  query restaurantFollowers($restaurantId: ID!) {
    restaurantFollowers(restaurantId: $restaurantId) {
      _id
    }
  }
`;

export const GET_RESTAURANT_FOLLOWING = gql`
  query restaurantFollowing($restaurantId: ID!) {
    restaurantFollowing(restaurantId: $restaurantId) {
      _id
    }
  }
`;

export const RESTAURANT = gql`
  query restaurant($id: ID!) {
    restaurant(_id: $id) {
      _id
      userId
      name
      avatar
      backgroundImage
      address
      location
      promoImage
      description
      openingTime {
        timeFrom
        timeTo
        days
      }
      specialty
      averageCost
      payment
      services
      phone
      menuId
      photos
      tags
      countVotes
      restaurantRate
    }
  }
`;

export const CREATE_RESTAURANT = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      _id
      createdAt
    }
  }
`;

export const GET_RESTO_FOLLOWERS = gql`
  query restaurantFollowers($restaurantId: ID!) {
    restaurantFollowers(restaurantId: $restaurantId) {
      _id
      firstName
      lastName
      avatar
      location
      __typename
    }
  }
`;

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant($id: ID!, $input: UpdateRestaurantInput!) {
    updateRestaurant(_id: $id, input: $input)
  }
`;

export const RESTAURANT_BY_USER_ID = gql`
  query restaurantByUserId($userId: ID!) {
    restaurantByUserId(userId: $userId) {
      _id
      address
      name
      userId
      name
      phone
      avatar
      backgroundImage
      location
      country
      restaurantRate
      promoImage
      countVotes
      description
      tags
      specialty
      averageCost
      menuId
      menu {
        _id
        restaurantId
        categoriesId
        categories {
          _id
          name
          menuId
          articles {
            duration
            _id
            categoryId
            name
            price
            quantity
            image
            articleRate
            ingredients
            newIngredients
            updatedAt
            createdAt
          }
          articlesId
          createdAt
          updatedAt
          deletedAt
        }
        createdAt
        deletedAt
        updatedAt
      }
    }
  }
`;

export const MENU_BY_ID = gql`
  query menuById($menuId: ID!) {
    menuById(_id: $menuId) {
      _id
      categories {
        _id
        name
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      _id
      menuId
      name
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(_id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(_id: $id, input: $input)
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      _id
      categoryId
      name
      ingredients
      price
      duration
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: ID!, $input: UpdateArticleInput!) {
    updateArticle(_id: $id, input: $input)
  }
`;

export const CATEGORY_BY_ID = gql`
  query categoryById($id: ID!) {
    categoryById(_id: $id) {
      _id
      menuId
      name
      articles {
        _id
        name
        ingredients
        price
        duration
        image
        articleRate
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(_id: $id)
  }
`;

export const ADD_ARTICLE_TO_PERSONALIZED_MENU = gql`
  mutation addArticleToPersonalizedMenu($restaurantId: ID!, $articleId: ID!) {
    addArticleToPersonalizedMenu(
      restaurantId: $restaurantId
      articleId: $articleId
    )
  }
`;

export const DELETE_ARTICLE_FROM_PM = gql`
  mutation deleteArticleFromPm($id: ID!) {
    deleteArticleFromPm(_id: $id)
  }
`;

export const PERSONALIZED_MENU_BY_ID = gql`
  query personalizedMenuById($id: ID!) {
    personalizedMenuById(_id: $id) {
      _id
      userId
      restaurantId
      articlesOfPmId
    }
  }
`;

export const UPDATE_ARTICLE_Of_PM = gql`
  mutation updateArticleOfPm($id: ID!, $input: UpdateArticleOfPmInput!) {
    updateArticleOfPm(_id: $id, input: $input)
  }
`;

export const DELETE_PERSONALIZED_MENU = gql`
  mutation deletePersonalizedMenu($id: ID!) {
    deletePersonalizedMenu(_id: $id)
  }
`;

export const PM_BY_USER_ID_RESTAURANT_ID = gql`
  query personalizedMenuByUserIdRestaurantId($userId: ID!, $restaurantId: ID!) {
    personalizedMenuByUserIdRestaurantId(
      userId: $userId
      restaurantId: $restaurantId
    ) {
      _id
      userId
      restaurantId
      articlesId
    }
  }
`;

export const ARTICLES_OF_PM_BY_PERSONALIZED_MENU = gql`
  query articlesOfPmByPersonalizedMenu($personalizedMenuId: ID!) {
    articlesOfPmByPersonalizedMenu(personalizedMenuId: $personalizedMenuId) {
      _id
      name
      articleId
      ingredients
      newIngredients
      duration
      image
      quantity
      price
      rate
      articleOptions {
        _id
        optionName
        optionPrice
        optionAvatar
      }
      article {
        articleOptions {
          _id
          optionName
          optionAvatar
          optionPrice
        }
      }
    }
  }
`;

export const PM_BY_USER_ID = gql`
  query personalizedMenuByUserId($userId: ID!) {
    personalizedMenuByUserId(userId: $userId) {
      _id
      userId
      restaurantId
      articlesOfPmId
    }
  }
`;

export const UPDATE_ARTICLE_AVATAR = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const UPDATE_RESTAURANT_AVATAR = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const UPDATE_RESTAURANT_BACKGROUND_IMAGE = gql`
  mutation createPostMedia($file: Upload!) {
    createPostMedia(file: $file)
  }
`;

export const CREATE_ARTICLE_OPTION = gql`
  mutation createArticleOption($input: [CreateArticleOptionInput]!) {
    createArticleOption(input: $input) {
      _id
      articleId
      optionName
      optionType
      optionAvatar
      optionPrice
    }
  }
`;

export const ARTICLE_OPTION_BY_ARTICLE_ID = gql`
  query articleOptionByArticleId($articleId: ID!) {
    articleOptionByArticleId(articleId: $articleId) {
      _id
      articleId
      optionName
      optionType
      optionAvatar
      optionPrice
    }
  }
`;

export const UPDATE_ARTICLE_OPTIONS = gql`
  mutation updateArticleOptions(
    $input: [UpdateArticleOptionInput]!
    $articleId: ID!
  ) {
    updateArticleOptions(input: $input, articleId: $articleId)
  }
`;

export const SEARCH_RESTAURANT_BY_KEYWORD = gql`
  query searchByKeyWord($word: String!) {
    searchByKeyWord(word: $word) {
      _id
      userId
      name
      avatar
      backgroundImage
      address
      location
      promoImage
      description
      openingTime {
        timeFrom
        timeTo
        days
      }
      specialty
      averageCost
      payment
      services
      phone
      menuId
      photos
      tags
      countVotes
      restaurantRate
    }
  }
`;

export const RATINGS_BY_RESTAURANT_ID = gql`
  query ratingsByRestaurantId($restaurantId: ID!) {
    ratingsByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      rateValue
      comment
      ratingLikes {
        _id
        userId
        ratingId
      }
      ratingComments {
        _id
        userId
        ratingId
        content
      }
      createdAt
    }
  }
`;

export const CREATE_RATING_LIKE = gql`
  mutation createRatingLike($input: CreateRatingLikeInput!) {
    createRatingLike(input: $input) {
      _id
      userId
      ratingId
    }
  }
`;

export const DELETE_RATING_LIKE = gql`
  mutation deleteRatingLike($id: ID!) {
    deleteRatingLike(_id: $id)
  }
`;

export const CREATE_RATING_COMMENT = gql`
  mutation createRatingComment($input: CreateRatingCommentInput!) {
    createRatingComment(input: $input) {
      _id
      userId
      ratingId
      content
    }
  }
`;

export const PROMOTION_RESTAURANT_BY_ID = gql`
  query promotionRestaurantById($restaurantid: ID!) {
    promotionRestaurantById(restaurantid: $restaurantid) {
      _id
      restaurant {
        _id
        name
      }
      name
      description
    }
  }
`;

export const PERSONALIZED_MENU_BY_USER_ID_RESTAURANT_ID = gql`
  query personalizedMenuByUserIdRestaurantId($userId: ID!, $restaurantId: ID!) {
    personalizedMenuByUserIdRestaurantId(
      userId: $userId
      restaurantId: $restaurantId
    ) {
      _id
      userId
      restaurantId
      articles {
        _id
        name
        price
        quantity
        image
        articleRate
        ingredients
        newIngredients
        updatedAt
        createdAt
      }
    }
  }
`;

export const CREATE_RESERVATION = gql`
  mutation createReservation($input: CreateReservationInput!) {
    createReservation(input: $input) {
      _id
      userId
      restaurantId
      date
      confirmation
    }
  }
`;

export const RESERVATION_BY_RESTAURANT_ID = gql`
  query reservationByRestaurantId($restaurantId: ID!) {
    reservationByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      restaurantId
      date
      timeFrom
      peopleNumber
      promotion {
        _id
        name
      }
      payment
      guests {
        lastName
        avatar
      }
      note
      status
    }
  }
`;

export const RESTAURANT_LAST_VISITORS = gql`
  query restaurantLastVisitors($id: ID!) {
    restaurantLastVisitors(_id: $id) {
      lastName
      avatar
      firstName
    }
  }
`;

export const GET_COMMANDES_BY_RESTAURANTID = gql`
  query commandeByRestaurantId($restaurantId: ID!) {
    commandeByRestaurantId(restaurantId: $restaurantId) {
      _id
      userId
      status
      paymentMethod
      commandeTakenMethod
      adresse1

      createdAt
      articlesC {
        quantity
        articleC {
          _id
          name
          ingredients
          image
          price
          duration
          articleOptions {
            _id
            optionName
            optionPrice
          }
        }
      }
      restaurant {
        _id
        name
        avatar
        location
        specialty
      }
    }
  }
`;

export const UPDATE_COMMANDE_STATUS = gql`
  mutation updateCommande($id: String, $input: UpdateCommandeInput) {
    updateCommande(_id: $id, input: $input)
  }
`;

export const CREATE_UNWASTABLE_LIST = gql`
  mutation createUnwastableMenu(
    $restaurantId: ID!
    $input: [CreateUnwastableMenuInput]
  ) {
    createUnwastableMenu(restaurantId: $restaurantId, input: $input) {
      _id
      restaurantId
      list {
        _id
        articles {
          _id
          article {
            name
            image
          }
          quantity
          price
        }
      }
    }
  }
`;

export const GET_UNWASTABLE_BY_RESTAURANTID = gql`
  query unwastableByRestaurantId($restaurantId: ID!) {
    unwastableByRestaurantId(restaurantId: $restaurantId) {
      _id
      list {
        _id
        articles {
          _id
          article {
            _id
            name
            image
            price
          }
          quantity
          price
        }
      }
    }
  }
`;

export const DELETE_DELETE_UNWASTABLE_LIST = gql`
  mutation deleteUnwastableMenu($id: ID!, $unwastableMenuId: ID!) {
    deleteUnwastableMenu(_id: $id, unwastableMenuId: $unwastableMenuId)
    {
     _id
      restaurantId
      list {
      _id
      articles {
        _id
         article {
          name
             image
         }
         quantity
          price
       }
       }
    }
  }
`;

export const UPDATE_UNWASTABLE_MENU = gql`
  mutation updateUnwastableMenu(
    $id: ID!
    $unwastableMenuId: ID!
    $input: [CreateUnwastableMenuInput]
  ) {
    updateUnwastableMenu(
      _id: $id
      unwastableMenuId: $unwastableMenuId
      input: $input
    ) {
      _id
      restaurantId
      list {
        _id
        articles {
          _id
          article {
            _id
            name
            image
          }
          quantity
          price
        }
      }
    }
  }
`;
;
