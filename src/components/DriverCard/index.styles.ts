import {StyleSheet} from 'react-native';
import {theme} from '../../core/theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#3d3d3d',
  },
  details: {
    flex: 3,
    paddingRight: 10,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  commonIcon: {
    color: '#fff',
    marginRight: 5,
  },
  carModel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  carDetails: {
    flexDirection: 'row',
    paddingTop: 5,
  },
  carDetail: {
    fontSize: 14,
    color: '#ccc',
    marginRight: 5,
  },
  locationTime: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
  },
  locationValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  timeValue: {
    fontSize: 12,
    color: '#fff',
    marginRight: 5,
  },
  priceSection: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
});
