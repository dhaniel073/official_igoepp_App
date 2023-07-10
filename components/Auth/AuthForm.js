import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';



import Button from '../ui/Button';
import Input from './Input';
import { Color } from '../ui/GlobalStyles';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import LoadingOverlay from '../ui/LoadingOverlay';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredFirstname, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredGender, setEnteredGender] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../../assets/font/Poppins_medium.ttf")
})


  if (!fontloaded) {
    return <LoadingOverlay/>
  }


  const {
    email: emailIsInvalid,
    firstname: firstnameIsInvalid,
    lastname: lastnameIsInvalid,
    gender: genderIsInvalid,
    phone: phoneIsInvalid,
    // confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'firstname':
        setEnteredFirstName(enteredValue);
        break;
      case 'lastname':
        setEnteredLastName(enteredValue);
        break;
      case 'gender':
        setEnteredGender(enteredValue);
        break;
      case 'phone':
        setEnteredPhone(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      firstname: enteredFirstname,
      lastname: enteredLastName,
      phone: enteredPhone,
      gender: enteredGender,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <ScrollView>
    <Text style={styles.Title}>{isLogin ? "Log In" : "Sign Up"}</Text>
    
      <View>
        <View style={styles.nameContainer}>
        <View style={styles.firstname}>
        {!isLogin && (
        <Input
          placeholder="First Name"
          onUpdateValue={updateInputValueHandler.bind(this, 'firstname')}
          value={enteredFirstname}
          isInvalid={firstnameIsInvalid}

          />
        )}
        </View>
        <View style={styles.lastname}>
        {!isLogin && (
          <Input
            placeholder="Last Name"
            onUpdateValue={updateInputValueHandler.bind(this, 'lastname')}
            value={enteredLastName}
            isInvalid={lastnameIsInvalid}

            />
          )}
          </View>
        </View>

        <Input
          placeholder="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}

          />
        {!isLogin && (
          <Input
            // label="Gender"
            onUpdateValue={updateInputValueHandler.bind(this, 'gender')}
            value={enteredGender}
            isInvalid={genderIsInvalid}
            maxLength={1}
            placeholder={" 'M' for male and 'F' for Female"}

          />
        )}

        {!isLogin && (
          <Input
            placeholder="Phone"
            onUpdateValue={updateInputValueHandler.bind(this, 'phone')}
            value={enteredPhone}
            keyboardType="numeric"
            isInvalid={phoneIsInvalid}

          />
        )}
        <Input
          placeholder="Password"
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            placeholder="Verify Password"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword'
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Button>
        </View>
       
      </View>
    </ScrollView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 25,
  },
  nameContainer:{
    flex: 1,
    flexDirection: "row",
    // justifyContent: 'space-between',
  },
  firstname:{
    width: "50%"
  },
  lastname:{
    marginHorizontal: 10,
    width: "50%"

  },
  Title:{
    marginTop: 30, 
    marginBottom: 30,
    // marginHorizontal: 50,
    fontSize: 30,
    // fontWeight: 'bold',
    fontFamily: 'poppinsMedium',
    color: Color.lightgreen
  },

  
});
