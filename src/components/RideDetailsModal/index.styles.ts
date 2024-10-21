import {StyleSheet} from 'react-native';
import {theme} from '../../core/theme';

export const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: theme.colors.card,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carImage: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  confirmButton: {
    backgroundColor: '#FF6F00',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
