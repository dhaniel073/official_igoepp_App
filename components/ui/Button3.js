import { Pressable, StyleSheet, Text, View } from "react-native";
import { Color } from "./GlobalStyles";
import { TouchableOpacity } from "react-native";

function Button3({children, style, onPress}){
    return (
    <TouchableOpacity
      style={[styles.button,style]}
      onPress={onPress} >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
    )
}

export default Button3;

const styles = StyleSheet.create({
    pressed:{
        opacity: 0.7
    },
    button: {
        backgroundColor: Color.limegreen,
        borderRadius: 10
    },
    buttonText:{
        padding: 6,
        color:'white',
        marginLeft: 3,
        marginRight: 3,
        fontFamily: ''
    }
})