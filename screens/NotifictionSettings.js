import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, FontSize } from '../components/ui/GlobalStyles'
import GoBack from '../components/ui/GoBack'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import {useFonts} from 'expo-font'
import CustomSwitch from '../components/ui/CustomSwitch'
import axios from 'axios'
import { AuthContext } from '../store/auth-context'

const NotifictionSettings = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    // const [email, setEmail] = useState()
    // const [sms, setSMS] = useState()
    // const [popups, setPopups] = useState()

    const [isEmailEnabled, setIsEmailEnabled] = useState('')
    const [isSmsEnabled, setIsSMSEnabled] = useState('')
    const [isPopupEnabled, setIsPopupEnabled] = useState('')

    // const [emailtype, setEmailType] = useState('')
    // const [smstype, setSMSType] = useState('')
    // const [popupstype, setPopupsType] = useState('')

    // console.log(popups, email, sms)

    const [isFetching, setIsFetching] = useState()
    

    const [emailtext, setEmailText] = useState()
    const [smstext, setSMSText] = useState()
    const [popuptext, setPopupText] = useState()



    const toggleEmailSwitch = async() => {
        if(isEmailEnabled){
            setEmailText('Inactive')
        } else{
            setEmailText('Active')
        }

        if(isEmailEnabled === false){
            // call the set customer alert
            const emailtype = 'E'
            const url =  'http://phixotech.com/igoepp/public/api/auth/customer/custalertsetups'
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": emailtype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }else{
            // call the remove customer alert
            const emailtype = 'E'
            const url = 'http://phixotech.com/igoepp/public/api/auth/customer/removecustalertsetups'
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": emailtype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
            
        }

        setIsEmailEnabled(previousState => !previousState)
    }

    const toggleSMSSwitch = async() => {
        if(isSmsEnabled){
            setSMSText('Inactive')
        } else{
            setSMSText('Active')
        }

        if(isSmsEnabled === false){
            // call the set customer alert
            const smstype = 'S'
            const url =  'http://phixotech.com/igoepp/public/api/auth/customer/custalertsetups'
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": smstype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error.data)
            })
            // console.log('S')
        }else{
            // call the remove customer alert
            const smstype = 'S'
            const url = 'http://phixotech.com/igoepp/public/api/auth/customer/removecustalertsetups'
            console.log(smstype)
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": smstype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error.data)
            })
        }

        setIsSMSEnabled(previousState => !previousState)
    }

    const togglePopupSwitch = async () => {
        if(isPopupEnabled){
            setPopupText('Inactive')
        } else{
            setPopupText('Active')
        }

        if(isPopupEnabled === false){
            // call the set customer alert
            const popuptype = 'P'
            console.log(popuptype)
            const url =  'http://phixotech.com/igoepp/public/api/auth/customer/custalertsetups'
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": popuptype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error.data)
            })
        }else{
            // call the remove customer alert
            const popuptype = 'P'
            console.log(popuptype)
            const url = 'http://phixotech.com/igoepp/public/api/auth/customer/removecustalertsetups'
            await axios.post(url, {
                "customer_id": authCtx.customerId,
                "event_type": 'EA',
                "alert_type": popuptype,
            }, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res)=>{
                console.log(res.data)
            }).catch((error) => {
                console.log(error.data)
            })
        }
        // console.log(isPopupEnabled)
        setIsPopupEnabled(previousState => !previousState)
    }



    

    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
      
      })
   
      
      if(!fontloaded || isFetching){
      return <LoadingOverlay/>
      }
  return (
    <SafeAreaView style={styles.mainContainer}>
    <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.requestText}>Notification Settings</Text>

      <View style={{ padding:30, justifyContent:'center', marginTop: '5%' }}>
      <Text style={{ fontSize: FontSize.size_3xl, fontFamily: 'poppinsRegular' }}>Set Notification By Type</Text>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
            <Text style={styles.text}>Email</Text>

            <Text>{emailtext}</Text>
            <Switch
                trackColor={{ false: 'grey', true: 'green' }}
                thumbColor={'white'}
                ios_backgroundColor={'white'}
                onValueChange={toggleEmailSwitch}
                value={isEmailEnabled}
            />
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
            <Text style={styles.text}>SMS</Text>

            <Text>{smstext}</Text>
            <Switch
                trackColor={{ false: 'grey', true: 'green' }}
                thumbColor={'white'}
                ios_backgroundColor={'white'}
                onValueChange={toggleSMSSwitch}
                value={isSmsEnabled}
            />
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
            <Text style={styles.text}>Pop Ups</Text>

            <Text>{popuptext}</Text>
            <Switch
                trackColor={{ false: 'grey', true: 'green' }}
                thumbColor={'white'}
                ios_backgroundColor={'white'}
                onValueChange={togglePopupSwitch}
                value={isPopupEnabled}
            />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default NotifictionSettings

const styles = StyleSheet.create({
    requestText:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_7xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
    },
    mainContainer:{
        flex: 1,
        marginHorizontal: 8,
       marginTop: "18%"
    },
    text:{
        fontFamily: 'poppinsBold',
        fontSize: FontSize.size_3xl,
        color: Color.darkolivegreen_100
    }
})