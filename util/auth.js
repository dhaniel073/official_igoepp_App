import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import { Alert, View } from 'react-native';
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { useNavigation } from '@react-navigation/native';




const API_KEY = 'AIzaSyClgp52iRKjMlTREeh-TSkykXbYpforQR4';

// async function authenticate(mode, email, password) {
//   const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

//   const response = await axios.post(url, {
//     email: email,
//     password: password,
//     returnSecureToken: true,
//   });

//   const token = response.data.idToken;

//   return token;
// }

async function authenticateSignUp(email, password, gender, phone, firstname, lastname){
  let base = 'customer/store'
  const loginUrl = 'https://phixotech.com/igoepp/public/api/'+ base
  
  const response = await axios.post(loginUrl, {
    first_name: firstname,
    last_name: lastname,
    email: email,
    sex: gender,
    phone: phone,
    password: password,
    // application: "webapp"
  })

  const data = response.data;

  return data;
}

async function authenticateLogin(email, password){
  let base = 'igoeppauth/logincustomer'
  const loginUrl = 'https://phixotech.com/igoepp/public/api/'+ base
  
  const response = await axios.post(loginUrl, {
    username: email,
    password: password,
    application: "webapp"
  })
  const data = response.data
  return data;
}

async function showCustomer(customer_id, token){
    const url = `http://phixotech.com/igoepp/public/api/auth/customer/${customer_id}`
    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response.data)
    return response
}


export  function createUser(email, password,gender, phone, firstname, lastname) {
  return authenticateSignUp(email, password, gender, phone, firstname, lastname)
}

export  function login(email, password) {
    return authenticateLogin(email,password)
  }
  
  export function customerInfocheck(customer_id, token){
    return showCustomer(customer_id, token)
  }


async function walletcheck(customerId, token, InputAmount){
  try{
  const response = await axios.put(
      `http://phixotech.com/igoepp/public/api/auth/customer/${customerId}/walletupdate`, 
      {
          wallet_balance: InputAmount,
      },{
        headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      return response;
  } catch(error){
      Alert.alert("Error", "An Error Occured while updating your Wallet Balance")
  }
}

export function WalletCheckBalance(customerId, token, InputAmount){
  return walletcheck(customerId, token, InputAmount)
}

  // async function walletbal(){
  //     const url = `http://phixotech.com/igoepp/public/api/auth/customer/${id}/wallet`
  //     const response = await axios.get(url)
  // }
  
async function forgotPass(email){
    const url = "http://phixotech.com/igoepp/public/api/customer/forgetpassword"
    const response = await axios.post(url, {
      email: email
    })
    console.log(response)
    return response
}

export function ForgotCustomerPassword(email){
  return  forgotPass(email)
}


