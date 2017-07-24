import React, { Component } from "react";
import actions from "../store/actions";
import Games from "../components/Games";
import userService from "../services/user";
import "../../styles/Home.css";

export default class Home extends Component {
  state = {
    games: {
      lobby: [],
      playing: [],
    },
    user: userService.get()
  };

  componentWillMount() {
    actions.getGames().then(games => {
      this.setState({
        games
      });
    });
  }

  onSelectGame(game) {
    this.props.history.push(`/games/${game.id}`);
  }

  render() {
    return (
      <div className="home">
        <p className="home__welcome">
          Welcome {this.state.user.name}
        </p>
        <a href="/game-creation" className="home__game-creation-button">Create</a>
        <h3 className="home__title">Lobby</h3>
        <Games
          games={this.state.games.lobby}
          onSelectGame={this.onSelectGame.bind(this)}
        />
        <h3 className="home__title">Your games</h3>
        <Games
          games={this.state.games.playing}
          onSelectGame={this.onSelectGame.bind(this)}
        />
      </div>
    );
  }
}
