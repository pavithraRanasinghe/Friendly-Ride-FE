import {StyleSheet} from 'react-native';
import {theme} from '../../core/theme';

export const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  userTypeButton: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.secondary,
    backgroundColor: '#FFF',
  },
  userTypeButtonSelected: {
    backgroundColor: theme.colors.primary,
  },
  userTypeText: {
    color: theme.colors.secondary,
    fontWeight: '500',
  },
  userTypeTextSelected: {
    color: '#FFF',
    fontWeight: '500',
  },
});
