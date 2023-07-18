import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';
import { Color } from './GlobalStyles';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import LoadingOverlay from './LoadingOverlay';

function Button({ children, onPress, style }) {

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
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    // borderRadius: 6,
    fontFamily: 'poppinsRegular',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    backgroundColor: Color.lightgreen,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'poppinsRegular'
  },
});
