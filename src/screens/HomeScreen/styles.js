import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from '../../common/ResponsiveLayout';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    fontSize: 16,
    backgroundColor: themes.WHITE_COLOR,
    padding: 15,
    borderRadius: 4,
    elevation: 4,
    width: widthPercentageToDP(80),
    marginBottom: 20,
  },
});
