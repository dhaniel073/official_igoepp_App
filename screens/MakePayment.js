import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";

function MakePayment(){

    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

            <Text style={styles.makepaymenttext}>Make Payments</Text>
        </View>
    )
}

export default MakePayment;

const styles = StyleSheet.create({
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
    makepaymenttext:{
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