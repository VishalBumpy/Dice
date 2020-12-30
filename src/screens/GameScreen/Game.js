import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  FlatList,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { styles } from './styles';
import themes from '../../common/themes';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { playersListAction } from '../../redux/Actions/playersListAction';
import { Loader } from '../../SharedComponents/Loader';
import { Button } from '../../SharedComponents/Button';
import DieFace1 from '../../SharedComponents/DieFaces/DieFace1';
import DieFace2 from '../../SharedComponents/DieFaces/DieFace2';
import DieFace3 from '../../SharedComponents/DieFaces/DieFace3';
import DieFace4 from '../../SharedComponents/DieFaces/DieFace4';
import DieFace5 from '../../SharedComponents/DieFaces/DieFace5';
import DieFace6 from '../../SharedComponents/DieFaces/DieFace6';
import { colorHandler, objectReplace } from '../../common/commonMethods';
import _ from 'lodash';
import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRolling: false,
      face: 6,
      playerTurn: 0,
    };
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
    let playersArr = Array.from(Array(parseInt(this.props.players)).keys());
    let playersList = playersArr.map((res) => ({
      id: (res + 1).toString(),
      name: `Player ${res + 1}`,
      prevNumber: 0,
      score: 0,
      isGameOver: false,
      isSkip: false,
      rank: null,
    }));
    this.props.playersListAction(playersList);
    this.shakeHandler();
  };

  shakeHandler = () => {
    const SHAKE_THRESHOLD = 26;
    const MIN_TIME_BETWEEN_SHAKES_MILLISECS = 1400;
    setUpdateIntervalForType(SensorTypes.accelerometer, 200);
    this.lastShakeTime = 0;

    this.accelerometerSubscription = accelerometer
      .pipe(
        map(({ x, y, z }) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))),
        filter((acceleration) => acceleration > SHAKE_THRESHOLD)
      )
      .subscribe((acceleration) => {
        const curTime = new Date().getTime();
        if (curTime - this.lastShakeTime > MIN_TIME_BETWEEN_SHAKES_MILLISECS) {
          this.lastShakeTime = curTime;
          console.log('Shaked device! acceleratssssssion: ', acceleration);
          if (this.state.isRolling == false) {
            this.rollDice();
          }
        }
      });
  };

  handleBackButtonPress = () => {
    if (!this.props.navigation.isFocused()) {
      console.log('not focused');
    } else {
      Alert.alert('Are you sure, Do you want exit ?', '', [
        {
          text: 'yes',
          onPress: async () => {
            BackHandler.exitApp();
          },
        },
        {
          text: 'no',
          onPress: async () => {},
        },
      ]);
      return true;
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
    this.accelerometerSubscription.remove();
  }

  rollDice = () => {
    this.setState({
      isRolling: true,
      face: Math.floor(Math.random() * 6) + 1,
    });

    setTimeout(() => {
      this.afterDiceRolled();
    }, 1500);
  };

  afterDiceRolled = async () => {
    const { playerTurn, face } = this.state;
    let playersList = this.props.playersList;
    let playerData = playersList[playerTurn];
    playerData.score = playerData.score + face;
    if (face == 1 && playerData.prevNumber == face) {
      playerData.isSkip = true;
      playerData.prevNumber = face;
    } else {
      playerData.prevNumber = face;
    }
    if (playerData.score >= this.props.maxScore) {
      playerData.isGameOver = true;
      let rankedPlayer = playersList.reduce(
        (max, e) => (e.rank > max ? e.rank : max),
        playersList[0].rank
      );
      playerData.rank = rankedPlayer ? rankedPlayer + 1 : 1;
    }
    await this.props.playersListAction(playersList);
    if (face == 6 && playerData.isGameOver == false) {
      this.setState({ isRolling: false });
    } else {
      if (playerTurn + 1 == parseInt(this.props.players)) {
        this.nextPlayerHandler(1);
      } else {
        this.nextPlayerHandler(playerTurn + 2);
      }
    }
  };

  nextPlayerHandler = (id) => {
    let playersList = this.props.playersList;
    let nextPlayer = playersList.find(
      (e) => parseInt(e.id) >= id && e.isSkip == false && e.isGameOver == false
    );
    if (nextPlayer) {
      this.setState({ playerTurn: parseInt(nextPlayer.id) - 1, isRolling: false });
    } else {
      let anotherPlayer = playersList.find(
        (e) => parseInt(e.id) <= id && e.isSkip == false && e.isGameOver == false
      );
      if (anotherPlayer) {
        this.setState({ playerTurn: parseInt(anotherPlayer.id) - 1, isRolling: false });
      } else {
        this.props.navigation.navigate('GameOverStack');
      }
    }

    this.skipPlayerHandler(id);
  };

  skipPlayerHandler = (id) => {
    let playersList = this.props.playersList;
    let lastReached = null;
    for (let i = id - 1; id <= playersList.length; i++) {
      if (playersList[i]) {
        if (parseInt(playersList[i].id) >= id && playersList[i].isSkip == false) {
          break;
        }

        playersList[i].isSkip = false;
        let newArray = objectReplace(this.props.playersList, playersList[i], 'id');
        this.props.playersListAction(newArray);
      } else {
        lastReached = true;
        break;
      }
    }
    if (lastReached) {
      for (let i = 0; i <= playersList.length; i++) {
        if (playersList[i]) {
          if (parseInt(playersList[i].id) <= id && playersList[i].isSkip == false) {
            break;
          }

          playersList[i].isSkip = false;
          let newArray = objectReplace(this.props.playersList, playersList[i], 'id');
          this.props.playersListAction(newArray);
        } else {
          break;
        }
      }
    }
  };

  dice = (face) => {
    let diceFace;
    switch (face) {
      case 1:
        diceFace = <DieFace1 />;
        break;
      case 2:
        diceFace = <DieFace2 />;
        break;
      case 3:
        diceFace = <DieFace3 />;
        break;
      case 4:
        diceFace = <DieFace4 />;
        break;
      case 5:
        diceFace = <DieFace5 />;
        break;
      case 6:
        diceFace = <DieFace6 />;
        break;

      default:
        diceFace = <DieFace6 />;
        break;
    }
    return diceFace;
  };

  emptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={{ padding: 20, textAlign: 'center' }}>No players are there</Text>
      </View>
    );
  };

  render() {
    const { playersList, maxScore } = this.props;
    const { isRolling, face, playerTurn } = this.state;
    let sortedList = null;

    if (playersList) {
      let rankedList = playersList.filter((e) => e.rank);
      let remainingList = playersList.filter((e) => !e.rank);
      sortedList = [
        ..._.orderBy(rankedList, ['rank'], ['asc']),
        ..._.orderBy(remainingList, ['score'], ['desc']),
      ];
    }

    this.spinValue = new Animated.Value(0);

    // First set up animation
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear, // Easing is an additional import from react-native
        useNativeDriver: true, // To make use of native driver for performance
      })
    ).start();

    // Next, interpolate beginning and end values (in this case 0 and 1)
    this.spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return sortedList ? (
      <View style={styles.container}>
        <View style={styles.rowSB}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.handleBackButtonPress();
            }}
          >
            <Icons name='home' size={30} />
          </TouchableOpacity>
          <Text>Max Score: {maxScore}</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.props.navigation.navigate('PlayersList');
            }}
          >
            <Icons name='format-list-numbered' size={30} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={sortedList.slice(0, 3)}
          ListEmptyComponent={this.emptyList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ paddingBottom: 20 }} />}
          renderItem={({ item, index }) => (
            <View style={{ ...styles.listContainer, ...styles.rowSB }}>
              <View style={styles.row}>
                <FontAwesome5 name='crown' size={20} color={colorHandler(index)} />
                <Text style={{ marginLeft: 15 }}>{item.name}</Text>
              </View>
              <Text>{item.rank}</Text>
              <Text>{item.score}</Text>
            </View>
          )}
        />
        <Text style={styles.playerTurn}>
          <Text style={{ color: themes.PRIMARY_COLOR }}>{playersList[playerTurn].name}</Text> roll
          the dice
        </Text>
        <View style={{ alignItems: 'center', flexGrow: 1 }}>
          {isRolling ? (
            <Animated.View
              style={{ ...styles.dice, elevation: 0, transform: [{ rotateY: this.spin }] }}
            >
              <DieFace6 style={{ elevation: 0 }} />
            </Animated.View>
          ) : (
            this.dice(face)
          )}
        </View>
        <Button
          label={isRolling ? 'Rolling' : 'Roll'}
          btnContainerStyle={{ marginTop: 20, alignSelf: 'center' }}
          rolling={isRolling}
          onPress={this.rollDice}
        />
      </View>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
    playersList: state.playersList ? state.playersList.playersList : null,
    maxScore: state.maxScore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    playersListAction: (playersList) => dispatch(playersListAction(playersList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
