import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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


function BidScreen({route, navigation}){
    const [bidrequest, setBidRequest] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const bid_id = route.params.bid_id
    const cat_name = route.params.cat_name
    const authCtx = useContext(AuthContext)

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
    
    

    console.log(route.params)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

            <View style={styles.container}>
                <Text style={styles.bidText}>Bid Screen</Text>

                    {bidrequest.length === 0 ? <NoRequestNote/> :
                    
                <View>
                <FlatList
                    data={bidrequest}
                    style={styles.flatlists}
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
                                                    <Text style={styles.negotiableText}>{item.status === 'N' ? 'Negotiable' : 'Non-Negotiable'}</Text>
                                                </View>
                                            </View>
                                        </View>

                                </View>


                               {/* <Text >{item.email}</Text>*/}

                               <View style={styles.buttonContainer}>

                               {item.status === 'N' ? 
                                    <TouchableOpacity onPress={() => {console.log("negotiate")}} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.blueviolet, backgroundColor: '#fff' }}>
                                    <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                                        <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.blueviolet }}>Negotiate</Text>
                                    </View>
                                    </TouchableOpacity>

                                :
                                    <TouchableOpacity onPress={() => {console.log("canceled")}} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100   }}>
                                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel Bid</Text>
                                        </View>
                                    </TouchableOpacity>
                                }

                                <TouchableOpacity onPress={() => {}} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                                    <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                                        <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>Accept Bid</Text>
                                    </View>
                                </TouchableOpacity>
                                    
                               </View>

                            </Pressable>
                        </View>
                }
                />
            </View>
                }
            </View>

        </SafeAreaView>
    )
}

export default BidScreen;

const styles = StyleSheet.create({
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

         padding: 15,
         borderRadius: 10,
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
        marginHorizontal: 10
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
        // marginLeft: 10,
        marginTop: 50
    }

})