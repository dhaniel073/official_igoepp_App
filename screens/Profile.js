import { StyleSheet, View, TextInput, Text, Image, ScrollView, Alert, Pressable, Platform, TouchableOpacity, ImageBackground } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Input from "../components/Auth/Input";
import Button from "../components/ui/Button";
import { launchImageLibraryAsync } from "expo-image-picker";
import { useContext, useEffect, useRef, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { customerInfocheck, upLoadPicture, updateUserinfo } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Button3 from "../components/ui/Button3";
import axios from "axios";
import {Ionicons} from '@expo/vector-icons'
// import useTheme from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import * as React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const data = [
    { label: 'Male ', value: 'M' },
    { label: 'Female ', value: 'F' },
  
  ];

const option = {
  title: 'Select image',
  type: 'library',
  options:{
    maxLength: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: true,
  }
}



function Profile({route, props}){
  const navigation = useNavigation()
  // const [value, setValue] = useState(null);
  const authCtx = useContext(AuthContext)
  const [isFocus, setIsFocus] = useState(false);
  const [fetchedmessage, setFetchedMesssage] = useState('')
  const [image, setImage] = useState(null);
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [sex, setSex] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [isCityFocus, setIsCityFocus] = useState(false);

  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);


  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');



  const {colors} = useTheme()


  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  const snapPoints = ["40%"]

  const choosePhotoFromLibrary = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const RenderHeader = () => {
    return (
      <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle}></View>
            </View>
      </View>
    )
  }

  const RenderInner = () => {
    return (
      <View style={styles.panel}>
        <View>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text  style={styles.panelSubtitile}>Choose From Library</Text>
          <Text>Cancel</Text>
        </View>
      </View>
    )
  }

  // useEffect(() => {
  
  //   async function UserInfo(){
  //     setIsLoading(true)
  //     try{
  //       await customerInfocheck(authCtx.customerId, authCtx.token)
  //       .then((res) => {
  //         console.log(res.data.data)
  //         setFetchedMesssage(res.data.data)
  //         // setFetcheddata(data)
  //       })  
  //     }catch(error){
  //       console.log(error.response)
  //     }
  //     setIsLoading(false)
  //   }
  //   UserInfo()
  // },[]) 



  // console.log(route.params)
  // console.log(props)
  useEffect(() => {

    var config = {
        method: 'get',
        url: "http://phixotech.com/igoepp/public/api/auth/general/country",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${authCtx.token}`
        } 
    }

    axios(config)
    .then(function (response) {
        // console.log(JSON.stringify(response.data.data))
        var count = Object.keys(response.data.data).length
        // console.log(count)
        let countryArray = []
        for (var i = 0; i < count; i++){
            countryArray.push({
                label: response.data.data[i].country_name,
                value: response.data.data[i].id,
            })
            // setCountryCode(response.data.data[i].id)
        }
        setCountryData(countryArray)
    })
    .catch(function (error) {
        console.log(error);
    })
}, [])

const handleState = (countryCode) => {

    var config = {
        method: 'get',
        url: `http://phixotech.com/igoepp/public/api/auth/general/state/${countryCode}`,
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${authCtx.token}`
        }
    }

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data))
        var count = Object.keys(response.data.data).length;
        let stateArray = []
        for (var i = 0; i < count; i++){
            stateArray.push({
                label: response.data.data[i].state_name,
                value: response.data.data[i].id,
            })
            // setStateCode(response.data.data[i].id)
        }
        setStateData(stateArray)
    })
    .catch(function (error) {
        console.log(error);
    })

}

const handleCity = (countryCode, stateCode) => {
    // console.log(`http://phixotech.com/igoepp/public/api/auth/general/lga/${stateCode}`)
    var config = {
        method: 'get',
        url: `http://phixotech.com/igoepp/public/api/auth/general/lga/${stateCode}`,
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${authCtx.token}`
        }
    }

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data))
        var count = Object.keys(response.data.data).length;
        let cityArray = []
        for (var i = 0; i < count; i++){
            cityArray.push({
                label: response.data.data[i].lga_name,
                value: response.data.data[i].id,
            })
            // setCityCode(response.data.data[i].lga_code)
        }
        setCityData(cityArray)
    })
    .catch(function (error) {
        console.log(error);
    })

}

        const [fontloaded] =  useFonts({
          'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
          'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
          'poppinsMedium': require("../assets/font/Poppins_medium.ttf"),
          'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf"),
          'poppinsBold': require("../assets/font/Poppins_bold.ttf")

        })

        if(!fontloaded || isLoading){
        return <LoadingOverlay/>
        }

        function updateInputValueHandler(inputType, enteredValue) {
          switch (inputType) {
              case 'first_name':
                  setFirstName(enteredValue);
                break;
              case 'last_name':
                  setLastName(enteredValue);
                break;
              case 'phone':
                  setPhone(enteredValue);
                break;
              
          }
        }

        async function updateProfilehandler(){
          const customerId = authCtx.customerId
          const token = authCtx.token
  
          if(!last_name || !first_name || !sex || !phone || !countryName || !stateName || !cityName ){
           Alert.alert("Empty Field", "Please fill in the fields correctly")
          //  console.log(last_name, first_name, sex, phone, countryName, stateName, cityName)
          }else{
            console.log(last_name, first_name, sex, phone, countryName, stateName, cityName)
            setIsLoading(true)
          try {
              const response = await updateUserinfo(last_name, first_name, sex, phone, customerId, token, countryName, stateName, cityName)
              console.log(response.data.data)
              setFirstName()
              setLastName()
              setPhone()
              setSex()
              setCountryData()
              setStateData()
              setCityData()
              setCountry()
              setState()
              setCity()
              setCountryName()
              setStateName()
              setCityName()
              navigation.navigate('ViewProfile')
            } catch (error) {
              console.log(error)
              
            }
            setIsLoading(false)
          }
        }
  
  

    return (
      <ScrollView style={{ flex:1}}>
      <View style={[styles.container]}>
          <View style={{ margin: 20 }}>
              <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={choosePhotoFromLibrary}>
                    <View style={{ 
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                     }}>
                        <ImageBackground
                        source={{ uri: image }}
                        style={{ height: 100, width:100, borderWidth: 1, borderRadius: 15}}
                        imageStyle={{ borderRadius: 15, }}
                        >
                          <View style={{ 
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                           }}>
                              <Ionicons name="camera" size={35} style={{ 
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent:'center',
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 10,
                               }} color={Color.darkolivegreen_100}/>
                          </View>   
                        
                        </ImageBackground>
                    </View>
                  </TouchableOpacity>

                  <Text style={{ marginTop: 10,fontSize: 18, fontWeight:'bold' }}>{fetchedmessage.first_name} {fetchedmessage.last_name}</Text>
              </View>

              <View style={styles.action}>
                  <Ionicons size={20} color={colors.text} name="person"/>
                  <TextInput
                      placeholder="First Name"
                      placeholderTextColor="#666666"
                      onChangeText={updateInputValueHandler.bind(this, 'first_name')}
                      autoCorrect={false}
                      autoCapitalize='sentences'
                      value={first_name}
                      // autoCapitalize={true}
                      style={[styles.textInput, 
                       { color: colors.text}
                      ]}
                  />      
              </View>

              
              <View style={styles.action}>
                  <Ionicons size={20} color={colors.text} name="person"/>
                  <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="#666666"
                      onChangeText={updateInputValueHandler.bind(this, 'last_name')}
                      autoCorrect={false}
                      autoCapitalize='sentences'
                      value={last_name}
                      // autoCapitalize={true}
                      style={[styles.textInput, 
                      ]}
                  />      
              </View>

              
              <View style={styles.action}>
                  <Ionicons size={20} color={colors.text} name="call"/>
                  <TextInput
                      placeholder="Phone"
                      onChangeText={updateInputValueHandler.bind(this, 'phone')}
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={phone}
                      keyboardType="number-pad"
                      style={[styles.textInput, 
                      ]}
                  />      
              </View>

              <View style={styles.action2}>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select a Gender' : '...'}
            searchPlaceholder="Search..."
            value={sex}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSex(item.value);
              setIsFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
            
          />
            </View>


            <View style={styles.action2}>
            <Dropdown
              style={[styles.dropdown, isCountryFocus && { borderColor: 'blue' }]}
              placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
              selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
              inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
              iconStyle={styles.iconStyle}
              data={countryData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isCountryFocus ? 'Select Country' : '...'}
              searchPlaceholder="Search..."
              value={country}
              onFocus={() => setIsCountryFocus(true)}
              onBlur={() => setIsCountryFocus(false)}
              onChange={item => {
                  setCountry(item.value);
                  handleState(item.value);
                  setCountryName(item.label)
                  setIsCountryFocus(false);
      }}
      
    />
            </View>

            <View style={styles.action2}>
              <Dropdown
              style={[styles.dropdown, isStateFocus && { borderColor: 'blue' }]}
              placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
              selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
              inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
              iconStyle={styles.iconStyle}
              data={stateData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isStateFocus ? 'Select State' : '...'}
              searchPlaceholder="Search..."
              value={state}
              onFocus={() => setIsStateFocus(true)}
              onBlur={() => setIsStateFocus(false)}
              onChange={item => {
                  setState(item.value);
                  handleCity(country, item.value)
                  setStateName(item.label)
                  setIsStateFocus(false);
        }}
        
      />
            </View>

           
            <View style={styles.action2}>
            <Dropdown
              style={[styles.dropdown, isCityFocus && { borderColor: 'blue' }]}
              placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
              selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
              inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
              iconStyle={styles.iconStyle}
              data={cityData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isCityFocus ? 'Select City' : '...'}
              searchPlaceholder="Search..."
              value={city}
              onFocus={() => setIsCityFocus(true)}
              onBlur={() => setIsCityFocus(false)}
              onChange={item => {
                  setCity(item.value);
                  setCityName(item.label)
                  setIsCityFocus(false);
              }}
      
    />
            </View>
              <TouchableOpacity style={styles.commandButton} onPress={updateProfilehandler}>
                  <Text style={styles.panelBottomTitle}>Submit</Text>
              </TouchableOpacity>
          </View>

      </View>

      </ScrollView>

    )
}

export default Profile;

const styles = StyleSheet.create({
  containerBocttomSheet: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
    // marginTop: 8
  },
  commandButton:{
    padding: 15,
    borderRadius: 10,
    // backgroundColor: '#FF6347',
    // backgroundColor: Color.darkolivegreen_100,
    backgroundColor: Color.limegreen,
    alignItems: 'center',
    marginTop: 10
  },
  panel:{
    padding: 10,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4
  },
  header:{
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius:20,
  },
  panelHeader:{
    alignItems: 'center'
  },
  panelHandle:{
    width: 40,
    height: 8,
    borderRadius:4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle:{
    fontSize: 25,
    height: 35
  },
  panelSubtitile:{
    fontSize: 14,
    color: 'grey',
    height: 30,
    marginBottom: 10
  },
  panelButton:{
    padding:13,
    borderRadius: 10,
    backgroundColor: Color.darkolivegreen_100,
    alignItems: 'center',
    marginBottom: 7,
  },
  panelBottomTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  action2:{
    marginTop: 5,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError:{
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
    container:{
      flex:1,
      // alignItems: 'center',
      // justifyContent: 'center'
    },
    textInput:{
      flex: 1,
      fontFamily: 'poppinsRegular',
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      padding:5,
      color: '#05375a',
      fontSize: 15,
      top: 5,
    }
})