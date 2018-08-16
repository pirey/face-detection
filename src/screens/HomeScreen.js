import React from 'react'
import { Center } from 'src/components'
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
      <Center />
    )
  }
}

HomeScreen.propTypes = {
  navigation: object
}

export default HomeScreen
