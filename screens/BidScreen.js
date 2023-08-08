import { Dimensions, FlatList, Image, Platform,TextInput, Pressable, SafeAreaView, StyleSheet,  Text, TouchableOpacity, View, Alert } from "react-native";
import GoBack from "../components/ui/GoBack";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { BidRequests } from "../util/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import Button4 from "../components/ui/Button4";
import Button from "../components/ui/Button";
import {useFonts} from 'expo-font'
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Title } from "react-native-paper";
import SimpleModal from './SimpleModal'
import Modal from "react-native-modal";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const WIDTH = Dimensions.get('window').width
const HEIGHT_MODAL = 200


const data = [
    { label: 'Cash ', value: 'C' },
    { label: 'Wallet ', value: 'W' },
  
  ];


function BidScreen({route}){
    const [bidrequest, setBidRequest] = useState('')
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    const bid_id = route.params.bid_id
    const cat_name = route.params.cat_name
    const authCtx = useContext(AuthContext)
    const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
    const [isNegotiateModalVisible, setNegotiatetModalVisible] = useState(false);
    const [budget, setBudget] = useState('')
    const [paymentmethod, setPaymentMethod] = useState('')
    const [Id, setId] = useState('')
    const [isFocus, setIsFocus] = useState(false);
    // const [chooseData, setchooseData] = useState()


    // console.log(route.params)

    useEffect(() => {
        const fetchBidRequest = async() => {
            setIsLoading(true)
            const response = await BidRequests(bid_id, authCtx.token)
            console.log(response)
            setBidRequest(response)
            setIsLoading(false)
            // var count = Object.keys(response).length;
            // let stateArray = []
            // for (var i = 0; i < count; i++){
            //     stateArray.push({
            //         label: response[i].proposed_price
            //     })
            //     console.log(stateArray)
            //     let dollarUSLocale = Intl.NumberFormat('en-US');
            //     let dollarIndianLocale = Intl.NumberFormat('en-IN');

            //     console.log("US Locale output: " + dollarUSLocale.format(stateArray.label));
            //     console.log("Indian Locale output: " + dollarIndianLocale.format(stateArray.label)); 
            // }
        }
        
        fetchBidRequest()
    }, [])


    // http://phixotech.com/igoepp/public/api/auth/hrequest/acceptbidcash
    
    const NoRequestNote = () => {
        return (
            <View style={{ justifyContent:'center', alignItems:'center', marginTop: '70%' }}>
                <Text style={{ fontSize: FontSize.size_sm, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Bids Made On Request</Text>
            </View>
        )
    }



       
   {/* const setData = (data) => {
        setchooseData(data)
    }

    const changeModalVisible = (bool) => {
        setAcceptModalVisible(bool);
    };*/}

    // console.log(bidrequest.id)

    const toggleAcceptModal = (id) => {
        // console.log(id)
        setAcceptModalVisible(!isAcceptModalVisible)
        let sendId = id
        console.log(sendId)
        setId(sendId)
    }

    const toggleNegotiateModal = (id) => {
        // console.log()
        let sendId = id
        console.log(sendId)
        setId(sendId)
        setNegotiatetModalVisible(!isNegotiateModalVisible)
    }




    const AcceptBidHandler = async() => {
        if(!paymentmethod){
            Alert.alert('Payment Method', 'Select payment method to continue')
        }else{
        // console.log(Id, paymentmethod)
        const url = 'http://phixotech.com/igoepp/public/api/auth/hrequest/acceptbidcash'
        setIsLoading(true)
        try {
            setIsLoading(true)
         const response = await axios.post(url, {
            "bidid": Id,
            "payment_type": paymentmethod,
            "payment_mode" : paymentmethod,
            "charge_payment_type": "W",
            "session_id": authCtx.sessionId,
            "application": "webapp"
         },
         {
            headers:{
                Accept: 'application/json',
                Authorization: `Bearer ${authCtx.token}`
            }
        }
         ) 
         console.log(response.data)
         setPaymentMethod(null)
         setIsFocus(false)
         navigation.navigate("Requests")
         setIsLoading(true)
        console.log(paymentmethod, Id)
        } catch (error) {
          console.log(error.response)
        }
        console.log("Proceed")
        setPaymentMethod(null)
        setIsFocus(null)
        setIsLoading(false)

        }
      }

      const NegotiationSubmitHandler = async() => {
        
        const url = `http://phixotech.com/igoepp/public/api/auth/hrequest/negotiate/${Id}`
        console.log(url)
        if(!budget){
            Alert.alert('Invalid Budget', 'Invalid Budget Amount')
        }else{
            setIsLoading(true)
        try {
            setIsLoading(true)
            const response = await axios.put(url,
                {
                    "budget": budget,
                },
                {
                    headers:{
                        Accept: 'application/json',
                        Authorization: `Bearer ${authCtx.token}`
                    }
                }
            ) 
            console.log(response.data)
            setBudget(null)
            navigation.navigate("Requests")
           } catch (error) {
             console.log(error.response)
           }
            console.log(budget)
        }
        setIsLoading(false)
      }


    const DeclineHandler = async (id) => {
        console.log(id)
        const url = `http://phixotech.com/igoepp/public/api/auth/hrequest/declinebidrequest/${id}`
        try {
            const response = await axios.get(url, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            })
            console.log(response.data);
            console.log(id)
            Alert.alert('Decline Bid', 'Successful', [
                {
                    text: 'Ok',
                    onPress: () => navigation.goBack("Requests") ,
                }
            ])    
        } catch (error) {
            console.log(error)
        }
    }
    
    

    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
      
      })
      
      if(!fontloaded || isLoading){
        return <LoadingOverlay/>
      }
    
    
    
    return (
        <SafeAreaView style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
                <Text style={styles.bidText}>Bid Screen</Text>

                    {bidrequest.length === 0 ? <NoRequestNote/> :
                    
                <FlatList
                    data={bidrequest}
                    style={styles.flatlists}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => 
                        <View style={styles.pressablecontainer}>
                        <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                        <Title style={styles.TitleName}>{cat_name}</Title>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{  width: 25, height: 25 }} source={require("../assets/vectors/group-723.png")}/>
                                <Text style={{ fontSize: 17 }}>4.0</Text>
                            </View>
                        </View>
                            <Pressable style={[styles.pressables]}>
                                <View style={{ flexDirection: 'row'}}>

                                <Image style={{ height: 60, width:60, borderRadius:30 }} source={require("../assets/vectors/person.png")}/>
                                   
                                        <View style={{ flexDirection: 'column' }}>
                                            <View style={{ marginLeft:10, flexDirection: 'row' }}>
                                                <Text style={styles.bidName}>{item.first_name} </Text>
                                                <Text style={styles.bidName}> {item.last_name}</Text>

                                            </View>

                                            
                                            <View style={{ position:'absolute', top: 30, left: 10}}>
                                                <Text style={styles.textAmount}>NGN {item.proposed_price} </Text>

                                                <View style={styles.negotiablePanel}>
                                                    <Text style={styles.negotiableText}>{item.negotiable === 'N' ? 'Non-Negotiable' : 'Negotiable'}</Text>
                                                </View>
                                            </View>
                                        </View>

                                </View>


                               {/* <Text >{item.email}</Text>*/}

                               <View style={styles.buttonContainer}>

                               {item.negotiable === 'Y' ?
                                    <TouchableOpacity onPress={() => [toggleNegotiateModal(item.id),console.log("negotiate")]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.blueviolet, backgroundColor: '#fff' }}>
                                    <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                        <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.blueviolet }}>Negotiate</Text>
                                    </View>
                                    </TouchableOpacity>

                                :
                                    <TouchableOpacity onPress={() => [DeclineHandler(item.id)]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: 'white'   }}>
                                        <View style={{ paddingLeft: 35, paddingRight: 35 }}>
                                            <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Decline</Text>
                                        </View>
                                    </TouchableOpacity>
                                }

                                <TouchableOpacity onPress={() => toggleAcceptModal(item.id)} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                                    <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                        <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>Accept Bid</Text>
                                    </View>
                                </TouchableOpacity>
                                    
                               </View>

                            </Pressable>
                        </View>
                        
                }
                />
               
                }

            {/*Accept Modal popup*/}
            <Modal 
            isVisible={isAcceptModalVisible}
            animationInTiming={500}
            >
                <SafeAreaView style={styles.ontainer}>
                
                    <View style={styles.modal}>
                        <View>
                        <Text style={[styles.text, {fontSize: 20, fontFamily: 'montserratBold'}]}>Payment Method</Text>

                        <SafeAreaView style={{ paddingLeft:20, paddingRight:20, paddingTop:10 }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Payment Method' : '...'}
                            searchPlaceholder="Search..."
                            value={paymentmethod}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setPaymentMethod(item.value);
                                setIsFocus(false);
                            }}
                            //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
                            
                            />
                        </SafeAreaView>
                        </View>
                      
                

                    <View style={styles.buttonView}>
                    
                    <TouchableOpacity onPress={() => [toggleAcceptModal(false),console.log("canceled")]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100   }}>
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
        
                        <TouchableOpacity onPress={() =>[ toggleAcceptModal(true), AcceptBidHandler()]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>Accept Bid</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    </View>
                </SafeAreaView>
            </Modal>


            {/*Negotiate modal popup*/}        
            <Modal 
            isVisible={isNegotiateModalVisible}
            animationInTiming={500}
            >
                <SafeAreaView style={styles.ontainer}>
                
                    <View style={styles.modal}>
                        <View>
                        <Text style={[styles.text, {fontSize: 20, fontFamily: 'montserratBold'}]}>Negotiate Price</Text>

                        <SafeAreaView style={{ paddingLeft:20, paddingRight:20, paddingTop:10, margin: 10 }}>
                            <TextInput
                                placeholder="Amount"
                                keyboardType="numeric"
                                onChangeText={setBudget}
                                value={budget}
                                style={{ fontSize: 18, borderWidth: 1, borderColor: Color.firebrick_100, padding:10, borderRadius:10 }}
                            />
                        </SafeAreaView>
                        </View>
                      
                

                    <View style={styles.buttonView}>
                    
                    <TouchableOpacity onPress={() => [toggleNegotiateModal(false), console.log("canceled negotiation")]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100   }}>
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel</Text>
                        </View>
                    </TouchableOpacity>
        
                        <TouchableOpacity onPress={() =>[ toggleNegotiateModal(false), NegotiationSubmitHandler()]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>Negotiate</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    </View>
                </SafeAreaView>
            </Modal>


            </SafeAreaView>
    )
}

