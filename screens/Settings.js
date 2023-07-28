import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GoBack from '../components/ui/GoBack'
import { useFonts } from 'expo-font';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons'
import { Image } from 'expo-image';


const Settings = () => {
  const navigation = useNavigation()
  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../assets/font/Poppins_bold.ttf")
  
  })
  
  if(!fontloaded){
  return <LoadingOverlay/>
  }
  return (

    <View style={{ flex:1, marginTop:"20%", marginHorizontal: 20, }}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <SafeAreaView style={{marginTop: 20, justifyContent:'center'}}>
        <Title style={{ fontFamily: 'poppinsBold', fontSize: 28, marginLeft:60  }}>Settings</Title>
      </SafeAreaView>


      <View style={{ marginTop: "20%", padding:15 }}>
          <TouchableOpacity style={{ alignItems: 'flex-start', borderBottomWidth:1,}} onPress={() => navigation.navigate('ViewProfile')}>
              <View style={{ flexDirection: 'row',   paddingBottom: 20 }}>
                  <Ionicons name='person-outline' size={30}/>
                  <Text style={styles.textStyle}>Account</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignItems: 'flex-start', borderBottomWidth:1,}} onPress={() => navigation.navigate("Notification")}>
              <View style={{ flexDirection: 'row',   paddingBottom: 15, marginTop: 15 }}>
                  <Ionicons name='notifications-outline' size={30}/>
                  <Text style={styles.textStyle}>Notification</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignItems: 'flex-start', borderBottomWidth:1,}} onPress={() => {}}>
              <View style={{ flexDirection: 'row',   paddingBottom: 15, marginTop: 15 }}>
                  <Ionicons name='headset' size={30}/>
                  <Text style={styles.textStyle}>Help And Support</Text>
              </View>
          </TouchableOpacity>


          <TouchableOpacity style={{ alignItems: 'flex-start', borderBottomWidth:1,}} onPress={() => {}}>
              <View style={{ flexDirection: 'row',  paddingBottom: 15, marginTop: 15 }}>
                  <Ionicons name='chatbox-ellipses-outline' size={30}/>
                  <Text style={styles.textStyle}>About</Text>
              </View>
          </TouchableOpacity>

          <TouchableOpacity style={{ alignItems: '', justifyContent:'space-between', borderBottomWidth:1, width: '100%'}} onPress={() => navigation.navigate('TermsAndConditions')}>
              <View style={{ flexDirection: 'row',  paddingBottom: 15, marginTop: 15 }}>
                  <Ionicons name='cloud-outline' size={30}/>
                  <Text style={styles.textStyle}>Terms And Condition</Text>
              </View>
                  <Image style={{ width:10, height:18, alignContent: 'flex-end', top: 5, left: 53 }} source={require("../assets/vectors/arrow_head.png")}/>
          </TouchableOpacity>

      </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  textStyle:{
    fontFamily: 'poppinsMedium',
    fontSize: 18,
    marginLeft: 10
  }
})