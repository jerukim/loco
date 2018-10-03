import React from 'react'
import {SelectedCategories, CategoryFilter} from '../../components'

const Categories = props => {
  return (
    <div className="categories-display side-panel-body">
      <CategoryFilter />
      <SelectedCategories />
    </div>
  )
}

export default Categories
