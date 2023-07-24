import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import GoBack from "../components/ui/GoBack";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { BidRequests } from "../util/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import Button4 from "../components/ui/Button4";
import Button from "../components/ui/Button";


function BidScreen({route, navigation}){
    const [bidrequest, setBidRequest] = useState('')
    const bid_id = route.params.bid_id
    const authCtx = useContext(AuthContext)
    useEffect(() => {
        const fetchBidRequest = async() => {
            const response = await BidRequests(bid_id, authCtx.token)
            console.log(response)
            setBidRequest(response)
        }
        fetchBidRequest()
    }, [])

    console.log(route.params)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

            <View style={styles.container}>
                <Text style={styles.bidText}>Bid Screen</Text>
                <View>
                    <FlatList
                        data={bidrequest}
                        style={styles.flatlists}
                        renderItem={({item}) => 
                            <View>
                                <Pressable style={[styles.pressables]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: 60, width:60, borderRadius:30 }} source={require("../assets/vectors/person.png")}/>
                                        <Text style={styles.bidName}>{item.first_name} </Text>
                                        <Text style={styles.bidName}> {item.last_name}</Text>
                                    </View>
                                    <Text >{item.email}</Text>
                                </Pressable>
                            </View>
                    }
                    />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default BidScreen;

const styles = StyleSheet.create({
    pressables:{
        // backgroundColor: Color.skyblue,
        paddingLeft: 15,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // backgroundColor: 'white',
        overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
        backgroundColor: Color.mintcream,
        // margin: 15,
        height: 145,
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
        fontSize: FontSize.size_xl,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsBold',
        paddingBottom: 13,
      }

})