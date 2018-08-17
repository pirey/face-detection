import React from 'react'
import { TouchableOpacity } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { HomeScreen, FaceRegistrationScreen, FaceRecognitionScreen } from 'src/screens'
import { Ionicons } from '@expo/vector-icons'

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Aplikasi Pengenalan Wajah',
      headerLeft: () => (
        <TouchableOpacity
          onPress={navigation.openDrawer}
          style={{
            marginLeft: 20
          }}
        >
          <Ionicons name='md-menu' size={24} />
        </TouchableOpacity>
      )
    })
  }
})

const MainStack = createDrawerNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: 'Halaman Utama'
    }
  },
  FaceRegistration: {
    screen: FaceRegistrationScreen,
    navigationOptions: {
      drawerLabel: 'Daftarkan Wajah'
    }
  },
  FaceRecognition: {
    screen: FaceRecognitionScreen,
    navigationOptions: {
      drawerLabel: 'Pengenalan Wajah'
    }
  }
}, {
  initialRouteName: 'HomeStack'
})

export default MainStack
