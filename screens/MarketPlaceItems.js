import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {useFonts} from 'expo-font'
import { AuthContext } from '../store/auth-context';
import GoBack from '../components/ui/GoBack';
import { Image } from 'expo-image';
import { Color, FontSize } from '../components/ui/GlobalStyles';

const MarketPlaceItems = ({route}) => {
    const navigation = useNavigation();
    const [fetchedcategory, setFetchedCategory] = useState('')
    const [isFetching, setIsFetching] = useState(true)
    const authCtx = useContext(AuthContext)
    
    
    const categoryId = route.params.categoryId
    const first_name = route.params.first_name
    // console.log(categoryId, first_name)



  
  useEffect(() => {
    async function fetchData(){
        try{
            setIsFetching(true)
            const response = await axios.get(`http://phixotech.com/igoepp/public/api/auth/productbycatshow/${categoryId}`, {
                headers:{
                    Accept: 'application/json',
                    Authorization: `Bearer ${authCtx.token}`
                }
            })
            // console.log(response.data)
            setFetchedCategory(response.data)
            setIsFetching(false)
        }catch(error){
            console.log(error)
          Alert.alert("Error", "Error fetching Subcategories")
        }
    }
    fetchData()
  }, [setFetchedCategory, setIsFetching])

  
  const NoItemNote = () => {
    return (
        <View style={{ justifyContent:'center', alignItems:'center', marginTop: '70%' }}>
            <Text style={{ fontSize: FontSize.size_sm, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Items Available</Text>
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
  
  if(!fontloaded || isFetching){
    return <LoadingOverlay message={"..."}/>
  }


  return (
    <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
        <GoBack onPress={() => navigation.goBack()}>Back</GoBack>

    <View>
        <Text style={styles.name}>Hi {first_name}</Text>
    </View>
    </View>

    <Text style={styles.requestHelptext}>Market Items</Text>
    {fetchedcategory.length === 0  ? <NoItemNote/> :
        <FlatList
        // style={styles.flatlists}
        showsVerticalScrollIndicator={false}
        data={fetchedcategory}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
            <View style={styles.container}  >
            <TouchableOpacity style={[styles.pressables]} onPress={() => navigation.navigate("ProceedMarketItem", {
                productId: item.id,
                productItemName: item.name,
                productItemDesc: item.description,
                productItemimage: item.picture,
                catId: item.product_category_id,
                price: item.price,
                shippingCost: item.shipping_cost,
                supplierId: item.supplier_id,
                available: item.available

            })}>
            <Image
            style={styles.image2}
            source={{ uri:`https://phixotech.com/igoepp/public/products/${item.picture}`  }}
            // source={require("../assets/vectors/g101.png")}
            />
            {/* {console.log(`https://phixotech.com/igoepp/public/subcategory/${item.image}`)}*/}
                <Text style={styles.item}>
                {item.name}
                </Text>
            </TouchableOpacity>
            </View>
            }
        numColumns={2}
        /> 
        }
    </SafeAreaView>
  )
}

export default MarketPlaceItems

const styles = StyleSheet.create({

    container: {
        // padding: 5,
        flex: 1,
        // justifyContent:'center',
        // width: 100,
        // height: 300
        // alignItems: 'center'
        // marginBottom: 20
    
      },
      flatlists:{
        // top: 0,
        marginBottom: 20
      },
      pressables:{
        // backgroundColor: Color.skyblue,
        justifyContent: 'center',
        alignItems: 'center',
        // width: 150,
        flex: 1,
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        // backgroundColor: 'white',
        overflow: Platform.OS === 'andriod' ? 'hidden' : 'visible',
        backgroundColor: Color.mintcream,
        margin: 15,
        height: 145,
      },
      backParent:{
        flexDirection: 'row',
      },
      back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
      },
      pressed:{
        opacity: 0.75
      },
      item: {
        padding: 10,
        fontSize: 10,
        // marginTop: 80,
        fontFamily: 'poppinsSemiBold',
        // textAlign: 'center',
        // position: 'absolute',  
        color: Color.darkolivegreen_100
      },
      mainContainer:{
        flex: 1,
        marginHorizontal: 8,
        marginTop: "15%"
      },
      requestHelptext:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
        marginLeft: 10,
        marginBottom: 10
      },
      image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30
      },
      image2:{
        width: 70,
        height: 50,
        // marginLeft: 50,
        marginTop: 30,
        // alignItems: 'center'
        marginBottom: 15
      },
      name:{
        fontFamily: 'poppinsRegular',
        fontSize: FontSize.size_2xs,
        color: Color.limegreen,
        marginRight: 10,
        marginTop: 8
        
      },
      header:{
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      backtext:{
        // marginRight: "75%"
      },
})