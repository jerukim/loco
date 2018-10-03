import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Clear from '@material-ui/icons/Clear'
import HomeDetail from './home/HomeDetail'
import HomeForm from './home/HomeForm'
import PlaceDetail from './place/PlaceDetail'
import PlaceForm from './place/PlaceForm'

const styles = theme => ({
  card: {
    maxWidth: 400,
    paddingBottom: '0px'
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
    flexWrap: 'wrap'
  }
})

class AddressCard extends React.Component {
  state = {expanded: false}

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}))
  }

  render() {
    const {classes, home, place} = this.props

    return (
      <Card>
        <CardContent className={classes.card}>
          <CardHeader
            action={
              <IconButton className={classes.cancel}>
                <Clear />
              </IconButton>
            }
            className={classes.header}
          />
          {home && <HomeDetail home={home} />}
          {place && <PlaceDetail place={place} />}
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
            {home && <HomeForm home={home} />}
            {place && <PlaceForm place={place} />}
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