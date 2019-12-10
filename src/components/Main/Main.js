import React, { Component } from "react";
import WhatsTrendingController from "../WhatsTrendingController/WhatsTrendingController";
import Banner from "../Banner/Banner";
import SearchForPerson from "../SearchForPerson/SearchForPerson";
import LocalMapButton from "../LocalMapButton/LocalMapButton";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import Flexbox from "flexbox-react";
import { firebase } from "../../firebase";
import UserBubble from "../UserBubble/UserBubble";
import GeoLocation from "../Geolocation/GeoLocation";
import { Modal } from "@material-ui/core";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapHeight: "23vh",
      users: [1, 2, 3, 4, 5, 6, 7, 8],
      userBubblesVisible: false,
      userBubblesOpacity: 0,
      selectedTrendingSong: null
    };

    this.handleTrendingSongSelected = this.handleTrendingSongSelected.bind(
      this
    );
  }

  componentDidMount() {
    const db = firebase.firestore();
    //TODO: ger nearby users
  }

  toggleMapHeight = () => {
    if (this.state.mapHeight === "23vh") {
      this.setState({
        mapHeight: "90vh",
        userBubblesVisible: true,
        userBubblesOpacity: "1"
      });
    } else {
      this.setState({
        mapHeight: "23vh",
        userBubblesVisible: false,
        userBubblesOpacity: "0"
      });
    }
  };

  createNearbyUser(user) {
    return <UserBubble user={user} />;
  }

  handleTrendingSongSelected(uri) {
    this.setState({
      selectedTrendingSong: uri
    });
  }

  render() {
    return (
      <Flexbox
        flexDirection="column"
        minHeight="100vh"
        style={{
          // background: "linear-gradient(180deg, #091740 0%, #112bbf 100%)",
          background: "linear-gradient(180deg, #ee0979 0%, #ff6a00 100%)",

          //background: "#efefef",
          color: "#efefef"
        }}
      >
        <Flexbox element="header" height="60px" marginTop="20px">
          <div>
            <Banner />
          </div>

          <div
            style={{
              display: "flex",
              position: "absolute",
              flexGrow: 1,
              right: "15vw"
            }}
          >
            <SearchForPerson />
          </div>
        </Flexbox>

        <Flexbox flexGrow={1} alignSelf="center">
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: "20vh",
              width: "100vw",
              height: "40vh",
              left: 0
            }}
          >
            <WhatsTrendingController
              trendingSongSelected={this.handleTrendingSongSelected}
            />
          </div>
        </Flexbox>

        <Flexbox
          flexGrow={1}
          alignSelf="center"
          element="footer"
          flexDirection="column"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "0vh",
              left: 0,
              width: "100vw",
              height: this.state.mapHeight,
              minHeight: "27vh",
              // background: "#112BBF",
              background: "linear-gradient(180deg, #ED4264 0%, #FFEDBC 100%)",
              transition: "height 0.3s ease-in-out"
            }}
          >
            <LocalMapButton slideCallback={this.toggleMapHeight} />
            {/* <GeoLocation /> */}

            {this.state.userBubblesVisible &&
              this.state.users.map(user => this.createNearbyUser(user))}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100vw",
              height: "20vh"
              // background: "#112BBF"
              //background: "linear-gradient(180deg, #C02425 0%, #F0CB35 100%)"
              // background: "rgba(225, 230, 225, 0.1)"
            }}
          >
            <SpotifyPlayer
              selectedTrendingSong={this.state.selectedTrendingSong}
            />
          </div>
        </Flexbox>
      </Flexbox>
    );
  }
}

export default Main;
