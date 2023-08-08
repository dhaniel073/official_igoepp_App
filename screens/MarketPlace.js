import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { customerInfocheck } from "../util/auth";
import {useFonts} from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import axios from "axios";
import { AuthContext } from "../store/auth-context";
import GoBack from "../components/ui/GoBack";
import { Image } from "expo-image";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { Ionicons, AntDesign } from '@expo/vector-icons';


function MarketPlace(){
    const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedcategory, setFetchedCategory] = useState('')
  const [fetchedName, setFetchedName] = useState('')
  const [isFetching, setIsFetching] = useState(true)


  
//   useEffect(() => {
//       async function fetchCategorydata(){
//         console.log(url)
//         const url = 'http://phixotech.com/igoepp/public/api/category'
//     try {
//       setIsFetching(true)
//       await axios.get(url)
//       .then((res) => {
//         // console.log(res.data)
//         setFetchedCategory(res.data.data)
//         setIsFetching(false)

//       })
//     } catch (error) {
//         setIsFetching(false)

//     }
//   }
//   fetchCategorydata()
// },[])

  useEffect(() => {
    const url = 'http://phixotech.com/igoepp/public/api/category'
    navigation.addListener('focus', async() => {
      setIsFetching(true)
      await axios.get(url)
      .then((res) => {
        // console.log(res.data)
        setFetchedCategory(res.data.data)
        setIsFetching(false)
      }).catch((error) => {
        console.log(error)
      })
    })
    setIsFetching(false)
},[])


// console.log(fetchedcategory)
// http://phixotech.com/igoepp/public/api/auth//cart/114
//check cart length
useEffect(() => {
  const url = `http://phixotech.com/igoepp/public/api/auth//cart/${authCtx.customerId}`
  navigation.addListener( 'focus', async() => {
      await axios.get(url, {
        headers:{
          Accept: 'application/json',
          Authorization: `Bearer ${authCtx.token}`
        }
      }).then((res)=> {
        // console.log(res.data.data)
        const length = res.data.data.length.toString()
        authCtx.customerCart(length)
        // console.log(length)
      }).catch((error) => {
        console.log(error)
      })
  })
},[])



useEffect(() => {
  async function fetchUserdata(){
  try{
    const response = await customerInfocheck(authCtx.customerId, authCtx.token)
    // console.log(response.data.data.first_name)
    const name = response.data.data
    setFetchedName(name)
  }catch(error){
    Alert.alert("Error", error.response.message)
  }
}
  fetchUserdata(authCtx.customerId, authCtx.token)
}, [])


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
        <SafeAreaView style={styles.mainContainer}>
          {/*<GoBack onPress={() => navigation.goBack()}>Back</GoBack>*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="reorder-three" size={30} color={Color.darkolivegreen_100} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ViewCartItems')}>
              <View style={{ flexDirection:'row' }}>
                <AntDesign name="shoppingcart" size={30} color={Color.darkolivegreen_100} />
                <View style={{ backgroundColor: Color.tomato, position: 'absolute', top: -10, left: 20, borderRadius: 30, width:14,   }}>
                  <Text style={{ fontSize: 8,  color: Color.white, fontFamily:'poppinsBold', textAlign:'center'}}>{authCtx === "" ? 0 : authCtx.cart}</Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
            <Text style={styles.requestHelptext}>Market Place</Text>
            {isFetching ? <LoadingOverlay/> :
                <FlatList
                style={styles.flatlists}
                showsVerticalScrollIndicator={false}
                data={fetchedcategory}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => 
                
                    <View style={styles.container}  >
                    <TouchableOpacity style={[styles.pressables]} onPress={() => navigation.navigate("marketPlaceItems", {
                        categoryId: item.id,
                        // categoryName: item.cat_name,
                        // categoryDesc: item.cat_desc,
                        first_name: fetchedName.first_name
                    })}>

                    <Image
                    style={styles.image2}
                    source={{ uri:`https://phixotech.com/igoepp/public/category/${item.image}`  }}
                    // source={require("../assets/vectors/g101.png")}
                    />

                        <Text style={styles.item}>
                        {item.cat_name}
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

export default MarketPlace; 

const styles = StyleSheet.create({

    container: {
        // padding: 5,
        flex: 1,
        justifyContent:'space-between',
        // marginBottom: 20
    
      },
      flatlists:{
        // top: 0,
        marginBottom: 20
      },
      pressables:{
        // backgroundColor: Color.skyblue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
      item: {
        padding: 10,
        fontSize: 10,
        // marginTop: 80,
        fontFamily: 'poppinsSemiBold',
        textAlign: 'center',
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
        // marginBottom: 10
      },
      image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30
      },
      image2:{
        width: 50,
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