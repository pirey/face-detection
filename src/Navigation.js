import { createStackNavigator } from 'react-navigation'
import { HomeScreen, FaceRegistrationScreen, FaceRecognitionScreen } from 'src/screens'

const MainStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Pengenalan Wajah'
    }
  },
  FaceRegistration: {
    screen: FaceRegistrationScreen,
    navigationOptions: {
      header: null
    }
  },
  FaceRecognition: {
    screen: FaceRecognitionScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Home'
})

export default MainStack
