import React, { Component } from 'react';
import { SafeAreaView, View, Text, BackHandler, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import themes from '../../common/themes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Button } from '../../SharedComponents/Button';
import { clearAction } from '../../redux/Actions/ClearAction';
import { Loader } from '../../SharedComponents/Loader';
import { colorHandler } from '../../common/commonMethods';
import _ from 'lodash';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
  };

  handleBackButtonPress = () => {
    if (!this.props.navigation.isFocused()) {
      console.log('not focused');
    } else {
      Alert.alert('Are you sure, Do you want exit ?', '', [
        {
          text: 'Exit',
          onPress: async () => {
            BackHandler.exitApp();
          },
        },
        {
          text: 'New Game',
          onPress: async () => {
            this.props.clearAction();
            this.props.navigation.navigate('Home');
          },
        },
      ]);
      return true;
    }
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
  }

  emptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={{ padding: 20, textAlign: 'center' }}>No players are there</Text>
      </View>
    );
  };

  render() {
    const { playersList } = this.props;
    let sortedList = null;
    if (playersList) {
      let rankedList = playersList.filter((e) => e.rank);
      sortedList = _.orderBy(rankedList, ['rank'], ['asc']);
    }
    return sortedList ? (
      <View style={styles.container}>
        <Text style={styles.gameOver}>GameOver</Text>
        <Text style={{ fontSize: 16 }}>Top 3 members</Text>
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
        <View style={{ alignItems: 'center', flexGrow: 1 }}>
          <Button
            label='Ranking List'
            btnContainerStyle={{ marginTop: 20, alignSelf: 'center', backgroundColor: 'purple' }}
            labelStyle={{ textTransform: 'capitalize' }}
            onPress={() => this.props.navigation.navigate('RankingList')}
          />
        </View>
        <View style={{ alignItems: 'center', flexGrow: 1 }}>
          <Button
            label='Start New Game'
            btnContainerStyle={{ marginTop: 20, alignSelf: 'center' }}
            labelStyle={{ textTransform: 'capitalize' }}
            onPress={() => {
              this.props.clearAction();
              this.props.navigation.navigate('Home');
            }}
          />
        </View>
      </View>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playersList: state.playersList ? state.playersList.playersList : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAction: (playersList) => dispatch(clearAction(playersList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
