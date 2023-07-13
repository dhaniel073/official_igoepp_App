import { Image, StyleSheet, Text, View } from "react-native";
import { Color } from "../components/ui/GlobalStyles";
import { customerInfocheck } from "../util/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ViewProfile(){
    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const authCtx = useContext(AuthContext)
    const navigation = useNavigation()

    useEffect(() => {
        async function Infocheck(){
            const token = authCtx.token
            const customerId = authCtx.customerId
            try {
                setIsLoading(true)
                const response = await customerInfocheck(customerId, token)
                setData(response.data.data)
                // console.log(response.data.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }
        Infocheck()
    }, [setData, setIsLoading])

    
    
 

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


    function checkImage(){
        // console.log(`https://phixotech.com/igoepp/public/customers/${data.picture}`)
        if(data.picture === null){
            return (
                <Pressable onPress={() => navigation.navigate('ImageViewer', {
                    ImageUrl: null
                })} style={({pressed}) => pressed && styles.pressed}>
                    <Image style={styles.Image} source={require("../assets/vectors/person.png")}/>
                </Pressable>
                )
        }else if(data.picture !== null){
            return (
                // <Text>Paul</Text>
            <Pressable onPress={() => navigation.navigate('ImageViewer', {
                ImageUrl: data.picture
            })}>
            <Image style={styles.Image} source={{ uri:`https://phixotech.com/igoepp/public/customers/${data.picture}`}}/>
            </Pressable>
            
            )
        }
    }

    function checkSex(){
        if(data.sex === 'M'){
            return <Text style={styles.dataitem}>Male</Text>
        }else if(data.sex === 'F'){
            return <Text style={styles.dataitem}>Female</Text>
        }else{
            return <Text style={styles.dataitem}>No Sex Set</Text>
        }
        // console.log(data.sex)
    }

    

    return (
        <View style={styles.mainContainer}>
        {isLoading ? <LoadingOverlay/> :
            <View style={styles.container}>
            <View style={styles.imageView}>
                {checkImage()}
            </View>
                <View style={styles.names}>
                    <Text style={styles.label}>First Name: </Text> 
                    <Text style={styles.dataitem}> {data.first_name}</Text>
                </View>

                <View style={styles.names}>
                    <Text style={styles.label}>Last Name: </Text> 
                    <Text style={styles.dataitem}> {data.last_name}</Text>
                </View>
                
                <View style={styles.names}>
                    <Text style={styles.label}>Email: </Text> 
                    <Text style={styles.dataitem}> {data.email}</Text>
                </View>

                <View style={styles.names}>
                    <Text style={styles.label}>Phone: </Text> 
                    <Text style={styles.dataitem}> {data.phone}</Text>
                </View>
                
                <View style={styles.names}>
                <Text style={styles.label}>Sex: </Text>
                {checkSex()}
                </View>

                
            </View>
        
        }
   
        </View>
    )
}

export default ViewProfile;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.75
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
        fontFamily: 'poppinsMedium',
        color: Color.darkolivegreen_100
    },
    dataitem:{
        fontSize: 16,
        fontFamily: 'poppinsRegular',
        marginTop: 3,
    },
    
})