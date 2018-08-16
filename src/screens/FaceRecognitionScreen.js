import React from 'react'
import { Alert, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Camera } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { func, object } from 'prop-types'

import { connect } from 'react-redux'
import { recognize } from 'src/stores/recognition'

class FaceRecognitionScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      _loading: false
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleCapture = this.handleCapture.bind(this)
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleCapture () {
    const { dispatch, navigation } = this.props

    this.setState({ _loading: true })

    this.camera.takePictureAsync({ base64: true })
      .then(result => {
        const image = `data:image/jpg;base64,${result.base64}`
        return dispatch(recognize({ image }))
      })
      .then(response => {
        if (response.Errors) {
          const title = ''
          const msg = 'Wajah tidak dikenali / belum terdaftar, silakan daftarkan wajah terlebih dahulu agar bisa dikenali'
          const buttons = [
            { text: 'Tutup', style: 'cance' },
            { text: 'Daftarkan Wajah', onPress: () => navigation.navigate('FaceRegistration') }
          ]
          Alert.alert(title, msg, buttons)
        } else {
          const name = response.images[0].transaction.subject_id
          const title = ''
          const msg = `Wajah yang dikenali: ${name}`
          Alert.alert(title, msg)
        }
        this.setState({ _loading: false })
      })
  }
  renderBottomBar () {
    return (
      <View style={styles.bottomBar}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={this.handleCapture}
            style={{ alignSelf: 'center' }}
          >
            <Ionicons name='ios-radio-button-on' size={70} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  render () {
    const { _loading } = this.state
    return (
      <Camera
        loading={_loading}
        handleRef={this.handleCameraRef}
        onFacesDetected={this.handleFacesDetected}
      >
        {this.renderBottomBar()}
      </Camera>
    )
  }
}

const styles = StyleSheet.create({
  bottomBar: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    flexDirection: 'row'
  }
})

FaceRecognitionScreen.propTypes = {
  dispatch: func,
  navigation: object
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(FaceRecognitionScreen)
