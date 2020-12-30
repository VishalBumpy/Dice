import { StyleSheet } from 'react-native';
import { widthPercentageToDP } from '../../common/ResponsiveLayout';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  btnContainer: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    elevation: 4,
    backgroundColor: themes.PRIMARY_COLOR,
    borderRadius: 10,
    width: widthPercentageToDP(60),
  },
  label: {
    fontSize: 15,
    color: themes.WHITE_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