export default BidScreen;

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontFamily: 'poppinsRegular'
        // marginTop: 8
      },
      placeholderStyle: {
        fontSize: 16,
        fontFamily:'poppinsRegular'
      },
      selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'poppinsSemiBold'
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    text:{
        margin:5,
        fontSize: 16,
        textAlign: 'center'
      },
    buttonView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'center'
      },
    modal:{
        height: HEIGHT_MODAL,
        borderWidth: 2,
        borderColor: Color.darkolivegreen_100,
        width: WIDTH - 40,
        paddingTop: 10,
        // padding: 10,
        // backgroundColor: 'white'
        // backgroundColor: '#FFFFEF',
        backgroundColor: 'white',
        borderRadius: 10 
      },
    ontainer:{
        // marginTop:'0%',
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
      },
    negotiablePanel:{
        borderWidth: 1,
        borderColor: Color.tomato,
        backgroundColor: 'white' ,
        borderRadius:5, 
    },
    negotiableText:{ 
        margin: 3,
        textAlign: 'center',
        fontFamily: 'poppinsRegular',
        color: Color.tomato,
    },
    negotiable:{
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        alignSelf:"center",
        // borderWidth: 1,
        marginTop:30
    },
    pressablecontainer: {
         // backgroundColor: Color.skyblue,
        //  marginTop:10,
         marginBottom: 30,
         padding: 15,
         borderRadius: 12,
        //  justifyContent: 'flex-start',
        //  alignItems: 'flex-start',
         elevation: 4,
         shadowColor: 'black',
         shadowOpacity: 0.25,
         shadowOffset: {width: 0, height: 2},
         shadowRadius: 8,
         // backgroundColor: 'white',
         overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
        backgroundColor: Color.mintcream,

    },
    pressables:{
        // backgroundColor: Color.skyblue,

        // padding: 15,
        // borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // alignItems: 'center',
        // justifyContent: 'center',
        
      },
    mainContainer:{
        marginTop: '15%',
        flex:1,
        marginHorizontal: 10
    },
    bidText:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
        // marginBottom: 10
    },
    container: {
        
    },
    flatlists:{
        marginHorizontal: 10,
        marginBottom: 20
    },
    bidName:{
        fontSize: 18,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsMedium',
        paddingBottom: 13,
        // paddingLeft: 10
    },
    textAmount:{
        color: Color.tomato,
        fontFamily: 'poppinsBold',
        fontSize: FontSize.size_xl,
        textAlign: "left",
    },
    TitleName:{
        fontFamily: 'poppinsBold',
        fontSize: FontSize.size_4xl,
        marginBottom: 10,
        color: Color.darkolivegreen_100
    },
    buttonContainer:{ 
        flexDirection: 'row', 
        // marginRight: 10,
        marginTop: 50,
        width: "100%"
    }

})