import { useFonts } from "expo-font";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import LoadingOverlay from "./LoadingOverlay";
import { Color, FontSize } from "./GlobalStyles";
import { AntDesign } from '@expo/vector-icons';

function GoBack({onPress, children, style}){
  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppingMedium': require("../../assets/font/Poppins_medium.ttf")
})


  if (!fontloaded) {
    return <LoadingOverlay/>
  }
    return (
    <TouchableOpacity style={[styles.backParent,style]}
        onPress={onPress}
    >
        <AntDesign name="arrowleft" size={24} color={Color.darkolivegreen_100} />
        <Text style={styles.back}>{children}</Text>

      </TouchableOpacity>
    )
}

export default GoBack;

const styles = StyleSheet.create({
  backParent:{
    flexDirection: 'row',
},
image:{
  width: 15,
  height: 15,
  marginHorizontal: 10,
  marginTop: 5,
  marginBottom: 30,
},
back:{
  fontSize: FontSize.size_mid,
  fontFamily: 'poppinsRegular',
  // marginTop: -20
},
pressed:{
  opacity: 0.7
}
})

