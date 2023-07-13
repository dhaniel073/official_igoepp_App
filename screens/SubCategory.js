import { FlatList, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView, View } from "react-native";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useEffect } from "react";

function SubCategory({route}){
    
    // "https://phixotech.com/igoepp/public/api/showsubcategorybycatid/1"
    const firstname = route.params.firstname
    const catId = route.params.categoryId
      
  useEffect(() => {
    async function fetchSubCategorydata(){
    try {
      setIsFetching(true)
      await axios.get(`https://phixotech.com/igoepp/public/api/showsubcategorybycatid/${catId}`)
      .then((res) => {
        // console.log(res.data)
        setFetchedCategory(res.data.data)
        setIsFetching(false)

      })
    } catch (error) {
      setIsFetching(false)

  }
  }
  fetchSubCategorydata()
}, [setIsFetching, setFetchedCategory])



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
        <Text style={styles.name}>Hi {firstname}</Text>
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
              <Pressable style={({pressed}) => [styles.pressables, pressed && styles.pressed]} onPress={() => navigation.navigate("ViewHelpers", {
                categoryId: item.id,
                categoryName: item.cat_name,
                categoryDesc: item.cat_desc,
              })}>
              <Image
              style={styles.image2}
              source={{ uri:`https://phixotech.com/igoepp/public/category/${item.image}`  }}
              // source={require("../assets/vectors/g101.png")}
              />

                <Text style={styles.item}>
                  {item.cat_name}
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
      width: 50,
      height: 50,
      marginLeft: 50,
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