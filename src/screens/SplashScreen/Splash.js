import React, { Component } from 'react';
import { SafeAreaView, View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import themes from '../../common/themes';
import LinearGradient from 'react-native-linear-gradient';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 1500);
  };

  render() {
    return (
      <LinearGradient
        colors={['#FDC830', '#F37335']}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.8]}
        style={styles.container}
      >
        <Text style={styles.dice}>Dice</Text>
      </LinearGradient>
    );
  }
}

export default Splash;
