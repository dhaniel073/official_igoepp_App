import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, FontSize } from '../components/ui/GlobalStyles'
import {useFonts} from 'expo-font'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import GoBack from '../components/ui/GoBack'
import { AuthContext } from '../store/auth-context'
import axios from 'axios'
import { Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Platform } from 'react-native'
import { Alert } from 'react-native'

const ViewCartItems = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    const [cartitems, setCartItems] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        const url = `http://phixotech.com/igoepp/public/api/auth/cart/${authCtx.customerId}`
        navigation.addListener('focus', async() => {
            setIsLoading(true)
            await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            }).then((res) => {
                console.log(res.data.data)
                setCartItems(res.data.data)
            }).catch((error) => {
                console.log(error)
            })
            setIsLoading(false)

        })

    }, [])

    const DeleteHandler = async(id) => {
        console.log(id)
        setIsLoading(true)
        const url  = `http://phixotech.com/igoepp/public/api/auth/cart/${id}/delete`
        // const url = ''
        await axios.delete(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authCtx.token}`
            }
        }).then((res) => {
            console.log(res.data)
            navigation.goBack()
        }).catch((error) => {
            console.log(error)
        })
        setIsLoading(false)
    }
    const DeletItemFromCart =  (id) => {
        // console.log(id)

        Alert.alert('Remove Item', 'Are you sure you want to remove the item from cart', [
            {
                text: "Yes",
                onPress: () => DeleteHandler(id)
            },
            {
                text: "No",
                onPress: () => {}
            }
        ])
    }

    const ViewItemInCart = () => {

    } 

    const NoCartItemNote = () => {
        return (
            <View style={{ justifyContent:'center', alignItems:'center', marginTop: '70%' }}>
                <Text style={{ fontSize: FontSize.size_sm, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Bids Made On Request</Text>
            </View>
        )
    }
    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
        'poppinsBold': require("../assets/font/Poppins_bold.ttf")
      
      })
      
      if(!fontloaded || isLoading){
        return <LoadingOverlay message={"..."}/>
      }



  return (
    <View style={{ flex:1, marginTop: '15%', marginHorizontal: 8 }}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
        <Text style={styles.requestHelptext}>Cart</Text>

        {cartitems.length === 0 ? <NoCartItemNote/> :
            <FlatList
                data={cartitems}
                keyExtractor={(item)=> item.id}
                renderItem={({item}) => 
                <View style={styles.container}>
                <Text style={styles.requestDate}>{item.created_at}</Text>
                <Pressable style={styles.pressables}>
                    {/*<View style={{ position: 'absolute', flex:1,  left: '95%', top: 40, width:30, backgroundColor: Color.tomato }}>
                        <Text style={{ position: 'absolute', fontSize:FontSize.size_3xl,  }}>{item.quantity}</Text>
    </View>*/}
                    
                    <Text style={{ position: 'absolute', color:Color.tomato, top: 58, left:"70%", fontSize: 18, fontFamily: 'poppinsSemiBold'}}>Quantity: {item.quantity}</Text>
                    
                    <Text style={styles.requestName}>NGN {item.price}</Text>
                    <Text style={{ fontFamily: 'poppinsSemiBold', fontSize: 18, color:Color.tomato }}>Total: NGN {item.sub_total_amount}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => [DeletItemFromCart(item.id)]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: '#fff' }}>
                    <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                        <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Remove Item</Text>
                    </View>
                    </TouchableOpacity>
            
                    <TouchableOpacity onPress={() => []} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                            <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>View Request</Text>
                        </View>
                    </TouchableOpacity>
                    </View>
            </Pressable>
            </View>
            }
            />
        }
    </View>
  )
}

export default ViewCartItems

const styles = StyleSheet.create({
    requestName:{
        fontSize: FontSize.size_xl,
        color: Color.darkolivegreen_100,
        fontFamily: 'poppinsBold',
        paddingBottom: 13,
    },
    container: {
        // padding: 5,
        flex: 1,
        // justifyContent:'space-between',
        marginTop: 20
    
    },
    pressables:{
        // backgroundColor: Color.skyblue,
        // borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // backgroundColor: 'white',
        overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
        backgroundColor: Color.mintcream,
        margin: 8,
        height: 155,
        padding: 10
        
      },
    requestDate:{
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: 'poppinsSemiBold'
    },
    requestHelptext:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
        // marginBottom: 10
    },
})