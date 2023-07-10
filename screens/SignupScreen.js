import { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';
import axios from "axios"
import { Color } from '../components/ui/GlobalStyles';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password, gender, phone, firstname, lastname }) {
        
    setIsAuthenticating(true);
    try {
      const response = await createUser(email, password, gender, phone, firstname, lastname)
      if(response.wallet_balance === null){
        const wallet_balance = ""
        authCtx.customerwalletbalance(wallet_balance)
      }else{
        const wallet_balance = (response.wallet_balance).toLocaleString()
        authCtx.customerwalletbalance(wallet_balance)
      }
      authCtx.authenticate(response.access_token)
      authCtx.customeridauthenticate(JSON.stringify(response.customer_id))
      authCtx.customerEmail(response.email)
    } catch (error) {
      console.log(error.response.data.email)
      Alert.alert("Error Signing you In", error.response.data.email)
    }
    setIsAuthenticating(false);

  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return(
    <>    
    <ScrollView style={styles.Title}
    showsVerticalScrollIndicator={false}
    >
        <AuthContent onAuthenticate={signupHandler} />
    </ScrollView>
    </>
  )
}

export default SignupScreen;

const styles = StyleSheet.create({
  Title:{
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: Color.lightgreen
  }
})
