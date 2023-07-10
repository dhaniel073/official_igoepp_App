import { StyleSheet, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import Button from "../components/ui/Button";
import { useNavigation } from "@react-navigation/native";
import Button2 from "../components/ui/Button2";
import DisplayScreen1 from "./DisplayScreen1";
import DisplayScreen2 from "./DisplayScreen2";
import DisplayScreen3 from "./DisplayScreen3";


function FirstDisplayScreen(){
    return (
        <PagerView style={styles.viewPager} initialPage={0}>
          <DisplayScreen1 key={1}/>
          <DisplayScreen2/>
          <DisplayScreen3/>
        
        </PagerView>
    )
}

export default FirstDisplayScreen;
const styles = StyleSheet.create({
  image2sub:{
    width: 444,
    height: 836,
  },
    viewPager: {
        flex: 1,
      },
    

      image2:{},
     

      Text:{
        position: 'absolute',
        marginTop: 170,
        marginLeft: "25%"
      },

      rootContainer:{
        flex: 1
      },

});