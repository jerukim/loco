import React from 'react'
import {connect} from 'react-redux'
import {Marker, InfoWindow} from 'react-google-maps'
import NumberFormat from 'react-number-format'
import {gotCenter} from '../../store'

class MarkerInfo extends React.Component {
  // state = {
  //   isOpen: this.props.selectedMarker === this.props.markerId
  // }

  state = {
    isOpen: false
  }

  // onMarkerClick = () => {
  //   const {position} = this.props.position
  //   this.setState({isOpen: !this.state.isOpen})
  //   this.props.gotCenter({...position})
  //   this.props.toggleMarker(this.props.markerId)
  // }

  render() {
    const {address, icon, image, name, position, price} = this.props
    return (
      <Marker
        icon={icon}
        position={{lat: position.lat, lng: position.lng}}
        onClick={this.onMarkerClick}
        style={{width: '30px', height: '30px'}}
      >
        {this.state.isOpen && (
          <InfoWindow
            onCloseClick={this.onToggleOpen}
            onPositionChanged={this.onToggleOpen}
            style={{justifyContent: 'flex-start', overlow: 'unset'}}
          >
            <div className="all-center image-wrap">
              {image && (
                <img
                  height="75"
                  width="75"
                  src={image}
                  alt="Home image"
                  style={{marginLeft: '-21px'}}
                />
              )}
              <p className="info-p bold">{name}</p>
              <p className={`info-p ${image && `bold`}`}>{address}</p>
              {price && (
                <p className="info-p marker-p">
                  <NumberFormat
                    value={price}
                    displayType="text"
                    thousandSeparator={true}
                    prefix="$"
                  />
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}

const mapDispatch = dispatch => ({
  gotCenter: payload => dispatch(gotCenter(payload))
})

export default connect(null, mapDispatch)(MarkerInfo)
