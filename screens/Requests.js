import {useContext, useEffect, useRef, useState} from "react";
import { Text, StyleSheet, View, Pressable, Image, FlatList, ScrollView, SafeAreaView, Platform, Alert, TouchableOpacity } from "react-native";
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

const Requests = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext)
  const [fetchedRequest, setFetchedRequest] = useState('')
  const [session_id, setSession_Id] = useState('');
  const [isFetching, setIsFetching] = useState(true)
  const isInitialMount = useRef(true);

  useEffect(() => {
    
       // Your useEffect code here to be run on update
       const fetchRequests = async() => {
        setIsFetching(true)
        const response = await ShowFetchedRequests(authCtx.customerId, authCtx.token)
        // console.log(response)
        setFetchedRequest(response)
        authCtx.customerRequestsMade(JSON.stringify(fetchedRequest.length))
        setIsFetching(false)
  
      }
      fetchRequests()
  
  }, [])

 
  // console.log(fetchedRequest.length)

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
      console.log(authCtx.sessionId)

    // useEffect(() => {
    //   setIsFetching(true)
    //   async function SessionId(){
    //     const url = 'https://phixotech.com/igoepp/public/api/auth/igoeppauth/sessioncheckcustomer'
    //    try {
    //     const response = await axios.post(url, {
    //       username: authCtx.email,
    //       application: 'mobileapp'
    //     },
    //     {
    //       headers: {
    //         Accept: 'application/json',
    //         Authorization: `Bearer ${authCtx.token}`
    //       }
    //     }
    //     )
    //     console.log(response.data)
    //     authCtx.customerSessionId(response.data.login_session_id)

    //    } catch (error) {
    //     console.log(error)
    //    }
    //   }
    //   setIsFetching(false)
    //   SessionId()
    // },[])
  

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
        <TouchableOpacity onPress={() => {}} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: '#fff' }}>
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
          <TouchableOpacity onPress={() => cancelRequest(id)} style={{ margin:10, padding:5, borderRadius: 3, borderWidth: 1, borderColor:Color.firebrick_100, backgroundColor: '#fff' }}>
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
    const ButtonConfig3 = (name,id,count, status) => {
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
            <View style={{ backgroundColor: Color.tomato, position: 'absolute', top: -10, left: 40, borderRadius: 25, width:25,   }}>
              <Text style={{ fontSize: 12, top:2, color: Color.white, fontFamily:'poppinsBold', textAlign:'center'}}>{count}</Text>
            </View>
          </TouchableOpacity>
          : 
          status === 'X' ?
          <View>
              <Text style={{ fontFamily: 'poppinsBold', color: Color.tomato }}>Cancled</Text>
          </View>
          :
          <View>
              <Text style={{ fontFamily: 'poppinsBold', color: Color.tomato }}>Accepted</Text>
              <TouchableOpacity style={{  marginLeft: 20, marginTop:4 }}>
              {/*  <AntDesign name="wechat" size={34} color={Color.limegreen} />*/}
                <Ionicons name="chatbubbles" size={34} color={Color.limegreen} />
              </TouchableOpacity>
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
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
              <View style={styles.container}>
                  <Text style={styles.requestDate}>{item.created_at}</Text>
                    <Pressable style={styles.pressables}>
                    
                    <SafeAreaView>{ButtonConfig3(item.cat_name,item.id, item.bid_count, item.help_status)}</SafeAreaView>

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
    </SafeAreaView> 
  )
};

export default Requests;

const styles = StyleSheet.create({

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

