import { useNavigation } from "@react-navigation/native"
import { View, Image, StyleSheet, Text } from "react-native"
import Button from "../components/ui/Button"
import Button2 from "../components/ui/Button2"
import { Color, FontFamily, FontSize } from "../components/ui/GlobalStyles"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import LoadingOverlay from "../components/ui/LoadingOverlay"

function DisplayScreen3(){
    const navigation = useNavigation()

    
    const [fontloaded] =  useFonts({
      'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
      'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
      'poppingMedium': require("../assets/font/Poppins_medium.ttf")
  })
  
  
    if (!fontloaded) {
      return <LoadingOverlay/>
    }

    return (
        <View style={styles.googlePixel2Xl121}>
        <Text style={styles.logInTo}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla.
        </Text>
        <Image
          style={styles.whatsappImage20201211At6Icon}
          contentFit="cover"
          source={require("../assets/vectors/whatsapp-image-20201211-at-642-2.png")}
        />
        <Image
          style={[styles.googlePixel2Xl121Child, styles.googleLayout]}
          contentFit="cover"
          source={require("../assets/vectors/group-783.png")}
        />
        <Image
          style={[styles.googlePixel2Xl121Item, styles.googleLayout]}
          contentFit="cover"
          source={require("../assets/vectors/group-2.png")}
        />
        {/*<View
          style={[styles.googlePixel2Xl121Inner, styles.rectangleViewLayout]}
        />
        <View style={[styles.rectangleView, styles.rectangleViewLayout]} />
        <Text style={[styles.iAlreadyHave, styles.haveTypo]} onPress={() => navigation.navigate("Login")}>
          I already have an account
        </Text>
        <Text style={[styles.iDontHave, styles.haveTypo]} onPress={() => navigation.navigate("Signup")}>
          I don’t have an account
    </Text>*/}
        <View style={styles.button}>
        <Button style={[styles.iAlreadyHave, styles.haveTypo]} onPress={() => navigation.navigate("Login")}>
          I already have an account
        </Button>
        <View style={styles.space}/>
        <Button2 style={[styles.iDontHave, styles.haveTypo]} onPress={() => navigation.navigate("Signup")}>
          I don’t have an account
        </Button2>
        </View>
      </View>
    )
}

export default DisplayScreen3

const styles = StyleSheet.create({
  button:{
    marginHorizontal: "10%",
    marginTop: "165%",
    // marginLeft: "10%"
  },
  space:{
    margin: 8
  },
    Button:{
        position: 'absolute',
        marginTop: "160%",
        marginLeft: "10%"
    },
    image3:{
        width: 290,
        height: 280,
        position: 'absolute'
    },
    page:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    googleLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      rectangleViewLayout: {
        height: 50,
        width: 275,
        left: 68,
        position: "absolute",
      },
      haveTypo: {
        textAlign: "left",
        color: Color.white,
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        position: "absolute",
      },
      logInTo: {
        height: "7.29%",
        width: "41.85%",
        top: "18.35%",
        left: "28.95%",
        fontSize: FontSize.textReg_size,
        lineHeight: 20,
        color: Color.gray,
        textAlign: "center",
        fontFamily: "poppinsRegular",
        position: "absolute",
      },
      whatsappImage20201211At6Icon: {
        top: 39,
        left: 160,
        width: 73,
        height: 73,
        position: "absolute",
      },
      googlePixel2Xl121Child: {
        height: "32.93%",
        width: "67.93%",
        top: "32.93%",
        right: "15.53%",
        bottom: "34.14%",
        left: "16.55%",
      },
      googlePixel2Xl121Item: {
        height: "1.46%",
        width: "16.11%",
        top: "72.9%",
        right: "43.07%",
        bottom: "25.64%",
        left: "42.82%",
      },
      googlePixel2Xl121Inner: {
        top: 656,
        backgroundColor: Color.lightgreen,
      },
      rectangleView: {
        top: 726,
        backgroundColor: Color.orange,
      },
      iAlreadyHave: {
        top: 738,
        left: 94,
      },
      iDontHave: {
        top: 668,
        left: 105,
      },
      googlePixel2Xl121: {
        backgroundColor: Color.white,
        flex: 1,
        width: "100%",
        height: 823,
        overflow: "hidden",
      },
})