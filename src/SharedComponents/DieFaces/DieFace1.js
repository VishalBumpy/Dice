import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './styles';

export default class DieFace1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.dice}>
        <View style={styles.dot} />
      </View>
    );
  }
}
