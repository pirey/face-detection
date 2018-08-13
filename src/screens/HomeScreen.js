import React from 'react'
import { Center, Button, Space } from 'src/components'
import { object } from 'prop-types'

class HomeScreen extends React.Component {
  constructor () {
    super()
    this.openFaceDetection = this.openFaceDetection.bind(this)
    this.openFaceRegistration = this.openFaceRegistration.bind(this)
  }
  openFaceDetection () {
    const { navigation } = this.props
    navigation.navigate('FaceDetection')
  }
  openFaceRegistration () {
    const { navigation } = this.props
    navigation.navigate('FaceRegistration')
  }
  render () {
    return (
      <Center>
        <Button title='Daftarkan Wajah' onPress={this.openFaceRegistration} />
        <Space height={20} />
        <Button title='Deteksi Wajah' onPress={this.openFaceDetection} />
      </Center>
    )
  }
}

HomeScreen.propTypes = {
  navigation: object
}

export default HomeScreen
