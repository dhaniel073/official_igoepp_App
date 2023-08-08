// import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../components/ui/GlobalStyles";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import {useRef, useContext, useState, useEffect} from "react";
import { AuthContext } from "../store/auth-context";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Ionicons} from '@expo/vector-icons'
import GoBack from "../components/ui/GoBack";


const AddWallet = ({route}) => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../assets/font/Poppins_bold.ttf")

})

  const check = route.params.walletBalance
  // console.log(check)


  if (!fontloaded) {
    return <LoadingOverlay/>
  }



  return (
    <View style={styles.container}>

    <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

      <View style={styles.subContainer}>

        <Text style={styles.wallet}>Wallet</Text>


        <View style={styles.subContainer2}>
          <View style={styles.walletbalancepanel}>
              <View style={styles.nairaAmount}>
              <Image
                  style={styles.nairasign}
                  source={require("../assets/vectors/vector34.png")}
              />
              <Text style={styles.amount}>{!check ? "0.00" : check}</Text>
              </View>
              <Text style={styles.walletbalanceText}>Balance</Text>
          </View>
        </View>
        
        <View >


          <View style={styles.shadowProps} >
            <TouchableOpacity  style={styles.fundwallet}
            onPress={()=> navigation.navigate('PayStack')}
            >
                <Image
                style={styles.fundwalletIcon}
                source={require("../assets/vectors/vector33.png")}
              />
                    <Text style={styles.text1}>Fund With Card</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shadowProps} >
            <TouchableOpacity  style={[styles.fundwallet]}
              onPress={() => navigation.navigate("Transfer")}
            >
                    <Image
                    style={styles.fundwalletIcon}
                    source={require("../assets/vectors/vector33.png")}
                  />
                    <Text style={styles.text1}>Fund With Transfer</Text>
            </TouchableOpacity>
          </View>

          {/*<View style={styles.shadowProps}>
            <Pressable style={({pressed}) => [styles.paywithwallet, pressed && styles.pressed]}>
                <Text style={styles.text3}>Pay with Wallet</Text>
                <Image
                style={styles.paywithwalleticon}
                source={require("../assets/vectors/shape-stroke.png")}
                />
            </Pressable>
  </View>*/}
          
        </View>
      </View>

    </View>
  );
};

export default AddWallet;

const styles = StyleSheet.create({
    pressed:{
      opacity: 0.9
    },
    shadowProps:{
    marginBottom: 30,
    borderRadius: 20, 
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    backgroundColor: 'white',
    overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
    },

    // shadowProps2:{

    //   elevation: 4,
    //   shadowColor: 'black',
    //   shadowOpacity: 0.25,
    //   shadowOffset: {width: 0, height: 2},
    //   shadowRadius: 8,
    //   backgroundColor: 'white',
    //   overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
    //   },
    subContainer:{
        marginTop: 50,
        marginHorizontal: 30,

    },
    subContainer2:{
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 50

  },
  text1:{
    fontFamily:'poppinsRegular'
  },
  text2:{
    fontFamily: 'poppinsMedium'
  },
  text3:{
    fontFamily: 'poppinsRegular'
  },
    container:{
        marginTop: '15%',
        marginHorizontal: 5,

    },
    amount:{
      fontSize: 25,
      fontFamily:'montserratBold',
      // fontWeight: 'bold',
      color: Color.white,
      marginLeft: 7,
      marginTop:8
    },
    walletbalanceText:{
      marginTop: 10,
      color: Color.white,
      fontFamily: 'poppinsMedium',
      fontSize: 20

    },
    nairaAmount:{
      flexDirection: 'row',
      padding: 5,
      marginTop: 13,
    },
    wallet:{
        fontSize: FontSize.size_17xl,
        fontFamily: 'poppinsSemiBold',
        // fontWeight: 'bold',
        color: Color.darkolivegreen_100
    },
    fundwallet:{
      flexDirection: 'row',
      padding: 5,
      margin: 10,
      overflow: 'hidden'
    },
    fundwalletIcon:{
      width: 15,
      height: 15,
      marginRight: 10,
      marginTop: 2,
    },
    paywithwallet:{
      flexDirection: 'row',
      padding: 5,
      margin: 10,
      justifyContent:'space-between',
    },
    paywithwalleticon:{
      width: 10,
      height: 16,
      marginTop: 5
    },

    walletbalancepanel:{
        width: '100%',
        backgroundColor: Color.limegreen,
        padding: 20,
        borderRadius: 10,
        marginTop: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 30
        
    },
    nairasign:{
        width: 25,
        height: 25,
        marginTop: 10,

    },
    pressed:{
        opacity: 0.75,
    },
    vectorIcon: {
        height: "70%",
        width: "30%",
        top: "20.77%",
        // right: "76.97%",
        // bottom: "24.35%",
        // left: "0%",
      },
      iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
      backParent: {
        // top: 40,
        left: -10,
        width: 57,
        height: 21,
        position: "absolute",
      },
      back: {
        top: 0,
        left: 23,
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        textAlign: "center",
        color: Color.darkolivegreen_100,
        position: "absolute",
      },
});
