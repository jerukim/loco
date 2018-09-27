import React from 'react'

// import {Navbar} from './components'
import {ScreensMap, ScreensNavbar} from './screens'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <ScreensNavbar />
      <Routes />
      <ScreensMap />
    </div>
  )
}

export default App
