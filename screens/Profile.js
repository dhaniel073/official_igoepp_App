import { StyleSheet, View, Text, Image } from "react-native";
import { Color } from "../components/ui/GlobalStyles";
import Input from "../components/Auth/Input";

function Profile(){
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image
                    style={styles.Image}
                    source={require("../assets/vectors/person.png")}
                />
            </View>
            <Input
            label={"First name"}
            />
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        marginTop: "15%",
        flex: 1,

    },
    Image:{
        borderRadius: 500,
        borderColor: Color.lightgreen,
        borderWidth: 2,
    },
    imageView:{
        
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    }
})