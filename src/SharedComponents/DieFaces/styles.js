import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dice: {
    width: 150,
    height: 150,
    backgroundColor: 'pink',
    elevation: 6,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  alignDots: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
