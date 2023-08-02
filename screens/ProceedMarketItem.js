import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import GoBack from '../components/ui/GoBack'
import { Image } from 'expo-image'
import Button from '../components/ui/Button'
import {useFonts} from 'expo-font'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Color, FontSize } from '../components/ui/GlobalStyles'
import { AuthContext } from '../store/auth-context'
import axios from 'axios'
import Modal from "react-native-modal";
import { Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';


const WIDTH = Dimensions.get('window').width
const HEIGHT_MODAL = 200


const ProceedMarketItem = ({route,navigation}) => {
    const productId = route.params.productId
    const productName = route.params.productItemName
    const productDesc = route.params.productItemDesc
    const catId = route.params.catId
    const image = route.params.productItemimage
    const available = route.params.available
    const shippingCost = route.params.shippingCost
    const supplierId = route.params.supplierId
    const price = route.params.price
    const authCtx = useContext(AuthContext)
    const [quantity, setQuantity] = useState('')
    const [isQuantityModalVisible, setQuantityModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);





    // console.log(
    //     productId,
    //     productName,
    //     productDesc,
    //     catId,
    //     image,
    //     available,
    //     shippingCost,
    //     supplierId,
    //     price,
    // )

    const toggleQuantityModal = () => {
        // console.log()
        setQuantityModalVisible(!isQuantityModalVisible)
    }

    const HandleSubmitCartItem = async () => {

        if(available !== 'Y'){
            Alert.alert('Item is out of stock', 'Please Try again Later', [
                {
                    text: 'Ok',
                    onPress: () => navigation.goBack(),
                }
            ])
            setQuantity(null)
        }else if(!quantity){
            Alert.alert('Empty Field', 'Quantity cannot be empty,Enter quantity needed for supply')
            setQuantity(null)
        }else{
            set
            const url = 'http://phixotech.com/igoepp/public/api/auth/cart/store'
            await  axios.post(url, {
            
                    product_id:productId,
                    quantity: quantity,
                    customer_id: authCtx.customerId,
                    supplier_id: supplierId
                },
                {
                    headers:{
                        Accept: 'application/json',
                        Authorization : `Bearer ${authCtx.token}`
                    }
                }
            
            ).then((res)=> {
                console.log(res.data)
                setQuantity(null)

                Alert.alert("Success", "Product added to cart successfully!",[
                    {
                        text: 'Ok',
                        onPress: () => navigation.navigate('MarketPlace')
                    }
                ])

            }).catch((error) => {
                console.log(error)
                setQuantity(null)

            })
            console.log(productId,quantity,supplierId, authCtx.customerId)
        }

       
    }

    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppingMedium': require("../assets/font/Poppins_medium.ttf")
    })
    
    
      if (!fontloaded || isLoading) {
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
            <Text style={styles.catNameText}>{productName}</Text>
            <Text style={styles.catDescText}>{productDesc}</Text>
            <Text style={styles.catDescText}>Price: N {price},  Shipping Cost: N {shippingCost}</Text>
            <Text style={styles.catDescText}>In Stock: {available === 'N' ? 'No': 'Yes'}</Text>

              <TouchableOpacity style={styles.commandButton} onPress={() => {toggleQuantityModal()}}>
                    <View style={{ flexDirection:'row' }}>
                        <Entypo name="shopping-cart" size={24} color="white" />
                        <Text style={styles.panelBottomTitle}>Add To Cart</Text>
                    </View>

              </TouchableOpacity>
            </View>



            {/*quantity modal popup*/}
            <Modal 
            isVisible={isQuantityModalVisible}
            animationInTiming={500}
            >
                <SafeAreaView style={styles.ontainer}>
                
                    <View style={styles.modal}>
                    <View>
                        <View style={{ flexDirection: 'row',justifyContent:'center' }}>
                        <Text style={[styles.text, {fontSize: 20, fontFamily: 'poppinsMedium'}]}>Quantity Needed</Text>
                        <TouchableOpacity style={{ position:'absolute', right: 15 }} onPress={() => {toggleQuantityModal(false)}}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                        </View>

                        <SafeAreaView style={{ paddingLeft:20, paddingRight:20, paddingTop:5, margin: 5 }}>
                            <TextInput
                                placeholder="Quantity needed for supply"
                                keyboardType="numeric"
                                onChangeText={setQuantity}
                                maxLength={2}
                                value={quantity}
                                style={{ fontSize: 18, borderWidth: 1, borderColor: Color.firebrick_100, padding:10, borderRadius:10 }}
                            />
                        </SafeAreaView>
                        </View>
                      
                

                    <View style={styles.buttonView}>
                    
                    {/*<TouchableOpacity onPress={() => [toggleQuantityModal(false), console.log("canceled negotiation")]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100   }}>
                        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                            <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel</Text>
                        </View>
  </TouchableOpacity>*/}
        
                        <TouchableOpacity onPress={() =>[ toggleQuantityModal(false),HandleSubmitCartItem()]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                                <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>Add</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    </View>
                </SafeAreaView>
            </Modal>

        </View>
  )
}

export default ProceedMarketItem

const styles = StyleSheet.create({
    panelBottomTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        marginLeft:5
    },
    commandButton:{
    padding: 15,
    borderRadius: 10,
    // backgroundColor: '#FF6347',
    // backgroundColor: Color.darkolivegreen_100,
    backgroundColor: Color.limegreen,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

    },
    buttonView:{
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent:'center'
    },
    ontainer:{
        // marginTop:'0%',
          flex:1,
          alignItems: 'center',
          justifyContent: 'center'
    },
    text:{
        margin:5,
        fontSize: 16,
        textAlign: 'center'
    },
    modal:{
        height: HEIGHT_MODAL,
        borderWidth: 2,
        borderColor: Color.darkolivegreen_100,
        width: WIDTH - 40,
        paddingTop: 10,
        // padding: 10,
        // backgroundColor: 'white'
        // backgroundColor: '#FFFFEF',
        backgroundColor: 'white',
        borderRadius: 10 
    },
    pressed: {
        opacity: 0.75
    },
    image2container:{
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    image2:{
        width:  350,
        height: 350
    },
    innerconatainer:{
        marginTop: "20%"
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
    marginTop: 30,
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