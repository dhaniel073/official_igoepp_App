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
  isAuthenticated: false,
  authenticate: (token) => {},
  customerEmail: (email) => {},
  customeridauthenticate: (customerId) => {},
  customerwalletbalance: (walletBal) => {},
  logout: () => {},

});



function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [customerId, setCusomerId] = useState();
  const [email, setEmail] = useState();
  const [walletBal, setWalletBal] = useState();
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
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('customerdetails')
    AsyncStorage.removeItem('email')
    AsyncStorage.removeItem('walletdetails')
    setIsLoggingOut(false)
  }

  const value = {
    token: authToken,
    customerId: customerId,
    email: email,
    walletBal: walletBal,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    customerEmail: customerEmail,
    customeridauthenticate: customeridauthenticate,
    customerwalletbalance: customerwalletbalance,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
