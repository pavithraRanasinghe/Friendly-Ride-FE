import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../../core/theme';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = props => {
  return <Text style={styles.header} {...props} />;
};

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    alignSelf: 'center',
  },
});

export default Header;
