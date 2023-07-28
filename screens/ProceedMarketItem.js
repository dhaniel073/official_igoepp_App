import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GoBack from '../components/ui/GoBack'
import { Image } from 'expo-image'
import Button from '../components/ui/Button'
import {useFonts} from 'expo-font'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Color, FontSize } from '../components/ui/GlobalStyles'

const ProceedMarketItem = ({route,navigation}) => {
    const marketItemId = route.params.marketItemId
    const subcatName = route.params.marketItemName
    const subcatDesc = route.params.marketItemDesc
    const catId = route.params.catId
    const image = route.params.marketItemimage

    console.log(route.params)


    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppingMedium': require("../assets/font/Poppins_medium.ttf")
    })
    
    
      if (!fontloaded) {
        return <LoadingOverlay/>
      }
  
  return (
    <View style={styles.container}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>


            <View style={styles.innerconatainer}>
                <View style={styles.image2container}>
                    <Image
                    style={styles.image2}
                    source={{ uri: `https://phixotech.com/igoepp/public/products/${image}` }}
                    />
                </View>
            <Text style={styles.catNameText}>{subcatName}</Text>
            <Text style={styles.catDescText}>{subcatDesc}</Text>
            <Button onPress={() => navigation.navigate("RequestSendInfo", {
                marketItemId: marketItemId,
                subcatDesc: subcatDesc,
                subcatName: subcatName,
                catId: catId

            })} style={[styles.button]}>Proceed</Button>
            </View>

        </View>
  )
}

export default ProceedMarketItem

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75
    },
    image2container:{
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    image2:{
        width:  250,
        height: 250
    },
    innerconatainer:{
        marginTop: "10%"
    },
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
      },
    image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30
    },
    backParent:{
        flexDirection: 'row',
    },
    container:{
        marginTop: "15%",
        marginHorizontal: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        flex: 1
    },
    catNameText:{
    fontSize: FontSize.size_3xl,
    // fontWeight: "700",
    fontFamily: 'poppinsBold',
    textAlign: "center",
    marginTop: 80,
    color: Color.darkolivegreen_100,
    },
    catDescText:{
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsRegular',
    fontSize: FontSize.size_sm,
    textAlign: "center",
    marginHorizontal: 30
    },
    button:{
        backgroundColor:Color.limegreen,
        marginTop: 30,
        marginHorizontal: 50
    }
})