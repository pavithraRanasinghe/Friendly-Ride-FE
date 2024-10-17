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
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
