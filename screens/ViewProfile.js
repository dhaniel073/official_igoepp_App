import { Image, ImageBackground,Share, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { customerInfocheck } from "../util/auth";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
// import * as Sharing from 'expo-sharing';


function ViewProfile ({route}){
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    

    // let somedat = route.params.fetchedMessage
    console.log(route?.params)
    const [fetchedMessage, setFetchedMesssage] = useState('')
    const [fetcheddata, setFetcheddata] = useState('')
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        navigation.addListener( 'state', async() => {
            setIsLoading(true)
            await customerInfocheck(authCtx.customerId, authCtx.token)
            .then((res) => {
              // console.log(res.data.data)
              setFetchedMesssage(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
            setIsLoading(false)
        })
        
    },[authCtx.customerId, authCtx.token])
  
    // useEffect(() => {
  
    //   async function UserInfo(){
    //     setIsLoading(true)
    //     try{
    //       await customerInfocheck(authCtx.customerId, authCtx.token)
    //       .then((res) => {
    //         console.log(res.data.data)
    //         setFetchedMesssage(res.data.data)
    //         // setFetcheddata(data)
    //       })  
    //     }catch(error){
    //       console.log(error.response)
    //     }
    //     setIsLoading(false)
    //   }
    //   UserInfo()
    // },[]) 
  
    const Country = fetchedMessage.Country
    const State = fetchedMessage.State
    const Lga = fetchedMessage.lga

    const COUNTRY_STATE_CITY =  Country + " " + State + " " + Lga 
    // useEffect(() => {

    //     async function fetchData(){
    //         try{
    //             setIsLoading(true)
    //             let user= route?.params?.fetchedMessage
    //             setData(user)
    //             setIsLoading(false)
    //         }catch(error){
    //             alert("Something went wrong")        
    //             setIsLoading(false)
    //         }
    //     }
        
    //     fetchData()



    // }, [setData])


    function imageCheck(){
        if(fetchedMessage.picture === null){
            return (
                <TouchableOpacity onPress={() => (navigation.navigate('ImageViewer', {
                    image: fetchedMessage.picture,
                }
                ))}>
                    <Image style={{ width: 80, height: 80, borderWidth:1, borderColor: Color.darkolivegreen_100, borderRadius: 50 }} source={require("../assets/vectors/person.png")}/>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity  onPress={() => (navigation.navigate('ImageViewer', {
                    image: fetchedMessage.picture }))}
                >
                    <Image style={{ width: 80, height: 80, borderWidth:1, borderColor: Color.darkolivegreen_100, borderRadius: 50 }} size={80} source={{ uri: `https://phixotech.com/igoepp/public/customers/${fetchedMessage.picture}`}}/>
                </TouchableOpacity>
                )
        }
    }

    console.log(authCtx.request)
    function sexCheck(){
        if(fetchedMessage.sex === 'M'){
            return <Text style={styles.dataitem}>Male</Text>
        }else if(data.sex === 'F'){
            return <Text style={styles.dataitem}>Female</Text>
        }else{
            return <Text style={styles.dataitem}>Null Sex</Text>
        }
    }
          
    const [fontloaded] =  useFonts({
    'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../assets/font/Poppins_bold.ttf")
  
  })

  const myCustomerShare = async () => {
    const shareOptions = {
        message: 'This is a test message',
        
    }

    try{
        // const share = await Sharing.isAvailableAsync(shareOptions)
        const share = await Share.share({
            message: ('Igoepp Official mobile app')
        })
        if(share.action === Share.sharedAction){
            if(share.activityType){
                console.log('Share with activity type of: ', share.activityType)
            }else{
                console.log('shared')
            }
        }else if(share.action === Share.dismissedAction){
            console.log('dismissed')
        }
        console.log(share)
    }catch(error){
        console.log(error)
    }
  }
  
  if(!fontloaded || isLoading){
    return <LoadingOverlay/>
  }


//   console.log(authCtx.request)




    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection:'row', marginTop: 15 }}>
                        {imageCheck()}

                        <View style={{ marginLeft: 20  }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Title style={[styles.title , {marginTop: 15, marginBottom: 5}]}>{fetchedMessage.first_name}</Title>
                                <Title style={[styles.title , {marginTop: 15, margin: 5}]}> {fetchedMessage.last_name}</Title>
                            </View>
                            <Caption style={styles.caption}>{data.email}</Caption>
                        </View>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Ionicons name="location" color="#777777" size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>{fetchedMessage.Country} {fetchedMessage.State} {fetchedMessage.lga}</Text>
                        

                    </View>

                     <View style={styles.row}>
                        <Ionicons name="call" color="#777777" size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>{fetchedMessage.phone}</Text>
                    </View>

                    <View style={styles.row}>
                        <Ionicons name="mail" color="#777777" size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>{fetchedMessage.email}</Text>
                    </View>

                    {/*<View style={styles.row}>
                        <Ionicons name="location" color={"#777777"} size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>Nigeria Lagos</Text>
    </View>*/}

                </View>

                <View style={styles.inforBoxWrapper}>
                    <View style={[styles.infoBox, {borderRightColor: "#dddddd", borderRightWidth: 1}]}>
                        <View style={{ flexDirection:'row' }}>
                            <Image source={require("../assets/vectors/group2.png")} style={{ width:18, height:18, marginRight: 3, top: 8 }}/>
                            <Title>{fetchedMessage.wallet_balance === null ? 0 : fetchedMessage.wallet_balance}</Title>
                        </View>
                        <Caption>Wallet balance</Caption>
                    </View>

                    <View style={styles.infoBox}>

                        <Title>{authCtx.request}</Title>
                        <Caption>Requests Made</Caption>
                    </View>
                </View>

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Ionicons name="heart-outline" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Your Favorites</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => navigation.navigate('Payment')}>
                        <View style={styles.menuItem}>
                            <Ionicons name="card-outline" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Payments</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple onPress={myCustomerShare }>
                        <View style={styles.menuItem}>
                            <Ionicons name="share-outline" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Tell Your Friends</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Ionicons name="man" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Support</Text>
                        </View>
                    </TouchableRipple>

                    
                </View>
            </SafeAreaView>
        )
}

export default ViewProfile;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // marginTop: "15%"
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'poppinsRegular'
    },
    caption:{
        fontSize: 14,
        // lineHeight: 14,
        fontWeight: 500,
        fontFamily: 'poppinsRegular',

    },
    row:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    inforBoxWrapper:{
        borderBottom: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: "#dddddd",
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper:{
        marginTop: 20
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    }
    
})