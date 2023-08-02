import {useContext, useEffect, useRef, useState} from "react";
import { Text, StyleSheet, View, Pressable, Image, FlatList,RefreshControl, ScrollView, SafeAreaView, Platform, Alert, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../components/ui/GlobalStyles";
import { AuthContext } from "../store/auth-context";
import { SessionIDCheck, ShowFetchedRequests } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Button from '../components/ui/Button'
import Button4 from '../components/ui/Button4'
import { useFonts } from "expo-font";
import { TouchableRipple } from "react-native-paper";
import axios from "axios";
import { AntDesign } from '@expo/vector-icons'; 
import {Ionicons} from '@expo/vector-icons'
import GoBack from "../components/ui/GoBack";
import Modal from "react-native-modal";
import { CancelRequests } from "../util/auth";
import { Feather } from '@expo/vector-icons';
import call from "react-native-phone-call";


const WIDTH = Dimensions.get('window').width
const HEIGHT_MODAL = 200


const Requests = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedRequest, setFetchedRequest] = useState('')
  const [Id, setId] = useState('');
  const [isFetching, setIsFetching] = useState(true)
  const [isCancelModalVisible, setCancelModalVisible] = useState(false);
  const [reason, setReason] = useState('')
  const [helper_phone, setHelper_Phone] = useState('')
  const isInitialMount = useRef(true);
  const [refresh, setRefresh] = useState(false)

  const token = authCtx.token
  const customerId = authCtx.customerId


  const pullMe = () => {
    setRefresh(true)
    setTimeout(async() => {
      const response = await ShowFetchedRequests(customerId, token)
      // console.log(response)
      setFetchedRequest(response)
      authCtx.customerRequestsMade(JSON.stringify(fetchedRequest.length))
      setRefresh(false)
    }, 4000)
  }

  useEffect(() => {
       // Your useEffect code here to be run on update
       const fetchRequests = async() => {
        setIsFetching(true)
        const response = await ShowFetchedRequests(customerId, token)
        // console.log(response)
        setFetchedRequest(response)
        authCtx.customerRequestsMade(JSON.stringify(fetchedRequest.length))
        setIsFetching(false)
  
      }
      fetchRequests()
  
  }, [customerId, token])


  const HelperDetails = async(id) => {
    console.log(id)
    // assigned_helper
    const url = `http://phixotech.com/igoepp/public/api/auth/helper/${id}`
    await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${authCtx.token}`
      }
    }).then((res) => {
      // console.log(res.data.data.phone)
      const args = {
        number: (res.data.data.phone), // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
      }

      call(args).catch(console.error)
    }).catch((error) => {
      console.log(error)
    })
  }

  const MakeCall = () => {
      // const args = {
      //   // number: helper_phone.toString(),
      //   number: "2348103902560",
      //   prompt: true
      // };
     
      setHelper_Phone(null)
  }
 
console.log(helper_phone)
  const toggleCancelModal = (id) => {

    if(id === 'cancel'){
      console.log('cancel')
      setReason(null)
    }
    let sendId = id
    setId(sendId)
    // console.log(id)
    setCancelModalVisible(!isCancelModalVisible)
    
  }

  const CancelHandlerSubmit = async () => {
    // console.log(reason)
    // console.log(Id)
    setIsFetching(true)
    try {
        setFetchedRequest(true)
        const response = await CancelRequests(Id, authCtx.token, reason)
        // console.log(response)
        setReason(null)
        navigation.goBack()
        setIsFetching(false)
    } catch (error) {
        setReason(null)
        console.log(error)
    }
    setIsFetching(false)
}


  const NoRequestNote = () => {
    return (
        <View style={{ justifyContent:'center', alignItems:'center', marginTop: '70%' }}>
            <Text style={{ fontSize: FontSize.size_sm, color: 'grey', fontFamily: 'poppinsSemiBold' }}>No Request Made</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RequestHelp')}>
              <Text style={{ fontFamily: 'poppinsRegular', marginTop: 10, color: Color.limegreen }}>Make Request</Text>
            </TouchableOpacity>
        </View>
    )
 }

      // function CancelRequest(id){
      //   console.log(id)
      //   Alert.alert('Cancel Request', 'Are you sure you want to canel this request', [
      //     {
      //       text: 'Yes',
      //       onPress: () => navigation.navigate('CancelRequest', {id:id}),
      //     },
      //     {
      //       text: 'No',
      //       onPress: () => navigation.goBack(),
      //       cancelable: true,
      //       style: 'cancel',
      //     },
      //   ])
       
      // }
  
      // const check = fetchedRequest.length
      console.log(authCtx.customerId)



    //status of A == Acceptred
    const ButtonsConfig = (id) => {
      return (
        <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate("View Requests", {
          bid_id: id
        })} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
            <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>View Request</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('DisputeScreen')}} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: '#fff' }}>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
              <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Dispute</Text>
          </View>
        </TouchableOpacity>
        </View>
      )
    }

    //status of N == Not Acceptred
    const ButtonsConfig2 = (id) => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => [toggleCancelModal(id)]} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: '#fff' }}>
          <View style={{ paddingLeft: 35, paddingRight: 35 }}>
              <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("View Requests", {
            bid_id: id
          })} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
              <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                  <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>View Request</Text>
              </View>
          </TouchableOpacity>
        </View>

      )
    }


    // request with status of  
    const ButtonConfig3 = (name,id,count, status, helperId) => {
      return(
        <View style={{ flexDirection: 'row', justifyContent:'space-between', width: '100%' }}>
          <Text style={styles.requestName}>{name}</Text>

          {status === 'N' ? 
          <TouchableOpacity onPress={() => navigation.navigate("BidScreen",
          {
            cat_name: name,
            bid_id: id,
          })}>
            <Image style={{width: 40, height:40, borderRadius:20, borderColor: 'red', borderWidth: 1, marginRight:28}}  source={require("../assets/vectors/gavel_5741343.png")}/>
            <View style={{ backgroundColor: Color.tomato, position: 'absolute', top: -10, left: 40, borderRadius: 25, width:20,   }}>
              <Text style={{ fontSize: 12, top:1, color: Color.white, fontFamily:'poppinsBold', textAlign:'center'}}>{count}</Text>
            </View>
          </TouchableOpacity>
          : 
          status === 'X' ?
          <View>
              <Text style={{ fontFamily: 'poppinsBold', color: Color.tomato }}>Cancelled</Text>
          </View>
          :
          <View>
              <Text style={{ fontFamily: 'poppinsBold', color: Color.tomato }}>Accepted</Text>

             <View style={{ flexDirection: 'row' }}>

              <TouchableOpacity style={{ marginTop:8 }} onPress={()=> {HelperDetails(helperId)}}>
              {/*  <AntDesign name="wechat" size={34} color={Color.limegreen} />*/}
              <Feather name="phone-call" size={24} color={Color.limegreen} />

              </TouchableOpacity>

              <TouchableOpacity style={{ marginLeft: 8, }} onPress={() => navigation.navigate('Chat', {
              })}>
              {/*  <AntDesign name="wechat" size={34} color={Color.limegreen} />*/}
                <Ionicons name="chatbubbles" size={34} color={Color.limegreen} />
              </TouchableOpacity>
             </View>

          </View>
        }
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
{/*
  <Button4 onPress={() => {
    navigation.navigate("BidScreen",
    {
      cat_name: item.cat_name,
      bid_id: item.id,
    })
  }} 
style={styles.button2}>Bid ({item.bid_count === 0 ? "0" : item.bid_count})</Button4>*/}
  
  if(!fontloaded || isFetching){
  return <LoadingOverlay/>
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
    <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.requestText}>Requests</Text>
        {fetchedRequest.length === 0 ? <NoRequestNote/> :
              
          <FlatList
            style={styles.flatlists}
            data={fetchedRequest}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={() => {pullMe()}}
              />
            }
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
              <View style={styles.container}>
                  <Text style={styles.requestDate}>{item.created_at}</Text>
                    <Pressable style={styles.pressables}>
                    
                    <SafeAreaView>{ButtonConfig3(item.cat_name,item.id, item.bid_count, item.help_status, item.assigned_helper)}</SafeAreaView>

                      {item.help_status === 'N' ? 
                      <SafeAreaView>{ButtonsConfig2(item.id)}</SafeAreaView>
                : 
                      item.help_status === 'X' ?
                      <TouchableOpacity onPress={() => navigation.navigate("View Requests", {
                        bid_id: item.id
                      })} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.limegreen, backgroundColor: Color.limegreen,  }}>
                          <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                              <Text style={{ fontFamily: 'poppinsSemiBold', color: 'white' }}>View Request</Text>
                          </View>
                      </TouchableOpacity>
                
                :     
                     <SafeAreaView>{ButtonsConfig(item.id)}</SafeAreaView>
                         
                }
                </Pressable>
              </View>
            }
          
          /> 
          

      }


      {/*Cancel Request Modal*/}

             
      <Modal
      isVisible={isCancelModalVisible}
      animationInTiming={500}
      >
          <SafeAreaView style={styles.ontainer}>
          
              <View style={styles.modal}>
                  <View>
                  <Text style={[styles.text, {fontSize: 20, fontFamily: 'montserratBold'}]}>Cancel Request</Text>

                  <SafeAreaView style={{ paddingLeft:20, paddingRight:20, paddingTop:5, margin: 10 }}>
                      <TextInput
                          placeholder="Reason For Canceling Request"
                          autoCapitalize='sentences'
                          onChangeText={setReason}
                          multiline={true}
                          value={reason}
                          style={{ fontSize: 18, borderBottomWidth: 1, borderBottomColor: Color.darkolivegreen_100, padding:10, borderRadius:10 }}
                      />
                  </SafeAreaView>
                  </View>
                
          

              <View style={styles.buttonView}>
              <TouchableOpacity onPress={() => toggleCancelModal('cancel')} style={{ margin:10, padding:5, borderRadius: 3, borderWidth:1, borderColor:Color.firebrick_100   }}>
                <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                    <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.firebrick_100 }}>Cancel</Text>
                </View>
              </TouchableOpacity>      
              
              <TouchableOpacity onPress={() => [toggleCancelModal(), CancelHandlerSubmit()]} style={{ margin:10, padding:5, borderRadius: 3, backgroundColor:Color.limegreen   }}>
                  <View style={{ paddingLeft: 25, paddingRight: 25 }}>
                      <Text style={{ fontFamily: 'poppinsSemiBold', color:Color.white }}>Submit</Text>
                  </View>
              </TouchableOpacity>                 
              </View>

              </View>
          </SafeAreaView>
      </Modal>

    </SafeAreaView> 
  )
};

export default Requests;

const styles = StyleSheet.create({
  buttonView:{
    width: '100%',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent:'center'
  },
  text:{
    margin:5,
    fontSize: 16,
    textAlign: 'center'
  },
  ontainer:{
    // marginTop:'0%',
      flex:1,
      alignItems: 'center',
      justifyContent: 'center'
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
  requestText:{
    color: Color.darkolivegreen_100,
    fontSize: FontSize.size_15xl,
    fontFamily: 'poppinsBold',
    marginLeft: 10,
  },
  mainContainer:{
    flex: 1,
    marginHorizontal: 8,
   marginTop: "18%"
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
    fontFamily: 'poppinsSemiBold'
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
    height: 145,
    padding: 10
    
  },
  buttonContainer:{
    flex:1,
    // marginTop: 10,
    // marginLeft: 83,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%"
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

