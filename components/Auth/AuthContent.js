import { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    firstname: false,
    lastname: false,
    gender: false,
    phone: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  function ForgetPasswordHandler(){
    navigation.navigate('ForgotPassword')
  }

  function submitHandler(credentials) {
    let { email, firstname, lastname, gender, phone, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 4;
    const genderIsValid = gender.length === 1;
    const passwordsAreEqual = password === confirmPassword;
    if (
      !emailIsValid ||
      !passwordIsValid || 
      (!isLogin && (!passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        // firstname: !firtnameIsValid,
        // confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password, gender, phone, firstname, lastname});
  }

  return (
    <View style={styles.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.button}>
        {isLogin && (
          <FlatButton onPress={ForgetPasswordHandler}>
            Forgot Password
          </FlatButton>
        )}
      </View>
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'New User? Create a new user' : 'Log in instead'}
        </FlatButton>
     {/*   {isLogin && (
          <Image style={styles.image4} source={require("../../assets/vectors/whatsapp-image-20201211-at-642-1.png")}/>
    //  )} */}
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 40,
    marginHorizontal: 25,
    padding: 16,
    borderRadius: 8,
  },
  button:{
    marginTop: 25
  },
  buttons: {
    // marginTop: 8,
    color: 'white'
  },
  image4: {
    position: 'absolute',
    width: 10,
    height: 80,
    marginLeft: "34%",
    marginTop: "90%",

  },
});
