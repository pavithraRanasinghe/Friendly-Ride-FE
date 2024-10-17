import React from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {Button as PaperButton, ButtonProps} from 'react-native-paper';
import {theme} from '../../core/theme';

interface CustomButtonProps extends ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' | undefined;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<CustomButtonProps> = ({mode, style, ...props}) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: theme.colors.surface},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default Button;
