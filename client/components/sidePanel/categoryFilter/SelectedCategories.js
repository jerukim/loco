import React from 'react'
import CategoryChips from './CategoryChips'
import CompareButton from './CompareButton'

const SelectedCategories = props => {
  const {selectedCategories} = props

  return (
    <div>
      <div>
        <h5>SELECTED CATEGORIES</h5>
      </div>
      <div>
        <ul className="list selected-categories">
          {selectedCategories &&
            selectedCategories.map(category => {
              return (
                <li className="list-items" key={category.label}>
                  <CategoryChips
                    chipId={category.categoryId || category.placeId}
                    placeId={category.placeId}
                    label={category.label.replace(/_/g, ' ')}
                    priority={category.priority}
                  />
                </li>
              )
            })}
        </ul>
      </div>
      <div>
        <CompareButton />
      </div>
    </div>
  )
}

export default SelectedCategories
