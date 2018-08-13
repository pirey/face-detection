import React from 'react'
import { Alert, ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Full, Camera, Text } from 'src/components'
import { Ionicons } from '@expo/vector-icons'
import { func, object } from 'prop-types'

import { connect } from 'react-redux'
import { recognize } from 'src/stores/recognition'

class FaceDetectionScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      _loading: false,
      faces: []
    }

    this.handleCameraRef = this.handleCameraRef.bind(this)
    this.handleFacesDetected = this.handleFacesDetected.bind(this)
    this.handleRecognize = this.handleRecognize.bind(this)
  }
  handleCameraRef (ref) {
    this.camera = ref
  }
  handleFacesDetected ({ faces }) {
    this.setState({ faces })
  }
  handleRecognize () {
    const { dispatch, navigation } = this.props

    this.setState({ _loading: true })

    this.camera.takePictureAsync({ base64: true })
      .then(result => {
        const image = `data:image/jpg;base64,${result.base64}`
        return dispatch(recognize({ image }))
      })
      .then(response => {
        if (response.Errors) {
          const title = 'Gagal'
          const msg = 'Wajah tidak dikenali / belum terdaftar, silakan daftarkan wajah terlebih dahulu agar bisa dikenali'
          const buttons = [
            { text: 'Tutup', style: 'cance' },
            { text: 'Daftarkan Wajah', onPress: () => navigation.navigate('FaceRegistration') }
          ]
          Alert.alert(title, msg, buttons)
        } else {
          const name = response.images[0].transaction.subject_id
          const title = 'Sukses'
          const msg = `Wajah yang dikenali: ${name}`
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
    return (
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
            onPress={this.handleRecognize}
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
  render () {
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

FaceDetectionScreen.propTypes = {
  dispatch: func,
  navigation: object
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(FaceDetectionScreen)
