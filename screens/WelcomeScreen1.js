import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../components/ui/GlobalStyles";
// import { Border, Color, FontFamily, FontSize } from "../component/ui/GlobalStyles";

const Welcome1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.googlePixel2Xl90}>
      <View style={[styles.googlePixel2Xl90Child, styles.googlePosition]} />
      <View
        style={[styles.googlePixel2Xl90Inner, styles.rectangleParentPosition1]}
      >
        <View style={[styles.groupChild, styles.childBg]} />
      </View>
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector38.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.vectorIconPosition2]}
        contentFit="cover"
        source={require("../assets/vectors/vector39.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconPosition1]}
        contentFit="cover"
        source={require("../assets/vectors/vector40.png")}
      />
      <Image
        style={[styles.vectorIcon3, styles.vectorIconPosition1]}
        contentFit="cover"
        source={require("../assets/vectors/vector41.png")}
      />
      <Image
        style={[styles.vectorIcon4, styles.vectorIconPosition2]}
        contentFit="cover"
        source={require("../assets/vectors/vector56.png")}
      />
      <Image
        style={[styles.vectorIcon5, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector43.png")}
      />
      <Image
        style={[styles.vectorIcon6, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector44.png")}
      />
      <Text style={[styles.makePayment, styles.makePaymentTypo]}>
        Make Payment
      </Text>
      <View style={[styles.rectangleParent, styles.rectangleParentPosition]}>
        <View style={[styles.groupItem, styles.groupChildPosition]} />
        <Text style={[styles.requestForHelp, styles.requestTypo]}>
          Request For Help
        </Text>
      </View>
      <Text style={[styles.serviceHistory, styles.requestTypo]}>
        Service History
      </Text>
      <Image
        style={[styles.vectorIcon7, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector45.png")}
      />
      <Image
        style={[styles.vectorIcon8, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector46.png")}
      />
      <Image
        style={[styles.vectorIcon9, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vectors/vector47.png")}
      />
      <Image
        style={[styles.vectorIcon10, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector57.png")}
      />
      <View
        style={[styles.googlePixel2Xl90Item, styles.rectangleParentPosition]}
      />
      <Text style={[styles.marketPlace, styles.vectorIconPosition]}>
        Market Place
      </Text>
      <Image
        style={[styles.vectorIcon11, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector49.png")}
      />
      <Image
        style={[styles.vectorIcon12, styles.vectorIconPosition]}
        contentFit="cover"
        source={require("../assets/vectors/vector50.png")}
      />
      <Image
        style={[styles.vectorIcon13, styles.vectorIconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector51.png")}
      />
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/group4.png")}
      />
      <Pressable
        style={[styles.googlePixel2Xl90Inner, styles.rectangleParentPosition1]}
        onPress={() => navigation.navigate("GooglePixel2XL30")}
      >
        <View style={[styles.groupChild, styles.childBg]} />
      </Pressable>
      <Image
        style={[styles.vectorIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector38.png")}
      />
      <Image
        style={[styles.vectorIcon1, styles.vectorIconPosition2]}
        contentFit="cover"
        source={require("../assets/vectors/vector39.png")}
      />
      <Image
        style={[styles.vectorIcon2, styles.vectorIconPosition1]}
        contentFit="cover"
        source={require("../assets/vectors/vector40.png")}
      />
      <Image
        style={[styles.vectorIcon3, styles.vectorIconPosition1]}
        contentFit="cover"
        source={require("../assets/vectors/vector41.png")}
      />
      <Image
        style={[styles.vectorIcon4, styles.vectorIconPosition2]}
        contentFit="cover"
        source={require("../assets/vectors/vector56.png")}
      />
      <Image
        style={[styles.vectorIcon5, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector43.png")}
      />
      <Image
        style={[styles.vectorIcon6, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector44.png")}
      />
      <Text style={[styles.makePayment, styles.makePaymentTypo]}>
        Make Payment
      </Text>
      <Pressable
        style={[styles.rectangleParent, styles.rectangleParentPosition]}
        onPress={() => navigation.navigate("GooglePixel2XL71")}
      >
        <View style={[styles.groupItem, styles.groupChildPosition]} />
        <Text style={[styles.requestForHelp1, styles.requestTypo]}>
          Request For Help
        </Text>
      </Pressable>
      <Image
        style={[styles.groupIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/group4.png")}
      />
      <View style={[styles.googlePixel2Xl90Child1, styles.childBg]} />
      <Image
        style={[styles.vectorIcon21, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector52.png")}
      />
      <Image
        style={[styles.vectorIcon22, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/vectors/vector53.png")}
      />
      <Image
        style={[styles.vectorIcon23, styles.vectorIcon23Position]}
        contentFit="cover"
        source={require("../assets/vectors/vector54.png")}
      />
      <Text style={[styles.viewRequests, styles.vectorIcon23Position]}>
        View Requests
      </Text>
      <View style={styles.rectangleContainer}>
        <View style={[styles.groupChild1, styles.groupChildPosition]} />
        <View style={[styles.parent, styles.parentPosition]}>
          <Text style={styles.text}> 0.00</Text>
          <Image
            style={[styles.vectorIcon24, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector55.png")}
          />
        </View>
        <View style={[styles.walletWrapper, styles.parentPosition]}>
          <Text style={[styles.wallet, styles.walletTypo]}>Wallet</Text>
        </View>
        <Text style={styles.hiChris}>Hi Dan</Text>
        <Pressable
          style={styles.wrapper}
          onPress={() => navigation.navigate("GooglePixel2XL117")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/group-517.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("AddToWallet")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/vectors/vector58.png")}
          />
        </Pressable>
      </View>
      <View style={styles.quickLinksWrapper}>
        <Text style={[styles.quickLinks, styles.walletTypo]}>Quick Links</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  googlePosition: {
    left: "53.53%",
    right: "6.33%",
    borderRadius: Border.br_10xs,
    width: "40.15%",
  },
  rectangleParentPosition1: {
    right: "49.39%",
    width: "44.28%",
    left: "6.33%",
  },
  childBg: {
    backgroundColor: Color.skyblue,
    borderRadius: Border.br_10xs,
    position: "absolute",
  },
  iconLayout: {
    maxHeight: "110%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  vectorIconPosition2: {
    right: "83.45%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIconPosition1: {
    top: "51.28%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  makePaymentTypo: {
    color: Color.steelblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    textAlign: "center",
    fontSize: FontSize.size_base,
  },
  rectangleParentPosition: {
    bottom: "5.35%",
    position: "absolute",
  },
  groupChildPosition: {
    bottom: "0%",
    left: "0%",
  },
  requestTypo: {
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
  },
  vectorIconPosition: {
    left: "55.47%",
    position: "absolute",
  },
  vectorIconLayout: {
    top: "88.56%",
    height: "1.33%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    position: "absolute",
  },
  vectorIcon23Position: {
    left: "99.03%",
    position: "absolute",
  },
  parentPosition: {
    left: "5.29%",
    position: "absolute",
  },
  walletTypo: {
    fontSize: FontSize.heading2_size,
    textAlign: "center",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  googlePixel2Xl90Child: {
    backgroundColor: Color.lightcoral,
    borderRadius: Border.br_10xs,
    bottom: "18.71%",
    top: "50.06%",
    height: "31.23%",
    position: "absolute",
  },
  groupChild: {
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
  },
  googlePixel2Xl90Inner: {
    bottom: "38.4%",
    left: "6.33%",
    height: "11.54%",
    top: "50.06%",
    width: "44.28%",
    position: "absolute",
  },
  vectorIcon: {
    height: "1.3%",
    width: "6.88%",
    top: "54.83%",
    right: "84.88%",
    left: "8.24%",
    bottom: "43.86%",
    position: "absolute",
  },
  vectorIcon1: {
    height: "1.36%",
    top: "54.77%",
    left: "15.48%",
    width: "1.07%",
    bottom: "43.86%",
  },
  vectorIcon2: {
    height: "1.54%",
    right: "92.12%",
    bottom: "47.18%",
    left: "6.81%",
    width: "1.07%",
  },
  vectorIcon3: {
    height: "1.48%",
    width: "4.87%",
    right: "86.9%",
    bottom: "47.24%",
    left: "8.24%",
  },
  vectorIcon4: {
    height: "1.9%",
    width: "6.65%",
    top: "51.99%",
    bottom: "46.12%",
    left: "9.9%",
  },
  vectorIcon5: {
    height: "1.19%",
    width: "5.22%",
    top: "52.34%",
    right: "84.17%",
    bottom: "46.47%",
    left: "10.61%",
    position: "absolute",
  },
  vectorIcon6: {
    height: "0.53%",
    top: "52.64%",
    right: "86.18%",
    bottom: "46.83%",
    left: "12.75%",
    width: "1.07%",
    position: "absolute",
  },
  makePayment: {
    top: "57.59%",
    left: "7.3%",
    textAlign: "center",
    position: "absolute",
  },
  groupItem: {
    backgroundColor: Color.mediumpurple,
    left: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    width: "100%",
    borderRadius: Border.br_10xs,
    position: "absolute",
  },
  requestForHelp: {
    width: "88.46%",
    top: "87.94%",
    left: "4.4%",
    color: Color.blueviolet,
    textAlign: "left",
    position: "absolute",
    fontSize: FontSize.size_base,
  },
  rectangleParent: {
    top: "63.43%",
    left: "6.33%",
    right: "49.39%",
    width: "44.28%",
    height: "31.23%",
    bottom: "5.35%",
  },
  serviceHistory: {
    width: "28.95%",
    top: "77.04%",
    left: "63.5%",
    color: Color.white,
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  vectorIcon7: {
    height: "1.07%",
    width: "2.14%",
    top: "63.91%",
    right: "36.22%",
    bottom: "35.02%",
    left: "61.63%",
    position: "absolute",
  },
  vectorIcon8: {
    height: "1.02%",
    width: "2.05%",
    top: "62.74%",
    right: "38.07%",
    bottom: "36.24%",
    left: "59.88%",
    position: "absolute",
  },
  vectorIcon9: {
    height: "10.24%",
    width: "24.09%",
    top: "55.89%",
    right: "20.44%",
    bottom: "33.86%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  vectorIcon10: {
    height: "5.43%",
    width: "4.25%",
    top: "57.6%",
    right: "27.58%",
    bottom: "36.97%",
    left: "68.17%",
    position: "absolute",
  },
  googlePixel2Xl90Item: {
    top: "83.11%",
    backgroundColor: Color.sandybrown,
    height: "11.54%",
    borderRadius: Border.br_10xs,
    left: "53.53%",
    right: "6.33%",
    width: "40.15%",
  },
  marketPlace: {
    height: "2.07%",
    width: "25.55%",
    top: "90.77%",
    color: Color.peru,
    textAlign: "left",
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  vectorIcon11: {
    width: "2.67%",
    right: "34.52%",
    bottom: "10.11%",
    left: "62.81%",
  },
  vectorIcon12: {
    height: "3.87%",
    width: "11.44%",
    top: "84.45%",
    right: "33.09%",
    bottom: "11.68%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  vectorIcon13: {
    width: "2.61%",
    right: "39.13%",
    bottom: "10.12%",
    left: "58.26%",
  },
  groupIcon: {
    height: "11.07%",
    width: "22.14%",
    top: "69.02%",
    right: "69.59%",
    bottom: "19.92%",
    left: "8.27%",
    position: "absolute",
  },
  requestForHelp1: {
    width: "93.41%",
    top: "74.32%",
    left: "2.2%",
    fontSize: FontSize.size_xl,
    color: Color.blueviolet,
    textAlign: "left",
    position: "absolute",
  },
  googlePixel2Xl90Child1: {
    right: "-36.74%",
    left: "96.59%",
    bottom: "18.71%",
    top: "50.06%",
    height: "31.23%",
    width: "40.15%",
    backgroundColor: Color.skyblue,
  },
  vectorIcon21: {
    height: "6.81%",
    width: "11.82%",
    top: "54.56%",
    right: "-18%",
    bottom: "38.63%",
    left: "106.19%",
    position: "absolute",
  },
  vectorIcon22: {
    height: "2.62%",
    width: "5.25%",
    top: "59.02%",
    right: "-5.19%",
    bottom: "38.36%",
    left: "99.94%",
    position: "absolute",
  },
  vectorIcon23: {
    height: "2.39%",
    width: "7.07%",
    top: "61.64%",
    right: "-6.1%",
    bottom: "35.97%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  viewRequests: {
    top: "77.16%",
    textAlign: "center",
    color: Color.steelblue,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  groupChild1: {
    height: "68.7%",
    width: "99.96%",
    top: "31.3%",
    right: "0.04%",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.limegreen,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    left: "0%",
    position: "absolute",
  },
  text: {
    width: "75.65%",
    left: "24.35%",
    fontSize: FontSize.size_17xl,
    fontWeight: "600",
    fontFamily: FontFamily.poppinsSemibold,
    color: Color.gray6,
    textAlign: "center",
    top: "0%",
    position: "absolute",
  },
  vectorIcon24: {
    height: "25.93%",
    width: "29.57%",
    top: "11.11%",
    right: "70.43%",
    bottom: "62.96%",
    left: "0%",
    position: "absolute",
  },
  parent: {
    height: "46.96%",
    width: "32.02%",
    top: "48.26%",
    right: "62.69%",
    bottom: "4.78%",
  },
  wallet: {
    color: Color.gray6,
  },
  walletWrapper: {
    height: "11.74%",
    width: "16.15%",
    top: "80%",
    right: "78.56%",
    bottom: "8.26%",
  },
  hiChris: {
    fontSize: FontSize.size_3xl,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.limegreen,
    textAlign: "center",
    left: "0%",
    top: "0%",
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: "94.67%",
    top: "1.3%",
    bottom: "88.26%",
    width: "5.33%",
    height: "10.43%",
    right: "0%",
    position: "absolute",
  },
  vector: {
    left: "84.09%",
    top: "76.96%",
    right: "5.33%",
    bottom: "6.52%",
    width: "10.58%",
    height: "16.52%",
    position: "absolute",
  },
  rectangleContainer: {
    height: "27.95%",
    width: "87.38%",
    top: "4.01%",
    right: "6.29%",
    bottom: "68.04%",
    left: "6.33%",
    position: "absolute",
  },
  quickLinks: {
    color: Color.dimgray_100,
  },
  quickLinksWrapper: {
    height: "3.28%",
    width: "24.57%",
    top: "44.96%",
    right: "69.34%",
    bottom: "51.76%",
    left: "6.08%",
    position: "absolute",
  },
  googlePixel2Xl90: {
    backgroundColor: Color.white,
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export default Welcome1;
