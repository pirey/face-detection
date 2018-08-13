import React from 'react'
import { View } from 'react-native'
import { number } from 'prop-types'

const Space = ({ width, height }) => {
  return (
    <View
      style={{
        width,
        height
      }}
    />
  )
}

Space.propTypes = {
  width: number,
  height: number
}

export default Space
