import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './src/screens/SplashScreen/Splash';
import Home from './src/screens/HomeScreen/Home';
import Game from './src/screens/GameScreen/Game';
import PlayersList from './src/screens/PlayersListScreen/PlayersList';
import GameOver from './src/screens/GameOverScreen/GameOver';

const GameStack = createStackNavigator(
  {
    Game: {
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
      screen: Game,
    },
    PlayersList: {
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
      screen: PlayersList,
    },
  },
  {
    initialRouteName: 'Game',
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  }
);

const GameOverStack = createStackNavigator(
  {
    GameOver: {
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
      screen: GameOver,
    },
    RankingList: {
      navigationOptions: ({ navigation }) => ({
        headerShown: false,
      }),
      screen: PlayersList,
    },
  },
  {
    initialRouteName: 'GameOver',
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    Splash: Splash,
    Home: Home,
    GameStack: GameStack,
    GameOverStack: GameOverStack,
  },
  {
    initialRouteName: 'Splash',
    defaultNavigationOptions: {
      gestureEnabled: false,
    },
  }
);

export default createAppContainer(SwitchNavigator);
