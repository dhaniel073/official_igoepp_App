import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Color } from "../components/ui/GlobalStyles";
import Input from "../components/Auth/Input";
import Button from "../components/ui/Button";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibraryAsync } from "expo-image-picker";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";

const data = [
    { label: 'Male ', value: 'M' },
    { label: 'Female ', value: 'F' },
  
  ];


function Profile(){
    // const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [image, setImage] = useState(null);
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const pickImage = async () => {

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result.assets[0]);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };


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

      function updateProfilehandler(){
        console.log(sex, phone, last_name, first_name, image)
      }
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.imageView}>
                {!image ?
                <Image
                    style={styles.Image}
                    source={require("../assets/vectors/person.png")}
                />
                    : 
                <Image
                    style={styles.Image}
                    source={{ uri: image }}
                />
                }
                <Button style={styles.upload}  onPress={pickImage}>Upload Image</Button>
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
    updatebutton:{
        marginTop: 20
    },
    upload:{
        marginTop: 5,
        // padding: 20,
    },
    container:{
        marginTop: "10%",
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
        paddingHorizontal: 8,
        marginTop: 10
      },
      icon: {
        marginRight: 5,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 437,
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