import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from '../../common/ResponsiveLayout';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  gameOver: {
    color: themes.PRIMARY_COLOR,
    fontSize: 40,
    fontStyle: 'italic',
    marginVertical: 30,
    textAlign: 'center',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightPercentageToDP(35),
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: themes.WHITE_COLOR,
    elevation: 4,
    borderRadius: 4,
    marginHorizontal: 5,
    marginTop: 10,
  },
  rowSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
