import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const FilterDropDown = props => {
  return (
    <div>
      <Button
        aria-owns={props.anchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={props.handleClick}
      >
        SELECT FILTERS
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        {props.availableCategories &&
          props.availableCategories.map(category => (
            <MenuItem
              key={category.categoryId}
              onClick={(e) => props.handleClose(e, {...category, priority: props.selectedCategories.length +1})}
            >
              {category.type.replace(/_/g, ' ')}
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}

export default FilterDropDown
