import React from 'react'
import { View, Alert, TouchableOpacity } from 'react-native'
import { Camera, CameraBottomBar, CameraTopBar } from 'src/components/camera'
import { Text, Space } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { object } from 'prop-types'

import { searchFace } from 'src/lib/FacePlusPlus'

class FaceRecognitionScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: false
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleCapture = this.handleCapture.bind(this)
  }
  componentWillUnmount () {
    // tear down any refs
    this.camera = null
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleCapture () {
    const { navigation } = this.props

    this.setState({ loading: true })
    this.camera.takePictureAsync({ base64: true })
      .then(result => {
        const imageBase64 = `data:image/jpg;base64,${result.base64}`
        return searchFace({ imageBase64 })
      })
      .then(response => {
        this.setState({ loading: false })

        const name = response.results[0].user_id
        const title = 'WAJAH DIKENALI'
        const msg = `Nama: ${name}`
        Alert.alert(title, msg)
      })
      .then(() => {
        this.setState({ loading: false })

        const title = 'WAJAH TIDAK DIKENALI'
        const msg = 'Wajah tidak dikenali / belum terdaftar, silakan daftarkan wajah terlebih dahulu agar bisa dikenali'
        const buttons = [
          { text: 'Tutup', style: 'cance' },
          { text: 'Daftarkan Wajah', onPress: () => navigation.navigate('FaceRegistration') }
        ]
        Alert.alert(title, msg, buttons)
      })
  }
  render () {
    const { loading } = this.state
    return (
      <Camera
        loading={loading}
        handleRef={this.handleCameraRef}
      >
        <CameraTopBar style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <View>
            <Space height={20} />
            <Text style={{ color: 'white', fontSize: 24 }}>PENGENALAN WAJAH</Text>
            <Space height={20} />
          </View>
        </CameraTopBar>
        <CameraBottomBar>
          <TouchableOpacity
            onPress={this.handleCapture}
          >
            <Ionicons name='ios-radio-button-on' size={70} color='white' />
          </TouchableOpacity>
        </CameraBottomBar>
      </Camera>
    )
  }
}

FaceRecognitionScreen.propTypes = {
  navigation: object
}

export default FaceRecognitionScreen
