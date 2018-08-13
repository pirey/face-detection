import React from 'react'
import { Camera, Center, Text } from 'src/components'

class FaceDetectionScreen extends React.Component {
  render () {
    return (
      <Camera>
        <Center>
          <Text>FACE DETECTION</Text>
        </Center>
      </Camera>
    )
  }
}

export default FaceDetectionScreen
