import { Image, Pressable, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, ScrollView, Linking, Alert } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { sendEmail } from "../components/ui/Sendmail";



const feedbackfield = [
    { label: 'Whats your expereince while using the app', value: 'Whats your expereince while using the app' },
    { label: 'Thoughts concerning the app', value: 'What are your thoughts concerning the app' },
    { label: 'How can we improve the app', value: 'How can we improve the application' },

    // { label: ' Browse through the system', value: 'Browse through the system' },
]



function FeedBack(){
    const navigation = useNavigation()
    const [feedback, setfeedback] = useState('')
    const [feedbackfocus, setfeedbackfocus] = useState('')
    const [feedbackdetails, setFeedBackDetails] = useState('')



    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case'setFeedback':
                setFeedBackDetails(enteredValue)
            break;
        }
    }
  
      
    //   if(!fontloaded){
    //     return <LoadingOverlay message={"..."}/>
    //   }

    const openEmail = async () => {
        if(!feedback){
            Alert.alert('No feedback message', 'Select a feedback message eto continue')
        }else if(!feedbackdetails){
            Alert.alert('Message empty', 'Write a feedback complain to continue')
        }else{
            console.log(feedback, feedbackdetails)
            // Linking.openURL(`mailto: danielchinedu766@gmail.com, subject: ${feedback}, body: ${feedbackdetails}`)
            const mailres = await sendEmail('danielchinedu766@gmail.com', feedback, feedbackdetails, 'cc')
            navigation.goBack()
            setFeedBackDetails(null)
            setfeedback(null)
            
        }

        
    }

    // export async function sendEmail(to, subject, body, options = {}) {
        


    return (
        <ScrollView style={styles.mainContainer}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>


            <Text style={styles.feedbacktext}>FeedBack</Text>



            <View style={{ marginHorizontal: 10, marginTop: '8%' }}>
                <Text style={{ fontSize: 18, fontFamily: 'poppinsSemiBold' }}>Whats Your Feedback</Text>
                    <Dropdown
                        style={[styles.dropdown, feedbackfocus && { borderColor: 'blue' }]}
                        placeholderStyle={[styles.placeholderStyle,{fontFamily: 'poppinsRegular'}]}
                        selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
                        inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
                        iconStyle={styles.iconStyle}
                        data={feedbackfield}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!feedbackfocus ? 'Select Message' : '...'}
                        searchPlaceholder="Search..."
                        value={feedback}
                        onFocus={() => setfeedbackfocus(true)}
                        onBlur={() => setfeedbackfocus(false)}
                        onChange={item => {
                        setfeedback(item.value);
                        setfeedbackfocus(false);
                        }}
                        renderLeftIcon={() => (
                            <MaterialIcons name="feedback" size={24} color="black" />
                        )}
                    />


                    <TextInput
                        style={styles.textInput}
                        numberOfLines={10}
                        
                        multiline={true}
                        editable={true}
                        value={feedbackdetails}
                        placeholder="Type Message Here"
                        placeholderTextColor='grey'
                        onChangeText={updateInputValueHandler.bind(this, 'setFeedback')}

                    />




                    <TouchableOpacity style={styles.commandButton} onPress={() => openEmail()}>
                            <View style={{ flexDirection:'row' }}>
                            <Text style={styles.panelBottomTitle}>Send Message</Text>
                            <FontAwesome name="send" size={24} color={Color.white} />
                            </View>

                    </TouchableOpacity>

                
            </View>

        </ScrollView>
    )
}

export default FeedBack;

const styles = StyleSheet.create({

    panelBottomTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginRight:5
    },
    commandButton:{
        padding: 15,
        borderRadius: 10,
        // backgroundColor: '#FF6347',
        // backgroundColor: Color.darkolivegreen_100,
        backgroundColor: Color.limegreen,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    
        },
    textInput:{
        borderColor: 'grey',
        borderWidth: 1,
        padding:10,
        borderRadius: 10,
        marginBottom: '8%',
        fontSize: 18,
        fontFamily: 'poppinsSemiBold'
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: 8,
        marginBottom: '10%'
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    placeholderStyle: {
    fontSize: 16,
    },
    backParent:{
        flexDirection: 'row',
    },
    mainContainer:{
        flex: 1,
        marginHorizontal: 8,
        marginTop: "15%"
    },
    image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30
    },
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
    },
    feedbacktext:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
        // marginBottom: 10
    },
    pressed:{
        opacity: 0.75
    }
})