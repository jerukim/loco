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
    <div>
      <ScreensNavbar />
      <Routes />
      <ScreensSidePanel />
      <ScreensMap />
      <ScreensRankingTabs />
    </div>
  )
}

export default App
