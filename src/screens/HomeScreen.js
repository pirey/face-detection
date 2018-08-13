import React from 'react'
import { Center, Button, Space } from 'src/components'
import { object } from 'prop-types'

class HomeScreen extends React.Component {
  constructor () {
    super()
    this.openFaceRecognition = this.openFaceRecognition.bind(this)
    this.openFaceRegistration = this.openFaceRegistration.bind(this)
  }
  openFaceRecognition () {
    const { navigation } = this.props
    navigation.navigate('FaceRecognition')
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
        <Button title='Pengenalan Wajah' onPress={this.openFaceRecognition} />
      </Center>
    )
  }
}

HomeScreen.propTypes = {
  navigation: object
}

export default HomeScreen
