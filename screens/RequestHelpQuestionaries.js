import { isLoaded, useFonts } from "expo-font";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input"
import { useContext, useEffect, useState } from "react";
import { ShowSubCatQuestion } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


function RequestHelpQuestionaries({route}){
    const subcatId = route.params.subcatId
    const subcatDesc = route.params.subcatDesc
    const subcatName = route.params.subcatName
    const catId = route.params.catId
    const authCtx = useContext(AuthContext)
    const [fetchedquestion, setFetchedQuestion] = useState('')
    const [isLoading, setIsLoading] = useState(true)
        // const [addressfield, setAddressField] = useState('')
    // const [datefield, setDateField] = useState('')
    const [answerfield, setDescritionField] = useState('')
    const navigation = useNavigation()

    console.log(route.params)

    
    useEffect(() => {
        async function subcatquestion(){
            try {
                setIsLoading(true)
            const url = `https://phixotech.com/igoepp/public/api/auth/category/subcategoryquestionshow/${subcatId}`
            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${authCtx.token}`
                }
            })
                console.log(res.data.data)
                setFetchedQuestion(res.data.data)
                // return res.data
            } catch (error) {
                Alert.alert("Error", error.response.message)
            }
            
        }
            subcatquestion()
            setIsLoading(false)
        }, [])



  function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType){
            // case 'address':
            //     setAddressField(enteredValue);
            //     break;
            
            // case 'date' :
            //     setDateField(enteredValue);
            //     break;

            case 'answerfield' :
                setDescritionField(enteredValue);
                break;

            // break;
        }

    }

    const SubmitInformationHandler = async () => {
        if(!answerfield){
            Alert.alert("Invalid Inputs", "Check Values and try again")
        }else{
            console.log(answerfield)
            const url = "http://phixotech.com/igoepp/public/api/auth/category/subcategoryquestionstore"
            try {
                setIsLoading(true)
                const response = await axios.post(url, 
                    {
                        "subcategoryid": subcatId,
                        "categoryid": catId,
                        "sub_cat_question": answerfield,
                        "question_type": fetchedquestion.question_type
                    },
                    {
                        headers: {
                            Accept: 'application/json',                        
                            Authorization: `Bearer ${authCtx.token}`
                        }
                    }
                )
                console.log(response)
                navigation.navigate("Welcome")
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log(error.response)
                Alert.alert("Error", "An error occured")
                setDescritionField('')
                return;
            }
            setIsLoading(true)

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
      <View style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}>

      {isLoading ? <LoadingOverlay/> :
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
        marginTop: "18%" 
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