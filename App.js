  import { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo-app-loading';
import {Ionicons} from '@expo/vector-icons'

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContainer, AuthContainerProvider, AuthContext } from './store/auth-context';
// import IconButton from './components/ui/IconButton';
import LoadingOverlay from './components/ui/LoadingOverlay';
// import Welcome1 from './screens/WelcomeScreen1';
import AddWallet from './screens/AddWallet';
import NotificationScreen from './screens/NotificationScreen';
import FundWallet from './screens/FundWallet';
import RequestHelp from './screens/RequestHelp';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import DrawerScreen from './screens/DrawerScreen';
import { Color } from './components/ui/GlobalStyles';
import MarketPlace from './screens/MarketPlace';
import TermsAndCondition from './screens/TermsAndCondition';
import Requests from './screens/Requests';
import axios from 'axios';
import { Text, StyleSheet, View, Image, Pressable, Modal, Alert } from 'react-native';
import ServiceHistory from './screens/ServiceHistory';
import { sin } from 'react-native-reanimated';
// import PayStack from './screens/PayStack';
import PayStackScreen from './screens/PayStack';
import ForgotPassword from './screens/ForgotPassword';
import FirstDisplayScreen from './screens/FirstDisplayScreen';
// import ViewHelper from './screens/ProceedCategory';
import MakePayment from './screens/MakePayment';
import RequestHelpQuestionaries from './screens/RequestHelpQuestionaries';
import Payments from './screens/Payments';
import Profile from './screens/Profile';
import ViewProfile from './screens/ViewProfile';
import ImageViewer from './screens/ImageViewer';
import SubCategory from './screens/SubCategory';
import ProceedCategory from './screens/ProceedCategory';
import { customerInfocheck } from './util/auth';
import { useFonts } from 'expo-font';
import ViewRequests from './screens/ViewRequests';
import RequestSendInfo from './screens/RequestSendInfo';
// import { Modal } from 'antd';

const Stack = createNativeStackNavigator();

function Logout(){
  const authCtx = useContext(AuthContext);
  return authCtx.logout
}


function AuthStack() {
  
  
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      {/*<Stack.Screen name="FirstDisplayScreen" component={FirstDisplayScreen} 
      options={{ headerShown: false }}
    />*/}

      <Stack.Screen name="Login" component={LoginScreen} 
      options={{ headerShown: false }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} 
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='ForgotPassword'
      component={ForgotPassword}
      options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation(){

  const [fetchedMessage, setFetchedMesssage] = useState('');
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const authCtx = useContext(AuthContext);


  const token = authCtx.token;
  const customerId = authCtx.customerId
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {

  async function UserInfo(){
    setIsLoading(true)
    try{
      await customerInfocheck(authCtx.customerId, authCtx.token)
      .then((res) => {
        console.log(res.data.data)
        setFetchedMesssage(res.data.data)
      })  
    }catch(error){
      console.log(error.response)
    }
    setIsLoading(false)
  }
  UserInfo()
}, [])

    function imageCheck(){
      if(fetchedMessage.picture === null){
        return <Image style={styles.imageIcon} source={require("./assets/vectors/person.png")}/>
      }else{
        return <Image style={styles.imageIcon} source={{ uri:`https://phixotech.com/igoepp/public/customers/${fetchedMessage.picture}` }}/>
      }
  }

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("./assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("./assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("./assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("./assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("./assets/font/Poppins_bold.ttf")
  
  })
  
  if(!fontloaded){
  return <LoadingOverlay/>
  }



  if(isLoading){
    return <LoadingOverlay/>
  }  

  return (
    <Drawer.Navigator screenOptions={{  
        headerTintColor: 'black',
        sceneContainerStyle: {backgroundColor: '#fff'},
        // drawerContentStyle: { marginTop: "60%", },
        drawerContentStyle: { marginTop: "50%", },
        drawerInactiveTintColor: Color.darkolivegreen_100,
        drawerActiveBackgroundColor: Color.limegreen,
        drawerActiveTintColor: 'white'
      
    }}>

      <Drawer.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ 
        title: "HOME",
        headerTintColor: Color.lightgreen,
        drawerIcon: ({color, size}) => <Ionicons name="home" color={color} size={size}/>,
        headerRight: () => (
          <View style={styles.exitIcon}>
            <Text style={styles.Username}>{fetchedMessage.first_name} {fetchedMessage.last_name}</Text>
            <View style={styles.images}>
            {/*<Pressable onPress={() => authCtx.logout()}>
              <Image  transition={500} style={styles.notificationIcon} source={require('./assets/vectors/group-517.png')}/>
            </Pressable>*/}
                        
            <Pressable style={({pressed}) => [pressed && styles.pressed]} 
            onPress={() => navigation.navigate('ViewProfile',{fetchedMessage})}
            >
              {imageCheck()}
            </Pressable>
            {/*<Pressable
            style={[styles.button, styles.buttonOpen]}
              >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>*/}
            </View>
          </View>)
       }}
      />

      <Drawer.Screen
      name="Drawer Payment"
      component={Payments}
      options={{ 
        headerTintColor: Color.lightgreen,
        title: "Payment",
        // headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="wallet" color={color} size={size}/>,
        // drawerIcon: ({color, size}) => <Text>{fetchedMessage.first_name}</Text>,
       }}
      />

      <Drawer.Screen
      name="Drawer Service"
      component={ServiceHistory}
      options={{ 
        headerTintColor: Color.lightgreen,
        title: "Service History",
        drawerIcon: ({color, size}) => <Ionicons name="list" color={color} size={size}/>,
        // headerShown: falses
       }}
      />


      <Drawer.Screen
      name="Requests"
      component={Requests}
      options={{ 
        title: "Requests",
        headerTintColor: Color.lightgreen,
        // headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="exit" color={color} size={size}/>
       }}
      />

      <Drawer.Screen
      name="MarketPlace"
      component={MarketPlace}
      options={{ 
        // headerShown: false,
        headerTintColor: Color.lightgreen,
        title: "Market Place",
        drawerIcon: ({color, size}) => <Ionicons name="globe" color={color} size={size}/>
       }}
      />

      <Drawer.Screen
      name="TermsAndConditions"
      component={TermsAndCondition}
      options={{ 
        headerTintColor: Color.lightgreen,
        title: "TERMS AND CONDITIONS",
        // headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="book" color={color} size={size}/>
       }}
      />


      <Drawer.Screen
      name="SignOut"
      component={Logout}
      options={{ 
        headerTintColor: Color.lightgreen,
       }}
      />

    </Drawer.Navigator>
  )
}




