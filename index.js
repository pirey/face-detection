import { KeepAwake, registerRootComponent } from 'expo'
import App from './src/App'
import Sentry from 'sentry-expo'

Sentry.config('https://853a030964744a28b945bacca08dffcc@sentry.io/1266716').install()

if (__DEV__) {
  KeepAwake.activate()
}

registerRootComponent(App)
