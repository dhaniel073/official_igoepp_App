import { Image, StyleSheet, View, Pressable, Text } from "react-native";

function ImageViewer({route, navigation}){
    const imageUrl = route.params.ImageUrl
    console.log(imageUrl)

    function check(){
        if(imageUrl === null){
            console.log("null")
            return (
                <Image style={styles.image} source={require("../assets/vectors/person.png")}/>)
        }else{
            return <Image style={styles.image} source={{ uri: `https://phixotech.com/igoepp/public/customers/${imageUrl}` }}/>
        }
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()}>
                <Image style={styles.image2} source={require("../assets/vectors/vector59.png")}/>
            </Pressable>
                {check()}
        </View>
    )
}

export default ImageViewer;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    image:{
        // alignItems: 'center',
        marginTop: "35%",
        width: "100%",
        height: "50%"
    },
    backParent:{
        top: 20,
        left: 10,
        flexDirection: 'row',
    },
    image2:{
        width: 15,
        height: 15,
        marginHorizontal: 15,
        // marginTop: 3,
        marginTop: "10%"
      }
})