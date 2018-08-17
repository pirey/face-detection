import React from 'react'
import { Image, Alert, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { Camera, CameraBottomBar, CameraTopBar } from 'src/components/camera'
import { Space, Spinner, Text } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { func } from 'prop-types'

import { connect } from 'react-redux'
import { enroll } from 'src/stores/recognition'

class FaceRegistrationScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      capturedImage: '',
      subjectId: ''
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleSubjectInputRef = this.handleSubjectInputRef.bind(this)

    this.handleCapture = this.handleCapture.bind(this)
    this.handleChangeSubjectId = this.handleChangeSubjectId.bind(this)
    this.handleEnroll = this.handleEnroll.bind(this)
  }
  handleChangeSubjectId (subjectId) {
    this.setState({ subjectId })
  }
  handleSubjectInputRef (ref) {
    this.subjectId = ref
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleCapture () {
    this.setState({ loading: true })
    this.camera.takePictureAsync({ base64: true })
      .then(result => {
        const image = `data:image/jpg;base64,${result.base64}`
        this.setState({ loading: false, capturedImage: image })
      })
  }
  handleEnroll () {
    const { dispatch } = this.props
    const { capturedImage, subjectId } = this.state

    // TODO proper validation
    if (!capturedImage) return
    if (!subjectId.trim()) {
      this.subjectId.focus()
      return
    }

    this.setState({ loading: true })
    dispatch(enroll({ image: capturedImage, subjectId }))
      .then(response => {
        if (response.Errors) {
          const title = 'Gagal'
          const msg = 'Terjadi kesalahan saat memproses, silakan coba lagi'
          Alert.alert(title, msg)
        } else {
          const title = 'Sukses'
          const msg = `Wajah berhasil didaftarkan`
          Alert.alert(title, msg)
        }
        this.setState({ loading: false, subjectId: '', capturedImage: '' })
      })
  }
  renderSubjectInput () {
    const { subjectId } = this.state
    return (
      <View style={{ padding: 15 }}>
        <TextInput
          ref={this.handleSubjectInputRef}
          value={subjectId}
          onChangeText={this.handleChangeSubjectId}
          placeholder='Masukkan nama...'
          placeholderTextColor='grey'
          underlineColorAndroid='transparent'
          style={styles.subjectInput}
        />
      </View>
    )
  }
  renderCapturedImage () {
    const { loading, capturedImage } = this.state
    return (
      <View style={styles.capturedImageContainer}>
        <Image style={styles.capturedImage} source={{ uri: capturedImage }} />
        <View style={styles.capturedImageTopBar}>
          <View style={styles.capturedImageActions}>
            <TouchableOpacity onPress={() => this.setState({ capturedImage: '' })}>
              <Ionicons name='ios-close' color='red' size={70} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleEnroll}>
              <Ionicons name='ios-checkmark' color='green' size={70} />
            </TouchableOpacity>
          </View>
          {this.renderSubjectInput()}
        </View>
        {loading && <Spinner />}
      </View>
    )
  }
  renderCamera () {
    const { loading } = this.state
    return (
      <Camera
        loading={loading}
        handleRef={this.handleCameraRef}
      >
        <CameraTopBar style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <View>
            <Space height={20} />
            <Text style={{ color: 'white', fontSize: 24 }}>DAFTARKAN WAJAH</Text>
            <Space height={20} />
          </View>
        </CameraTopBar>
        <CameraBottomBar>
          <TouchableOpacity onPress={this.handleCapture}>
            <Ionicons name='ios-radio-button-on' size={70} color='white' />
          </TouchableOpacity>
        </CameraBottomBar>
      </Camera>
    )
  }
  render () {
    const { capturedImage } = this.state

    return capturedImage ? this.renderCapturedImage() : this.renderCamera()
  }
}

FaceRegistrationScreen.propTypes = {
  dispatch: func
}

const styles = StyleSheet.create({
  capturedImageContainer: {
    flex: 1
  },
  capturedImage: {
    flex: 1
  },
  capturedImageTopBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingTop: 20,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  capturedImageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  subjectInput: {
    fontSize: 18,
    textAlign: 'center',
    height: 52,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 4
  }
})

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(FaceRegistrationScreen)
