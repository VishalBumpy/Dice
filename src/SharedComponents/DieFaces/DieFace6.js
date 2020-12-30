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
      <View style={{ ...styles.dice, ...this.props.style }}>
        <View style={styles.alignDots}>
          <Dot />
          <Dot />
        </View>
        <View style={styles.alignDots}>
          <Dot />
          <Dot />
        </View>
        <View style={styles.alignDots}>
          <Dot />
          <Dot />
        </View>
      </View>
    );
  }
}
