import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    marginLeft: 12,
    marginTop: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: 'black',
    textAlignVertical: 'center',
  },
  headerName: {
    fontSize: 21,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  animation: {
    position: 'relative',
    width: '100%',
    flex: 1,
    bottom: 170,
    // top: 0,
  },
  rideSection: {
    bottom: 300,
  },
  rideButton: {
    width: width * 0.9,
    position: 'relative',
    margin: 'auto',
  },
  text: {
    marginLeft: 20,
    fontSize: 18,
    position: 'relative',
  },
});
