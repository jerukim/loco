import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const FilterDropDown = props => {
  console.log('PROPS IN DROP-DOWN:', props)

  return (
    <div>
      <Button
        aria-owns={props.anchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={props.handleMenuClick}
      >
        SELECT FILTERS
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={props.anchorEl}
        open={Boolean(props.anchorEl)}
        onClose={props.handleMenuClose}
      >
        {props.availableCategories &&
          props.availableCategories.map(category => (
            <MenuItem
              key={category.id}
              onClick={e =>
                props.handleMenuClose(e, {
                  ...category,
                  priority: props.selectedCategories.length + 1
                })
              }
            >
              {category.type.replace(/_/g, ' ')}
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}

export default FilterDropDown
