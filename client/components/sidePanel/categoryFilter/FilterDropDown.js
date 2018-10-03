import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchFilterCategories} from '../../../store'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class FilterDropDown extends Component {
  componentDidMount() {
    console.log('THIS.PROPS - FILTER DROPDOWN', this.props)
    this.props.fetchFilterCategories()
  }

  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state
    const categories = this.props.filterCategories

    if (this.props.filterCategoriesErrored) {
      return <p>Sorry! There was an error loading the filter categories</p>
    }

    if (this.props.filterCategoriesFetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          SELECT FILTERS
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {categories &&
            categories.map(category => (
              <MenuItem key={category.id} onClick={this.handleClose}>
                {category.type.replace(/_/g, ' ')}
              </MenuItem>
            ))}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    filterCategoriesErrored: state.categories.filterCategoriesErrored,
    filterCategoriesFetching: state.categories.filterCategoriesFetching,
    filterCategories: state.categories.filterCategories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilterCategories: () => dispatch(fetchFilterCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterDropDown)
