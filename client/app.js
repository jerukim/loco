import React from 'react'
import {
  ScreensNavbar,
  ScreensMap,
  ScreensRankingTabs,
  ScreensSidePanel
} from './screens'
import {TipButton} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="main">
     // <TipButton /> gucci!
      <ScreensNavbar />
      <div id="top">
        <ScreensSidePanel />
        <ScreensMap />
      </div>
      <div id="bottom">
        <ScreensRankingTabs />
      </div>
      <Routes />
    </div>
  )
}

export default App
