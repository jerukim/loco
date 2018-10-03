import React, {Component} from 'react'
import FilterDropDown from './FilterDropDown'
import SelectedCategories from './SelectedCategories'

class CategoryFilter extends React.Component {
  render() {
    return (
      <div>
        <div>
          <FilterDropDown />
        </div>
        <div>
          <SelectedCategories />
        </div>
      </div>
    )
  }
}

export default CategoryFilter
