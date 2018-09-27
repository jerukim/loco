import React from 'react'
import {ScreensNavbar, ScreensMap, ScreenRankingTabs} from './screens'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <ScreensNavbar />
      <Routes />
      <ScreensMap />
      <ScreenRankingTabs />
    </div>
  )
}

export default App
