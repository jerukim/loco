import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Clear from '@material-ui/icons/Clear'
import AddressForm from './AddressForm'

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  title: {
    fontSize: '8px'
  },
  header: {
    right: 0,
    height: '0px',
    padding: '0px 0px'
  },
  cancel: {padding: '0px 0px'},
  media: {
    height: '50px',
    width: '50px'
  },
  actions: {
    display: 'flex'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    },
    padding: '0px'
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  content: {
    paddingTop: '0px',
    paddingBottom: '0px',
    display: 'flex',
    flexWrap: 'wrap',
    flexFlow: 'column'
  }
})

class AddressCard extends React.Component {
  state = {expanded: false}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  }

  render() {
    const {classes, home} = this.props

    return (
      <Card className={classes.card}>
        <CardContent>
          <CardHeader
            action={
              <IconButton className={classes.cancel}>
                <Clear />
              </IconButton>
            }
            className={classes.header}
          />
          <div className="flex-container">
            <div className="media-wrap">
              <CardMedia image={home.imgUrl} className={classes.media} />
            </div>
            <Typography variant="body2">{home.location.address}</Typography>
          </div>
          <Typography variant="body1">{home.price}</Typography>

          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.content}>
            <AddressForm home={home} />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

AddressCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddressCard)
