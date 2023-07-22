import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";
import GoBack from "../components/ui/GoBack";

function FeedBack(){
    const navigation = useNavigation()

    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
      
      })
      
      if(!fontloaded){
        return <LoadingOverlay message={"..."}/>
      }


    return (
        <View style={styles.mainContainer}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>


            <Text style={styles.feedbacktext}>FeedBack</Text>
        </View>
    )
}

export default FeedBack;

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