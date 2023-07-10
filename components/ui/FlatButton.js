import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';
import { Color, FontSize } from './GlobalStyles';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import LoadingOverlay from './LoadingOverlay';

function FlatButton({ children, onPress }) {
  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../../assets/font/Poppins_medium.ttf")
  })

  if (!fontloaded) {
    return <LoadingOverlay/>;
  }
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Color.lightgreen,
    fontSize: 16,
    fontFamily: 'poppinsRegular'
  },
});
