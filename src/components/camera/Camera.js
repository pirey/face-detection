import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Camera, Permissions } from 'expo'
import { Spinner, Center, Text } from 'src/components'
import { func, bool } from 'prop-types'

class Camera_ extends React.Component {
  constructor () {
    super()
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      faces: []
    }

    this.handleFacesDetected = this.handleFacesDetected.bind(this)
  }

  async componentWillMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  handleFacesDetected ({ faces }) {
    this.setState({ faces })
  }

  renderFace ({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` }
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y
          }
        ]}>
        <Text style={styles.faceText}>ID: {faceID}</Text>
      </View>
    )
  }

  renderFaces () {
    const { faces } = this.state
    return null
    return ( // eslint-disable-line
      <View
        style={styles.facesContainer}
        pointerEvents='none'
      >{faces.map(this.renderFace)}</View>
    )
  }

  renderLoading () {
    const { loading } = this.props
    return loading ? (
      <Spinner />
    ) : (
      null
    )
  }

  renderNoPermission () {
    return (
      <Center>
        <Text>Anda harus memberikan izin kepada aplikasi untuk menggunakan camera</Text>
      </Center>
    )
  }
  renderCamera () {
    const { type } = this.state
    const { handleRef } = this.props
    return (
      <React.Fragment>
        <Camera
          ref={handleRef}
          type={type}
          style={styles.camera}
          ratio='16:9'
          {...this.props}
        />
        {this.renderFaces()}
        {this.renderLoading()}
      </React.Fragment>
    )
  }
  render () {
    const { hasCameraPermission } = this.state
    return hasCameraPermission ? (
      this.renderCamera()
    ) : (
      this.renderNoPermission()
    )
  }
}

Camera_.propTypes = {
  handleRef: func,
  loading: bool
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  }
})

export default Camera_
