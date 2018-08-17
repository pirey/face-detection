import React from 'react'
import { StyleSheet, View } from 'react-native'
import { node } from 'prop-types'

const CameraBottomBar = (props) => (
  <View style={styles.bottomBar}>
    {props.children}
  </View>
)

CameraBottomBar.propTypes = {
  children: node
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  }
})

export default CameraBottomBar
