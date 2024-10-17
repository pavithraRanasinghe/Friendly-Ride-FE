import {StyleSheet} from 'react-native';
import {theme} from '../../core/theme';

export const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 12,
  },
});
