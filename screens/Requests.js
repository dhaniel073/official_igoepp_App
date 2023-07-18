import {useContext, useEffect, useState} from "react";
import { Text, StyleSheet, View, Pressable, Image, FlatList, ScrollView, SafeAreaView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../components/ui/GlobalStyles";
import { AuthContext } from "../store/auth-context";
import { ShowFetchedRequests } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from '../components/ui/Button'
import Button2 from '../components/ui/Button2'
import { useFonts } from "expo-font";

const Requests = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedRequest, setFetchedRequest] = useState('')
  const [isFetching, setIsFetching] = useState(true)


  useEffect(() => {
  const fetchRequests = async() => {
      setIsFetching(true)
      const response = await ShowFetchedRequests(authCtx.customerId, authCtx.token)
      console.log(response)
      setFetchedRequest(response)
      setIsFetching(false)

  }
    fetchRequests()
  }, [setFetchedRequest])

  
      const check = fetchedRequest.length
      console.log(check)

  
  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
    'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
    'poppinsBold': require("../assets/font/Poppins_bold.ttf")
  
  })
  
  if(!fontloaded){
  return <LoadingOverlay/>
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.requestText}>Requests</Text>

    {isFetching ? <LoadingOverlay/> : 
      <FlatList
        style={styles.flatlists}
        data={fetchedRequest}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
          <View style={styles.container}>
            <Pressable style={styles.pressables}>
              <Text style={styles.requestName}>{item.cat_name}</Text>
              <Text>{item.created_at}</Text>
            <View style={styles.buttonContainer}>
              <Button2 style={styles.button2}>Cancel</Button2>
              <Button style={styles.button}>View Request</Button>
            </View>
            </Pressable>
          </View>
        }
      
      />
    }
    </SafeAreaView> 
  )
};

export default Requests;

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    marginHorizontal: 8,
    // marginTop: "5%"
  },
  flatlists:{
    // top: 0,
    marginBottom: 20
  },
  requestName:{
    // fontWeight: "700",
    fontSize: FontSize.size_xl,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsBold'
  },
  container: {
    // padding: 5,
    flex: 1,
    // justifyContent:'space-between',
    // marginBottom: 20

  },
  pressables:{
    // backgroundColor: Color.skyblue,
    borderRadius: 10,
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
    height: 145,
    padding: 10
  },
  buttonContainer:{
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center'
    width: "100%"
  },
  button:{
    paddingTop: 7,
    height: 40
  },
  button2: {
    paddingTop: 7,
    height: 40,
    // backgroundColor: 'white',
    color: 'brown'
  },
});

