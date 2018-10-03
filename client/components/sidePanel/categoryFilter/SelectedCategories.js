import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedCategories} from '../../../store/'
import CategoryChips from './CategoryChips'

class SelectedCategories extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchSelectedCategories(this.props.userId)
    }
  }

  render() {
    const userCategories = this.props.selectedCategories

    if (this.props.selectedCategoriesErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (this.props.selectedCategoriesFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <div>
          <h5>SELECTED CATEGORIES</h5>
        </div>
        <div>
          <ul className="list selected-categories">
            {userCategories &&
              userCategories.map(category => {
                return (
                  <li className="list-items" key={category.id}>
                    <CategoryChips
                      label={category.type.replace(/_/g, ' ')}
                      priority={category.priority}
                    />
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    selectedCategoriesErrored: state.categories.selectedCategoriesErrored,
    selectedCategoriesFetching: state.categories.selectedCategoriesFetching,
    selectedCategories: state.categories.selectedCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: userId => dispatch(fetchSelectedCategories(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategories)
