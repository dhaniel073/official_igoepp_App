import { Image, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { customerInfocheck } from "../util/auth";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";


function ViewProfile({route}){
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation()
    

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
                    <Image style={styles.Image} source={require("../assets/vectors/person.png")}/>
                </Pressable>
            )
        }else{
            return (
                <Pressable style={({pressed}) => [pressed && styles.pressed]} onPress={(navigation.navigate('ImageViewer', {
                    image: data.picture }))}
                >
                    <Image style={styles.Image} source={{ uri: `https://phixotech.com/igoepp/public/customers/${data.picture}`}}/>
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
  







    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing}/>
            }
        >
        <Pressable onPress={() => navigation.goBack()}>
            <Image style={styles.image2} source={require("../assets/vectors/vector35.png")}/>
            <Text style={styles.back}>Back</Text>
        </Pressable>
        <View style={styles.mainContainer}>
        {!fontloaded || isLoading ? <LoadingOverlay/> :
            <View style={styles.container}>
            <View style={styles.imageView}>
               <Pressable>
                {imageCheck()}
               </Pressable>
            </View>
                <View style={styles.names}>
                    <Text style={styles.label}>First Name: </Text> 
                    <Text style={styles.dataitem}>{data.first_name}</Text>
                </View>

                <View style={styles.names}>
                    <Text style={styles.label}>Last Name: </Text> 
                    <Text style={styles.dataitem}>{data.last_name}</Text>
                </View>
                
                <View style={styles.names}>
                    <Text style={styles.label}>Email: </Text> 
                    <Text style={styles.dataitem}>{data.email}</Text>
                </View>

                <View style={styles.names}>
                    <Text style={styles.label}>Phone: </Text> 
                    <Text style={styles.dataitem}>{data.phone}</Text>
                </View>
                
                <View style={styles.names}>
                <Text style={styles.label}>Sex: </Text>
                {sexCheck()}
                </View>

                
            </View>
        
        }
            </View>
        </ScrollView>
    )
}

export default ViewProfile;

const styles = StyleSheet.create({
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
    },
    image2:{
        width: 15,
        height: 15,
        marginHorizontal: 15,
        // marginTop: 3,
        marginTop: "10%"
      },
    pressed:{
        opacity: 0.45
    },
    container:{
        justifyContent: 'center',
        // alignItems: 'flex-start'
    },
    mainContainer:{
        marginHorizontal: "10%",
        marginTop: 40,
    },
    Image:{
        borderRadius: 500,
        borderColor: Color.lightgreen,
        borderWidth: 2,
        width: 200, 
        height: 200,
        marginBottom: 20
    },
    imageView:{
        
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 30
    },
    names:{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    label:{
        fontSize: 18,
        fontFamily: 'poppinsRegular',
        color: Color.darkolivegreen_100
    },
    dataitem:{
        fontSize: 18,
        fontFamily: 'poppinsSemiBold',
        // marginTop: 3,
    },
    
})