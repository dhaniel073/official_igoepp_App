import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Color, FontSize } from '../components/ui/GlobalStyles'
import GoBack from '../components/ui/GoBack'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import {useFonts} from 'expo-font'
import CustomSwitch from './CustomSwitch'

const NotifictionSettings = ({navigation}) => {
    const [email, setEmail] = useState()
    const [sms, setSMS] = useState()
    const [popups, setPopups] = useState()

    const [emailtype, setEmailType] = useState('')
    const [smstype, setSMSType] = useState('')
    const [popupstype, setPopupsType] = useState('')

    // console.log(popups, email, sms)

    const [isFetching, setIsFetching] = useState()


    const NotificationSetup = () => {

        if(email === 'true'){
            console.log('e')
        }else if(sms === 'true'){
            setSMSType('S')
        }else if(popups === 'true'){
            setPopupsType('P')
        }

        console.log(emailtype,smstype,popupstype)
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
            <CustomSwitch onPress={() => {NotificationSetup()}} isEnabled={email} toggleSwitch={setEmail}/>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
            <Text style={styles.text}>SMS</Text>
            <CustomSwitch isEnabled={sms} toggleSwitch={setSMS}/>
        </View>

        <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent:'space-between' }}>
            <Text style={styles.text}>Pop Ups</Text>
            <CustomSwitch isEnabled={popups} toggleSwitch={setPopups}/>
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