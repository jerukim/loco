import React from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format'
import {getBounds} from '../../../../store'

const styles = () => ({
  media: {
    height: '50px',
    width: '50px'
  },
  inline: {
    display: 'inline-block'
  }
})

class HomeDetail extends React.Component {
  handleClick = () => {
    const {markers} = this.props
    let markersArr = []
    console.log('category results', markers)
    for (let key in markers) {
      if (markers.hasOwnProperty(key)) {
        for (let i = 0; i < markers[key].length; i++) {
          markersArr.push(markers[key][i].geometry.location)
        }
      }
    }
    console.log('before getBounds is called')
    getBounds(markers)
  }
  render() {
    const {classes, home} = this.props
    const {address, lat, lng} = home.location
    return (
      <div className="flex-container">
        <div className="media-wrap">
          <CardMedia image={home.imgUrl} className={classes.media} />
        </div>
        <div className="flex-wrap content-wrap card-title">
          {home.link ? (
            <a href={home.link} rel="noopener noreferrer" target="_blank">
              <Typography href="" variant="body2">
                {address}
              </Typography>
            </a>
          ) : (
            <Typography href="" variant="body2">
              {address}
            </Typography>
          )}
          <div className="flex-container space-between">
            <Typography variant="body1" className={classes.inline}>
              <NumberFormat
                value={home.price}
                displayType="text"
                thousandSeparator={true}
                prefix="$"
                renderText={value => value}
              />
            </Typography>
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

const mapState = (state, ownProps) => {
  const {home: {id: homeId}} = ownProps
  const markers = state.categoryResults[homeId]
  return {markers}
}

export default connect(mapState)(withStyles(styles)(HomeDetail))
