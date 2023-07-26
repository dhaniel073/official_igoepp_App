import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')
const BottomSheet = () => {

    const translationY = useSharedValue(0)

    const gesture = Gesture.Pan().onUpdate((event) => {
        translationY.value = event.translationY
    })

    const rBottomSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{translationY: translationY.value}],
        }
    })
  return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                    <View style={styles.line}>

                    </View>
            </Animated.View>
        </GestureDetector>

  )
}

export default BottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer:{
       height: SCREEN_HEIGHT,
       width: '100%',
       backgroundColor: 'black',
       position: 'absolute',
       top: SCREEN_HEIGHT / 1.5,
       borderRadius: 25,

    }, 
    line:{
        width: 75,
        hight: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    },
})