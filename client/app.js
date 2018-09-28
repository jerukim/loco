import React from 'react'
import {
  ScreensNavbar,
  ScreensMap,
  ScreenRankingTabs,
  ScreenSidePanel
} from './screens'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <ScreensNavbar />
      <Routes />
      <ScreenSidePanel />
      <ScreensMap />
      <ScreenRankingTabs />
    </div>
  )
}

export default App
