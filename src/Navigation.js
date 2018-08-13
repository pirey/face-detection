import { createStackNavigator } from 'react-navigation'
import { HomeScreen, FaceRegistrationScreen, FaceDetectionScreen } from 'src/screens'

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Deteksi Wajah'
    }
  },
  FaceRegistration: {
    screen: FaceRegistrationScreen,
    navigationOptions: {
      header: null
    }
  },
  FaceDetection: {
    screen: FaceDetectionScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Home'
})

export default MainStack
