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
      {/*<LinearGradient
        style={styles.navBg}
        locations={[0, 1]}
        colors={["#fff", "rgba(236, 236, 236, 0)"]}
  />*/}
      <Text style={styles.navText}>{`Notifications`}</Text>
      <Text style={[styles.recent, styles.recentTypo]}>Recent</Text>
      <View style={[styles.googlePixel2Xl117Child, styles.googleChildLayout]} />
      <Image
        style={[styles.googlePixel2Xl117Item, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-54.png")}
      />
      <Image
        style={[styles.googlePixel2Xl117Item, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-55.png")}
      />
      <Text style={[styles.a, styles.aTypo]}>A</Text>
      <Text style={[styles.admin, styles.adminTypo]}>Admin</Text>
      <Text style={[styles.tapToView, styles.recentTypo]}>Tap to view</Text>
      <Text style={[styles.cillianNegotiatedYour, styles.yourTypo]}>
        Cillian negotiated your price from N25000 to N15000.
      </Text>
      <Text style={[styles.am, styles.amTypo]}>Today at 6:56 AM</Text>
      <View style={[styles.rectangleView, styles.googleChildLayout]} />
      <Image
        style={[styles.ellipseIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-54.png")}
      />
      <Image
        style={[styles.ellipseIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-55.png")}
      />
      <Text style={[styles.a1, styles.aTypo]}>A</Text>
      <Text style={[styles.admin1, styles.adminTypo]}>Admin</Text>
      <Text style={[styles.cillianSentYou, styles.yourTypo]}>
        Cillian sent you a bid of 25,000
      </Text>
      <Text style={[styles.am1, styles.amTypo]}>Today at 6:56 AM</Text>
      <View
        style={[styles.googlePixel2Xl117Child2, styles.googleChildLayout]}
      />
      <Image
        style={[styles.googlePixel2Xl117Child3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-54.png")}
      />
      <Image
        style={[styles.googlePixel2Xl117Child3, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/ellipse-55.png")}
      />
      <Text style={[styles.a2, styles.aTypo]}>A</Text>
      <Text style={[styles.admin2, styles.adminTypo]}>Admin</Text>
      <Text style={[styles.yourBidOf, styles.yourTypo]}>
        Your bid of N25000 has been sent to Cillian.
      </Text>
      <Text style={[styles.am2, styles.amTypo]}>Today at 6:56 AM</Text>
     <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.back}>Back</Text>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vectors/vector30.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pressed:{
    opacity: 0.75
  },
  recentTypo: {
    textAlign: "left",
    fontFamily: 'poppinsMedium',
    fontWeight: "500",
    position: "absolute",
  },
  googleChildLayout: {
    backgroundColor: Color.mintcream,
    borderRadius: Border.br_8xs,
    right: "5.84%",
    width: "88.08%",
    height: "15.31%",
    left: "6.08%",
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  aTypo: {
    color: Color.white,
    fontSize: FontSize.size_4xl,
    left: "11.19%",
    width: "4.14%",
    fontFamily: 'poppinsRegular',
    textAlign: "left",
    position: "absolute",
  },
  adminTypo: {
    fontSize: FontSize.heading2_size,
    left: "20.44%",
    width: "15.09%",
    textAlign: "left",
    fontFamily: 'poppinsMedium',
    fontWeight: "500",
    color: Color.darkolivegreen_100,
    position: "absolute",
  },
  yourTypo: {
    color: Color.gray_100,
    fontSize: FontSize.heading3_size,
    width: "70.56%",
    height: "8.02%",
    left: "20.44%",
    // fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    position: "absolute",
  },
  amTypo: {
    fontSize: FontSize.size_2xs,
    left: "67.88%",
    color: Color.gray_100,
    // fontFamily: FontFamily.poppinsRegular,
    textAlign: "left",
    position: "absolute",
  },
  navBg: {
    height: "8.51%",
    width: "91.24%",
    top: "0%",
    right: "8.76%",
    bottom: "91.49%",
    display: "none",
    backgroundColor: "transparent",
    left: "0%",
    position: "absolute",
  },
  navText: {
    marginLeft: -180.5,
    top: 106,
    left: "50%",
    fontSize: FontSize.size_17xl,
    letterSpacing: 0,
    lineHeight: 38,
    fontWeight: "700",
    // fontFamily: FontFamily.poppinsBold,
    width: 242,
    height: 72,
    textAlign: "center",
    color: Color.darkolivegreen_100,
    position: "absolute",
  },
  recent: {
    width: "22.14%",
    top: "20.41%",
    fontSize: FontSize.size_xl,
    color: Color.black,
    left: "6.08%",
    textAlign: "left",
    // fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  googlePixel2Xl117Child: {
    top: "44.96%",
    bottom: "39.73%",
  },
  googlePixel2Xl117Item: {
    top: "46.78%",
    bottom: "49.21%",
    left: "9.25%",
    right: "82.73%",
    width: "8.03%",
    height: "4.01%",
    maxWidth: "100%",
  },
  a: {
    top: "46.54%",
  },
  admin: {
    top: "47.27%",
  },
  tapToView: {
    width: "17.76%",
    top: "45.69%",
    left: "74.45%",
    fontSize: FontSize.size_xs,
    color: Color.limegreen,
  },
  cillianNegotiatedYour: {
    top: "50.79%",
  },
  am: {
    top: "57.23%",
  },
  rectangleView: {
    top: "26.73%",
    bottom: "57.96%",
  },
  ellipseIcon: {
    top: "28.55%",
    bottom: "67.44%",
    left: "9.25%",
    right: "82.73%",
    width: "8.03%",
    height: "4.01%",
    maxWidth: "100%",
  },
  a1: {
    top: "28.31%",
  },
  admin1: {
    top: "29.04%",
  },
  cillianSentYou: {
    top: "32.56%",
  },
  am1: {
    top: "39%",
  },
  googlePixel2Xl117Child2: {
    top: "63.18%",
    bottom: "21.51%",
  },
  googlePixel2Xl117Child3: {
    top: "65.01%",
    bottom: "30.98%",
    left: "9.25%",
    right: "82.73%",
    width: "8.03%",
    height: "4.01%",
    maxWidth: "100%",
  },
  a2: {
    top: "64.76%",
  },
  admin2: {
    top: "65.49%",
  },
  yourBidOf: {
    top: "69.02%",
  },
  am2: {
    top: "75.46%",
  },
  back: {
    top: 2,
    left: 23,
    fontSize: FontSize.size_mid,
    // fontFamily: FontFamily.poppinsRegular,
    textAlign: "center",
    color: Color.darkolivegreen_100,
    position: "absolute",
  },
  vectorIcon: {
    height: "70%",
    width: "30%",
    top: "20.77%",
    right: "76.97%",
    bottom: "24.35%",
    left: "0%",
  },
  backParent: {
    top: 40,
    left: 25,
    width: 57,
    height: 21,
    position: "absolute",
  },
  googlePixel2Xl117: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 20
    // overflow: "hidden",

  },
});

export default NotificationScreen;
