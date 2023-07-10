import { useContext, useState } from 'react';
import { Alert, Text, StyleSheet, View, ScrollView } from 'react-native';


import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { Color } from '../components/ui/GlobalStyles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const response = await login(email, password);
      if(response.wallet_balance === null){
        console.log(response.wallet_balance)
        const wallet_balance = ""
        authCtx.customerwalletbalance(wallet_balance)
      }else{
        const wallet_balance = (response.wallet_balance).toLocaleString()
        authCtx.customerwalletbalance(wallet_balance)
      }
      authCtx.authenticate(response.access_token)
      authCtx.customeridauthenticate(JSON.stringify(response.customer_id))
      authCtx.customerEmail(response.email)
      // authCtx.customerwalletbalance(wallet_balance)
    } catch (error) {
      console.log(error.response.data.message)
      Alert.alert("Login Failed", error.response.data.message)
      setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return (
    <>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}>
        <AuthContent isLogin onAuthenticate={loginHandler} />
      </ScrollView>
    </>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer:{
    marginVertical: 100,
    // marginHorizontal: 25,
  },

})
