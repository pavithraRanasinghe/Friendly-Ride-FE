import React from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
import {TextInput as Input, TextInputProps} from 'react-native-paper';
import {theme} from '../../core/theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});

interface CustomTextInputProps extends TextInputProps {
  errorText?: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
}

const TextInput: React.FC<CustomTextInputProps> = ({
  errorText,
  description,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, style]} // Merge custom style if provided
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextInput;
