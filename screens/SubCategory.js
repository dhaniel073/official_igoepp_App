import { FlatList, Image, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView, View } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useContext, useEffect, useState } from "react";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import axios from "axios";

function SubCategory({route}){
    
    // "https://phixotech.com/igoepp/public/api/showsubcategorybycatid/1"
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext)
    const [fetchedcategory, setFetchedCategory] = useState('')
    const [isFetching, setIsFetching] = useState(true)
    
    
    const categoryId = route.params.categoryId
    const first_name = route.params.first_name
    // console.log(categoryId, first_name)



  
  useEffect(() => {
    async function fetchData(){
        try{
            setIsFetching(true)
            const response = await axios.get(`https://phixotech.com/igoepp/public/api/showsubcategorybycatid/${categoryId}`)
            console.log(response.data)
            setFetchedCategory(response.data.data)
            setIsFetching(false)
        }catch(error){
          Alert.alert("Error", "Error fetching Subcategories")
        }
    }
    fetchData()
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
    <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]}
    onPress={() => navigation.goBack()}
    >
    
      <Image
        style={styles.image}
        contentFit="cover"
        source={require("../assets/vectors/vector30.png")}
      />

      <Text style={styles.back}>Back</Text>

   
  </Pressable>
      <View>
        <Text style={styles.name}>Hi {first_name}</Text>
      </View>
    </View>

    <Text style={styles.requestHelptext}>SubCategory</Text>
    {isFetching ? <LoadingOverlay/> :
        <FlatList
        // style={styles.flatlists}
        showsVerticalScrollIndicator={false}
        data={fetchedcategory}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
            <View style={styles.container}  >
              <Pressable style={({pressed}) => [styles.pressables, pressed && styles.pressed]} onPress={() => navigation.navigate("ProceedCategory", {
                subcategoryId: item.id,
                subcategoryName: item.sub_cat_name,
                subcategoryDesc: item.sub_cat_desc,
                image: item.image,
                catId: item.cat_id,
              })}>
              <Image
              style={styles.image2}
              source={{ uri:`https://phixotech.com/igoepp/public/subcategory/${item.image}`  }}
              // source={require("../assets/vectors/g101.png")}
              />
               {/* {console.log(`https://phixotech.com/igoepp/public/subcategory/${item.image}`)}*/}
                <Text style={styles.item}>
                  {item.sub_cat_name}
                </Text>
              </Pressable>
            </View>
            }
        numColumns={2}
        /> 
        }
    </SafeAreaView>
    )
}

export default SubCategory;

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
      marginTop: "18%"
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