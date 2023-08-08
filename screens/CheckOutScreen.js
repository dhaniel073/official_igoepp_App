import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {useFonts} from 'expo-font'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Dropdown } from 'react-native-element-dropdown'
import { AuthContext } from '../store/auth-context'
import {Ionicons, Entypo, FontAwesome5, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import { Color, FontSize } from '../components/ui/GlobalStyles'
import GoBack from '../components/ui/GoBack'




const data = [
  { label: 'Cash ', value: 'C' },
  { label: 'Wallet ', value: 'W' },

];


const CheckOutScreen = ({navigation}) => {
  const authCtx = useContext(AuthContext)
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [email, setEmail] = useState('')
  const [paymentmethod, setPaymentMethod] = useState('')
  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
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
  const [isLoading,setIsLoading]=useState(false)



  useEffect(() => {

    var config = {
        method: 'get',
        url: "http://phixotech.com/igoepp/public/api/auth/general/country",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${authCtx.token}`
        } 
    }

    axios (config)
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
              case 'address':
                setAddress(enteredValue);
              break;
              case 'email':
                setEmail(enteredValue);
              break;
              case 'landmark':
                setLandmark(enteredValue);
              break;
              
          }
        }

        async function CheckoutHandler(){
          const emailIsValid = email.includes('@')
          console.log(emailIsValid)
          const url = 'http://phixotech.com/igoepp/public/api/auth/checkout/store'
            if(!first_name || !landmark || !last_name || !emailIsValid || !phone || !countryName || !stateName || !cityName || !address){
                Alert.alert("Invalid Entry", "Check all fields and try again")
            }else{
              setIsLoading(true)
              await axios.post(url, {
                    firstname: first_name,
                    lastname: last_name,
                    "delivery_address": address,
                    delivery_landmark: landmark,
                    delivery_phone: phone,
                    delivery_email: email,
                    "delivery_state": stateName,
                    "delivery_country": countryName,
                    "customer_id": authCtx.customerId,
                    "payment_mode": paymentmethod
              }, {
                headers:{
                  Accept: 'application/json',
                  Authorization : `Bearer ${authCtx.token}`
                }
              }).then((res) => {

                if(res.data.message !== 'success'){
                  Alert.alert('Purchase Failed', res.data.message)
                }
                console.log(res.data)
                setAddress(null)
                setFirstName(null), setLastName(null), setPhone(null), setLandmark(null),setEmail(null)
                setPaymentMethod(null),setIsCountryFocus(null), setIsStateFocus(null),
                setIsFocus(null),setIsCityFocus(null),setCountryData(null),setStateData(null),
                setCityData(null),setCountry(null),setState(null),setCity(null),
                setCountryName(null),setStateName(null),setCityName(null),
                navigation.goBack()
              }).catch((error) => {
                console.log(error.response)
                
              })
              console.log(first_name, landmark, last_name, email, phone, countryName, stateName, cityName, address, paymentmethod)
              setIsLoading(false)
            }
          }

          if(!fontloaded || isLoading){
            return <LoadingOverlay message={"Making Purchase"}/>
            }

  return (
    <ScrollView style={{ marginTop: '15%', marginBottom: '15%' }} showsVerticalScrollIndicator={false}>
      
    <View style={[styles.container, {flex:1, margin: 10}]}>
    <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      <Text style={styles.CheckoutText}>Delivery Info</Text>
          <View style={{ margin: 10, marginBottom: "10%" }}>
              <View>

              <View style={styles.action}>
                  <Ionicons style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }}  size={20} color={'black'} name="person"/>
                  <TextInput
                      placeholder="First Name"
                      placeholderTextColor="#666666"
                      onChangeText={updateInputValueHandler.bind(this, 'first_name')}
                      autoCorrect={false}
                      autoCapitalize='sentences'
                      value={first_name}
                      // autoCapitalize={true}
                      style={[styles.textInput, 
                      ]}
                  />      
              </View>

              <View style={styles.action}>
                  <Ionicons size={20} style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }} color={'black'} name="person"/>
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
                  <Ionicons style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }}  size={20} color={'black'} name="call"/>
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

              <View style={styles.action}>
                <Ionicons style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }}  size={20} color={'black'} name="mail"/>
                <TextInput
                    placeholder="Email"
                    onChangeText={updateInputValueHandler.bind(this, 'email')}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    autoCapitalize='none'
                    value={email}
                    keyboardType="email-address"
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
                placeholder={!isFocus ? 'Select Payment Method' : '...'}
                searchPlaceholder="Search..."
                value={paymentmethod}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setPaymentMethod(item.value);
                    setIsFocus(false);
                }}
                //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
                renderLeftIcon= {() => (
                  <MaterialIcons name="payments" style={{marginRight:5}} size={24} color="black" />
                )}
                
                />
            </View>

            <View style={styles.action}>
               <Entypo style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }}  name="address" size={24} color="black" />
                <TextInput
                    placeholder="Address"
                    onChangeText={updateInputValueHandler.bind(this, 'address')}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={address}
                    // keyboardType="email-address"
                    style={[styles.textInput, 
                    ]}
                />      
            </View>

            <View style={styles.action}>
                <FontAwesome5 style={{ marginTop: Platform.OS === 'ios' ? 10 : 0 }}  name="landmark" size={24} color="black" />
                <TextInput
                    placeholder="Landmark"
                    onChangeText={updateInputValueHandler.bind(this, 'landmark')}
                    placeholderTextColor="#666666"
                    autoCorrect={false}
                    value={landmark}
                    style={[styles.textInput, 
                    ]}
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
              renderLeftIcon={() => (
                <Entypo name="globe" size={24} style={{marginRight:5}} color="black" />
              )}
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
              renderLeftIcon={() => (
                <Entypo name="location" size={24} style={{marginRight:5}} color="black" />
              )}
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
              renderLeftIcon={() => (
                <MaterialCommunityIcons name="city-variant-outline" style={{marginRight:5}} size={24} color="black" />
              )}
      
    />
            </View>

            </View>
                <TouchableOpacity style={styles.commandButton} onPress={CheckoutHandler}>
                    <Text style={styles.panelBottomTitle}>Submit</Text>
                </TouchableOpacity>
          </View>
        </View>
    </ScrollView>
  )
}

export default CheckOutScreen

const styles = StyleSheet.create({
  panelBottomTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
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
  CheckoutText:{
    color: Color.darkolivegreen_100,
    fontSize: FontSize.size_7xl,
    fontFamily: 'poppinsBold',
    marginLeft: 10,
    // marginBottom: 10
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


// {
//   "delivery_address": [
//       "The delivery address field is required."
//   ],
//   "delivery_state": [
//       "The delivery state field is required."
//   ],
//   "delivery_country": [
//       "The delivery country field is required."
//   ],
//   "customer_id": [
//       "The customer id field is required."
//   ],
//   "payment_mode": [
//       "The payment mode field is required."
//   ]
// }


// first name 
// last name
// delivery address
// landmark
// phone number
// email
// country 
// state
// lga