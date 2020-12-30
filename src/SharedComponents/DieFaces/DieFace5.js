import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import Dot from '../Dot';

export default class DieFace1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.dice}>
        <View style={styles.alignDots}>
          <Dot />
          <Dot />
        </View>
        <View style={styles.dot} />
        <View style={styles.alignDots}>
          <Dot />
          <Dot />
        </View>
      </View>
    );
  }
}
