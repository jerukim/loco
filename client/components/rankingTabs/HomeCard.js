import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 300
  }
}

const HomeCard = props => {
  const {classes, homes, homeId} = props
  const home = homes[homeId]
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={home.imgUrl} />
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {home.location.address}
        </Typography>
        <Typography variant="headline" component="h2">
          ${home.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          More Info
        </Button>
      </CardActions>
    </Card>
  )
}

const mapState = state => {
  return {
    homes: state.homes
  }
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(HomeCard))
