import {useContext, useEffect, useRef, useState} from "react";
import { Text, StyleSheet, View, Pressable, Image, FlatList, ScrollView, SafeAreaView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../components/ui/GlobalStyles";
import { AuthContext } from "../store/auth-context";
import { ShowFetchedRequests } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from '../components/ui/Button'
import Button4 from '../components/ui/Button4'
import { useFonts } from "expo-font";

const Requests = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedRequest, setFetchedRequest] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const isInitialMount = useRef(true);

  useEffect(() => {
    
       // Your useEffect code here to be run on update
       const fetchRequests = async() => {
        setIsFetching(true)
        const response = await ShowFetchedRequests(authCtx.customerId, authCtx.token)
        console.log(response)
        setFetchedRequest(response)
        setIsFetching(false)
  
      }
      fetchRequests()
  
  }, [])


      function cancelRequest(id){
        Alert.alert('Cancel Request', 'Are you sure you want to canel this request', [
          {
            text: 'Yes',
            onPress: () => navigation.navigate("CancelRequest", {
              id: id
            }) ,
          },
          {
            text: 'No',
            // onPress: () => navigation.goBack(),
            cancelable: true,
            style: 'cancel',
          },
        ])
       
      }
  

      // const check = fetchedRequest.length
      // console.log(check)

  
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
      {/*<Text style={styles.requestText}>Requests</Text>*/}

    {isFetching ? <LoadingOverlay/> : 
      <FlatList
        style={styles.flatlists}
        data={fetchedRequest}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
          <View style={styles.container}>
              <Text style={styles.requestDate}>{item.created_at}</Text>
            <Pressable style={styles.pressables}>
              <Text style={styles.requestName}>{item.cat_name}</Text>
            <View style={styles.buttonContainer}>
              <Button4 onPress={() => cancelRequest(item.id)} style={styles.button2}>Cancel</Button4>
              <Button onPress={() => navigation.navigate("View Requests", {
                bid_id: item.id
              })} style={styles.button}>View Request</Button>
              <Button4 onPress={() => {
                navigation.navigate("BidScreen",
                {
                  bid_id: item.id
                })
              }} 
              style={styles.button2}>Bid ({item.bid_count === 0 ? "0" : item.bid_count})</Button4>
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
  },
  flatlists:{
    marginBottom: 20
  },
  requestName:{
    fontSize: FontSize.size_xl,
    color: Color.darkolivegreen_100,
    fontFamily: 'poppinsBold',
    paddingBottom: 13,
  },
  requestDate:{
    marginHorizontal: 10,
    fontSize: 18,
    fontFamily: 'montserratBold'
  },
  container: {
    padding: 5,
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
    height: 145,
    padding: 10
    
  },
  buttonContainer:{
    flex:1,
    marginTop: 10,
    marginLeft: 83,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%"
  },
  button:{
    paddingTop: 7,
    backgroundColor: Color.limegreen,
    height: 40
  },
  button2: {
    paddingTop: 7,
    height: 40,
    // backgroundColor: 'white',
    color: 'brown'
  },
});

