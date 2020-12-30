import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { styles } from './styles';
import themes from '../../common/themes';

export class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { screen } = this.props;
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={themes.PRIMARY_COLOR} />
      </View>
    );
  }
}
