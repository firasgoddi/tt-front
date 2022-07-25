import React, { useState } from "react";
import "./sofastsohot.css";
import EpicEatsFiltre from "../autourDeMoi/results/EpicEatsFiltre";

function SoFastSoHot(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const checkNext = () => {
    const labels = document.querySelectorAll("#slider label ");
    const nextIndex =
      selectedIndex === labels.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(nextIndex);
  };
  const [positions, setPositions] = useState([]);

  const check = (index) => setSelectedIndex(index);
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //     const currentPos = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude,
  //       //name: "Jemmel"
  //     };
  //     setPositions((prevPositions) => {
  //       return [...prevPositions, currentPos];
  //     });
  //   });
  // } else {
  //   alert("Sorry Not available!");
  // }
  console.log(positions, "jej");
  return (
    <div className="proposer-moi-page">
      <div className="proposer-moi-page-content container">
        <div className="proposer-moi-page-content-feed">
          <div className="feed-main">
            <EpicEatsFiltre />
            <div className="suggest-restaurant-slider-container">
              <div>
                <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                  <div className="md:w-1/4 py-64 md:mb-0 mb-6 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-5 flex-shrink-0">
                      <button onClick={checkNext}>{"<"}</button>
                    </div>
                  </div>
                  <div
                    className="md:w-2/4 md:mb-0 mb-6 flex flex-col text-center items-center"
                    style={{ marginLeft: "50px" }}
                  >
                    <section
                      id="slider"
                      className="w-16 h-20 inline-flex items-center justify-center mb-5 flex-shrink-0"
                    >
                      <input
                        type="radio"
                        name="slider"
                        id="s1"
                        checked={selectedIndex === 0}
                        onClick={() => check(0)}
                      />
                      <input
                        type="radio"
                        name="slider"
                        id="s2"
                        checked={selectedIndex === 1}
                        onClick={() => check(1)}
                      />
                      <input
                        type="radio"
                        name="slider"
                        id="s3"
                        checked={selectedIndex === 2}
                        onClick={() => check(2)}
                      />
                      <label htmlFor="s1" id="slide1">
                        <img
                          className="fea"
                          src="assets/img/image2.jpg"
                          height="100%"
                          width="100%"
                        />

                        <div className="one-slider-info">
                          <div className="info-logo">
                            <img src="assets/img/icon-restaurant.png" />
                          </div>
                          <span
                            className="info-name"
                            style={{ fontSize: "1.8rem", fontWeight: "bold" }}
                          >
                            PITAYA Thaï Street Food
                          </span>
                          <div className="rating">
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                          </div>
                          <p
                            className="info-description"
                            style={{ fontSize: "1.6rem" }}
                          >
                            Dans un décor typique inspiré des restaurants de rue
                            thaïlandais, Pitaya vous propose des plats frais,
                            cuits à la minute, aussi authentiques qu’exotiques,
                            pour un voyage gustatif dépaysant.
                          </p>
                        </div>

                        <div className="people-was-here">
                          <div className="peoples" style={{ display: "flex" }}>
                            <div
                              className="people"
                              style={{
                                position: "relative",
                                left: "0",
                                borderRadius: "100%",
                                border: "1px solid white",
                              }}
                            >
                              <div className="restaurant-post-card-footer-gestion-de-residus">
                                <div className="left-side">
                                  <div className="shared-component-profil-img">
                                    <img src="../assets/img/Ellipse 378.png" />
                                    <img src="../assets/img/Ellipse 379.png" />
                                    <img src="../assets/img/Ellipse 380.png" />
                                    <span>
                                      <strong>Ahmed</strong> et 12 autres
                                      étaient là !
                                    </span>
                                    <button
                                      className="follow btn"
                                      style={{
                                        outline: "none",
                                        marginLeft: "10px",
                                        borderRadius: "10px",
                                        fontSize: "1.6rem",
                                        background: "white",
                                        color: "#484848",
                                        border: "1px solid #e8e8e8",
                                      }}
                                    >
                                      <i
                                        className="icon-checked"
                                        style={{
                                          color: "#ff6900",
                                          paddingRight: "10px",
                                        }}
                                      />
                                      Déjà suivi
                                    </button>
                                    <button
                                      className="follow send"
                                      style={{
                                        marginLeft: "5px",
                                        fontSize: "2.4rem",
                                      }}
                                    >
                                      <i
                                        className="icon-send"
                                        style={{ color: "#ff6900" }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="s2" id="slide2">
                      <img
                          className="fea"
                          src="assets/img/image2.jpg"
                          height="100%"
                          width="100%"
                        />

                        <div className="one-slider-info">
                          <div className="info-logo">
                            <img src="assets/img/icon-restaurant.png" />
                          </div>
                          <span
                            className="info-name"
                            style={{ fontSize: "1.8rem", fontWeight: "bold" }}
                          >
                            PITAYA Thaï Street Food
                          </span>
                          <div className="rating">
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                          </div>
                          <p
                            className="info-description"
                            style={{ fontSize: "1.6rem" }}
                          >
                            Dans un décor typique inspiré des restaurants de rue
                            thaïlandais, Pitaya vous propose des plats frais,
                            cuits à la minute, aussi authentiques qu’exotiques,
                            pour un voyage gustatif dépaysant.
                          </p>
                        </div>

                        <div className="people-was-here">
                          <div className="peoples" style={{ display: "flex" }}>
                            <div
                              className="people"
                              style={{
                                position: "relative",
                                left: "0",
                                borderRadius: "100%",
                                border: "1px solid white",
                              }}
                            >
                              <div className="restaurant-post-card-footer-gestion-de-residus">
                                <div className="left-side">
                                  <div className="shared-component-profil-img">
                                    <img src="../assets/img/Ellipse 378.png" />
                                    <img src="../assets/img/Ellipse 379.png" />
                                    <img src="../assets/img/Ellipse 380.png" />
                                    <span>
                                      <strong>Ahmed</strong> et 12 autres
                                      étaient là !
                                    </span>
                                    <button
                                      className="follow btn"
                                      style={{
                                        outline: "none",
                                        marginLeft: "10px",
                                        borderRadius: "10px",
                                        fontSize: "1.6rem",
                                        background: "white",
                                        color: "#484848",
                                        border: "1px solid #e8e8e8",
                                      }}
                                    >
                                      <i
                                        className="icon-checked"
                                        style={{
                                          color: "#ff6900",
                                          paddingRight: "10px",
                                        }}
                                      />
                                      Déjà suivi
                                    </button>
                                    <button
                                      className="follow send"
                                      style={{
                                        marginLeft: "5px",
                                        fontSize: "2.4rem",
                                      }}
                                    >
                                      <i
                                        className="icon-send"
                                        style={{ color: "#ff6900" }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                      <label htmlFor="s3" id="slide3">
                      <img
                          className="fea"
                          src="assets/img/image2.jpg"
                          height="100%"
                          width="100%"
                        />

                        <div className="one-slider-info">
                          <div className="info-logo">
                            <img src="assets/img/icon-restaurant.png" />
                          </div>
                          <span
                            className="info-name"
                            style={{ fontSize: "1.8rem", fontWeight: "bold" }}
                          >
                            PITAYA Thaï Street Food
                          </span>
                          <div className="rating">
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                            <i className="fal fa-star" />
                          </div>
                          <p
                            className="info-description"
                            style={{ fontSize: "1.6rem" }}
                          >
                            Dans un décor typique inspiré des restaurants de rue
                            thaïlandais, Pitaya vous propose des plats frais,
                            cuits à la minute, aussi authentiques qu’exotiques,
                            pour un voyage gustatif dépaysant.
                          </p>
                        </div>

                        <div className="people-was-here">
                          <div className="peoples" style={{ display: "flex" }}>
                            <div
                              className="people"
                              style={{
                                position: "relative",
                                left: "0",
                                borderRadius: "100%",
                                border: "1px solid white",
                              }}
                            >
                              <div className="restaurant-post-card-footer-gestion-de-residus">
                                <div className="left-side">
                                  <div className="shared-component-profil-img">
                                    <img src="../assets/img/Ellipse 378.png" />
                                    <img src="../assets/img/Ellipse 379.png" />
                                    <img src="../assets/img/Ellipse 380.png" />
                                    <span>
                                      <strong>Ahmed</strong> et 12 autres
                                      étaient là !
                                    </span>
                                    <button
                                      className="follow btn"
                                      style={{
                                        outline: "none",
                                        marginLeft: "10px",
                                        borderRadius: "10px",
                                        fontSize: "1.6rem",
                                        background: "white",
                                        color: "#484848",
                                        border: "1px solid #e8e8e8",
                                      }}
                                    >
                                      <i
                                        className="icon-checked"
                                        style={{
                                          color: "#ff6900",
                                          paddingRight: "10px",
                                        }}
                                      />
                                      Déjà suivi
                                    </button>
                                    <button
                                      className="follow send"
                                      style={{
                                        marginLeft: "5px",
                                        fontSize: "2.4rem",
                                      }}
                                    >
                                      <i
                                        className="icon-send"
                                        style={{ color: "#ff6900" }}
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </label>
                    </section>
                  </div>

                  <div className="md:w-1/4 py-64 md:mb-0 mb-6 flex flex-col text-center items-center">
                    <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-orange-100 text-orange-500 mb-5 flex-shrink-0"></div>
                    <div className="slider-controls">
                      <button id="goNext" onClick={checkNext}>
                        <span className="fal fa-times" />
                      </button>
                      <button id="goPrev">
                        <span className="fal fa-check" onClick={checkNext} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="feed-secondary">
            <div className="ad-pub-sodexo">
              <img src="assets/img/svg/sodexo.svg" />
              <span>ESPACE PUB</span>
            </div>
            <div className="last-seen">
              <div className="last-seen-top">Derniers venus</div>
              <div className="last-seen-body">
                <div className="profil-visitor">
                  <div className="visitor">
                    <div className="visitor-avatar">
                      <img src="assets/img/rafika-bella.png" />
                    </div>
                    <div className="visitor-info">
                      <span className="user-username">Alex</span>
                      <div className="user-about">
                        <i
                          className="fal fa-map-marker-alt"
                          aria-hidden="true"
                        />
                        <span> Mado Café &amp; Resto</span>
                      </div>
                    </div>
                  </div>
                  <div className="follow-button">
                    <i className="icon-add-friend" />
                  </div>
                </div>
                <div className="profil-visitor">
                  <div className="visitor">
                    <div className="visitor-avatar">
                      <img src="assets/img/rafika-bella.png" />
                    </div>
                    <div className="visitor-info">
                      <span className="user-username">Alex</span>
                      <div className="user-about">
                        <i
                          className="fal fa-map-marker-alt"
                          aria-hidden="true"
                        />
                        <span> Mado Café &amp; Resto</span>
                      </div>
                    </div>
                  </div>
                  <div className="follow-button">
                    <i className="icon-add-friend" />
                  </div>
                </div>
              </div>
            </div>
            <div className="suggested-restaurants">
              <div className="suggested-restaurants-top">
                Suggestion des restaurants
              </div>
              <div className="suggested-restaurants-bottom">
                <div className="restaurant">
                  <img
                    src="assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png"
                    className="pict-of-res"
                  />
                  <div className="restaurant-right-side">
                    <img
                      src="assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png"
                      className="logo"
                    />
                    <div className="restaurant-details">
                      <span className="restaurant-name">Belle Restaurant</span>
                      <div className="restaurant-location">
                        <i className="fal fa-map-marker-alt" />
                        <span className="restaurant-adress">
                          Tunis, Cuisine traditionelle
                        </span>
                      </div>
                      <div className="star-rating">
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="restaurant">
                  <img
                    src="assets/img/2e0dc16abd829f5af42b71ed33f2a82d.png"
                    className="pict-of-res"
                  />
                  <div className="restaurant-right-side">
                    <div className="logo">
                      <img
                        src="assets/img/3f08a2ba008fd3dd0d8090b4d7ab82d8.png"
                        alt=""
                      />
                    </div>
                    <div className="restaurant-details">
                      <span className="restaurant-name">Belle Restaurant</span>
                      <div className="restaurant-location">
                        <i className="fal fa-map-marker-alt" />
                        <span className="restaurant-adress">
                          Tunis, Cuisine traditionelle
                        </span>
                      </div>
                      <div className="star-rating">
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                        <i className="fal fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SoFastSoHot.propTypes = {};

export default SoFastSoHot;