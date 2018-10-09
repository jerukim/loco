import React from 'react'
//import {compose, withProps, withStateHandlers} from 'recompose'
import {Marker, InfoWindow} from 'react-google-maps'

class MarkerInfo extends React.Component {
  state = {
    isOpen: false
  }

  onMarkerClick = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    console.log('MARKER INFO PROPS:', this.props)
    const {address, icon, image, name, position, price} = this.props
    return (
      <Marker
        icon={icon}
        position={{lat: position.lat, lng: position.lng}}
        onClick={this.onMarkerClick}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              {image ? <img src={image} alt="Home image" /> : <div />}
              <h1>{name}</h1>
              <p>{address}</p>
              <h5>{'$' + price}</h5>
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

export default MarkerInfo
