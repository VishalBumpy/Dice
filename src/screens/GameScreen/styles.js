import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from '../../common/ResponsiveLayout';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: themes.WHITE_COLOR,
    elevation: 4,
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
  dice: {
    width: 150,
    height: 150,
    backgroundColor: 'pink',
    elevation: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  playerTurn: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
