import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
})

const PlaceInfo = props => {
  const {classes, places} = props
  return (
    <div className={classes.root}>
      {places.map(place => {
        return (
          <ExpansionPanel key={place.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{place.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      })}
    </div>
  )
}

const mapState = state => {
  return {
    places: state.places
  }
}

PlaceInfo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapState)(withStyles(styles)(PlaceInfo))
