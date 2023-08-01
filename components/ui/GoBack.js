import { useFonts } from "expo-font";
import { Image, Pressable, StyleSheet, Text } from "react-native";
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
    <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed, style]}
        onPress={onPress}
    >{/*
        <Image
          style={styles.image}
          contentFit="cover"
          source={require("../../assets/vectors/vector30.png")}
    />*/}
        <AntDesign name="arrowleft" size={24} color={Color.darkolivegreen_100} />
        <Text style={styles.back}>{children}</Text>

      </Pressable>
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

