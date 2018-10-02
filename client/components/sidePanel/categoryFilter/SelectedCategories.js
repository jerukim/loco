//-------------WORK IN PROGRESS--------------------

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSelectedCategories} from '../../../store/'
// Material UI
import Chip from '@material-ui/core/Chip'

function handleDelete() {
  alert('You clicked the delete icon.')
}

class SelectedCategories extends Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchSelectedCategories(this.props.userId)
    }
  }

  render() {
    const {classes} = this.props
    const selectedCategories = this.props
    console.log('SELECTED CATEGORIES (THIS.PROPS): ', selectedCategories)

    if (this.props.selectedCategoriesErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (this.props.selectedCategoriesFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <div>
          <h4>CATEGORY FILTERS</h4>
        </div>
        <div>
          <h5>SELECTED CATEGORIES</h5>
        </div>
        <div>
          {selectedCategories &&
            selectedCategories.map(category => (
              <Chip
                key={category.id}
                label="Deletable Primary Chip"
                onDelete={handleDelete}
                className={classes.chip}
                color="primary"
                variant="outlined"
              >
                {selectedCategories.type.replace(/_/g, ' ')}
              </Chip>
            ))}
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
    fetchSelectedCategories: (userId) => dispatch(fetchSelectedCategories(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedCategories)
