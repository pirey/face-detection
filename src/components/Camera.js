import React from 'react'
import { Camera, Permissions } from 'expo'
import { Full, Center, Text } from 'src/components'
import { node, func } from 'prop-types'

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
    const { children, ref } = this.props
    return (
      <Full>
        <Camera
          ref={ref}
          type={type}
          style={{flex: 1}}
          ratio='16:9'
        >
          {children}
        </Camera>
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
  children: node,
  ref: func
}

export default Camera_
