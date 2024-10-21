import {Dimensions, StyleSheet} from 'react-native';
import {theme} from '../../core/theme';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    width: width * 0.9,
    height: height * 0.5,
  },
  rideButton: {
    width: width * 0.9,
  },

  driverCard: {
    width: width * 0.9,
    height: 100,
    backgroundColor: theme.colors.card,
    alignSelf: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },

  driverName: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: 'bold',
    marginLeft: 12,
    position: 'relative',
    top: 0,
  },
  carName: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    marginLeft: 12,
    marginBottom: 12,
    position: 'relative',
    top: 0,
  },
});
