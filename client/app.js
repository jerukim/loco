import React from 'react'
import {
  ScreensNavbar,
  ScreensMap,
  ScreensRankingTabs,
  ScreensSidePanel
} from './screens'
import Routes from './routes'

const App = () => {
  return (
    <div id="main">
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
