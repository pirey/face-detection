import React from 'react'
import { View } from 'react-native'
import { node } from 'prop-types'

const Center = (props) => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }}>{props.children}</View>
)

Center.propTypes = {
  children: node
}

export default Center
