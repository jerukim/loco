import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import SelectedCategories from './SelectedCategories'
import Menu from './Menu'

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit,
    width: '44%',
    backgroundColor: 'white'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
})

const Categories = props => {
  const {classes, items} = props
  return (
    <div className="categories-display side-panel-body">
      <div className="content-wrap flex-container menu-buttons">
        <Menu />
      </div>
      <Typography
        style={{textAlign: 'center', margin: '12px auto'}}
        variant="caption"
        gutterBottom
      >
        Drag and drop your preferences from most important to least important (1
        = highest priority)
      </Typography>
      <SelectedCategories items={items} />
    </div>
  )
}

export default withStyles(styles)(Categories)
