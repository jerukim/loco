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

function handleDelete() {
  alert('You clicked the delete icon.')
}

function handleClick() {
  alert('You clicked the Chip.')
}

const CategoryChips = props => {
  const {classes} = props
  console.log('CHIPS PROPS:  ', props)
  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar>{props.priority}</Avatar>}
        label={props.label}
        onClick={handleClick}
        onDelete={handleDelete}
        className={classes.chip}
        color="primary"
        variant="outlined"
      />
    </div>
  )
}

CategoryChips.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CategoryChips)
