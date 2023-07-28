import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown'
import {useFonts} from 'expo-font'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Color } from '../components/ui/GlobalStyles'
import axios from 'axios'
import { AuthContext } from '../store/auth-context'

const data = [
  { label: 'Cash ', value: 'C' },
  { label: 'Wallet ', value: 'WA' },

];


const WIDTH = Dimensions.get('window').width
const HEIGHT_MODAL = 200

const SimpleModal = ({...props}) => {


  const [sex, setSex] = useState('')
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation()
  const authCtx = useContext(AuthContext)
  closeModal = (bool, data) => {
      props.changeModalVisible(bool);
      props.setData(data);
  }

  console.log(props)


  const id = {props}

  console.log(id.bill_Id)
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


  const onSubmit = async() => {

    try {
     const response = await axios.post(url, {
        "bidid": "110",
        "payment_type": "cash",
        "charge_payment_type": "10",
        "session_id": authCtx.sessionId,
        "application": "webapp"
     }) 
    } catch (error) {
      
    }
    console.log("Proceed")
    navigation.navigate("Welcome")
  }

  return (
    <TouchableOpacity
        disabled={true}
        style={styles.container}
    >

      <View style={styles.modal}>
        <View style={styles.textView}>
            <Text style={[styles.text, {fontSize: 20, fontFamily: 'montserratBold'}]}>Payment Method</Text>
            <SafeAreaView style={{ padding:30 }}>
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
              value={sex}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setSex(item.value);
                setIsFocus(false);
              }}
            //   onChangeText={updateInputValueHandler.bind(this, 'sex')}
              
            />
          </SafeAreaView>


        </View>
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.touchableOpacity} onPress={() => closeModal(false, 'Cancel')}>
                  <Text style={[styles.text, {color: 'blue'}]}>
                    Cancel
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.touchableOpacity} onPress={() => [closeModal(false, 'Proceed'), onSubmit()]}>
              <Text style={[styles.text, {color: 'blue'}]}>
                Proceed
              </Text>
          </TouchableOpacity>
          </View>
      </View>
    </TouchableOpacity>
  )
}

export default SimpleModal

const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      marginBottom: 10,
      paddingHorizontal: 10,
      // marginTop: 8
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily:'poppinsRegular'
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: 'poppinsSemiBold'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    container:{
      marginTop:'30%',
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
    textView:{
        flex: 1,
        // alignItems: 'center',
    },
    text:{
      margin:5,
      fontSize: 16,
      textAlign: 'center'
    },
    buttonView:{
      width: '100%',
      flexDirection: 'row', 
    },
    touchableOpacity:{
      flex:1,
      paddingVertical: 10,
      alignItems: 'center'
    }
})