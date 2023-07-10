import { useNavigation } from "@react-navigation/native"
import { View,StyleSheet, Text } from "react-native"
import { Image } from "expo-image"
import Button from "../components/ui/Button"
import Button2 from "../components/ui/Button2"
import { Color, FontFamily, FontSize } from "../components/ui/GlobalStyles"
import { useFonts } from "expo-font"
import { useCallback } from "react"
import LoadingOverlay from "../components/ui/LoadingOverlay"

function DisplayScreen1(){
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
        <View style={styles.googlePixel2Xl120}>
      <Image
        style={styles.whatsappImage20201211At6Icon}
        contentFit="cover"
        source={require("../assets/vectors/whatsapp-image-20201211-at-642-2.png")}
      />
      <Text style={styles.logInTo}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla.
      </Text>
      <Image
        style={[styles.g10Icon, styles.g10IconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/g10.png")}
      />
      <Image
        style={[styles.googlePixel2Xl120Child, styles.g10IconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/group-2.png")}
      />
     {/* <View style={[styles.googlePixel2Xl120Item, styles.googleLayout]} />
    <View style={[styles.googlePixel2Xl120Inner, styles.googleLayout]} />*/}

      <View style={styles.button}>
      <Button  onPress={() => navigation.navigate("Login")}>
        I already have an account
      </Button>
      <View style={styles.space}/>
      <Button2 onPress={() => navigation.navigate("Signup")}>
        I don’t have an account
      </Button2>
      </View>

    </View>
    )
}

export default DisplayScreen1

const styles = StyleSheet.create({
    g10IconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      googleLayout: {
        height: 50,
        width: 275,
        left: 68,
        position: "absolute",
      },
      haveTypo: {
        textAlign: "left",
        color: Color.white,
        fontSize: FontSize.size_mid,
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
      logInTo: {
        height: "7.29%",
        width: "41.85%",
        top: "18.35%",
        left: "28.95%",
        fontSize: FontSize.textReg_size,
        lineHeight: 20,
        color: Color.gray,
        textAlign: "center",
        fontFamily: 'poppinsRegular',
        position: "absolute",
      },
      g10Icon: {
        height: "36.82%",
        width: "76.45%",
        top: "29.77%",
        right: "12.84%",
        bottom: "33.41%",
        left: "10.71%",
      },
      googlePixel2Xl120Child: {
        height: "1.46%",
        width: "16.11%",
        top: "72.9%",
        right: "43.07%",
        bottom: "25.64%",
        left: "42.82%",
      },
      googlePixel2Xl120Item: {
        top: 656,
        backgroundColor: Color.lightgreen,
      },
      googlePixel2Xl120Inner: {
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
      googlePixel2Xl120: {
        backgroundColor: Color.white,
        flex: 1,
        width: "100%",
        height: 823,
        overflow: "hidden",
      },


    // container:{
    //     flex: 1,
    //     justifyContent: 'center',
    //     // alignItems: 'center'
    // },
    // Logo: {
    //     position: 'absolute',
    //     width: 5,
    //     height: 100,
    //     marginLeft: "38%",
    //     marginTop: 10,
    //   },
    button:{
        marginHorizontal: "10%",
        marginTop: "165%",
        // marginLeft: "10%"
    },
    // image1:{
    //     width: 310,
    //     height: 270,
    //     marginTop: "45%",
    //     left: "10%",
    //     position: 'absolute'
    // },
    space:{
        margin: 8
    },
})