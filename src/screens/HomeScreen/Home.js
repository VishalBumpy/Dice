import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { styles } from './styles';
import { Button } from '../../SharedComponents/Button';
import { connect } from 'react-redux';
import { maxScoreAction } from '../../redux/Actions/maxScoreAction';
import { playersAction } from '../../redux/Actions/playersAction';

let numberValidation = /^[0-9]+$/;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: null,
      maxScore: null,
      isClicked: false,
    };
  }

  componentDidMount() {}

  changeHandler = (name, validation, value) => {
    if (value == '') {
      this.setState({ [name]: null });
    } else if (value.match(validation)) {
      this.setState({ [name]: value });
    }
  };

  saveDetails = () => {
    const { players, maxScore } = this.state;
    this.setState({ isClicked: true });
    if (players && maxScore) {
      this.props.playersAction(players);
      this.props.maxScoreAction(maxScore);
      this.props.navigation.navigate('GameStack');
    } else {
      alert('Players and Max-Score are required');
      this.setState({ isClicked: false });
    }
  };

  render() {
    const { players, maxScore, isClicked } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          onChangeText={(players) => this.changeHandler('players', numberValidation, players)}
          value={players || ''}
          placeholder='No. of Players'
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.inputField}
          onChangeText={(maxScore) => this.changeHandler('maxScore', numberValidation, maxScore)}
          value={maxScore || ''}
          placeholder='Maximum Score'
          keyboardType='number-pad'
        />
        <Button
          label='Start'
          btnContainerStyle={{ marginTop: 20 }}
          loading={isClicked}
          onPress={this.saveDetails}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    maxScoreAction: (maxScore) => dispatch(maxScoreAction(maxScore)),
    playersAction: (players) => dispatch(playersAction(players)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
