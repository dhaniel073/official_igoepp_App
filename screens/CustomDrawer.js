import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity } from "react-native";
import { Color } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import {Ionicons} from '@expo/vector-icons'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Icon from "react-native-ionicons";
import { AuthContext } from "../store/auth-context";

const CustomDrawer = (props) => {
    const authCtx = useContext(AuthContext)
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
                contentContainerStyle={{ backgroundColor: Color.limegreen }}
            >
                <ImageBackground source={require("../assets/vectors/backgroundImage.jpeg")} style={{padding: 20}}>
                    <Image source={require("../assets/vectors/person.png")} style={{height:100, width:100, borderRadius:50, marginBottom: 10}}/>
                    <Text style={{ color:'#fff', fontSize: 18, fontFamily:'poppinsMedium'}}>Chinedu Daniel</Text>
                    
                    <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color:'#fff', fontFamily:'poppinsRegular', marginRight: 5}}></Text>
                    <Ionicons name="cash" size={18} color="#fff"/>
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

