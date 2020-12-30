import { StyleSheet } from 'react-native';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  dice: {
    fontSize: 40,
    fontStyle: 'italic',
    color: themes.WHITE_COLOR,
  },
});
