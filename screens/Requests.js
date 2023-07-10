import * as React from "react";
import { Text, StyleSheet, View, Pressable, Image, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize, FontFamily } from "../components/ui/GlobalStyles";

const Requests = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Text style={styles.requestText}>Requests</Text>
    </ScrollView> 
  )
};

export default Requests;

const styles = StyleSheet.create({
 
});

