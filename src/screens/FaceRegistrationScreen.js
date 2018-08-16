import React from 'react'
import { Alert, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Camera } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { func } from 'prop-types'

import { connect } from 'react-redux'
import { enroll } from 'src/stores/recognition'

class FaceRegistrationScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      _loading: false,
      subjectId: ''
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleCapture = this.handleCapture.bind(this)
    this.handleChangeSubjectId = this.handleChangeSubjectId.bind(this)
  }
  handleChangeSubjectId (subjectId) {
    this.setState({ subjectId })
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleCapture () {
    const { subjectId } = this.state
    const { dispatch } = this.props

    this.setState({ _loading: true })

    this.camera.takePictureAsync({ base64: true })
      .then(result => {
        const image = `data:image/jpg;base64,${result.base64}`
        return dispatch(enroll({ image, subjectId }))
      })
      .then(response => {
        if (response.Errors) {
          const title = ''
          const msg = 'Terjadi kesalahan saat memproses, silakan coba lagi'
          Alert.alert(title, msg)
        } else {
          const title = ''
          const msg = `Wajah berhasil didaftarkan`
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
  renderInput () {
    const { subjectId } = this.state
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center', flexGrow: 1, flexShrink: 0}}>
          <TextInput
            placeholder='Masukan nama anda'
            placeholderTextColor='grey'
            onChangeText={this.handleChangeSubjectId}
            value={subjectId}
          />
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

FaceRegistrationScreen.propTypes = {
  dispatch: func
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(FaceRegistrationScreen)
