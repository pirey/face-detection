import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node, object } from 'prop-types'

const CameraTopBar = (props) => (
  <View style={[styles.topBar, props.style]}>
    {props.children}
  </View>
)

CameraTopBar.propTypes = {
  children: node,
  style: object
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
})

export default CameraTopBar
