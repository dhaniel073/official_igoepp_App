import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';
import { Color } from '../ui/GlobalStyles';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import AppLoading from 'expo-app-loading';
import LoadingOverlay from '../ui/LoadingOverlay';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  style,
  maxLength,
  placeholder,
  multiline
  
}) {

  const [fontloaded] =  useFonts({
    'poppinsRegular': require("../../assets/font/Poppins/Poppins-Regular.ttf"),
    'montserratBold': require("../../assets/font/Montserrat_bold.ttf"),
    'poppinsMedium': require("../../assets/font/Poppins_medium.ttf")
  })


  if (!fontloaded) {
    return <LoadingOverlay/>;
  }
  return (
    <View style={styles.inputContainer}>
     {/* <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>*/}
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid, style]}
        // autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 7,
  },
  label: {
    color: 'black',
    marginBottom: 2,
    fontSize: 16,
    fontFamily: 'poppinsMedium'
  },
  labelInvalid: {
    color: Colors.error500,
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
  inputInvalid: {
    backgroundColor: Colors.error100,
  },
});
