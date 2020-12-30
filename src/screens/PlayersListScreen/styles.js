import { StyleSheet } from 'react-native';
import { heightPercentageToDP } from '../../common/ResponsiveLayout';
import themes from '../../common/themes';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },
  header: {
    paddingVertical: 15,
    marginHorizontal: -20,
    elevation: 2,
    backgroundColor: themes.WHITE_COLOR,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSB: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  iconContainer: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 50,
    backgroundColor: themes.WHITE_COLOR,
    elevation: 4,
    marginHorizontal: 20,
  },
});
