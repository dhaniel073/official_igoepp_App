import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/styles';
import { Color } from './GlobalStyles';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import LoadingOverlay from './LoadingOverlay';

function Button4({ children, onPress, style }) {

  const [fontloaded] =  useFonts({
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../../assets/font/Poppins_medium.ttf"),
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'poppinsSemiBold': require("../../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../../assets/font/Poppins_bold.ttf")
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

export default Button4;

const styles = StyleSheet.create({
  button: {
    // borderRadius: 6,
    fontFamily: 'poppinsRegular',
    borderWidth: 1,
    borderColor: Color.firebrick_100,
    paddingVertical: 8,
    paddingHorizontal: 8,
    // marginHorizontal: 15,
    backgroundColor: Color.white,
    // elevation: 2,
    // shadowColor: 'black',
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: Color.firebrick_100,
    fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: 'poppinsBold',
  },
});
