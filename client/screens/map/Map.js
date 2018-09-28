import React from 'react'
import {Map} from '../../components'

class ScreensMap extends React.Component {
  render() {
    return (
      <div id="main">
        <Map
          containerElement={<div style={{height: `100vh`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>
    )
  }
}

export default ScreensMap
