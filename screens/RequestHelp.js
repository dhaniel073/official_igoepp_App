import { Text, StyleSheet, View, Pressable,RefreshControl, ScrollView, FlatList, Button, SafeAreaView, Alert } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border } from "../components/ui/GlobalStyles";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useFonts } from "expo-font";
import { customerInfocheck } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import GoBack from "../components/ui/GoBack";
import { TouchableOpacity } from "react-native";


const RequestHelp = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedcategory, setFetchedCategory] = useState('')
  const [fetchedName, setFetchedName] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  
  
  useEffect(() => {
    async function fetchCategorydata(){
    try {
      setIsFetching(true)
      await axios.get("http://phixotech.com/igoepp/public/api/category")
      .then((res) => {
        // console.log(res.data)
        setFetchedCategory(res.data.data)
        setIsFetching(false)

      })
    } catch (error) {
      setIsFetching(false)

  }
  }
  fetchCategorydata()
},[setFetchedCategory, setIsFetching])


// console.log(fetchedcategory)



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
  fetchUserdata()
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
    <View style={styles.header}>
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <View>
        <Text style={styles.name}>Hi {fetchedName.first_name}</Text>
      </View>
    </View>

    <Text style={styles.requestHelptext}>Request Help</Text>
    {isFetching ? <LoadingOverlay/> :
        <FlatList
        style={styles.flatlists}
        showsVerticalScrollIndicator={false}
        data={fetchedcategory}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
            <View style={styles.container}  >
              <TouchableOpacity style={[styles.pressables]} onPress={() => navigation.navigate("SubCategory", {
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


export default RequestHelp;
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
  pressed:{
    opacity: 0.75
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
});