import { TextInput, Image, Platform, Pressable, StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useContext, useEffect, useState } from "react";
// import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import GoBack from "../components/ui/GoBack";
import { MakeRequest } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import { color } from "react-native-reanimated";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const data = [
    { label: 'Nigeria', value: 'Nigeria' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const vehicle = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
   
  ];

  const sizeofhelp = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
   
  ];

  const frequencies = [
    { label: 'One-off', value: 'One-off' },
    { label: 'Daily', value: 'Daily' },
    { label: 'Weekly', value: 'Weekly' },
    { label: 'Bi-Weekly', value: 'Bi-Weekly' },
    { label: 'Monthly', value: 'Monthly' },
    { label: 'Bi-Monthly', value: 'Bi-Monthly' },
    { label: 'Quarterly', value: 'Quarterly' },
    { label: 'Yearly', value: 'Yearly' },
  ];

  const interestfield = [
    { label: 'Request for help now', value: 'Request for help now' },
    { label: 'Request for help later', value: 'Request for help later' },
    { label: ' Browse through the system', value: 'Browse through the system' },
  ]




function RequestSendInfo({route}){
    const authCtx = useContext(AuthContext)
    const subcatId = route.params.subcatId
    const subcatDesc= route.params.subcatDesc
    const subcatName= route.params.subcatName
    const catId= route.params.catId
    // const [value, setValue] = useState(null);
    const [isCountryFocus, setIsCountryFocus] = useState(false);
    const [isStateFocus, setIsStateFocus] = useState(false);
    const [isCityFocus, setIsCityFocus] = useState(false);
    const [isFrequencyFocus, setIsFrequencyFocus] = useState(false);
    const [isVehicleFocus, setIsVehicleFocus] = useState(false);
    const [isHelpSizeFocus, setIsHelpSizeFocus] = useState(false);
    const [isInterestFocus, setIsInterestFocus] = useState(false)
    // console.log(route.params)

    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true)
    // const [showPicker, setShowPicker] = useState(false)
    // const [timePicker, setTimePicker] = useState(false)


    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [country, setCountry] = useState([]);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);


    const [countryName, setCountryName] = useState('');
    const [stateName, setStateName] = useState('');
    const [cityName, setCityName] = useState('');

    const [helpdate, setHelpDate] = useState('')
    const [date, setDate] = useState(new Date())
    const [showdatePicker, setShowDatePicker] = useState(false)

    const [helptime, setHelpTime] = useState('')
    const [time, setTime] = useState(new Date())
    const [showTimePicker, setShowTimePicker] = useState(false)
    

    const [addressfield, setAddressField] = useState('')
    const [interest, setInterest] = useState('')
    const [landmark, setLandmark] = useState('')
    const [description, setDescription] = useState('')
    const [vehiclerequest, setVehicleRequest] = useState('')
    const [frequency, setFrequency] = useState('')
    const [helpsize, setHelpSize] = useState('')



    const API_KEY = 'NzkyaWJJTlhGNXlNREhQV2UzSGJRWTkzVFBkMU9qOEt4V3hKenRBNg=='

    useEffect(() => {
        setIsLoading(true)

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
        setIsLoading(false)
    }, [])

    const handleState = (countryCode) => {
        setIsLoading(true)

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
        setIsLoading(false)

    }

    const handleCity = (countryCode, stateCode) => {
        setIsLoading(true)
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
        setIsLoading(false)

    }


    function updateInputValueHandler(inputType, enteredValue) {
        switch(inputType){
            case 'address':
                setAddressField(enteredValue);
                break;

            case 'country':
                setCountryData(enteredValue);
                break;

            case 'state':
                setStateData(enteredValue);
                break;

            case 'city':
                setCityData(enteredValue);
                break;

            case 'date':
                setHelpDate(enteredValue);
                break;
            
            case 'time':
                setHelpTime(enteredValue);
                break;

            case 'description':
                setDescription(enteredValue);
                break;
            
            case 'landmark':
                setLandmark(enteredValue);
                break;
                     
            // break;
        }

    }

    const toggleDatePicker = () => {
        setShowDatePicker(!showdatePicker)
    }

    const onChangeDatePicker = ({type}, selectdDate) => {
            if(type == 'set'){
                const currentDate = selectdDate;
                setDate(currentDate)

                if(Platform.OS === 'android'){
                    toggleDatePicker();
                    setHelpDate(currentDate.toDateString())
                }
            }else{
                toggleDatePicker()
            }
    }

    const confirmIOSDate = () => {
        setHelpDate(date.toDateString())
        toggleDatePicker()
    }

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker)
    }

    const onChangeTimePicker = ({type}, selectdTime) => {
            if(type == 'set'){
                const currentTime = selectdTime;
                // const setTime = selectdTime.getHours(). + 
                setDate(currentTime)

                if(Platform.OS === 'android'){
                    toggleTimePicker();
                    setHelpTime(currentTime.toLocaleTimeString())
                }
            }else{
                toggleTimePicker()
            }
    }

    const confirmIOSTime = () => {
        setHelpTime(time.toLocaleTimeString())
        toggleTimePicker()
    }
    

    
  

    const SubmitInformationHandler = async () => {
        const newdate = date
        const month = newdate.getUTCMonth() +1;
        const year = newdate.getUTCFullYear();
        const day = newdate.getUTCDate();
        const maindate = year + "-" + month + "-" +  day

        console.log(countryName, stateName,landmark, addressfield,
            
            helpdate,
            helptime,
            cityName,
            description,
            vehiclerequest,
            frequency,
            helpsize,
            interest,
            interest,
            )

        if(
            !addressfield|| !countryName || !helpdate || !helptime ||
            !stateName || !cityName || !landmark || !description 
            || !vehiclerequest || !frequency || !helpsize || !interest
        )
        {
            Alert.alert("Invalid Inputs", "Fill in the filled correctly to continue")
        }else{
            // const 
            // const requestData ={
            //     'customer_id':authCtx.customerId,
            //     'help_interest': interest,
            //     'help_location':addressfield,
            //     'help_country': countryName,
            //     'help_state':stateName,
            //     'help_lga':cityName,
            //     'help_landmark':landmark,
            //     'help_size':helpsize,
            //     'vehicle_req':vehiclerequest,
            //     'help_desc':description,
            //     'category_id':catId,
            //     'sub_category_id':subcatId,
            //     'help_date':maindate,
            //     "help_time": helptime,
            //     "help_frequency": frequency,
            //     "customer_budget": ""
            //  }
            setIsLoading(true)
            const url = 'http://phixotech.com/igoepp/public/api/auth/hrequest/store'
            try {
                const response = await axios.post(url, 
            {
                'customer_id':authCtx.customerId,
                'help_interest': interest,
                'help_location':addressfield,
                'help_country': countryName,
                'help_state':stateName,
                'help_lga':cityName,
                'help_landmark':landmark,
                'help_size':helpsize,
                'vehicle_req':vehiclerequest,
                'help_desc':description,
                'category_id':catId,
                'sub_category_id':subcatId,
                "help_time": helptime,
                'help_date':maindate,
                "help_frequency": frequency,
            },
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${authCtx.token}`
            }
        })
            navigation.navigate('Requests')

        }catch(error){
            // Alert
            console.log(error)
        }
// console.log(requestData)
            // console.log(response)
            setIsLoading(false)
    }}
    const [fontloaded] =  useFonts({
        'poppinsRegular': require("../assets/font/Poppins/Poppins-Regular.ttf"),
        'montserratBold': require("../assets/font/Montserrat_bold.ttf"),
        'poppingMedium': require("../assets/font/Poppins_medium.ttf"),
        'poppinsSemiBold': require("../assets/font/Poppins_semibold.ttf")
    })
    
    
      if (!fontloaded || isLoading) {
        return <LoadingOverlay/>
      }

    return (
        <View style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}>
  
      <GoBack onPress={() => navigation.goBack()}>Back</GoBack>
      
        <ScrollView style={styles.container} 
        showsVerticalScrollIndicator={false}
        
        >
            
            <Text style={styles.enterinformation}> Enter Information</Text>
            <View style={styles.inputContainer}>

            {/*location*/}
            <Text style={[styles.label, styles.labelInvalid]}>
                Address for Service :
            </Text>
            <Input
                style={styles.address}
                value={addressfield}
                onUpdateValue={updateInputValueHandler.bind(this, 'address')}
                placeholder ={"Enter Address For Service"}
            />

            {/*Country dropdown */}
            <View style={{ backgroundColor: "#fff", borderBottomWidth: 1, paddingBottom: 20, borderBottomColor: Color.darkslategray_300,}}>
            <Text style={[styles.label, styles.labelInvalid]}>Country :</Text>
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

        <Text style={[styles.label, styles.labelInvalid]}>State :</Text>
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

        <Text style={[styles.label, styles.labelInvalid]}>LGA :</Text>
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


        {/*date of service */}
            <Text style={[styles.label, styles.labelInvalid]}>
                Date for Service :
            </Text>

            {showdatePicker && (
                <DateTimePicker
                    mode="date"
                    display='spinner'
                    value={date}
                    onChange={onChangeDatePicker}
                    style={{ height: 120, marginTop: -10, fontFamily: 'poppinsRegular'}}
                    minimumDate={new Date()}
                />
            )}  

            {showdatePicker && Platform.OS === "ios" && (
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                <TouchableOpacity style={[styles.button1, styles.pickerButton, {backgroundColor: "#11182711"}]}
                    onPress={toggleDatePicker}
                >
                    <Text style={[styles.buttonText, {color: "#075985", fontFamily: 'poppinsRegular'}]}>Cancel</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button1, styles.pickerButton,]}
                    onPress={confirmIOSDate}
                >
                    <Text style={[styles.buttonText, {fontFamily: 'poppinsRegular'}]}>Confirm</Text>
                </TouchableOpacity>
            </View>
            )}

            {!showdatePicker && (
                <Pressable onPress={toggleDatePicker}>

                <TextInput
                    style={[styles.date, {fontFamily: 'poppinsRegular'}]}
                    placeholder="Sat Aug 21 2004"
                    value={helpdate}
                    onChangeText={updateInputValueHandler.bind(this, 'date')}
                    placeholderTextColor={"#11182744"}
                    editable={false}
                    onPressIn={toggleDatePicker}
                />
            </Pressable>
            )}


            
            <Text style={[styles.label, styles.labelInvalid]}>Size of Help</Text>
            <Dropdown
            style={[styles.dropdown, isHelpSizeFocus && { borderColor: 'blue' }]}
            placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
            selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
            inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
            iconStyle={styles.iconStyle}
            data={sizeofhelp}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isHelpSizeFocus ? 'Select Help Size' : '...'}
            searchPlaceholder="Search..."
            value={helpsize}
            onFocus={() => setIsHelpSizeFocus(true)}
            onBlur={() => setIsHelpSizeFocus(false)}
            onChange={item => {
              setHelpSize(item.value);
              setIsHelpSizeFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />

            <Text style={[styles.label, styles.labelInvalid]}>
                LandMark:
            </Text>
            <Input
                placeholder={"Whats your Landmark"}
                value={landmark}
                // keyboardType={'numeric'}
                onUpdateValue={updateInputValueHandler.bind(this, 'landmark')}
                // style={styles.description}
            />

            <Text style={[styles.label, styles.labelInvalid]}>Frequency</Text>
            <Dropdown
            style={[styles.dropdown, isFrequencyFocus && { borderColor: 'blue' }]}
            placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
            selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
            inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
            iconStyle={styles.iconStyle}
            data={frequencies}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFrequencyFocus ? 'Select Frequency' : '...'}
            searchPlaceholder="Search..."
            value={frequency}
            onFocus={() => setIsFrequencyFocus(true)}
            onBlur={() => setIsFrequencyFocus(false)}
            onChange={item => {
              setFrequency(item.value);
              setIsFrequencyFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />

            

            <Text style={[styles.label, styles.labelInvalid]}>
                Additional Note:
            </Text>
            <Input
                placeholder={"Whats your help Description"}
                value={description}
                onUpdateValue={updateInputValueHandler.bind(this, 'description')}
                multiline={true}
                // style={styles.description}
            />

            <Text style={[styles.label, styles.labelInvalid]}>Vehicle Req:</Text>
            <Dropdown
            style={[styles.dropdown, isVehicleFocus && { borderColor: 'blue' }]}
            placeholderStyle={[styles.placeholderStyle, {fontFamily: 'poppinsRegular'}]}
            selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
            inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
            iconStyle={styles.iconStyle}
            data={vehicle}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isVehicleFocus ? 'Do you need a Vehicle' : '...'}
            searchPlaceholder="Search..."
            value={vehiclerequest}
            onFocus={() => setIsVehicleFocus(true)}
            onBlur={() => setIsVehicleFocus(false)}
            onChange={item => {
              setVehicleRequest(item.value);
              setIsVehicleFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />


            <Text style={[styles.label, styles.labelInvalid]}>
                Time for Service :
            </Text>

            {showTimePicker && (
                <DateTimePicker
                    mode="time"
                    display='spinner'
                    value={time}
                    onChange={onChangeTimePicker}
                    style={{ height: 120, marginTop: -10, fontFamily: 'poppinsRegular'}}
                    // minimumDate={new Date()}
                />
            )}  

            {showTimePicker && Platform.OS === "ios" && (
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                <TouchableOpacity style={[styles.button1, styles.pickerButton, {backgroundColor: "#11182711"}]}
                    onPress={toggleTimePicker}
                >
                    <Text style={[styles.buttonText, {color: "#075985", fontFamily: 'poppinsRegular'}]}>Cancel</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[styles.button1, styles.pickerButton,]}
                    onPress={confirmIOSTime}
                >
                    <Text style={[styles.buttonText, {fontFamily: 'poppinsRegular'}]}>Confirm</Text>
                </TouchableOpacity>
            </View>
            )}

            {!showTimePicker && (
                <Pressable onPress={toggleTimePicker}>

                <TextInput
                    style={[styles.date, {fontFamily: 'poppinsRegular'}]}
                    placeholder="18:23:55"
                    value={helptime}
                    onChangeText={updateInputValueHandler.bind(this, 'time')}
                    placeholderTextColor={"#11182744"}
                    editable={false}
                    onPressIn={toggleTimePicker}
                />
            </Pressable>
            )}

              
           
            <Text style={[styles.label, styles.labelInvalid]}>Help Interest</Text>
            <Dropdown
            style={[styles.dropdown, isInterestFocus && { borderColor: 'blue' }]}
            placeholderStyle={[styles.placeholderStyle,{fontFamily: 'poppinsRegular'}]}
            selectedTextStyle={[styles.selectedTextStyle, {fontFamily: 'poppinsRegular'}]}
            inputSearchStyle={[styles.inputSearchStyle, {fontFamily: 'poppinsRegular'}]}
            iconStyle={styles.iconStyle}
            data={interestfield}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isInterestFocus ? 'Select Help Interest' : '...'}
            searchPlaceholder="Search..."
            value={interest}
            onFocus={() => setIsInterestFocus(true)}
            onBlur={() => setIsInterestFocus(false)}
            onChange={item => {
              setInterest(item.value);
              setIsInterestFocus(false);
            }}
            />
        <Button onPress={SubmitInformationHandler} style={styles.button}>Place Request</Button>
            </View>

            </ScrollView>
        
        </View>

    )
}

export default RequestSendInfo;

const styles = StyleSheet.create({
    button1:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: Color.darkolivegreen_100
    },
    buttonText:{
        fontSize: 14,
        fontWeight: "500",
        color: "#fff",
    },
    pickerButton:{
        paddingHorizontal: 20
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    label: {
        color: 'black',
        marginBottom: 2,
        fontSize: 16,
        fontFamily: 'poppinsMedium',
        marginTop: 10
      },
    mainContainer:{
        marginTop: "15%" 
    },
    enterinformation:{
        color: Color.darkolivegreen_100,
        fontSize: FontSize.size_15xl,
        fontFamily: 'poppinsBold',
    },
    back:{
        fontSize: FontSize.size_mid,
        fontFamily: 'poppinsRegular',
        marginTop: 0
      },
    container:{
        // marginTop: "18%",
        marginHorizontal: 10,
        marginBottom: 100,
        // justifyContent: 'center',
        // alignItems: 'center',
        // flex: 1
        },

    backParent:{
        flexDirection: 'row',
    },
    image:{
        width: 15,
        height: 15,
        marginHorizontal: 10,
        marginTop: 3,
        marginBottom: 30,
    },
    button:{
        backgroundColor: Color.limegreen,
        fontFamily: 'poppinsSemiBold',
        fontWeight: "700",
        marginTop: 50
    },
    address:{
        // marginTop: 30,
        borderBottomWidth: 1,
    },
    date:{
        // marginTop: 20,
        borderBottomWidth: 1,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 2,
        // backgroundColor: Colors.primary100,
        // borderBottomColor: Color.lightgreen,
        borderBottomColor: Color.darkslategray_300,
        borderBottomWidth: 2,
        color: 'black',
        fontFamily: 'poppinsRegular',

    },
    description:{
        // marginTop: 5,
        borderWidth: 1,
        borderRadius: 6,
        // height: 100,
        // marginHorizontal: 10
    },
    inputContainer:{
        marginHorizontal: 10,
        marginBottom: 50
    },
})