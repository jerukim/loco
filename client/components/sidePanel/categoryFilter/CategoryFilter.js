import React from 'react'
import {connect} from 'react-redux'
import {
  fetchFilterCategories,
  fetchSelectedCategories,
  addNewSelectedFilter
} from '../../../store'
import FilterDropDown from './FilterDropDown'
import SelectedCategories from './SelectedCategories'

class CategoryFilter extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchSelectedCategories(this.props.userId)
    }
    this.props.fetchFilterCategories()
  }

  state = {
    anchorEl: null
  }

  // ACTION HANDLERS
  handleMenuClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuClose = (event, category) => {
    this.setState({anchorEl: null})
    if (category !== 'backdropClick') {
      const {type, id, priority} = category
      const payload = {
        label: type,
        categoryId: id,
        priority
      }
      this.props.addFilter(payload)
    }
  }

  render() {
    const {anchorEl} = this.state
    const availableCategories = this.props.filterCategories
    const selectedCategories = this.props.selectedCategories

    // FILTER DROP-DOWN (LOADING/ERROR)
    if (this.props.filterCategoriesErrored) {
      return <p>Sorry! There was an error loading the filter categories</p>
    }

    if (this.props.filterCategoriesFetching) {
      return <p>Loading...</p>
    }

    // SELECTED CATEGORIES (LOADING/ERROR)
    if (this.props.selectedCategoriesErrored) {
      return <p>Sorry! There was an error loading your selected filters</p>
    }

    if (this.props.selectedCategoriesFetching) {
      return <p>Loading...</p>
    }

    // DISPLAY
    return (
      <div>
        <div>
          <FilterDropDown
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            anchorEl={anchorEl}
            handleMenuClick={this.handleMenuClick}
            handleMenuClose={this.handleMenuClose}
          />
        </div>
        <div>
          <SelectedCategories selectedCategories={selectedCategories} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories,
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  } = state.categories
  return {
    userId: state.user.id,
    selectedCategoriesErrored,
    selectedCategoriesFetching,
    selectedCategories,
    filterCategoriesErrored,
    filterCategoriesFetching,
    filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: userId =>
      dispatch(fetchSelectedCategories(userId)),
    fetchFilterCategories: () => dispatch(fetchFilterCategories()),
    addFilter: payload => dispatch(addNewSelectedFilter(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
