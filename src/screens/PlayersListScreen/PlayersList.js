import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles';
import Icons from 'react-native-vector-icons/FontAwesome5';
import themes from '../../common/themes';
import _ from 'lodash';
import { Loader } from '../../SharedComponents/Loader';
import { colorHandler } from '../../common/commonMethods';

class PlayersList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  emptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={{ padding: 20, textAlign: 'center' }}>No players are there</Text>
      </View>
    );
  };

  render() {
    const { maxScore, playersList } = this.props;

    let rankedList = playersList.filter((e) => e.rank);
    let remainingList = playersList.filter((e) => !e.rank);
    let sortedList = [
      ..._.orderBy(rankedList, ['rank'], ['asc']),
      ..._.orderBy(remainingList, ['score'], ['desc']),
    ];

    return sortedList ? (
      <View style={styles.container}>
        <View style={{ ...styles.row, ...styles.header }}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Icons name='arrow-left' size={20} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20 }}>All Players</Text>
        </View>
        <Text style={{ fontSize: 20, paddingVertical: 15 }}>Max Score: {maxScore}</Text>
        <FlatList
          data={sortedList}
          ListEmptyComponent={this.emptyList}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ paddingBottom: 50 }} />}
          renderItem={({ item, index }) => (
            <View style={{ ...styles.listContainer, ...styles.rowSB }}>
              <View style={styles.row}>
                <Icons name='crown' size={20} color={colorHandler(index)} />
                <Text style={{ marginLeft: 15 }}>{item.name}</Text>
              </View>
              <Text>{item.rank}</Text>
              <Text>{item.score}</Text>
            </View>
          )}
        />
      </View>
    ) : (
      <Loader />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playersList: state.playersList ? state.playersList.playersList : null,
    maxScore: state.maxScore,
  };
};

export default connect(mapStateToProps)(PlayersList);
