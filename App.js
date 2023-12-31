  import { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AppLoading from 'expo-app-loading';
import {Ionicons} from '@expo/vector-icons'

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthContextProvider, { AuthContainer, AuthContainerProvider, AuthContext } from './store/auth-context';
import LoadingOverlay from './components/ui/LoadingOverlay';
import AddWallet from './screens/AddWallet';
import NotificationScreen from './screens/NotificationScreen';
import RequestHelp from './screens/RequestHelp';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Color } from './components/ui/GlobalStyles';
import MarketPlace from './screens/MarketPlace';
import TermsAndCondition from './screens/TermsAndCondition';
import Requests from './screens/Requests';
import axios from 'axios';
import { Text, StyleSheet, View, Image, Pressable, Modal, Alert } from 'react-native';
import ServiceHistory from './screens/ServiceHistory';
import PayStackScreen from './screens/PayStack';
import ForgotPassword from './screens/ForgotPassword';
import FirstDisplayScreen from './screens/FirstDisplayScreen';
import MakePayment from './screens/MakePayment';
import RequestHelpQuestionaries from './screens/RequestHelpQuestionaries';
import Payments from './screens/Payments';
import Profile from './screens/Profile';
import ViewProfile from './screens/ViewProfile';
import ImageViewer from './screens/ImageViewer';
import SubCategory from './screens/SubCategory';
import ProceedCategory from './screens/ProceedCategory';
import { useFonts } from 'expo-font';
import ViewRequests from './screens/ViewRequests';
import RequestSendInfo from './screens/RequestSendInfo';
import FeedBack from './screens/FeedBack';
import BidScreen from './screens/BidScreen';
import CancelRequest from './screens/CancleRequest';
import CustomDrawer from './screens/CustomDrawer';
import Transfer from './screens/Transfer';
import Settings from './screens/Settings';
import MarketPlaceItems from './screens/MarketPlaceItems';
import ProceedMarketItem from './screens/ProceedMarketItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ChatScreen from './screens/ChatScreen';
import DisputeScreen from './screens/DisputeScreen';
import NotifictionSettings from './screens/NotifictionSettings';
import ViewCartItems from './screens/ViewCartItems';
import CheckOutScreen from './screens/CheckOutScreen';

const Stack = createNativeStackNavigator();

function Logout(){
  const authCtx = useContext(AuthContext);
  return authCtx.logout
}


function AuthStack() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value === null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if(isFirstLaunch === null){
    return null
  }else if( isFirstLaunch === true) {
    return (
      <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen name="FirstDisplayScreen" component={FirstDisplayScreen} 
      options={{ headerShown: false }}
      />

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

    )
  }else{
    return (
      <Stack.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: "#fff" },
      }}
    >

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
    )
  }
  
}

const Drawer = createDrawerNavigator();

function DrawerNavigation(){
  const navigation = useNavigation()


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
  
  return (
    <Drawer.Navigator  theme={DarkTheme} drawerContent={props => <CustomDrawer {...props} />} screenOptions={{  
        // headerTintColor: 'black',
        // headerShown: false,
        sceneContainerStyle: {backgroundColor: '#fff'},
        // drawerContentStyle: { marginTop: "60%", },
        drawerContentStyle: { marginTop: "50%", },
        drawerInactiveTintColor: Color.darkolivegreen_100,
        drawerActiveBackgroundColor: Color.limegreen,
        drawerActiveTintColor: 'white',
        drawerLabelStyle: {marginLeft: -20, fontFamily: 'poppinsSemiBold'},
        headerShadowVisible: 0,
        
      
    }}>

      <Drawer.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ 
        title: "HOME",
        headerTintColor: Color.darkolivegreen_100,
        headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="home" color={color} size={size}/>,
        headerRight: () => (
          ""
          ),
       }}
      />

      <Drawer.Screen
      name="Payment"
      component={Payments}
      options={{ 
        headerTintColor: Color.darkolivegreen_100,
        title: "Payment",
        // headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="wallet" color={color} size={size}/>,
        // drawerIcon: ({color, size}) => <Text>{fetchedMessage.first_name}</Text>,
       }}
      />

      <Drawer.Screen
      name="Service"
      component={ServiceHistory}
      options={{ 
        headerTintColor: Color.darkolivegreen_100,
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
        headerTintColor: Color.darkolivegreen_100,
        headerShown: false,
        drawerIcon: ({color, size}) => <Ionicons name="chatbox-ellipses" color={color} size={size}/>
       }}
      />

      <Drawer.Screen
      name="MarketPlace"
      component={MarketPlace}
      options={{ 
        headerShown: false,
        headerShadowVisible: false,
        headerTintColor: Color.darkolivegreen_100,
        title: "Market Place",
        drawerIcon: ({color, size}) => <Ionicons name="globe" color={color} size={size}/>
       }}
      />

      <Drawer.Screen
       name='Settings'
       component={Settings}
       options={{ 
        headerShown: false,
        headerTintColor: Color.darkolivegreen_100,
        drawerIcon: ({color, size}) => <Ionicons name="settings" color={color} size={size}/>

        }}
      />
       


    </Drawer.Navigator>
  )
}




