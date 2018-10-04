import React from 'react'
import CategoryChips from './CategoryChips'
import CompareButton from './CompareButton'

const SelectedCategories = props => {
  console.log('SELECTED CATEGORIES PROPS: ', props)

  return (
    <div>
      <div>
        <h5>SELECTED CATEGORIES</h5>
      </div>
      <div>
        <ul className="list selected-categories">
          {props.selectedCategories &&
            props.selectedCategories.map(category => {
              return (
                <li className="list-items" key={category.categoryId || category.placeId}>
                  <CategoryChips
                    chipId={category.categoryId || category.placeId}
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
