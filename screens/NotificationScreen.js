import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color, Border, FontSize } from "../components/ui/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const NotificationScreen = () => {

  const navigation = useNavigation()

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../assets/font/Poppins_bold.ttf")

})


  if (!fontloaded) {
    return <LoadingOverlay/>
  }

  


  return (
    <View style={styles.googlePixel2Xl117}>
    </View>
  )
};

const styles = StyleSheet.create({
  
});

export default NotificationScreen;
