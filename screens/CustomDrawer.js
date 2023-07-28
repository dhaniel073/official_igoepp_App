import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Color } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Ionicons} from '@expo/vector-icons'
import { AuthContext } from "../store/auth-context";
import { customerInfocheck } from "../util/auth";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
    const authCtx = useContext(AuthContext)
    const navigation = useNavigation()
    const [fetchedMessage, setFetchedMesssage] = useState('')
    const [fetcheddata, setFetcheddata] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const token = authCtx.token
    const customerId = authCtx.customerId

    useEffect(() => {
      setTimeout( async () => {
        setIsLoading(true)
        try{
          await customerInfocheck(customerId,token)
          .then((res) => {
            // console.log(res.data.data)
            setFetchedMesssage(res.data.data)
            setFetcheddata(data)
          })  
        }catch(error){
          console.log(error.response)
        }
        setIsLoading(false)
      }, 3000)
},[customerId, token]) 
      
          function imageCheck(){
            if(fetchedMessage.picture === null){
              return (
                <View>
                  <Image style={{height:100, width:100, borderRadius:50, marginBottom: 10}} source={require("../assets/vectors/person.png")}/>
                </View>
              )
            }else{
              return (
                  <View>
                    <Image style={{height:100, width:100, borderRadius:50, marginBottom: 10}} source={{ uri:`https://phixotech.com/igoepp/public/customers/${fetchedMessage.picture}` }}/>
                  </View>
              )
            }
        }

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
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}
                contentContainerStyle={{ backgroundColor: Color.limegreen }}>

                <ImageBackground source={require("../assets/vectors/backgroundImage.jpeg")} style={{padding: 20}}>
                    {/*<Image source={require("../assets/vectors/person.png")} />*/}
                    {imageCheck()}
                    <Text style={{ color:'#fff', fontSize: 18, fontFamily:'poppinsMedium'}}>{fetchedMessage.first_name} {fetchedMessage.last_name}</Text>
                    
                    <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color:'#fff', fontFamily:'poppinsRegular', marginRight: 5}}>{fetchedMessage.email}</Text>
                    <Ionicons name="mail" size={18} color="#fff"/>
                    </View>

                </ImageBackground>

                <View style={{ flex:1, backgroundColor: "#fff", paddingTop: 20 }}>
                    <DrawerItemList {...props}/>
                </View>


            </DrawerContentScrollView>
            <View style={{ padding:20, borderTopWidth:1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={authCtx.logout} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ionicons name="exit" size={22} color={Color.darkolivegreen_100}/>
                        <Text style={{ fontSize: 15, fontFamily: 'poppinsSemiBold', marginLeft: 5, color: Color.darkolivegreen_100 }}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomDrawer;

