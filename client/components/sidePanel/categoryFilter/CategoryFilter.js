import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFilterCategories, fetchSelectedCategories} from '../../../store'
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

  handleClick = event => {
    console.log("EVENT: ", event)
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    const availableCategories = this.props.filterCategories
    const selectedCategories = this.props.selectedCategories
    console.log('THIS PROPS IN CATEGLORY FILTER: ', this.props)

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
            anchorEl={anchorEl}
            handleClick={this.handleClick}
            handleClose={this.handleClose}
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
  return {
    userId: state.user.id,
    selectedCategoriesErrored: state.categories.selectedCategoriesErrored,
    selectedCategoriesFetching: state.categories.selectedCategoriesFetching,
    selectedCategories: state.categories.selectedCategories,
    filterCategoriesErrored: state.categories.filterCategoriesErrored,
    filterCategoriesFetching: state.categories.filterCategoriesFetching,
    filterCategories: state.categories.filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSelectedCategories: userId =>
      dispatch(fetchSelectedCategories(userId)),
    fetchFilterCategories: () => dispatch(fetchFilterCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
