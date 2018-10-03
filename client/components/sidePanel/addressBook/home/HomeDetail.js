import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const styles = () => ({
  media: {
    height: '50px',
    width: '50px'
  }
})

const HomeDetail = props => {
  const {classes, home} = props
  return (
    <div className="flex-container">
      <div className="media-wrap">
        <CardMedia image={home.imgUrl} className={classes.media} />
      </div>
      <div className="flex-wrap content-wrap card-title">
        <Typography variant="body2">{home.location.address}</Typography>
        <Typography variant="body1">{home.price}</Typography>
      </div>
    </div>
  )
}

export default withStyles(styles)(HomeDetail)
