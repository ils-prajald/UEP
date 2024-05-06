import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import UepNavigator from './src/navigaton/uepNavigator';



const App = () => {
  return (
    <Provider store={store}>
      <UepNavigator/>
    </Provider>
  )
}
export default App


