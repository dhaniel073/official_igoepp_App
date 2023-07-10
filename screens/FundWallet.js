import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";

function FundWallet(){
    const navigation = useNavigation() 
    return (
        <View style={styles.container}>
        <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}
    >
        <Text style={styles.back}>Back</Text>
        <Image
          style={[styles.vectorIcon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/vectors/vector30.png")}
        />
       
        </Pressable>
            <Text>Fund Wallet</Text>
        </View>
    )
}

export default FundWallet;

const styles = StyleSheet.create({
    container:{
        marginTop: 50,
        marginHorizontal: 20,
    },
    pressed:{
        opacity: 0.75
    },
    backParent: {
        width: 57,
        height: 21,
        // position: "absolute",
      },
      back: {
        top: 2,
        left: 23,
        fontSize: FontSize.size_mid,
        // fontFamily: FontFamily.poppinsRegular,
        textAlign: "center",
        color: Color.darkolivegreen_100,
        position: "absolute",
      },

      vectorIcon: {
        height: "70%",
        width: "30%",
        top: "20.77%",
        // right: "76.97%",
        // bottom: "24.35%",
        // left: "0%",
      },
      iconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
      },
})