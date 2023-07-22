import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import GoBack from "../components/ui/GoBack";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { BidRequests } from "../util/auth";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";

function BidScreen({route, navigation}){
    const bid_id = route.params.bid_id
    const authCtx = useContext(AuthContext)
    useEffect(() => {
        const fetchBidRequest = async() => {
            const response = await BidRequests(bid_id, authCtx.token)
            console.log(response)
        }
    })
    console.log(route.params)
    return (
        <SafeAreaView style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

            <View style={styles.container}>
                <Text style={styles.bidText}>Bid Screen</Text>
            </View>
        </SafeAreaView>
    )
}

export default BidScreen;

const styles = StyleSheet.create({
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
    container:{
    }
})