function AuthenticatedStack() {
  const navigation = useNavigation()
  
  return (
    <Stack.Navigator
      theme={DarkTheme}
        screenOptions={{
        headerTintColor: Color.darkolivegreen_100,
        contentStyle: {backgroundColor: '#fff'},
        headerStyle:{
          headerShadowVisible: ""
        },
        
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


      {/*Request Help*/}
      <Stack.Screen
      name='RequestHelp'
      component={RequestHelp}
      options={{ 
        headerShown: false,
       }}
      />
      
      <Stack.Screen
      name='Requests'
      component={Requests}
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
      name='ProceedMarketItem'
      component={ProceedMarketItem}
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
      name='Profile'
      component={Profile}
      options={{
         headerShown: true, 
         title: 'Edit Profile' ,
          headerShadowVisible: false
      }}
      />

      <Stack.Screen
       name='ViewProfile'
       component={ViewProfile}
       options={{ 
        headerShown: true,
        title: '' ,
        headerShadowVisible: false,
        headerRight: ({color, size}) => (
          <MaterialCommunityIcons name="note-edit" size={24} color={Color.limegreen} onPress={({route}) => navigation.navigate('Profile', {
            route
          })}/>
          )
        }}
        />
        
        {/*<Ionicons name='pencil' size={20} color={Color.limegreen} onPress={() => navigation.navigate('Profile')}/>*/}

    
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
      name='marketPlaceItems'
      component={MarketPlaceItems}
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

      
      <Stack.Screen
      name='FeedBack'
      component={FeedBack}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='BidScreen'
      component={BidScreen}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='CancelRequest'
      component={CancelRequest}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='Transfer'
      component={Transfer}
      options={{ headerShown: false }}
      />

      <Stack.Screen
      name='Chat'
      component={ChatScreen}
      options={{ headerShown: false }}
      />
      
      
      <Stack.Screen
      name='NotificationSettings'
      component={NotifictionSettings}
      options={{ headerShown: false }}
      />
      
      <Stack.Screen
      name="TermsAndConditions"
      component={TermsAndCondition}
      options={{ 
        headerShown: false,
        headerTintColor: Color.darkolivegreen_100,
        title: "TERMS AND CONDITIONS",
       }}
      />

      <Stack.Screen
      name="DisputeScreen"
      component={DisputeScreen}
      options={{ 
        headerShown: false,
       }}
      />

      <Stack.Screen
      name="ViewCartItems"
      component={ViewCartItems}
      options={{ 
        headerShown: false,
       }}
      />

       <Stack.Screen
       name="Checkout"
       component={CheckOutScreen}
       options={{ 
         headerShown: false,
        }}
       
      />

      

      </Stack.Navigator>

  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
    
 

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
      const storedRequestsMade = await AsyncStorage.getItem('request')
      const storedSessionId = await AsyncStorage.getItem('sessionId')
      const storedCartLength = await AsyncStorage.getItem('cartlength')



      console.log(storedRequestsMade)

      if(storedToken && storedId && storedEmail){
        authCtx.customeridauthenticate(storedId)
        authCtx.authenticate(storedToken);
        authCtx.customerEmail(storedEmail);
        authCtx.customerwalletbalance(storedWalletBalance)
        authCtx.customerRequestsMade(storedRequestsMade)
        authCtx.customerSessionId(storedSessionId)
        authCtx.customerCart(storedCartLength)
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

  Username:{
    marginTop: 10,
    fontSize: 15,
    marginRight:10,
    color: Color.lightgreen,
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