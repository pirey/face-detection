import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Spinner = () => (
  <View
    style={{
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }}
  >
    <ActivityIndicator size='large' />
  </View>
)

export default Spinner
