import { StyleSheet, Text, TextInput, View } from "react-native";
import GoBack from "../components/ui/GoBack";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import { useContext, useEffect, useState } from "react";
import { CancelRequests } from "../util/auth";
import { AuthContext } from "../store/auth-context";

function CancelRequest({route, navigation}){
    const authCtx = useContext(AuthContext)
    const id = route.params.id;
    const [reason, setReason] = useState('')
    const [IsLoading, setIsLoading] = useState(true)


    function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType){
            case 'reason' :
                setReason(enteredValue)
                break;
        }
    }
    const SubmitHandle = async () => {
        console.log(reason)
        setIsLoading(true)
        try {
            const response = await CancelRequests(id, authCtx.token, reason)
            console.log(response)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
  
    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
      
      })
      
      if(!fontloaded || IsLoading){
        return <LoadingOverlay message={"..."}/>
      }

    console.log(route.params)
    return (
        <View style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

            <Text style={styles.cancelRequestText}>Cancel Request</Text>


            <View style={styles.container}>
            <Text style={styles.label}>Reason For Cancellation</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                placeholder="Reason for Cancellation of Request"
                value={reason}
                onChangeText={updateInputValueHandler.bind(this, 'reason')}

            />

            <Button onPress={SubmitHandle} style={styles.button}>Submit</Button>
            </View>

        </View>
    )
}

export default CancelRequest;

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        marginTop: "15%"
    },
    cancelRequestText:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
        // marginBottom: 10
    },
    input:{
        paddingVertical: 10,
        paddingHorizontal: 2,
        // backgroundColor: Colors.primary100,
        // borderBottomColor: Color.lightgreen,
        borderColor: Color.lightgreen,
        borderWidth: 1,
        fontFamily: 'poppinsRegular',
        // borderRadius: 4,
        fontSize: 18,
        lineHeight: 20
    },
    label: {
        color: 'black',
        marginBottom: 2,
        fontSize: 16,
        fontFamily: 'poppinsMedium'
    },
    container:{
        marginHorizontal: 20
    },
    button:{
        marginTop: 20
    }

})