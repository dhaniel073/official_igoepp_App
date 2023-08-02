import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import { createContext, useContext, useEffect, useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export const AuthContext = createContext({
  token: '',
  customerId: '',
  email: '',
  walletBal: '',
  sessionId: '',
  request: '',
  cart:'',
  isAuthenticated: false,
  authenticate: (token) => {},
  customerEmail: (email) => {},
  customeridauthenticate: (customerId) => {},
  customerwalletbalance: (walletBal) => {},
  customerRequestsMade: (request) => {},
  customerSessionId: (sessionId) => {},
  customerCart: (cart) => {},

  logout: () => {},

});



function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [customerId, setCusomerId] = useState();
  const [email, setEmail] = useState();
  const [walletBal, setWalletBal] = useState();
  const [request, setRequest] = useState();
  const [sessionId, setSessionId] = useState();
  const [cart, setCart] = useState();
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if(isLoggingOut){
    return <LoadingOverlay message={"Logging Out"}/>
  }


  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function customeridauthenticate(Id){
    setCusomerId(Id)
    AsyncStorage.setItem('customerdetails', Id)
  }

  function customerEmail(email){
    setEmail(email)
    AsyncStorage.setItem('email', email)
  }

  function customerRequestsMade(request){
    setRequest( request)
    AsyncStorage.setItem('request', request)
  }

  function customerSessionId(sessionId){
    const setSesId = sessionId === null ? "" : sessionId
    setSessionId(setSesId)
    AsyncStorage.setItem('sessionId', setSesId)
  }

  function customerCart(cart){
    const cartlength = cart === null ? 0 : cart
    setCart(cartlength)
    AsyncStorage.setItem('cartlength', JSON.stringify(cart))
  }

  function customerwalletbalance(walletBal){
    const setWalletbal = (walletBal === null ? "" : walletBal) 
    console.log(setWalletbal)
    setWalletBal(setWalletbal)
    AsyncStorage.setItem('walletdetails', setWalletbal)
  }


 function logout() {
    setIsLoggingOut(true)
    setAuthToken(null)
    setCusomerId(null)
    setEmail(null)
    setWalletBal(null)
    setSessionId(null)
    setRequest(null)
    setCart(null)
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('customerdetails')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('walletdetails')
    AsyncStorage.removeItem('request')
    AsyncStorage.removeItem('sessionId')
    AsyncStorage.removeItem('cartlength')
    setIsLoggingOut(false)
  }

  const value = {
    token: authToken,
    customerId: customerId,
    email: email,
    walletBal: walletBal,
    sessionId: sessionId,
    cart: cart,
    request: request,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    customerEmail: customerEmail,
    customeridauthenticate: customeridauthenticate,
    customerRequestsMade: customerRequestsMade,
    customerwalletbalance: customerwalletbalance,
    customerSessionId: customerSessionId,
    customerCart: customerCart,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
