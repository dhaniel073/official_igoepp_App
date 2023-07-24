import { Image, ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { customerInfocheck } from "../util/auth";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";
import { Avatar, Caption, Title, TouchableRipple } from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";


function ViewProfile({route}){
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    

    console.log(route?.params)
    useEffect(() => {

        async function fetchData(){
            try{
                setIsLoading(true)
                let user= route?.params?.fetchedMessage
                setData(user)
                setIsLoading(false)
            }catch(error){
                alert("Something went wrong")        
                setIsLoading(false)
            }
        }
        
        fetchData()



    }, [setData])


    function imageCheck(){
        if(data.picture === null){
            return (
                <Pressable style={({pressed}) => [pressed && styles.pressed]} onPress={() => (navigation.navigate('ImageViewer', {
                    image: data.picture
                }
                ))}>
                    <Avatar.Image style={styles.Image} source={require("../assets/vectors/person.png")}/>
                </Pressable>
            )
        }else{
            return (
                <Pressable style={({pressed}) => [pressed && styles.pressed]} onPress={() => (navigation.navigate('ImageViewer', {
                    image: data.picture }))}
                >
                    <Avatar.Image style={styles.Image} size={80} source={{ uri: `https://phixotech.com/igoepp/public/customers/${data.picture}`}}/>
                </Pressable>
                )
        }
    }

    function sexCheck(){
        if(data.sex === 'M'){
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
  
  if(!fontloaded){
    return <LoadingOverlay/>
  }







    return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection:'row', marginTop: 15 }}>
                        {imageCheck()}

                        <View style={{ marginLeft: 20  }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Title style={[styles.title , {marginTop: 15, marginBottom: 5}]}>{data.first_name}</Title>
                                <Title style={[styles.title , {marginTop: 15, margin: 5}]}> {data.last_name}</Title>
                            </View>
                            <Caption style={styles.caption}>{data.email}</Caption>
                        </View>
                    </View>
                </View>
                
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Ionicons name="location" color={"#777777"} size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>Nigeria Lagos</Text>
                    </View>

                     <View style={styles.row}>
                        <Ionicons name="call" color={"#777777"} size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>{data.phone}</Text>
                    </View>

                    <View style={styles.row}>
                        <Ionicons name="mail" color={"#777777"} size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>{data.email}</Text>
                    </View>

                    {/*<View style={styles.row}>
                        <Ionicons name="location" color={"#777777"} size={20}/>
                        <Text style=    {{ color: '#777777', marginLeft: 20 }}>Nigeria Lagos</Text>
    </View>*/}

                </View>

                <View style={styles.inforBoxWrapper}>
                    <View style={[styles.infoBox, {borderRightColor: "#dddddd", borderRightWidth: 1}]}>
                        <View style={{ flexDirection:'row' }}>
                            <Image source={require("../assets/vectors/group2.png")} style={{ width:18, height:18 }}/>
                            <Title>{data.wallet_balance.toLocaleString()}</Title>
                        </View>
                        <Caption>Wallet balance</Caption>
                    </View>

                    <View style={styles.infoBox}>
                        <Title>{data.wallet_balance.toLocaleString()}</Title>
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

                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Ionicons name="card-outline" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Payments</Text>
                        </View>
                    </TouchableRipple>

                    <TouchableRipple onPress={() => {}}>
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

                    <TouchableRipple onPress={() => {}}>
                        <View style={styles.menuItem}>
                            <Ionicons name="settings-outline" size={25} color={Color.limegreen}/>
                            <Text style={styles.menuItemText}>Settings</Text>
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