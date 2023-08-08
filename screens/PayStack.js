import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Alert, ScrollView, TextInput, SafeAreaView, Platform } from "react-native";
// import { TextInput } from "react-native-gesture-handler";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import Input from "../components/Auth/Input";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from "../components/ui/Button";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { PayStackAuth, WalletCheckBalance } from "../util/auth";
import { useFonts } from "expo-font";
import GoBack from "../components/ui/GoBack";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function PayStackScreen(){    
    const paystackWebViewRef = useRef(); 
    // const [fetchedMessage, setFetchedMesssage] = useState('');
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [InputAmount, setInputAmount] = useState('')
    const authCtx = useContext(AuthContext);
    // const [emptyInput, setemptyInput] = useState(true);

    const token = authCtx.token;
    const customerId = authCtx.customerId
    const email = authCtx.email

  
    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'amount':
                setInputAmount(enteredValue);
                break;
        }
    }

    function check(){
        const InputAmountIsValid = InputAmount.length < 1
        if(InputAmountIsValid){
            Alert.alert("Empty Field", "Input an Amount to continue")
        }
    }
    
      function CancleHandler(error){
        setIsLoading(true)
        console.log(error)
        navigation.goBack()
        setIsLoading(true)
      }

      async function SuccessHandler(res){
        setIsLoading(true)
        setInputAmount(null)
        const response = await WalletCheckBalance(customerId, token, InputAmount,)
        // console.log(response.data)
        const walletBalance = (response.data.wallet_balance).toLocaleString()
        authCtx.customerwalletbalance(walletBalance)
        navigation.navigate('Welcome')
        setIsLoading(true)

      }




    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
    
    })
    
    if (!fontloaded || isLoading) {
      return <LoadingOverlay/>
    }
    


    return(

        <ScrollView style={{ flex:1, marginTop: "15%", marginHorizontal:5 }}>

            <GoBack  onPress={() => navigation.goBack()}>Back</GoBack>

            <View style={styles.container}>
            <Text style={styles.text}>How Much would you like to fund with</Text>


            <View style={styles.amountInputholder}>
           {/* <Image
            style={styles.nairaIcon}
            source={require("../assets/vectors/group2.png")}
    />*/}
             <MaterialCommunityIcons name="currency-ngn" size={40} color={Color.darkolivegreen_100} />
            <TextInput
                style={[styles.input, styles.inputstyle, ]}
                // autoCapitalize={false}
                autoCapitalize="none"
                keyboardType="numeric"
                // onChangeText={onUpdateValue}
                onChangeText={updateInputValueHandler.bind(this, 'amount')}
                value={InputAmount}
                maxLength={6}
                // placeholder={placeholder}
            />
            </View>
            
                <Paystack
                paystackKey="pk_test_4a243b6e1b05148c6f3a136103c4ddb4290b3764"
                billingEmail={email}
                amount={InputAmount}
                onCancel={(error) =>{
                    CancleHandler(error)
                }}
                onSuccess={(res) => {
                    setIsLoading(true)
                    SuccessHandler(res)
                    setIsLoading(true)
                }}
                ref={paystackWebViewRef}
                
                />
    
                <TouchableOpacity  onPress={()=> [!InputAmount ? check() : paystackWebViewRef.current.startTransaction()]} style={[styles.extrastyle]}>
                    <Text style={styles.extrastyletext}>Continue</Text>
                </TouchableOpacity>
            
                </View>
        </ScrollView>
    )
}

export default PayStackScreen;

const styles = StyleSheet.create({
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
    backParent:{
        marginTop: 60,
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        // marginLeft: "20%",
        marginTop: "20%",
        // height: "100%",
        marginBottom: 20, 
    },
    inputstyle:{
        // minWidth: "50%",
        paddingTop: Platform.OS === 'android' ? 10 : 0,
        fontSize: FontSize.size_17xl,
        fontWeight: "600",
        // fontWeight: 'bold'
        fontFamily: 'poppinsSemiBold',
        color: Color.darkolivegreen_100,
    },
    extrastyle:{
        marginTop: "50%",
        width: "80%",
        backgroundColor: Color.limegreen,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        // shadowRadius: 4,
    },
    nairaIcon:{
        width: 40,
        height: 40,
        // marginRight: 4,
        // marginTop: 25
    },
    amountInputholder:{
        paddingTop: 20,
        flexDirection: 'row',
        marginTop: 100,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    extrastyletext:{
        color:'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    text:{
        fontSize:18,
        color: Color.dimgray_200,
        justifyContent: 'center',
        textAlign: 'center',
        width: "60%"
    },
    pressed: {
        opacity: 0.7,
    },

})



 {/*<Paystack
        buttonText="Pay Now"
        showPayButton={true}
        paystackKey="your-public-key-here"
        paystackSecretKey="your-secret-key-here"
        amount={20000}
        billingEmail="paystackwebview@something.com"
        billingMobile="08103902560"
        billingName="Igoepp"
        ActivityIndicatorColor = "green"
        SafeAreaViewContainer={{ marginTop: 5 }}
        SafeAreaViewContainerModal={{ marginTop: 5 }}
        onCancel={(e) => {
            // handle response here
          }}
          onSuccess={(res) => {
            // handle response here
          }}
        />*/}

        {/*<Paystack
        paystackKey="your-public-key-here"
        billingEmail="paystackwebview@something.com"
        amount={'25000.00'}
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        ref={paystackWebViewRef}
        />

        <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}>
          <Text>Pay Now</Text>
    </TouchableOpacity>

    <Paystack  
                paystackKey="pk_test_4a243b6e1b05148c6f3a136103c4ddb4290b3764"
                amount={25.00}
                billingEmail={fetchedMessage.email}
                activityIndicatorColor="green"
                onCancel={(e) => {
                    console.log(e)
                }}
                onSuccess={(res) => {
                    const status = res.data.transactionRef.status
                    if(status === 'success'){
                        navigation.navigate('Welcome')
                    }else{
                        console.log(res.data.transactionRef.status)
                        Alert.alert('Transaction Failed', 'An Error Occured While processing transaction please try again later')
                        navigation.goBack()
                    }
                }}
                autoStart={false}
            />
*/}