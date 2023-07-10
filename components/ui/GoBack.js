import { useFonts } from "expo-font";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import LoadingOverlay from "./LoadingOverlay";

function GoBack(onPress, children){
  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppingMedium': require("../../assets/font/Poppins_medium.ttf")
})


  if (!fontloaded) {
    return <LoadingOverlay/>
  }
    return (
    <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]}
        onPress={onPress}
    >
        <Text style={styles.back}>{children}</Text>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vectors/vector30.png")}
        />
      </Pressable>
    )
}

export default GoBack;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75,
    },
    vectorIcon: {
        height: "70%",
        width: "30%",
        top: "20.77%",
        right: "76.97%",
        bottom: "24.35%",
        left: "0%",
      },
      iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      backParent: {
        top: 40,
        left: 25,
        width: 57,
        height: 21,
        position: "absolute",
        fontFamily: 'poppinsRegular'
      },
      back:{
        fontFamily: 'poppinsRegular',
      }
})

