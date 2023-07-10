import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Input from "../components/Auth/Input";
import { useState } from "react";
import Button from "../components/ui/Button";
import FlatButton from "../components/ui/FlatButton";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../components/ui/GlobalStyles";
import { ForgotCustomerPassword } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";

function ForgotPassword(){

    const [emailEntered, setEmailEntered] = useState('')
    const navigation = useNavigation()
    const [loading, setIsLoading] = useState(false)

    const [fontloaded] = useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf")
    })

    if(!fontloaded){
        return <LoadingOverlay/>
    }


    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
          case 'email':
            setEmailEntered(enteredValue);
            break;
        }
    }

    async function submitHandler(){
        setIsLoading(true)
        const emailIsValid = emailEntered.includes('@')
        if(emailIsValid){
            try {
                const response = await ForgotCustomerPassword(emailEntered)
                console.log(response.data)
                navigation.navigate("Login")    
            } catch (error) {
                console.log(error.response.data.message)
                Alert.alert("Wrong Email Entered", error.response.data.message)

            }
            
        }else{
            Alert.alert("Invalid Email", "Please enter a valid email")
        }
        setIsLoading(false)
    }

    if(loading){
        return <LoadingOverlay message={"..."}/>
    }


    return (
        <ScrollView style={styles.authContent}>
            <Text style={styles.Title}>Forget Password</Text>

            <Input
            placeholder="Enter Email"
            onUpdateValue={updateInputValueHandler.bind(this, 'email')}
            value={emailEntered}
            />

            <View style={styles.buttons}>
                <Button onPress={submitHandler}>
                    Submit
                </Button>

                <View style={styles.space}></View>
                <FlatButton onPress={() => navigation.navigate('Login')}>
                    Login Instead
                </FlatButton>
            </View>
        </ScrollView>
    )
}

export default ForgotPassword; 

const styles = StyleSheet.create({
    authContent: {
        flex: 1,
        marginTop: "50%",
        marginHorizontal: 25,
        padding: 16,
        borderRadius: 8,
        // alignItems: 'center'
      },
      buttons: {
        marginTop: 25,
      },
      Title:{
        marginTop: 30, 
        marginBottom: 50,
        // marginHorizontal: 50,
        fontSize: 30,
        // fontWeight: 'bold',
        color: Color.lightgreen,
        fontFamily: 'poppinsMedium'
      },
      space:{
        marginTop: 10
      },
})