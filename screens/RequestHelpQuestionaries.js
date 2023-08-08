import { isLoaded, useFonts } from "expo-font";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input"
import { useContext, useEffect, useState } from "react";
import { MakeRequest, ShowSubCatQuestion, SubcategoryQuestionStore } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";


function RequestHelpQuestionaries({route}){
    const sub_category_id = route.params.sub_category_id
    const category_id = route.params.category_id
    // console.log(route.params)
    
    const authCtx = useContext(AuthContext)
    const token = authCtx.token

    const customerId = route.params.customer_id
    const time = route.params.help_time
    const date = route.params.help_date
    const frequency = route.params.help_frequency
    const description = route.params.help_desc
    const help_size = route.params.help_size
    const interest = route.params.help_interest
    const addressfield = route.params.help_location
    const landmark = route.params.help_landmark
    const countryName = route.params.help_country
    const stateName = route.params.help_state
    const cityName = route.params.help_lga
    const vehiclerequest = route.params.vehicle_req



    const [fetchedquestion, setFetchedQuestion] = useState('')
    const [isLoading, setIsLoading] = useState(true)
        // const [addressfield, setAddressField] = useState('')
    // const [datefield, setDateField] = useState('')
    const [answerfield, setDescritionField] = useState('')
    const navigation = useNavigation()

    // console.log(route.params.help_date)

    
    useEffect(() => {
        async function subcatquestion(){
            try {
                setIsLoading(true)
            const url = `https://phixotech.com/igoepp/public/api/auth/category/subcategoryquestionshow/${sub_category_id}`
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${authCtx.token}`
                }
            })
                // console.log(res.data.data)
                setFetchedQuestion(res.data.data)
                // return res.data
            } catch (error) {
                Alert.alert("Error", error.response)
            }
            
        }
            subcatquestion()
            setIsLoading(false)
        }, [])



  function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType){

            case 'answerfield' :
                setDescritionField(enteredValue);
                break;

            // break;
        }

    }

 
    async function SubmitInformationHandler(){
        const question_type = fetchedquestion.question_type
        
        const data = {
            "customer_id": authCtx.customerId,
            "help_interest": interest,
            "help_location": addressfield,
            "help_country": countryName,
            "help_state": stateName,
            "help_lga": cityName,
            "help_landmark": landmark,
            "help_size": help_size,
            "vehicle_req": vehiclerequest,
            "help_desc": description,
            "category_id": category_id,
            "sub_category_id": sub_category_id,
            // "help_date": date,
            "help_time": time,
            "help_frequency": frequency
        }
        
        // const response = await fetch('http://phixotech.com/igoepp/public/api/auth/hrequest/store', {
        //     method: "POST", 
        //     mode: "cors",
        //     cache: "no-cache", 
        //     credentials: "same-origin", 
        //     headers: {
        //       "Accept": "application/json",
        //       'Authorizatione': `Bearer ${authCtx.token}`,
        //     },
        //     redirect: "follow", // manual, *follow, error
        //     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        //     body: JSON.stringify(data), // body data type must match "Content-Type" header
        //   });
        //   return response.json(); // parses JSON response into native JavaScript objects
        // }
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
      <View style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}>

      {isLoading ? <LoadingOverlay/> :
        <View style={styles.container}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>


            <Text style={styles.enterinformation}> Enter Information</Text>
            <View style={styles.inputContainer}>

            {/*<Text style={[styles.label, styles.labelInvalid]}>
                Address for Service :
            </Text>
            <Input
                style={styles.address}
                value={addressfield}
                onUpdateValue={updateInputValueHandler.bind(this, 'address')}
                placeholder ={"Enter Address For Service"}
            />

            <Text style={[styles.label, styles.labelInvalid]}>
                Date for Service :
            </Text>
            <Input
                style={styles.date}
                value={datefield}
                keyboardType={'numeric'}
                onUpdateValue={updateInputValueHandler.bind(this, 'date')}
                placeholder={"DD/MM/YY (For service Required)"}
                maxLength={10}
      />*/}

            <Text style={[styles.label, styles.labelInvalid]}>
                {fetchedquestion.sub_cat_question} :
            </Text>
            <Input
                placeholder={"Answer the question above"}
                value={answerfield}
                onUpdateValue={updateInputValueHandler.bind(this, 'answerfield')}
                multiline={true}
                // style={styles.description}
            />
            <Button onPress={SubmitInformationHandler} style={styles.button}>Place Request</Button>
            </View>

            </View>
        }
        </View>

    )
}

export default RequestHelpQuestionaries;

const styles = StyleSheet.create({
    label: {
        color: 'black',
        marginBottom: 2,
        fontSize: 16,
        fontFamily: 'poppinsMedium',
        marginTop: 10
      },
    mainContainer:{
        marginTop: "15%" 
    },
    enterinformation:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
    },
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
      },
    container:{
        // marginTop: "18%",
        marginHorizontal: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1
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
        // marginTop: 30,
        borderBottomWidth: 1,
    },
    date:{
        // marginTop: 20,
        borderBottomWidth: 1,

    },
    description:{
        // marginTop: 5,
        borderWidth: 1,
        borderRadius: 6,
        // height: 100,
        // marginHorizontal: 10
    },
    inputContainer:{
        marginHorizontal: 10,
        // marginBottom: 50
    },
})