import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit
  }
})

function handleChipDelete(chipId) {
  //console.log('chip', categoryId)
  alert('You clicked the delete icon.')
  // dispatch action to remove filter
  // update style to push other filters up
}

function handleChipClick(chipId) {
  console.log('I WILL SHOW YOU THE PINS IN THE MAP for:', chipId)
}

const CategoryChips = props => {
  // console.log('PROPS IN CHIPS: ', props)

  const {classes, placeId} = props

  return (
    <div className={classes.root}>
      {placeId ? (
        <Chip
          avatar={<Avatar>{props.priority}</Avatar>}
          label={props.label}
          onClick={() => handleChipClick(props.chipId)}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
      ) : (
        <Chip
          avatar={<Avatar>{props.priority}</Avatar>}
          label={props.label}
          onClick={() => handleChipClick(props.chipId)}
          onDelete={() => handleChipDelete(props.chipId)}
          className={classes.chip}
          color="primary"
          variant="outlined"
        />
      )}
    </div>
  )
}

CategoryChips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CategoryChips)
