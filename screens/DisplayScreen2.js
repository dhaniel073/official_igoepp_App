import { useNavigation } from "@react-navigation/native"
import { View, Image, StyleSheet, Text} from "react-native"
import { Color, FontFamily, FontSize } from "../components/ui/GlobalStyles"
import { useCallback } from "react"
import { useFonts } from "expo-font"
import AppLoading from "expo-app-loading"
import LoadingOverlay from "../components/ui/LoadingOverlay"
import Button from "../components/ui/Button"
import Button2 from "../components/ui/Button2"

function DisplayScreen2(){
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
        <View style={styles.googlePixel2Xl119}>
      <Text style={styles.logInTo}>
        Welcome to IGOEPP.
      </Text>
      <View style={styles.freepikShadowInject12Parent}>
        <Image
          style={[styles.freepikShadowInject12, styles.vectorIconLayout5]}
          contentFit="cover"
          source={require("../assets/vectors/freepik--shadow--inject-12.png")}
        />
        <Image
          style={[styles.freepikSpeechBubbleInject, styles.vectorIconLayout5]}
          contentFit="cover"
          source={require("../assets/vectors/freepik--speech-bubble--inject-12.png")}
        />
        <Image
          style={[styles.freepikIconInject12, styles.iconPosition]}
          contentFit="cover"
          source={require("../assets/vectors/freepik--icon--inject-12.png")}
        />
        <View style={styles.freepikDeviceInject12}>
          <Image
            style={[styles.vectorIcon, styles.iconPosition]}
            contentFit="cover"
            source={require("../assets/vectors/vector.png")}
          />
          <Image
            style={[styles.vectorIcon1, styles.vectorIconPosition1]}
            contentFit="cover"
            source={require("../assets/vectors/vector1.png")}
          />
          <Image
            style={[styles.vectorIcon2, styles.vectorIconLayout4]}
            contentFit="cover"
            source={require("../assets/vectors/vector2.png")}
          />
          <Image
            style={[styles.vectorIcon3, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector3.png")}
          />
          <Image
            style={[styles.vectorIcon4, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector4.png")}
          />
          <Image
            style={[styles.vectorIcon5, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector5.png")}
          />
          <Image
            style={[styles.vectorIcon6, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector6.png")}
          />
          <Image
            style={[styles.vectorIcon7, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector7.png")}
          />
          <Image
            style={[styles.vectorIcon8, styles.vectorIconLayout3]}
            contentFit="cover"
            source={require("../assets/vectors/vector8.png")}
          />
          <Image
            style={[styles.vectorIcon9, styles.vectorIconLayout4]}
            contentFit="cover"
            source={require("../assets/vectors/vector9.png")}
          />
          <Image
            style={[styles.vectorIcon10, styles.vectorIconLayout4]}
            contentFit="cover"
            source={require("../assets/vectors/vector10.png")}
          />
          <Image
            style={[styles.vectorIcon11, styles.vectorIconLayout4]}
            contentFit="cover"
            source={require("../assets/vectors/vector11.png")}
          />
          <Image
            style={[styles.vectorIcon12, styles.vectorIconPosition1]}
            contentFit="cover"
            source={require("../assets/vectors/vector12.png")}
          />
          <Image
            style={[styles.vectorIcon13, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector13.png")}
          />
          <Image
            style={[styles.groupIcon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/group.png")}
          />
          <Image
            style={[styles.vectorIcon14, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector14.png")}
          />
          <Image
            style={[styles.vectorIcon15, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector15.png")}
          />
          <Image
            style={[styles.vectorIcon16, styles.vectorIconLayout5]}
            contentFit="cover"
            source={require("../assets/vectors/vector16.png")}
          />
          <Image
            style={[styles.vectorIcon17, styles.vectorIconLayout4]}
            contentFit="cover"
            source={require("../assets/vectors/vector17.png")}
          />
          <Image
            style={[styles.vectorIcon18, styles.vectorIconLayout5]}
            contentFit="cover"
            source={require("../assets/vectors/vector18.png")}
          />
          <Image
            style={[styles.vectorIcon19, styles.vectorIconLayout5]}
            contentFit="cover"
            source={require("../assets/vectors/vector19.png")}
          />
          <Image
            style={[styles.vectorIcon20, styles.vectorIconLayout2]}
            contentFit="cover"
            source={require("../assets/vectors/vector20.png")}
          />
          <Image
            style={[styles.vectorIcon21, styles.vectorIconLayout2]}
            contentFit="cover"
            source={require("../assets/vectors/vector21.png")}
          />
          <Image
            style={[styles.vectorIcon22, styles.vectorIconLayout5]}
            contentFit="cover"
            source={require("../assets/vectors/vector22.png")}
          />
          <Image
            style={[styles.vectorIcon23, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../assets/vectors/vector23.png")}
          />
          <Image
            style={[styles.vectorIcon24, styles.vectorIconPosition]}
            contentFit="cover"
            source={require("../assets/vectors/vector24.png")}
          />
          <Image
            style={[styles.vectorIcon25, styles.vectorIconLayout1]}
            contentFit="cover"
            source={require("../assets/vectors/vector25.png")}
          />
          <Image
            style={[styles.vectorIcon26, styles.vectorIconLayout1]}
            contentFit="cover"
            source={require("../assets/vectors/vector26.png")}
          />
          <Text style={styles.accept}>ACCEPT</Text>
          <Image
            style={[styles.vectorIcon27, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector27.png")}
          />
          <Image
            style={[styles.vectorIcon28, styles.vectorIconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector28.png")}
          />
          <Image
            style={[styles.vectorIcon29, styles.vectorIconLayout5]}
            contentFit="cover"
            source={require("../assets/vectors/vector29.png")}
          />
        </View>
        <Image
          style={[
            styles.freepikCharacter2Inject1Icon,
            styles.vectorIconLayout5,
          ]}
          contentFit="cover"
          source={require("../assets/vectors/freepikcharacter2inject12.png")}
        />
        <Image
          style={[
            styles.freepikCharacter1Inject1Icon,
            styles.vectorIconLayout5,
          ]}
          contentFit="cover"
          source={require("../assets/vectors/freepikcharacter1inject12.png")}
        />
      </View>
      <Image
        style={styles.whatsappImage20201211At6Icon}
        contentFit="cover"
        source={require("../assets/vectors/whatsapp-image-20201211-at-642-2.png")}
      />
      <Image
        style={[styles.googlePixel2Xl119Child, styles.vectorIconLayout5]}
        contentFit="cover"
        source={require("../assets/vectors/group-2.png")}
      />
      {/*<View style={[styles.googlePixel2Xl119Item, styles.googleLayout]} />
      <View style={[styles.googlePixel2Xl119Inner, styles.googleLayout]} />
        */}
      {/*<Text style={[styles.iAlreadyHave, styles.haveTypo]} onPress={() => navigation.navigate("Login")}>
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

export default DisplayScreen2

// const styles = StyleSheet.create({
//     Button:{
//         position: 'absolute',
//         marginTop: "160%",
//         marginLeft: "10%"
//     },
// })

const styles = StyleSheet.create({
  button:{
    marginHorizontal: "10%",
    marginTop: "165%",
    // marginLeft: "10%"
  },
  space:{
    margin: 8
  },
    vectorIconLayout5: {
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    iconPosition: {
      right: "0%",
      top: "0%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconPosition1: {
      left: "6.49%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconLayout4: {
      opacity: 0.1,
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconLayout3: {
      height: "9.39%",
      opacity: 0.1,
      width: "20.61%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    iconLayout: {
      opacity: 0.6,
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconLayout2: {
      width: "70.01%",
      height: "53.74%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconPosition: {
      left: "74.46%",
      right: "21.78%",
      top: "18.89%",
      width: "3.77%",
      height: "2%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconLayout1: {
      width: "41.55%",
      height: "6.42%",
      maxHeight: "100%",
      maxWidth: "100%",
      position: "absolute",
      overflow: "hidden",
    },
    vectorIconLayout: {
      width: "33.52%",
      height: "0.96%",
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
      fontSize: FontSize.size_mid,
      textAlign: "left",
      color: Color.white,
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
      fontFamily: 'poppinsRegular',
      position: "absolute",
    },
    freepikShadowInject12: {
      height: "6.36%",
      width: "99.86%",
      top: "93.64%",
      right: "0.14%",
      left: "0%",
      bottom: "0%",
    },
    freepikSpeechBubbleInject: {
      height: "12.82%",
      width: "13.14%",
      top: "14.76%",
      right: "78.82%",
      bottom: "72.41%",
      left: "8.03%",
    },
    freepikIconInject12: {
      height: "20.43%",
      width: "18.71%",
      bottom: "79.57%",
      left: "81.29%",
    },
    vectorIcon: {
      height: "100%",
      left: "0%",
      bottom: "0%",
      width: "100%",
      top: "0%",
    },
    vectorIcon1: {
      height: "92.58%",
      width: "87.05%",
      top: "3.44%",
      right: "6.46%",
      bottom: "3.98%",
    },
    vectorIcon2: {
      height: "3.67%",
      top: "89.79%",
      right: "39.61%",
      bottom: "6.54%",
      left: "39.78%",
      width: "20.61%",
      opacity: 0.1,
    },
    vectorIcon3: {
      top: "62.87%",
      right: "39.65%",
      bottom: "27.75%",
      left: "39.75%",
    },
    vectorIcon4: {
      top: "62.88%",
      right: "65.3%",
      bottom: "27.73%",
      left: "14.09%",
    },
    vectorIcon5: {
      top: "62.86%",
      right: "13.99%",
      bottom: "27.76%",
      left: "65.4%",
    },
    vectorIcon6: {
      top: "74.95%",
      right: "39.63%",
      bottom: "15.67%",
      left: "39.77%",
    },
    vectorIcon7: {
      top: "74.96%",
      right: "65.28%",
      bottom: "15.66%",
      left: "14.11%",
    },
    vectorIcon8: {
      top: "74.93%",
      right: "13.97%",
      bottom: "15.68%",
      left: "65.42%",
    },
    vectorIcon9: {
      height: "54.5%",
      width: "86.81%",
      top: "41.52%",
      right: "6.48%",
      left: "6.71%",
      bottom: "3.98%",
    },
    vectorIcon10: {
      height: "46.57%",
      width: "76.2%",
      top: "3.45%",
      right: "17.25%",
      bottom: "49.98%",
      left: "6.54%",
    },
    vectorIcon11: {
      height: "64.43%",
      width: "86.85%",
      top: "5.04%",
      right: "6.57%",
      bottom: "30.53%",
      left: "6.58%",
    },
    vectorIcon12: {
      height: "3.63%",
      width: "86.92%",
      top: "3.46%",
      right: "6.59%",
      bottom: "92.91%",
      opacity: 0.2,
    },
    vectorIcon13: {
      height: "2.45%",
      width: "4.15%",
      top: "4.06%",
      right: "19%",
      bottom: "93.48%",
      left: "76.85%",
    },
    groupIcon: {
      height: "1.86%",
      width: "7.75%",
      top: "4.27%",
      right: "82.79%",
      bottom: "93.87%",
      left: "9.46%",
    },
    vectorIcon14: {
      height: "0.93%",
      width: "0.78%",
      top: "4.82%",
      right: "15.27%",
      bottom: "94.25%",
      left: "83.94%",
    },
    vectorIcon15: {
      height: "1.61%",
      width: "6.22%",
      top: "4.49%",
      right: "9.07%",
      bottom: "93.9%",
      left: "84.72%",
    },
    vectorIcon16: {
      height: "4.81%",
      width: "9.07%",
      top: "1.06%",
      right: "45.52%",
      bottom: "94.13%",
      left: "45.41%",
    },
    vectorIcon17: {
      height: "2.48%",
      width: "4.68%",
      top: "2.22%",
      right: "47.71%",
      bottom: "95.29%",
      left: "47.6%",
    },
    vectorIcon18: {
      height: "2.22%",
      width: "10.52%",
      top: "3.13%",
      right: "36.66%",
      bottom: "94.65%",
      left: "52.81%",
    },
    vectorIcon19: {
      height: "2.21%",
      width: "10.53%",
      top: "3.15%",
      right: "52.91%",
      bottom: "94.64%",
      left: "36.56%",
    },
    vectorIcon20: {
      top: "17.8%",
      right: "11.59%",
      bottom: "28.47%",
      left: "18.4%",
      opacity: 0.3,
    },
    vectorIcon21: {
      top: "15.51%",
      right: "13.63%",
      bottom: "30.75%",
      left: "16.36%",
    },
    vectorIcon22: {
      height: "4.61%",
      width: "8.69%",
      top: "17.58%",
      right: "19.32%",
      bottom: "77.81%",
      left: "71.99%",
    },
    vectorIcon23: {
      bottom: "79.12%",
    },
    vectorIcon24: {
      bottom: "79.11%",
    },
    vectorIcon25: {
      top: "61.39%",
      right: "27.54%",
      bottom: "32.19%",
      left: "30.92%",
    },
    vectorIcon26: {
      top: "60.81%",
      right: "28.18%",
      bottom: "32.78%",
      left: "30.27%",
    },
    accept: {
      height: "3.95%",
      width: "31.82%",
      top: "61.86%",
      left: "36.15%",
      fontSize: FontSize.size_2xs,
      fontWeight: "700",
      fontFamily: 'montserratBold',
      textAlign: "left",
      color: Color.white,
      position: "absolute",
    },
    vectorIcon27: {
      top: "50.04%",
      right: "33.22%",
      bottom: "49%",
      left: "33.26%",
    },
    vectorIcon28: {
      top: "56.63%",
      right: "33.24%",
      bottom: "42.41%",
      left: "33.24%",
    },
    vectorIcon29: {
      height: "1.6%",
      width: "47.19%",
      top: "52.39%",
      right: "26.38%",
      bottom: "46%",
      left: "26.43%",
    },
    freepikDeviceInject12: {
      height: "87.61%",
      width: "42.55%",
      top: "8.39%",
      right: "20.69%",
      bottom: "4%",
      left: "36.76%",
      position: "absolute",
    },
    freepikCharacter2Inject1Icon: {
      height: "28.22%",
      width: "26.9%",
      top: "22.57%",
      right: "30.84%",
      bottom: "49.2%",
      left: "42.26%",
    },
    freepikCharacter1Inject1Icon: {
      height: "73.77%",
      width: "23.95%",
      top: "22.92%",
      right: "54.51%",
      bottom: "3.31%",
      left: "21.54%",
    },
    freepikShadowInject12Parent: {
      height: "38.64%",
      width: "84.47%",
      top: "32.44%",
      right: "7.99%",
      bottom: "28.92%",
      left: "7.54%",
      position: "absolute",
    },
    whatsappImage20201211At6Icon: {
      top: 39,
      left: 160,
      width: 73,
      height: 73,
      position: "absolute",
    },
    googlePixel2Xl119Child: {
      height: "1.46%",
      width: "16.11%",
      top: "72.9%",
      right: "43.07%",
      bottom: "25.64%",
      left: "42.82%",
    },
    googlePixel2Xl119Item: {
      top: 656,
      backgroundColor: Color.lightgreen,
    },
    googlePixel2Xl119Inner: {
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
    googlePixel2Xl119: {
      backgroundColor: Color.white,
      flex: 1,
      height: 823,
      overflow: "hidden",
      width: "100%",
    },
  });