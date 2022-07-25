import React, { useContext, useState, useEffect } from "react";
import { UiContext } from "../../context/UiContext";
import MenuList from "./MenuList";
import PreviousResiduSideBar from "./PreviousResiduSideBar";
import ProfileRestoHeader from "../profileRestaurant/ProfileRestoHeader";
import CardResidus from "./CardResidus";
import SidebarResidus from "./SidebarResidus";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import Dialogg from "../atoms/Dialog";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

function GestionResidus(props) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [myCommande, setMyCommande] = useState([]);
  const [myRestaurants, setMyRestautants] = useState([]);
  const { getRestaurantByUserId, getUnwastableByRestaurantId } =
    useContext(RestaurantContext);
  const { activeUser } = useContext(UserContext);
  // const [previousLists, setPreviousLists] = useState([
  //   [
  //     {
  //       duration: "20",
  //       id: "b1917080-0b0a-11ec-a518-69563f487365",
  //       image:
  //         "api.taktak.com.tn/static/b176e3a0-0b0a-11ec-a518-69563f487365.jpeg",
  //       name: "chicken wings",
  //       newPrice: 5.4,
  //       price: 7.6,
  //       quantite: 5,
  //     },
  //     {
  //       id: "809de060-0aa3-11ec-a518-69563f487365",
  //       image:
  //         "api.taktak.com.tn/static/8080e280-0aa3-11ec-a518-69563f487365.jpeg",
  //       name: "chorba ",
  //       newPrice: 6,
  //       price: 6,
  //       quantite: 5,
  //     },
  //   ],
  //   [
  //     {
  //       duration: "20",
  //       id: "b1917080-0b0a-11ec-a518-69563f487365",
  //       image:
  //         "api.taktak.com.tn/static/b176e3a0-0b0a-11ec-a518-69563f487365.jpeg",
  //       name: "chicken wings",
  //       newPrice: 5.4,
  //       price: 7.6,
  //       quantite: 5,
  //     },
  //     {
  //       id: "809de060-0aa3-11ec-a518-69563f487365",
  //       image:
  //         "api.taktak.com.tn/static/8080e280-0aa3-11ec-a518-69563f487365.jpeg",
  //       name: "chorba ",
  //       newPrice: 6,
  //       price: 6,
  //       quantite: 5,
  //     },
  //   ],
  // ]);

  const [unwastableData, setUnwastableData] = useState([]);
  const [previousLists, setPreviousLists] = useState([]);
  useEffect(async () => {
    await getRestaurantByUserId(activeUser.userId, setMyRestautants);
  }, [props]);

  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    setSelectedRestaurant(myRestaurants[0]);
  }, [myRestaurants]);
  useEffect(() => {
    selectedRestaurant &&
      selectedRestaurant.menu &&
      selectedRestaurant.menu.categories[0].articles &&
      setSelectedCategory(selectedRestaurant.menu.categories[0]);
    // setArticles(selectedRestaurant.menu.categories[0].articles);
  }, [selectedRestaurant]);

  useEffect(() => {
    setArticles([]);
    selectedRestaurant &&
      selectedRestaurant.menu &&
      selectedRestaurant.menu.categories &&
      selectedRestaurant.menu.categories.forEach((category) => {
        category.articles.forEach((article) =>
          setArticles((prev) => [...prev, { ...article }])
        );
      });
  }, [selectedRestaurant]);
  useEffect(() => {
    console.log(myCommande, "CardList");
  }, [myCommande]);
  useEffect(async () => {
    selectedRestaurant &&
      selectedRestaurant._id &&
      (await getUnwastableByRestaurantId(
        selectedRestaurant._id,
        setUnwastableData
      ));
  }, [selectedRestaurant]);

  useEffect(() => {
    if (unwastableData && unwastableData.list) {
      const unwastableId = unwastableData._id;
      const pl = unwastableData.list.map((el) => {
        const articles = el.articles.map((article) => {
          if (article) {
            return {
              unwastableId: unwastableId,
              unwastableMenuId: el._id,
              id: article.article._id,
              image: article.article.image,
              name: article.article.name,
              newPrice: article.price,
              price: article.article.price,
              quantite: article.quantity,
            };
          }
        });
        return articles;
      });
      setPreviousLists([...pl]);
    }
  }, [unwastableData]);

  useEffect(() => {
    console.log(unwastableData, "previous List");
  }, [unwastableData]);
  useEffect(() => {
    console.log(previousLists, "previous List To map");
  }, [previousLists]);

  const [expand, setExpand] = useState(false);
  function openMoreLists() {
    setExpand(!expand);
  }
  return (
    <div className="gestion-de-residus">
      {myRestaurants && selectedRestaurant && (
        <div className="gestion-de-residus-content">
          <div className="gestion-de-residus-Restaurant-content-feed container">
            <div className="gestion-residus-Restaurant">
              <div className="gestion-residus-Restaurant-header">
                <span className="gestion-residus-Restaurant-header-title">
                  Gestion de résidus
                </span>

                <span className="gestion-residus-Restaurant-header-description">
                  {" "}
                  Cet espace vos permet de gérer le résidus de vos aliments et
                  plats.
                </span>

                <span className="gestion-residus-Restaurant-header-title">
                  <Dialogg
                    items={myRestaurants}
                    selectedItem={selectedRestaurant}
                    setSelectedItem={setSelectedRestaurant}
                  />{" "}
                </span>
              </div>
              <ProfileRestoHeader
                restaurant={selectedRestaurant}
                isProfile={false}
              />
              <div style={{ marginTop: 30 }}></div>
              <MenuList
                restaurant={selectedRestaurant}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                type={"residus"}
              />
              {selectedCategory && (
                <div className="menu-gestion-residus">
                  <span>
                    Vous avez ajouté ({" "}
                    <span style={{ color: "#131D28", fontWeight: "bold" }}>
                      {selectedCategory &&
                        selectedCategory.articles &&
                        selectedCategory.articles.length}
                    </span>{" "}
                    ) articles dans {selectedCategory.name}
                  </span>
                  <div className="menu-body">
                    {selectedCategory &&
                      selectedCategory.articles &&
                      articles &&
                      articles
                        .filter(
                          (article) =>
                            article.categoryId == selectedCategory._id
                        )
                        .map((article) => (
                          <CardResidus
                            selectedCategory={selectedCategory}
                            article={article}
                            myCommande={myCommande}
                            setMyCommande={setMyCommande}
                          />
                        ))}
                  </div>
                  {/* <NavLink
                    exact
                    to={`/profileRestaurant/` + selectedRestaurant.id}
                  >
                    <div className="back-to-menu">
                      <i
                        className="fal fa-long-arrow-alt-left"
                        aria-hidden="true"
                      />
                      <a href="profile-restaurant.html">Mes Menus</a>
                    </div>
                  </NavLink>
                */}
                </div>
              )}
            </div>
            <div className="feed-secondary">
              <SidebarResidus
                restaurantId={selectedRestaurant._id}
                myCommande={myCommande}
                setMyCommande={setMyCommande}
                setUnwastableData={setUnwastableData}
              />
              <div className="my-list">
                <span className="left-side">
                  Menus en cours (
                  <span style={{ color: "#ff6900" }}>
                    {previousLists &&
                      previousLists.length &&
                      previousLists.length}
                  </span>
                  ){" "}
                  <IconButton
                    size="small"
                    onClick={openMoreLists}
                    // aria-expanded={expanded}
                    aria-label="show more"
                    aria-expanded={expand}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </span>
              </div>
              <Collapse in={expand}>
                <div>
                  {previousLists &&
                    previousLists.map((el, index) => (
                      <PreviousResiduSideBar
                        unwastableId={el[0].unwastableId}
                        unwastableMenuId={el[0].unwastableMenuId}
                        index={index}
                        restaurantId={selectedRestaurant._id}
                        previousList={el}
                        setPreviousLists={setPreviousLists}
                        setUnwastableData={setUnwastableData}
                      />
                    ))}
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

GestionResidus.propTypes = {};

export default GestionResidus;