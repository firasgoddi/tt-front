import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { UserContext } from "../../context/UserContext";
import SidebarResidusUser from "./SidebarResidusUser";
import TextField from "@material-ui/core/TextField";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import CardResidusUser from "./CardResidusUser";
import { UiContext } from "../../context/UiContext";
import Grid from "@material-ui/core/Grid";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
function GestionResidusUser(props) {
  const [selectedCategory, setSelectedCategory] = useState({});
  const { myCommande, setMyCommande } = useContext(UserContext);

  const { getRestaurantByUserId } = useContext(RestaurantContext);
  const { activeUser, getUnwastables } = useContext(UserContext);

  const [unwastable, setUnwastable] = useState([]);
  const [articles, setArticles] = useState([]);
  const { getIndex } = useContext(UiContext);

  useEffect(async () => {
    await getUnwastables(setUnwastable);
  }, [props]);
  console.log(unwastable, "oijju");

  const [list, setList] = useState([]);
  useEffect(() => {
    unwastable &&
      unwastable.forEach((el) => {
        el.list.forEach((category) => {
          category.articles.forEach((article) =>
            setArticles((prev) => [...prev, { ...article }])
          );
        });
      });
  }, [unwastable]);

  console.log(articles, "ejej");

  useEffect(() => {
    console.log(myCommande, "CardList");
  }, [myCommande]);

  console.log(unwastable, "kkeee");

  // var index = getIndex(unwastable.restaurant,unwastable,'_id')
  // const restoName=unwastable && unwastable[index] &&  unwastable[index].restaurant.name

  console.log(articles, "Firas");
  const sortPlusCher =
    articles &&
    articles.slice().sort(function (a, b) {
      if (a.price > b.price) {
        return -1;
      }
      if (a.price < b.price) {
        return 1;
      }
      return 0;
    });
  console.log(sortPlusCher, "sza");
  const sortMoinsCher =
    articles &&
    articles.slice().sort(function (a, b) {
      if (a.price < b.price) {
        return -1;
      }
      if (a.price > b.price) {
        return 1;
      }
      return 0;
    });
  console.log(sortMoinsCher, "IIuu");
  function filtreMoinsCher() {
    setUnwastable((prev) => [...prev, { sortMoinsCher }]);
  }
  function filtrePlusCher() {
    setUnwastable((prev) => [...prev, { sortPlusCher }]);
  }
  return (
    <div className="gestion-de-residus">
      <div className="gestion-de-residus-content">
        <div className="gestion-de-residus-Restaurant-content-feed container">
          <div className="gestion-residus-Restaurant">
            <div className="gestion-residus-Restaurant-header">
              <span className="gestion-residus-Restaurant-header-title">
                <span style={{ color: "#ff6900" }}>
                  Hi {activeUser.lastName}
                </span>
                <br></br>
                <br></br>
                <br></br>
                Gestion de résidus
              </span>

              <span className="gestion-residus-Restaurant-header-description">
                Cet espace vos permet de gérer le résidus de vos aliments et
                plats.
              </span>

              <span className="gestion-residus-Restaurant-header-title"></span>
            </div>

            <div style={{ marginTop: 30 }}>
              <Grid container direction="row">
                <Grid item xs={2}>
                  {" "}
                  <FilterListIcon
                    style={{
                      width: 50,
                      height: "auto",
                      color: "#ff6900",
                      marginLeft: 20,
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  {" "}
                  <div className="country2-dropdown">
                    <div className="country2">
                      <span> Choisir gouvernerat</span>
                      <i className="fal fa-bars bars" />
                    </div>
                    <div className="country2" onClick={() => filtreMoinsCher()}>
                      <span> Les moins chers</span>
                      <ArrowCircleDownIcon />
                    </div>

                    <div className="country2">
                      <span> Les plus chers</span>
                      <ArrowCircleUpIcon />
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>

            <div className="menu-gestion-residus">
              <SearchIcon style={{ marginLeft: 40 }} />
              <span>14 Resultats trouvé</span>

              <div className="menu-body">
                {unwastable &&
                  unwastable.map((el) => {
                    return (
                      <div>
                        <h1>{el.restaurant.name}</h1>
                        {el.list.map((list) => {
                          return (
                            <Grid container spacing={3}>
                              {list.articles.map((article) => {
                                return (
                                  <Grid item xs={6}>
                                    <CardResidusUser
                                      article={article}
                                      list={list}
                                      myCommande={myCommande}
                                      setMyCommande={setMyCommande}
                                      unwastable={unwastable}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <SidebarResidusUser
            articles={selectedCategory.articles}
            myCommande={myCommande}
            setMyCommande={setMyCommande}
          />
        </div>
      </div>
    </div>
  );
}

GestionResidusUser.propTypes = {};

export default GestionResidusUser;