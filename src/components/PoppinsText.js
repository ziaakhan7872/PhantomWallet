import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts, FontSizes } from '../constants/fonts';

const PoppinsText = ({
  weight = 'regular',
  size = 'md',
  style,
  children,
  ...props
}) => {
  const fontFamily =
    weight === 'regular'
      ? Fonts.Poppins.Regular
      : weight === 'medium'
        ? Fonts.Poppins.Medium
        : weight === 'semibold'
          ? Fonts.Poppins.SemiBold
          : Fonts.Poppins.Bold;

  const fontSize = FontSizes[size];

  return (
    <Text style={[styles.text, { fontSize }, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});

export default PoppinsText;


