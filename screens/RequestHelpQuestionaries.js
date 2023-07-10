import { useFonts } from "expo-font";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input"
import { useState } from "react";


function RequestHelpQuestionaries({route, navigation}){
    const catId = route.params.catId
    // console.log(catId)

    const [addressfield, setAddressField] = useState('')
    const [datefield, setDateField] = useState('')
    const [descriptionfield, setDescritionField] = useState('')

  function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType){
            case 'address':
                setAddressField(enteredValue);
                break;
            
            case 'date' :
                setDateField(enteredValue);
                break;

            case 'description' :
                setDescritionField(enteredValue);
                break;

            // break;
        }

    }

    const SubmitInformationHandler = () => {
        if(!addressfield || !datefield || !descriptionfield){
            Alert.alert("Invalid Inputs", "Check Values and try again")
        }else{
        console.log(addressfield, datefield, descriptionfield)

        }
    }

    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppingMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf")
    })
    
    
      if (!fontloaded) {
        return <LoadingOverlay/>
      }

    return (
      <ScrollView style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}
      
    >
        <View style={styles.container}>
            <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]} onPress={() => navigation.goBack()}>
            <Image
                style={styles.image}
                contentFit="cover"
                source={require("../assets/vectors/vector30.png")}
                
            />
            <Text style={styles.back}>Back</Text>
            </Pressable>

            <Text style={styles.enterinformation}> Enter Information</Text>
            <View style={styles.inputContainer}>
            <Input
                style={styles.address}
                value={addressfield}
                onUpdateValue={updateInputValueHandler.bind(this, 'address')}
                placeholder ={"Enter Address For Service"}
            />

            <Input
                style={styles.date}
                value={datefield}
                onUpdateValue={updateInputValueHandler.bind(this, 'date')}
                placeholder={"DD/MM/YY (For service Required)"}
                maxLength={10}
            />

            <Input
                placeholder={"Kindly state instructions here for your service provider"}
                value={descriptionfield}
                onUpdateValue={updateInputValueHandler.bind(this, 'description')}
                multiline={true}
                style={styles.description}
            />

            <Button onPress={SubmitInformationHandler} style={styles.button}>Place Request</Button>
            </View>

        </View>
        </ScrollView>

    )
}

export default RequestHelpQuestionaries;

const styles = StyleSheet.create({
    mainContainer:{
        marginTop: "18%" 
    },
    enterinformation:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
    },
    container:{
        // marginTop: "18%",
        marginHorizontal: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1
        },
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
    },
    backParent:{
        flexDirection: 'row',
    },
    image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30,
    },
    button:{
        backgroundColor: Color.limegreen,
        fontFamily: 'poppinsSemiBold',
        fontWeight: "700",
        marginTop: 50
    },
    address:{
        marginTop: 30,
        borderBottomWidth: 1,
    },
    date:{
        marginTop: 20,
        borderBottomWidth: 1,

    },
    description:{
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 6,
        height: 200,
        // marginHorizontal: 10
    },
    inputContainer:{
        marginHorizontal: 10,
        // marginBottom: 50
    },
})