function AuthenticatedStack() {

  
  return (
    <Stack.Navigator
      screenOptions={{
        // headerStyle:{backgroundColor: '#351401'},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: '#fff'}

      }}
    >
      {/* Welcome Screen*/}
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={{
          headerShown: false,
        }}
      />

      {/* Notification Screen*/}
      <Stack.Screen
        name='Notification'
        component={NotificationScreen}
        options={{ 
          headerShown: false,
         }}
      />

      {/* Wallet Screen*/}
      <Stack.Screen
      name='AddToWallet'
      component={AddWallet}
      options={{ 
        headerShown: false,
        contentStyle: {backgroundColor: '#fff'}
       }}

      />

      <Stack.Screen
      name='FundWallet'
      component={FundWallet}
      options={{ 
        headerShown: false,
       }}

      />

      {/*Request Help*/}
      <Stack.Screen
      name='RequestHelp'
      component={RequestHelp}
      options={{ 
        headerShown: false,
       }}
      />

      <Stack.Screen
      name='PayStack'
      component={PayStackScreen}
      options={{ 
        headerShown: false,
       }}
      />

      <Stack.Screen
      name='ProceedCategory'
      component={ProceedCategory}
      options={{ headerShown: false }}
      />
    
      <Stack.Screen
      name='MakePayment'
      component={MakePayment}
      options={{ headerShown: false }}
      />
    
      <Stack.Screen
      name='RequestHelpQuestionaries'
      component={RequestHelpQuestionaries}
      options={{ headerShown: false }}
      />

      <Stack.Screen
       name='ViewProfile'
       component={ViewProfile}
       options={{ headerShown: false, 
      }}
      />

      <Stack.Screen
      name='Profile'
      component={Profile}
      options={{ headerShown: false }}
      />
    
      <Stack.Screen
      name='ImageViewer'
      component={ImageViewer}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='SubCategory'
      component={SubCategory}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='View Requests'
      component={ViewRequests}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='RequestSendInfo'
      component={RequestSendInfo}
      options={{ headerShown: false }}
      />
      

      </Stack.Navigator>

  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  const [firstLaunch , setFirstLaunch] = useState(true);
    
  useEffect(() => {
    async function CheckFirstLaunch(){
       const check = await AsyncStorage.getItem('FIRST_CHECK')
       console.log(check)
       setFirstLaunch(true)
    }
    CheckFirstLaunch()
  }, [])



  return (
    <NavigationContainer>
     {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {

    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      const storedId = await AsyncStorage.getItem('customerdetails')
      const storedEmail = await AsyncStorage.getItem('email')
      const storedWalletBalance = await AsyncStorage.getItem('walletdetails')
      const check =  AsyncStorage.setItem('FIRST_CHECK', 'false')

      // console.log(storedEmail)

      if(storedToken && storedId && storedEmail){
        authCtx.customeridauthenticate(storedId)
        authCtx.authenticate(storedToken);
        authCtx.customerEmail(storedEmail);
        authCtx.customerwalletbalance(storedWalletBalance)
      }

      // if (storedToken) {
      //   authCtx.authenticate(storedToken);
      // }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <LoadingOverlay message="..." />;
  }

  return <Navigation />;
}

export default function App() {
  
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>

    </>
  );
}


const styles = StyleSheet.create({
  modalText2:{
      fontFamily: 'poppinsMedium'
  },
  pressed:{
    opacity: 0.45
  },
  exitIcon: {
    paddingRight: 20,
    flexDirection: 'row',
  },
  images:{
    flexDirection: 'row'
  },
  Username:{
    marginTop: 10,
    fontSize: 15,
    marginRight:10,
    color: Color.lightgreen,
  },
  notificationIcon:{
    width: 20,
    height: 24,
    marginLeft: 8,
  },
  imageIcon:{
    width:40,
    height: 40,
    borderRadius: 500
  },
  centeredView: {
    position: 'absolute',
    flex: 1,
    marginLeft: 180,
    justifyContent: 'center',
    // alignItems: 'flex-end',
    marginTop: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    flexDirection: 'row'
  },
})