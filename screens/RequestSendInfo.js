import { TextInput, Image, Platform, Pressable, StyleSheet, Text, View, Alert, ScrollView } from "react-native";
import Button from "../components/ui/Button";
import Input from "../components/Auth/Input";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import { useEffect, useState } from "react";
// import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker"
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

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




function RequestSendInfo(){
    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [timePicker, setTimePicker] = useState(false)


    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(new Date())

    const [actualdate, setActualDate] = useState('')
    const [actualtime, setActualTime] = useState('')

    const [addressfield, setAddressField] = useState('')
    const [landmark, setLandmark] = useState('')
    const [description, setDescription] = useState('')
    const [vehiclerequest, setVehicleRequest] = useState('')
    const [frequency, setFrequency] = useState('')
    const [helpsize, setHelpSize] = useState('')



    const [answerfield, setDescritionField] = useState('')

    useEffect(() => {
        var config = {
            method: 'get',
            url: "https://api.countrystatecity.in/v1/countries",
            headers:{
                'X-CSCAPI-KEY': ''
            } 
        }

        setIsLoading(true)
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data))
            var count = Object.keys(response.data).length;
            let countryArray = []
            for (var i = 0; i < count; i++){
                countryArray.push({
                    value: response.data[i].iso2,
                    label: response.data[i].name
                })
            }
            setCountryData(countryArray)
        })
        .catch(function (error) {
            console.log(error);
        })
        setIsLoading(false)
    }, [])

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

            case 'desccription':
                setDescription(enteredValue);
                break;
                     
            // break;
        }

    }

    
    function toggleDatePicker(){
        setShowPicker(!showPicker)
    }

    function toggleTimePicker(){
        setTimePicker(!timePicker)
    }

    function onChange({type}, date){
        if (type == 'set'){
            const currentDate = date;
            console.log(currentDate)
            setDate(currentDate)
           
            if(Platform.OS === "android"){
                toggleDatePicker()
                setActualDate(currentDate.toDateString())
            }
        }else{
            toggleDatePicker()
        }
    }

    function onChange2({type}, time){
        if(type == 'set'){
            const currentTime = time;
            console.log(currentTime)
            setTime(currentTime)

            if(Platform.OS === "android"){
                toggleTimePicker()
                setActualTime(currentTime.toTimeString())
            }

        }else{
            toggleTimePicker()
        }
    }
  

    const SubmitInformationHandler = async () => {
        if(!answerfield || !date || !addressfield){
            Alert.alert("Invalid Inputs", "Check Values and try again")
        }else{
           console.log(answerfield, date, addressfield)
        }
    }

    return (
        <View style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}>
      <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]} onPress={() => navigation.goBack()}>
      <Image
          style={styles.image}
          contentFit="cover"
          source={require("../assets/vectors/vector30.png")}
          
      />
      <Text style={styles.back}>Back</Text>
      </Pressable>

      {isLoading ? <LoadingOverlay/> :
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
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countryData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select Country' : '...'}
                searchPlaceholder="Search..."
                value={countryData}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCountryData(item.value);
                    setIsFocus(false);
          }}
          
        />

        <Text style={[styles.label, styles.labelInvalid]}>State :</Text>
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
                placeholder={!isFocus ? 'Select State' : '...'}
                searchPlaceholder="Search..."
                value={stateData}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setStateData(item.value);
                    setIsFocus(false);
          }}
          
        />

        <Text style={[styles.label, styles.labelInvalid]}>LGA :</Text>
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
                placeholder={!isFocus ? 'Select City' : '...'}
                searchPlaceholder="Search..."
                value={cityData}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setCityData(item.value);
                    setIsFocus(false);
          }}
          
        />
        </View>


        {/*date of service */}
            <Text style={[styles.label, styles.labelInvalid]}>
                Date for Service :
            </Text>
              
            {showPicker && (
                <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                />
            )}

            {!showPicker && (
            <Pressable onPress={toggleDatePicker}>
                <TextInput
                        style={styles.date}
                        value={actualdate}
                        keyboardType={'numeric'}
                        onChangeText={updateInputValueHandler.bind(this, 'date')}
                        placeholder={"DD/MM/YY (For service Required)"}
                        // maxLength={10}
                        editable={false}
                />
            </Pressable>
            )}
            
            <Text style={[styles.label, styles.labelInvalid]}>Size of Help</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={sizeofhelp}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Help Size' : '...'}
            searchPlaceholder="Search..."
            value={helpsize}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setHelpSize(item.value);
              setIsFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />

            <Text style={[styles.label, styles.labelInvalid]}>
                LandMark:
            </Text>
            <Input
                placeholder={"Whats your Landmark"}
                value={landmark}
                keyboardType={'numeric'}
                onUpdateValue={updateInputValueHandler.bind(this, 'landmark')}
                // style={styles.description}
            />

            <Text style={[styles.label, styles.labelInvalid]}>Frequecy</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={frequencies}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Frequency' : '...'}
            searchPlaceholder="Search..."
            value={frequency}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setFrequency(item.value);
              setIsFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />

            

            <Text style={[styles.label, styles.labelInvalid]}>
                Help Description:
            </Text>
            <Input
                placeholder={"Whats your Landmark"}
                value={description}
                onUpdateValue={updateInputValueHandler.bind(this, 'description')}
                multiline={true}
                // style={styles.description}
            />

            <Text style={[styles.label, styles.labelInvalid]}>Frequecy</Text>
            <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={vehicle}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Frequency' : '...'}
            searchPlaceholder="Search..."
            value={vehiclerequest}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setVehicleRequest(item.value);
              setIsFocus(false);
            }}
          //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
          />


            <Text style={[styles.label, styles.labelInvalid]}>
                Time for Service :
            </Text>
              
            {timePicker && (
                <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={time}
                    onChange={onChange2}
                />
            )}

            {!timePicker && (
            <Pressable onPress={toggleTimePicker}>
                <TextInput
                        style={styles.date}
                        value={actualtime}
                        keyboardType={'numeric'}
                        onChangeText={updateInputValueHandler.bind(this, 'time')}
                        placeholder={"Select Time for Help Needed"}
                        // maxLength={10}
                        editable={false}
                />
            </Pressable>
            )}
        <Button onPress={SubmitInformationHandler} style={styles.button}>Place Request</Button>
            </View>

            </ScrollView>
        }
        </View>

    )
}

export default RequestSendInfo;

const styles = StyleSheet.create({
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
        marginBottom: 80,
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