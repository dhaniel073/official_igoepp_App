import { StyleSheet, View, Text, Image, SafeAreaView, Button, Pressable} from "react-native";
import PagerView from "react-native-pager-view";
// import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import Button2 from "../components/ui/Button2";
import Onboarding from "react-native-onboarding-swiper";
import { useFonts } from "expo-font";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Color, FontSize } from "../components/ui/GlobalStyles";
import Button4 from "../components/ui/Button4";



function FirstDisplayScreen({navigation}){

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

  const Down = ({...props}) => (
     <Pressable {...props} style={({pressed}) => [styles.press, pressed && styles.pressed]}>
       <Text style={styles.presstext}>Done</Text>
      </Pressable>
    )

    const Next = ({...props}) => (
      <Pressable {...props} style={({pressed}) => [styles.press, pressed && styles.pressed]}>
        <Text style={styles.presstext}>Next</Text>
       </Pressable>
     )

     const Skip = ({...props}) => (
      <Pressable {...props} style={({pressed}) => [styles.skip, pressed && styles.pressed]}>
        <Text style={styles.presstext}>Skip</Text>
       </Pressable>
     )

    return (
      <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      // bottomBarColor= {Color.peru}
      bottomBarHeight={90}
      NextButtonComponent={Next}
      DoneButtonComponent={Down}
      SkipButtonComponent={Skip}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      imageContainerStyles={styles.imageStyles}
      pages={
      
        [
        {
          backgroundColor: Color.dimgray_100,
          image: <Image style={styles.image1} source={require('../assets/vectors/g10.png')}/>,
          title: 'Welcome To Igoepp',
          subtitle: 'We Make Sure are Customers are satisfied with our services',
        },
        {
          // backgroundColor: '#a6e4d0',
          backgroundColor: Color.darkgray,
          image: <Image style={styles.image2} source={require('../assets/vectors/onboarding2.png')} />,
          title: 'HandyMen',
          subtitle: 'We make sure ur Request are carried out Properly as you need them to',
        },
        
        {
          // backgroundColor: '#e9bcbe',
          backgroundColor: Color.darkolivegreen_100,
          image: <Image style={styles.image3} source={require("../assets/vectors/group-783.png")} />,
          title: 'Our Transactions',
          subtitle: 'Our Transactions Are Smooth and steady ',
        },
        
        
      ]}
    />
    )
}

export default FirstDisplayScreen;
const styles = StyleSheet.create({
  container:{
    padding: 0,
    margin: 0
  },
  imageStyles:{
    height: "52%",
    width: "100%",
  },
  image1:{
    marginTop: "10%",
    height: "93%",
    width: "85%",
  },
  image2:{
    marginTop: "10%",
    height: "100%",
    width: "90%",
  },
  image3:{
    marginTop: "10%",
    marginBottom: 0,
    height: "93%",
    width: "85%",
  },
  logo:{
    width: 100,
    height: 100
  },
  title:{
    fontFamily: 'poppinsBold',
    fontSize: FontSize.size_7xl,
    color: Color.white
  },
  subtitle:{
    fontSize: FontSize.size_base,
    fontFamily: 'poppinsSemiBold'
  },
  pressed:{
    opacity: 0.4
  },
  press:{
    paddingRight: 20,
  },
  presstext:{
    fontFamily: 'poppinsSemiBold',
    color: Color.white
  },
  skip:{
    paddingLeft: 20,
  },
  
});