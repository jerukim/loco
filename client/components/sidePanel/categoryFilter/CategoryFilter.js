import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../../../store/'
//Material UI
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class CategoryFilter extends Component {
  componentDidMount() {
    this.props.fetchCategories()
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
    const categories = this.props.items

    if (this.props.errored) {
      return <p>Sorry! There was an error loading the items</p>
    }

    if (this.props.fetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select Filters
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
                {category.type}
              </MenuItem>
            ))}
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.categoryFilter.items,
    errored: state.categoryFilter.errored,
    fetching: state.categoryFilter.fetching
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)
