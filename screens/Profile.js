import { StyleSheet, View, Text, Image, ScrollView, Alert, Pressable, Platform } from "react-native";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Input from "../components/Auth/Input";
import Button from "../components/ui/Button";
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { upLoadPicture, updateUserinfo } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import { useNavigation } from "@react-navigation/native";
import Button3 from "../components/ui/Button3";
import axios from "axios";
import { androidCameraPermission } from "../util/Permissions";
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

function Profile(){
  const navigation = useNavigation()
    // const [value, setValue] = useState(null);
    const authCtx = useContext(AuthContext)
    const [isFocus, setIsFocus] = useState(false);
    const [image, setImage] = useState(null);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const pickImage = async () => {
        const image = await launchImageLibraryAsync(option)
        console.log(image.assets[0]);
        if (image.canceled) {
          navigation.goBack()
        }
        if (!image.canceled) {
          setImage(image.assets[0].uri);
          imageUpload(image.assets[0])
      };
  }

  const imageUpload = async (imagePath) => {
    console.log(imagePath)
    const imageData = new FormData()
    imageData.append("file", JSON.stringify({
      uri: imagePath.uri,
      name: 'image.png',
      fileName: 'image',
      type: imagePath.type
    }))
    console.log("form data", imageData)

    const url = "http://phixotech.com/igoepp/public/api/auth/customer/uploadpicture"

    try{
    const response = await axios.post(url, 
      {
        customerid: authCtx.customerId,
        picture: imagePath.uri
      },
    {
      headers: {
        Accept: 'application/json',
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${authCtx.token}`
      }
    }, )
    console.log(response)
  }catch(error){
      console.log(error.response.data.message)
  }
  }


    const renderLabel = () => {
      if (sex || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: Color.lightgreen }]}>
            Sex
          </Text>
        );
      }
      return null;
    };

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
            case 'sex':
                setSex(enteredValue);
              break;
        }
    }

      async function updateProfilehandler(){
        const customerId = authCtx.customerId
        const token = authCtx.token

        if(!last_name || !first_name || !sex || !phone){
         Alert.alert("Empty Field", "Please fill in the fields correctly")
        }else{
          setIsLoading(true)
        try {
            const response = await updateUserinfo(last_name, first_name, sex, phone, customerId, token)
            console.log(response.data.data)
            setFirstName('')
            setLastName('')
            setPhone('')
            setSex('')
            navigation.navigate('Welcome')
          } catch (error) {
            console.log(error)
            
          }
          setIsLoading(false)
        }
      }

      if(isLoading){
        return <LoadingOverlay/>
      }
    return (
        <ScrollView>
        <Pressable style={ ({pressed}) => [styles.backParent, pressed && styles.pressed]}
        onPress={() => navigation.goBack()}
        >
        
          <Image
            style={styles.image2}
            contentFit="cover"
            source={require("../assets/vectors/vector30.png")}
          />
    
          <Text style={styles.back}>Back</Text>
    
       
      </Pressable>
        <View style={styles.container}>

            <View style={styles.imageView}>
                {!image ?
                <Pressable onPress={pickImage}>
                  <Image
                  style={styles.Image}
                  source={require("../assets/vectors/person.png")}
                  />
                </Pressable>
                    : 
                <Pressable onPress={pickImage}>
                  <Image
                  style={styles.Image}
                  source={{ uri: image }}
                  />
                </Pressable>
                }
                {/*<Button style={styles.upload}  onPress={pickImage}>Upload Image</Button>*/}
                <Button3 style={styles.upload} onPress={pickImage}>Upload Image</Button3>
            </View>
            <Input
            placeholder={"First Name"}
            value={first_name}
            onUpdateValue={updateInputValueHandler.bind(this, 'first_name')}
            />

            <Input
            placeholder={"Last Name"}
            value={last_name}
            onUpdateValue={updateInputValueHandler.bind(this, 'last_name')}

            />

            <Input
            placeholder={"Phone"}
            keyboardType={'numeric'}
            value={phone}
            onUpdateValue={updateInputValueHandler.bind(this, 'phone')}
            maxLength={11}
            />


        {renderLabel()}
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
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={isFocus ? 'blue' : 'black'}
              name="man"
              size={20}
            />
          )}
        />

            <Button style={styles.updatebutton} onPress={updateProfilehandler}>Update Profile</Button>
        </View>
        </ScrollView> 
    )
}

export default Profile;

const styles = StyleSheet.create({
  space:{
    marginTop: 10
  },
  back:{
    fontSize: FontSize.size_mid,
    fontFamily: 'poppinsRegular',
    marginTop: 0
  },
  image2:{
    width: 15,
    height: 15,
    marginHorizontal: 10,
    marginTop: 3,
    marginBottom: 30
  },
  backParent:{
    top: 50,
    left: 10,
    flexDirection: 'row',
  },
    updatebutton:{
        marginTop: 20,
        backgroundColor: Color.limegreen
    },
    upload:{
        marginTop: 5,
        // padding: 20,
    },
    container:{
        marginTop: "20%",
        flex: 1,
        marginHorizontal: 40

    },
    Image:{
        borderRadius: 500,
        borderColor: Color.lightgreen,
        borderWidth: 2,
        width: 150, 
        height: 150,
        marginBottom: 20
    },
    imageView:{
        
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 2,
        // backgroundColor: Colors.primary100,
        // borderBottomColor: Color.lightgreen,
        borderBottomColor: Color.darkslategray_300,
        borderBottomWidth: 2,
        fontFamily: 'poppinsRegular',
        // borderRadius: 4,
        fontSize: 18,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 10,
        // marginTop: 8
      },
      icon: {
        marginRight: 5,
      },
      label: {
        // position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 15,
        width:50,
        fontFamily: 'poppinsRegular',
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 16,
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
})