import React, { Component } from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import themes from '../../common/themes';

export class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      maxScore: null,
    };
  }

  componentDidMount = async () => {};

  changeHandler = (name, validation, value) => {
    if (value == '') {
      this.setState({ [name]: null });
    } else if (value.match(validation)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    const { labelStyle, label, btnContainerStyle, loading, rolling, onPress } = this.props;
    return (
      <TouchableOpacity
        style={[styles.btnContainer, btnContainerStyle]}
        disabled={loading || rolling || false}
        onPress={onPress || (() => {})}
      >
        {loading ? (
          <ActivityIndicator color={themes.WHITE_COLOR} />
        ) : (
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  }
}
