import axios from 'axios';
import { useContext, useEffect, useMemo, useReducer, useState } from 'react';

import { StyleSheet, Text, View, Pressable, FlatList, ScrollView, SafeAreaView, TouchableOpacity,  } from 'react-native';
import { AuthContext, CustomerContext } from '../store/auth-context';
import { Color, FontSize } from '../components/ui/GlobalStyles';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionIDCheck, WalletBalance, customerInfocheck, showVerifiedCustomer } from '../util/auth';
import { useFonts } from 'expo-font';
import {MaterialIcons} from '@expo/vector-icons'

function WelcomeScreen({route}) {
  const [fetchedMessage, setFetchedMesssage] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [reducerValue, forceUpdate] = useReducer(x => x+1, 0)


  const navigation = useNavigation()
  const authCtx = useContext(AuthContext);
  const token = authCtx.token
  const customerId = authCtx.customerId



  //check customer info
  useEffect(() => {
    setIsLoading(true)
    navigation.addListener('state', async() => {
        await customerInfocheck(customerId,token)
        .then((res) => {
          // console.log(res.data.data)
          setFetchedMesssage(res.data.data)
        }).catch((error) => {
            console.log(error)
        })
    })
    setIsLoading(false)
},[])


//wallet balance check
useEffect(() => {
  setIsLoading(true)
  navigation.addListener('state', async() => {
    await  WalletBalance(authCtx.customerId, authCtx.token )
      .then((res) => {
        // console.log(res.data.data)
        const check = res.data.wallet_balance.toLocaleString()
        authCtx.customerwalletbalance(check)
      }).catch((error) => {
          console.log(error)
      })
  })
  setIsLoading(false)
},[])


//session id check
useEffect(() => {
  async function SessionId(){
  const response = await SessionIDCheck(authCtx.email, authCtx.token)
  // console.log(response.data)
    if(response.data.login_session_id === null){
      authCtx.customerSessionId("empty")
    }else{
      authCtx.customerSessionId(response.data.login_session_id )
    }
  }
  SessionId()
},[])

// console.log(authCtx.sessionId)


// console.log(authCtx.sessionId)
const [fontloaded] =  useFonts({
  'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
  'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
  'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
  'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
  'poppinsBold': require("../assets/font/Poppins_bold.ttf")

})

if(!fontloaded || isLoading){
return <LoadingOverlay/>
}

          
function imageCheck(){
  if(fetchedMessage.picture === null){
    return <Image style={styles.imageIcon} source={require("../assets/vectors/person.png")}/>
  }else{
    return <Image style={styles.imageIcon} source={{ uri:`https://phixotech.com/igoepp/public/customers/${fetchedMessage.picture}` }}/>
  }
}

// imageIcon:{
//   width:40,
//   height: 40,
//   borderRadius: 50,
//   borderWidth: 1,
//   borderColor: Color.limegreen,
//   marginLeft:8 
// }
  return (
    <View style={styles.rootContainer}
    scrollEnabled={false}
    showsVerticalScrollIndicator={false}

    >
      <View style={styles.exitIcon}>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {imageCheck()}
          </TouchableOpacity>
          <Text style={{ fontSize:15, fontFamily: 'poppinsSemiBold', marginLeft: 8, marginTop: 8, color: Color.limegreen }}>Hi {fetchedMessage.first_name}</Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => {navigation.navigate('Notification')}}>
            <Image  transition={500} style={styles.notificationIcon} source={require('../assets/vectors/group-517.png')}/>
          </TouchableOpacity>
        </View>
      </View>

        <View style={styles.walletContainer}>  

          <View style={styles.walletContainer2}>
            <Image
            style={styles.nairaSign}
            source={require("../assets/vectors/vector34.png")}
            transition={500}
            />
            <Text style={styles.walletBalance}>{!authCtx.walletBal ? "0.00" : authCtx.walletBal}</Text>
          </View>

          {/*for wallet balance and the add sign */}
          <View style={styles.walletContainer3}>
            <Text style={styles.walletText}>Balance</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddToWallet", {
                walletBalance: authCtx.walletBal
              })}
            >
            <Image
            style={styles.plusIcon}
            source={require("../assets/vectors/vector58.png")}
            transition={500}
            />
            </TouchableOpacity>

          </View>

        </View>


        <View style={styles.quickLinksContainer}>
          <Text style={styles.quickLinkstext}>Quick Links</Text>
        </View>

        <ScrollView 
        showsHorizontalScrollIndicator={false}
        style={styles.ScrollViewContainer} 
        horizontal={true}
        >
            
        <View>
            {/*Make Payment   panel */}
            <TouchableOpacity style={[styles.makePaymentPanel]}
            onPress={() => navigation.navigate("MakePayment")}
            >
              <Image 
              style={styles.makePaymentIcon}
              source={require("../assets/vectors/vector38.png")}
              transition={500}
              />
              <Image 
              style={styles.makePaymentIcon2}
              source={require("../assets/vectors/vector39.png")}
              transition={500}
              />
              <Image 
              style={styles.makePaymentIcon3}
              transition={500}
            source={require("../assets/vectors/vector40.png")}
              />
              <Image 
              style={styles.makePaymentIcon4}
              source={require("../assets/vectors/vector41.png")}
              transition={500}
              />
              <Image 
              style={styles.makePaymentIcon5}
              source={require("../assets/vectors/vector42.png")}
              transition={500}
              />
              <Image 
              style={styles.makePaymentIcon6}
              source={require("../assets/vectors/vector43.png")}
              transition={500}
              />
              <Image 
              style={styles.makePaymentIcon7}
              source={require("../assets/vectors/vector44.png")}
              transition={500}
              />
            
                <Text style={styles.makePaymentText}>Make Payment</Text>
            </TouchableOpacity>

            {/*Request for help  panel */}
            <TouchableOpacity style={[styles.requestHelpPanel]}
            onPress={() => navigation.navigate('RequestHelp')}
            >
              <Image
              style={styles.requestIcon}
              source={require('../assets/vectors/group3.png')}
              transition={500}

              />
              <Text style={styles.requestText}>Request Help</Text>
            </TouchableOpacity>

        </View>
          
        <View style={styles.subContainer3}>
            {/*service History  panel */}
            
            <TouchableOpacity style={[styles.serviceHistoryPanel]}
            onPress={() => navigation.navigate("Service")}
            >
              <Image
              style={styles.servicehistoryIcon}
              source={require("../assets/vectors/vector47.png")}
              transition={500}

              />
              <Image
              style={styles.servicehistoryIcon2}
              source={require("../assets/vectors/vector48.png")}
              transition={500}

              />
              <Image
              style={styles.servicehistoryIcon3}
              source={require("../assets/vectors/vector45.png")}
              transition={500}

              /><Image
              style={styles.servicehistoryIcon4}
              source={require("../assets/vectors/vector46.png")}
              transition={500}

              />
              <Text style={styles.servicehistoryText}>Service History</Text>
            </TouchableOpacity>
            

            {/*Market Place   panel */}
            <TouchableOpacity style={[styles.marketplacePanel]}
            onPress={() => navigation.navigate('MarketPlace')}
            >
              
                <Image
                style={styles.marketplaceIcon}
                source={require("../assets/vectors/vector50.png")}
                transition={500}

                />

                <Image
                style={styles.marketplaceIcon2}
                source={require("../assets/vectors/vector49.png")}
                transition={500}

                />
                <Image
                style={styles.marketplaceIcon3}
                source={require("../assets/vectors/vector51.png")}
                transition={500}
    
                />

                <Text  style={styles.marketPlaceText}>Market Place</Text>

            </TouchableOpacity>
            </View>

            
           

            {/*Requests Payment   panel */}
            <View>
            
            <TouchableOpacity style={[styles.feedback]} onPress={() => navigation.navigate("FeedBack")}>
              <MaterialIcons style={{ paddingLeft: 10, paddingTop:10 }} name="feedback" size={40} color={Color.white} />
              <Text style={styles.feedbackText}>FeedBack</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.requestPanel]}
            onPress={() => navigation.navigate("Requests")}
            >
                
            <View>
                <Image
                style={styles.requestsIcon}
                source={require("../assets/vectors/vector53.png")}
                transition={500}
                
                />
                <Image
                style={styles.requestsIcon2}
                source={require("../assets/vectors/vector54.png")}
                transition={500}

                />

                <Image
                style={styles.requestsIcon3}
                source={require("../assets/vectors/vector52.png")}
                transition={500}
                
                />
            </View>

                <Text style={styles.requestsText}>Requests</Text>
            </TouchableOpacity>
            
            
            </View>

            <View style={styles.emptyView}></View>
          
        </ScrollView>

    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageIcon:{
    width:40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Color.limegreen,
    marginLeft:8 
  },
  exitIcon: {
    paddingRight: 10,
    // marginBottom: "2%",
    marginTop: "15%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  images:{
    flexDirection: 'row'
  },
  notificationIcon:{
    width: 20,
    height: 26,
    marginLeft: 8,

  },
  feedback:{
    // marginTop: 10,
    backgroundColor: Color.limegreen,
    width:160,
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 15,
    height: '22%'
  },
  feedbackText:{
    color: 'white',
    paddingLeft: 10,
    fontFamily: 'poppinsRegular',
    fontSize: 15
  },
  emptyView:{
    marginBottom: "100%",
  },
  subContainer3:{
    marginLeft: 10
  },
  requestHelpPanel:{
    width:160,
    borderRadius: 10,
    height: '60%',
    backgroundColor: Color.mediumpurple,
    padding: 10
  },
  requestIcon:{
    width: 100,
    height: 100,
    marginTop: 30,
  },

  requestText:{
    marginTop: 70,
    color: Color.blueviolet,
    fontFamily: 'poppinsRegular',
    fontSize: 15

  },
  makePaymentPanel:{
    // marginTop: 10,
    width: 160,
    // marginRight: 10,
    borderRadius: 10,
    height: '22%',
    marginBottom: 15,
    backgroundColor: Color.skyblue,
    // paddingLeft: 10
  },

  //under arm
  makePaymentIcon:{
    width: 35,
    height:13,
    position: 'absolute',
    marginTop: 40,
    marginLeft: 11.7,
  },
  makePaymentIcon2:{
    width: 6,
    height:15,
    position: 'absolute',
    marginTop: 39,
    marginLeft: 47,

  },
  makePaymentIcon3:{
    width: 6,
    height:15,
    position: 'absolute',
    marginTop: 9.5,
    marginLeft: 5,
  },

  //upper arm
  makePaymentIcon4:{
    width: 25,
    height:15,
    position: 'absolute',
    marginTop: 10,
    marginLeft: 10

  },

