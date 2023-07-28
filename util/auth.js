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


//signup route
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
    application: "mobileapp"
  })

  const data = response.data;

  return data;
}

//login route
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

//show customer details route
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



  
//forgot route
async function forgotPass(email){
  const url = "http://phixotech.com/igoepp/public/api/customer/forgetpassword"
  const response = await axios.post(url, {
    email: email
  })
  // console.log(response)
  return response
}


//update wallet route
async function walletupdate(customerId, token, InputAmount){
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

//update customer details route
async function infoUpdate(last_name, first_name, sex, phone, customerId, token, countryName, stateName, cityName){
  try{
  const response = await axios.put(
      `http://phixotech.com/igoepp/public/api/auth/customer/${customerId}/update`, 
      {
          last_name: last_name,
          first_name: first_name,
          phone: phone,
          sex:sex,
          Country: countryName,
          State: stateName,
          lga: cityName  
      },{
        headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    // console.log(response)
      return response;
  } catch(error){
      Alert.alert("Error", "An Error Occured while updating your info")
  }
}


//upload customer picture route
async function pictureupload(customerId, token, picture){
  // console.log(picture.uri)
  const formdata = new FormData()
  formdata.append('file', {
    uri: picture.uri,
    type: picture.type
  })  
  try{
  const response = await axios.post(
      "http://phixotech.com/igoepp/public/api/auth/customer/uploadpicture", 
      {
          customerid: customerId,
          picture: formdata
      },
      {
        headers:{
          'Content-type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
      }
    )
      // console.log(response)
      return response;
  } catch(error){
      // console.log(error.response.data)
      console.log(error.response.data.message)
      // console.log(error.response.data.status)
      Alert.alert("Error", "An Error Occured while uploading your Profile Picture")
  }
}

//subcategory questions route
async function subcatquestion(subcatId, token){
  try{
  const response = await axios.put(
      `http://phixotech.com/igoepp/public/api/auth/category/subcategoryquestionshow/${subcatId}`, 
     {
        headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
      // console.log(response)
      return response;
  } catch(error){
    Alert.alert("Error", error.response.message)

  }
}

//fetch customer requests route
async function fetchedData(customerId, token){
  try{
    const response = await axios.get(
        `http://phixotech.com/igoepp/public/api/auth//hrequest/showrequestbycustomerid/${customerId}`, 
       {
          headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        // console.log(response)
        return response.data;
    } catch(error){
      console.log(error)
      Alert.alert("Error", error.response.data.message)
  
    }
}

//fetch requests by request id
async function fetchrequestbyid(requestid, token){
  try{
    const response = await axios.get(
        `http://phixotech.com/igoepp/public/api/auth/hrequest/showrequestbyrequestid/${requestid}`, 
       {
          headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        // console.log(response)
        return response.data;
    } catch(error){
      console.log(error.response.data)
      Alert.alert("Error", "Error Fetching Request Infomations")
  
    }
}

async function cancelrequests(id, token, reason){
  try{
    const response = await axios.post(
        `http://phixotech.com/igoepp/public/api/auth/hrequest/cancelrequest`, 
        {
            book_id: id,
            cancel_reason: reason
        },
       {
          headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        // console.log(response)
        return response.data;
    } catch(error){
      console.log(error.response.data)
      Alert.alert("Error", "Error Fetching Request Infomations")
  
    }
}




async function bidrequests(bid_id, token){
  try{
    const response = await axios.get(
        `http://phixotech.com/igoepp/public/api/auth/hrequest/showbidrequestbyrequestid/${bid_id}`, 
       {
          headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
        // console.log(response.data)
        return response.data;
    } catch(error){
      console.log(error.response.data)
      Alert.alert("Error", "Error Fetching Request Infomations")
  
    }
}

async function sendrequest(token){
  console.log(token)

  try{
    const response = await axios.post(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response)
  }catch(error){
    console.log(error)
  }
         
}

async function subcategoryquestionstore(sub_category_id,category_id,answerfield, question_type, token){
  const url = "http://phixotech.com/igoepp/public/api/auth/category/subcategoryquestionstore"
  try {
      const response = await axios.post(url, 
          {
              "subcategoryid": sub_category_id,
              "categoryid": category_id,
              "sub_cat_question": answerfield,
              "question_type": question_type
          },
          {
              headers: {
                  Accept: 'application/json',                        
                  Authorization: `Bearer ${token}`
              }
          }
      )
      // console.log(response)
      // return response.data
  } catch (error) {
      console.log(error.response)
      Alert.alert("Error", "An error occured")
  }
}

async function sessionId(email, token){
  const url = 'https://phixotech.com/igoepp/public/api/auth/igoeppauth/sessioncheckcustomer'
 try {
  const response = await axios.post(url, {
    username: email,
    application: 'webapp'
  },
  {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  )
  return response;
 } catch (error) {
  console.log(error.response)
 }
}

async function walletbal(customerId, token){
  const url = `http://phixotech.com/igoepp/public/api/auth/customer/${customerId}/wallet`

  // console.log(url)
  try {

    const response = await axios.get(url, {
      headers:{
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    // console.log(response.data)
    return response;
  } catch (error) {
    console.log(error)
  }
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


export function WalletCheckBalance(customerId, token, InputAmount){
  return walletupdate(customerId, token, InputAmount)
}

export function ForgotCustomerPassword(email){
  return  forgotPass(email)
}

export function updateUserinfo(last_name, first_name, sex, phone, customerId, token, countryName, stateName, cityName){
  return infoUpdate(last_name, first_name, sex, phone, customerId, token, countryName, stateName, cityName)
}

export function upLoadPicture(customerId, token, picture){
  return pictureupload(customerId, token, picture)
}

export function ShowSubCatQuestion(subcatId, token){
      return subcatquestion(subcatId, token)
}

export function ShowFetchedRequests(customerId, token){
  return fetchedData(customerId, token)
}

export function ShowFetchedRequestsById(requestid, token){
  return fetchrequestbyid(requestid, token)
}

export function CancelRequests(id, token, reason){
  return cancelrequests(id, token, reason)
}

export function BidRequests(bid_id, token){
  return bidrequests(bid_id, token)
}

export function MakeRequest(token){
  return sendrequest(token)
  
}

export function SessionIDCheck(email,token){
  return sessionId(email, token)
  
}

export function WalletBalance(customerId,token){
  return walletbal(customerId, token)
  
}



export function SubcategoryQuestionStore(sub_category_id,category_id,answerfield,question_type,token){
  return subcategoryquestionstore(sub_category_id,category_id, answerfield, question_type,  token)
}

