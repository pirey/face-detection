import React from 'react'
import { View } from 'react-native'
import { node } from 'prop-types'

const Full = (props) => {
  return (
    <View style={{flex: 1}}>
      {props.children}
    </View>
  )
}

Full.propTypes = {
  children: node
}

export default Full
