import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class Dot extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {} = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.dot} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
});
