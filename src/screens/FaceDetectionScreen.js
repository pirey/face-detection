import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Full, Camera, Text } from 'src/components'

class FaceDetectionScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      faces: []
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleFacesDetected = this.handleFacesDetected.bind(this)
  }
  handleCameraRef (ref) {
    this.camera = ref
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
    return (
      <View
        style={styles.facesContainer}
        pointerEvents='none'
      >{faces.map(this.renderFace)}</View>
    )
  }
  render () {
    return (
      <Full>
        <Camera
          ref={this.handleCameraRef}
          onFacesDetected={this.handleFacesDetected}
        />
        {this.renderFaces()}
      </Full>
    )
  }
}

const styles = StyleSheet.create({
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
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

export default FaceDetectionScreen
