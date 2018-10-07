import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import NumberFormat from 'react-number-format'

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
  handleClick = latLng => {}
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

export default withStyles(styles)(HomeDetail)
