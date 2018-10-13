import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PlaceIcon from '@material-ui/icons/Place'
import {removeCountry} from '../../../../utilities'
import {selectPlaceId} from '../../../../store'

const styles = () => ({
  inline: {
    display: 'inline-block'
  }
})

class PlaceDetail extends React.Component {
  handleClick = () => {
    const {place, selectPlaceId} = this.props
    selectPlaceId(place.id)
  }
  render() {
    const {place, classes} = this.props
    const {lat, lng} = place
    return (
      <div className="flex-container content-wrap">
        <div style={{marginLeft: '-10px'}} className="media-wrap inline">
          <PlaceIcon style={{marginRight: '5px', fontSize: '32px'}} />
        </div>
        <div>
          <Typography style={{display: 'inline-block'}} variant="body2">
            {removeCountry(place.location.address)}
          </Typography>
          <div className="flex-container space-between">
            <Typography variant="body1">{place.name}</Typography>
            <a href="#" onClick={() => this.handleClick({lat, lng})}>
              <Typography
                variant="body1"
                color="primary"
                className={classes.inline}
              >
                View on Map
              </Typography>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  selectPlaceId: homeId => dispatch(selectPlaceId(homeId))
})

export default connect(null, mapDispatch)(withStyles(styles)(PlaceDetail))
