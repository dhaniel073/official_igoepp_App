import React, { useContext, useEffect, useState } from "react";
import {View, StyleSheet, Image} from 'react-native'
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Caption, Drawer, Paragraph, Title, Text, TouchableRipple, Switch } from "react-native-paper";
import { AuthContext } from "../store/auth-context";
import { useFonts } from "expo-font";
import { customerInfocheck } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { FontSize } from "../components/ui/GlobalStyles";


function DrawerContent({...props}){
    const authCtx = useContext(AuthContext)
    const [fetchedMessage, setFetchedMesssage] = useState('');
    const [isLoading, setIsLoading] = useState(false)


  const token = authCtx.token;
  const customerId = authCtx.customerId
//   const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {

  async function UserInfo(){
    setIsLoading(true)
    try{
      await customerInfocheck(authCtx.customerId, authCtx.token)
      .then((res) => {
        console.log(res.data.data)
        setFetchedMesssage(res.data.data)
      })  
    }catch(error){
      console.log(error.response)
    }
    setIsLoading(false)
  }
  UserInfo()
},[])

    function imageCheck(){
      if(fetchedMessage.picture === null){
        return <Image style={styles.imageIcon} source={require("../assets/vectors/person.png")}/>
      }else{
        return <Image style={styles.imageIcon} source={{ uri:`https://phixotech.com/igoepp/public/customers/${fetchedMessage.picture}` }}/>
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



  if(isLoading){
    return <LoadingOverlay/>
  }  

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <Drawer.Section>

                    <View style={[styles.userInfoSection, {paddingLeft: 20}]}>
                        <View style={{ marginTop: 15 }}>
                            {imageCheck()}
                        </View>
                        <View>
                            <Title style={styles.Title}>{[fetchedMessage.first_name, " ", fetchedMessage.last_name]}</Title>
                            <Caption style={styles.caption}>{fetchedMessage.email}</Caption>
                        </View>
                    </View>
                    </Drawer.Section>

                    
                        <Drawer.Section style={{ flex:1, marginTop: 15 }}>
                            <DrawerItem 
                                label={"Home"} 

                                onPress={() => {
                                    props.navigation.navigate('Welcome')
                                }}
                            />
                            <DrawerItem 
                                label={"Payment"} 
                                onPress={() => {
                                props.navigation.navigate('Drawer Payment')}
                            }/>
                            <DrawerItem 
                                label={"Service"} 
                                onPress={() => {props.navigation.navigate('Drawer Service')}
                                
                            }/>
                            <DrawerItem 
                                label={"Requests"}  
                                onPress={() => {props.navigation.navigate('Requests')}
                            }/>
                            <DrawerItem     
                                label={"Market Place"} 
                                onPress={() => {props.navigation.navigate('MarketPlace')}
                            }/>
                            <DrawerItem 
                                label={"Terms And Conditions"} 
                                onPress={() => {props.navigation.navigate('TermsAndConditions')}
                            }/>

                        </Drawer.Section>
                        
                </View>
            </DrawerContentScrollView>
                        {/*Logout*/}
            <Drawer.Section>
                <Drawer.Item label="Sign Out" onPress={authCtx.logout}/>
            </Drawer.Section>
        </View>
    )
}

export default DrawerContent;

const styles = StyleSheet.create({
    imageIcon:{
        width:120,
        height: 120,
        borderRadius: 500
      },
    Title:{
        // marginTop: 50,
        fontFamily: 'poppinsBold'
    },
    caption: {
        fontFamily: 'poppinsSemiBold',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8
    },
    paragraph:{
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection:{
        margin: 25
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderTopColor: '#f4f4f4'
    },
    preference:{
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    drawerContent:{
    }
})