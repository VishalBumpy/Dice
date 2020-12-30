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
        <View
          style={{ transform: [{ rotate: '135deg' }], flex: 1, justifyContent: 'space-around' }}
        >
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
    );
  }
}
