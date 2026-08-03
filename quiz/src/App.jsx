import './App.css'
import Nav from './components/Nav'
import Questions from './components/Questions'
import appStore from './utils/appStore'
import {Provider} from "react-redux"

function App() {


  return (
    <Provider store={appStore}>
      <div>
        <Nav />
        <Questions />
      </div>
    </Provider>
  )
}

export default App
