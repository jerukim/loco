import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const FilterDropDown = props => {
  //console.log('PROPS IN DROP-DOWN:', props)
  const {
    availableCategories,
    selectedCategories,
    anchorEl,
    handleMenuClose,
    handleMenuClick
  } = props

  return (
    <div>
      <Button
        aria-owns={anchorEl ? 'simple-menu' : null}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        SELECT FILTERS
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {availableCategories &&
          availableCategories.map(category => (
            <MenuItem
              key={category.id}
              onClick={e =>
                handleMenuClose(e, {
                  ...category,
                  priority: selectedCategories.length + 1
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