//outer cash
  makePaymentIcon5:{
    width: 35,
    height:20,
    position: 'absolute',
    marginTop: 15.7,
    marginLeft: 18
  },

  //inner cash
  makePaymentIcon6:{
    width: 27,
    height:14,
    position: 'absolute',
    marginTop: 19,
    marginLeft: 22.5,
  },

  //circle
  makePaymentIcon7:{
    width: 7,
    height:7,
    position: 'absolute',
    marginTop: 23.3,
    marginLeft: 32.6
  },

  makePaymentText:{
    marginTop: 60,
    marginLeft: 10,
    color: Color.steelblue,
    fontSize: 15,
    fontFamily: 'poppinsRegular'
  },
  serviceHistoryPanel:{
    // marginTop: 10,
    width:160,
    // marginRight: 10,
    borderRadius: 10,
    height: '60%',
    backgroundColor: Color.lightcoral,
    marginBottom: 15,

  },
  servicehistoryText:{
    color: Color.white,
    marginTop: 200,
    left: 30,
    position: 'absolute',
    fontFamily: 'poppinsMedium'

  },
  servicehistoryIcon:{
    width: 92,
    height: 80,
    position:'absolute',
    marginTop: 50,
    marginLeft: 15,
  },
  servicehistoryIcon2:{
    width: 15,
    height: 40,
    marginTop: 65,
    marginLeft: 63,
    position:'absolute',

  },
  servicehistoryIcon3:{
    width: 10,
    height: 10,
    marginTop: 100,
    marginLeft: 30,
    position:'absolute',

  },
  servicehistoryIcon4:{
    width: 10,
    height: 10,
    marginTop:110,
    marginLeft: 38,
    position:'absolute',

  },
  
  requestPanel:{
    backgroundColor: Color.skyblue,
    width:160,
    marginLeft: 10,
    borderRadius: 10,
    height: '60%'
  },
  requestsText:{
    position: 'relative',
    top: 200,
    left: 10,
    fontSize: 15,
    color: Color.steelblue,
    fontFamily: 'poppinsRegular'

  },
  requestsIcon:{
    marginTop: 75,
    marginLeft: 19,
    width: 25,
    height: 25,
    position: 'absolute'
  },
  requestsIcon2:{
    marginLeft: 15,
    marginTop: 100,
    width: 35,
    height: 19,
    position: 'absolute'
  }, 
  requestsIcon3:{
    marginLeft: 50,
    marginTop:40,
    width: 47,
    height: 55,
    position: 'absolute'
  },
  marketplacePanel:{
    backgroundColor: Color.sandybrown,
    width:160,
    // marginLeft: 10,
    borderRadius: 10,
    height: '22%',
    padding: 10
  },
  marketplaceIcon2:{
    width: 9,
    height: 9,
    marginLeft: 20,
    marginTop: 35,
    position:'absolute'
  },
  marketplaceIcon3:{
    width: 9,
    height: 9,
    marginLeft: 35,
    marginTop: 35,
    position:'absolute'
  },
  marketplaceIcon:{
    width: 40,
    height: 24
  },

  marketPlaceText:{
    // fontWeight: 'bold',
    fontSize: 15,
    marginTop: 18,
    color: Color.peru,
    fontFamily: 'poppinsRegular'
    // bottom: 5,
  },
  ScrollViewContainer:{
    flex: 1,
    marginTop: 30,
    height: "70%",
    
  },
  flexContainer:{
    flexDirection: 'row'
  },
  rootContainer:{
    flex: 1,
    marginHorizontal: 15,
    // marginTop: 30,

  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
    marinTop: -20,
    position: 'absolute'
  },
  subContainer2: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subContainer4:{
    // marginLeft: 200,
  },
  title: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 8,
    color: Color.limegreen,
    marginTop: 7,
    marginRight: 30
  },
  drawer:{
    width: 17,
    height: 20, 
    marginTop: 10,
  },
  imageHolder:{
    // marginVertical: 10,
    width: 22,
    height: 27,
    marginTop: 10
  },
  plusIcon:{
    width: 35,
    height: 35
  },
  nairaSign:{
    marginTop: 6,
    width: 23,
    height: 23,
    position: 'absolute',
  },
  walletContainer:{
    width: '100%',  
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Color.limegreen,
    borderRadius: 20,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    height: '21%'
  },
  walletText:{
    color: 'white',
    fontSize: 20,
    fontFamily:'poppinsRegular'
    // paddingVertical:
  },
  walletBalance:{
    marginTop: 3,
    fontSize: 25,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily: 'montserratBold',
    marginLeft: 30,
  },
  pressed:{
    opacity: 0.75
  },
  walletContainer2:{
    marginTop: 25,
    flexDirection: 'row'
  },
  walletContainer3:{
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  quickLinksContainer:{
    marginTop: 40,
    // marginBottom: -25,
  },
  quickLinksContainer2:{
    flex: 1,
  },
  quickLinksContainer3:{
    Width: '100%'  
  },
  quickLinkstext:{
    fontSize: FontSize.heading2_size,
    marginBottom: 0,
    fontFamily: 'poppinsMedium',
    color: Color.dimgray_200
  },
  
});
