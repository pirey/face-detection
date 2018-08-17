import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node, object } from 'prop-types'

const CameraBottomBar = (props) => (
  <View style={[styles.bottomBar, props.style]}>
    {props.children}
  </View>
)

CameraBottomBar.propTypes = {
  children: node,
  style: object
}

const styles = StyleSheet.create({
  bottomBar: {
    flex: 1,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
})

export default CameraBottomBar
