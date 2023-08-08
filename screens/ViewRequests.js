import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, SafeAreaView, Pressable, Image, Platform } from "react-native";
import { ShowFetchedRequestsById } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";
// import {  } from "react-native";

function ViewRequests({route}){

    const navigation = useNavigation()
    const [isFetching, setIsFetching] = useState(true)
    const [fetchedData, setFetchedData] = useState('')
    const authCtx = useContext(AuthContext)
    const requestid = route.params.bid_id
    console.log(requestid)


    useEffect(() => {
        const fetch = async () => {
            try {
                setIsFetching(true)
                const response = await ShowFetchedRequestsById(requestid, authCtx.token)
                // console.log(response)
                setFetchedData(response)
                setIsFetching(false)
            } catch (error) {
                console.log(error)
                setIsFetching(false)

            }
        }
        fetch()
    }, [setFetchedData, setIsFetching])
    // console.log(route?.params)
    // function check(){
    //     console.log(fetchedData)
    // }
    // check()


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
    
    return (
        <SafeAreaView style={styles.mainContainer}>
           <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
            <Text style={styles.requestText}>View Request</Text>

            {isFetching ? <LoadingOverlay/> :

               
                        <FlatList
                            style={styles.flatlists}
                            data={fetchedData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => 
                                <View style={{ padding:10 }}>
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Category Name: </Text>
                                        <Text style={styles.textValue}>{item.cat_name}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Price</Text>
                                        <Text style={styles.textValue}>{item.agreed_price === null ? "0.00" : item.agreed_price}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Available Bids: </Text>
                                        <Text style={styles.textValue}> {item.bid_count}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Assigned Helper: </Text>
                                        <Text style={styles.textValue}> {item.assigned_helper === null ? "None" : item.assigned_helper}</Text>
                                    </View>

                                    {/*<View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Customer Satisfaction: </Text>
                                        <Text style={styles.textValue}> {item.customer_statisfy === null ? "No Set" : item.customer_statisfy}</Text>
    </View>*/}

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Country: </Text>
                                        <Text style={styles.textValue}> {item.help_country}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Date: </Text>
                                        <Text style={styles.textValue}> {item.help_date}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Description: </Text>
                                        <Text style={styles.textValue}> {item.help_desc}</Text>
                                    </View>
                                    
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>LandMark: </Text>
                                        <Text style={styles.textValue}> {item.help_landmark}</Text>        
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>L.G.A: </Text>
                                        <Text style={styles.textValue}> {item.help_lga}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Location: </Text>
                                        <Text style={styles.textValue}> {item.help_location}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>State:</Text>
                                        <Text style={styles.textValue}> {item.help_state}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Help Size:</Text>
                                        <Text style={styles.textValue}> {item.help_size}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Status: </Text>
                                        <Text style={styles.textValue}> {item.help_status ===  'A' ? 'Accepted' : item.help_status === 'X' ? 'Cancelled' : 'Pending'}</Text>
                                    </View>
                                    
                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Time of Help: </Text>
                                        <Text style={styles.textValue}> {item.help_time}</Text>
                                    </View>

                                   {/* <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Payment Status: </Text>
                                        <Text style={styles.textValue}> {item.payment_status}</Text>
                                    </View>

                                    <View style={styles.nameContainer}>
                                        <Text style={styles.labelText}>Proof of payment id:</Text>
                                        <Text style={styles.textValue}> {item.proof_id}</Text>
</View>*/}
                                </View>
                            }
                        />
                        
            }

        </SafeAreaView>
    )
}

export default ViewRequests;

const styles = StyleSheet.create({
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginLeft: 3,
        marginTop: 0
    },
    backParent:{
        flexDirection: 'row',
    },
    image:{
        width: 15,
        height: 15,
        // marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 20
    },
    flatlists:{
        flex: 1,
        marginTop:20,
        marginBottom: 20,
    },
    mainContainer:{
        flex:1,
        // alignItems: 'center',
        // justifyContent: 'center',
        marginHorizontal: 10,
        marginTop:"15%"
    },
    nameContainer:{
        flexDirection: 'row',
        margin: 2,
        justifyContent: 'space-between'
    },
    labelText:{
        fontSize: 15,
        fontFamily: 'poppinsBold',
    },
    textValue: {
        fontSize: 15,
        fontFamily: 'poppinsSemiBold',
        textAlign: "right",
        maxWidth: "72.5%"
    },
        requestText:{
            color: Color.darkolivegreen_100,
            fontSize: FontSize.size_15xl,
            fontFamily: 'poppinsBold',
            marginLeft: 10,
          }
})