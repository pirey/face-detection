import React from 'react'
import { Alert, ActivityIndicator, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Full, Camera, Text, Button, Space } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { func, object } from 'prop-types'

import { connect } from 'react-redux'
import { enroll } from 'src/stores/recognition'

const MODE_SET_SUBJECT_ID = 'MODE_SET_SUBJECT_ID'
const MODE_CAMERA = 'MODE_CAMERA'

class FaceRegistrationScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      _loading: false,
      mode: MODE_SET_SUBJECT_ID,
      subjectId: '',
      faces: []
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleFacesDetected = this.handleFacesDetected.bind(this)
    this.handleCapture = this.handleCapture.bind(this)
    this.handleChangeSubjectId = this.handleChangeSubjectId.bind(this)
  }
  changeMode (mode) {
    this.setState({ mode })
  }
  handleChangeSubjectId (subjectId) {
    this.setState({ subjectId })
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleFacesDetected ({ faces }) {
    this.setState({ faces })
  }
  handleCapture () {
    const { subjectId } = this.state
    const { dispatch, navigation } = this.props

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
  renderFace ({ bounds, faceID, rollAngle, yawAngle }) {
    return (
      <View
        key={faceID}
        transform={[
          { perspective: 600 },
          { rotateZ: `${rollAngle.toFixed(0)}deg` },
          { rotateY: `${yawAngle.toFixed(0)}deg` }
        ]}
        style={[
          styles.face,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y
          }
        ]}>
        <Text style={styles.faceText}>ID: {faceID}</Text>
      </View>
    )
  }
  renderFaces () {
    const { faces } = this.state
    return null
    return ( // eslint-disable-line
      <View
        style={styles.facesContainer}
        pointerEvents='none'
      >{faces.map(this.renderFace)}</View>
    )
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
  renderLoading () {
    const { _loading } = this.state
    return _loading ? (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.8)',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        <ActivityIndicator size='large' />
      </View>
    ) : (
      null
    )
  }
  renderInputMode () {
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
          <Space height={20} />
          <Button onPress={() => {
            if (subjectId === '') {
              Alert.alert('', 'Silakan masukan nama anda')
            } else {
              this.changeMode(MODE_CAMERA)
            }
          }} title='Lanjut' />
        </View>
      </View>
    )
  }
  render () {
    const { mode } = this.state
    if (mode === MODE_SET_SUBJECT_ID) {
      return this.renderInputMode()
    } else {
      return (
        <Full>
          <Camera
            handleRef={this.handleCameraRef}
            onFacesDetected={this.handleFacesDetected}
          >
            {this.renderBottomBar()}
          </Camera>
          {this.renderFaces()}
          {this.renderLoading()}
        </Full>
      )
    }
  }
}

const styles = StyleSheet.create({
  bottomBar: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    flexDirection: 'row'
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  }
})

FaceRegistrationScreen.propTypes = {
  dispatch: func,
  navigation: object
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(FaceRegistrationScreen)
