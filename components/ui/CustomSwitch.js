import { StyleSheet, Text, View, Switch } from 'react-native'
import React from 'react'
import { Color } from './GlobalStyles'
// import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

const CustomSwitch = ({isEnabled, toggleSwitch, onAccessibilityTap}) => {
  return (
    <View>
      <Switch
        
        trackColor={{ false: 'default', true: 'green' }}
        thumbColor={'white'}
        ios_backgroundColor={'white'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        onAccessibilityTap={onAccessibilityTap}
      />
    </View>
  )
}

export default CustomSwitch

const styles = StyleSheet.create({})