import React from 'react'
import { Camera, Permissions } from 'expo'
import { Full, Center, Text } from 'src/components'
import { func } from 'prop-types'

class Camera_ extends React.Component {
  constructor () {
    super()
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.front
    }
  }

  async componentWillMount () {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
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
      <Full>
        <Camera
          ref={handleRef}
          type={type}
          style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}
          ratio='16:9'
          faceDetectionMode={Camera.Constants.FaceDetection.Mode.accurate}
          {...this.props}
        />
      </Full>
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
  handleRef: func
}

export default Camera_
