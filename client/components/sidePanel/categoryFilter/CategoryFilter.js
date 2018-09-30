import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
// import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
import {fetchCategories, getCategoryItems} from '../../../store/categoryFilter'

export class CategoryFilter extends Component {
  constructor() {
    super()
    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  showMenu(event) {
    event.preventDefault()

    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    const categories = this.props.items
    console.log('CATEGORIES:', categories)
    return (
      <div>
        <div>
          <h5>SELECT FILTERS</h5>
        </div>
        <Button onClick={this.showMenu}>Category Filter</Button>
        {this.state.showMenu ? (
          <div
            className="menu"
            ref={categories.map((category, id) => (
              <MenuItem value={category.type} key={category.id}>
                {category}
              </MenuItem>
            ))}
          />
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // items: getCategoryItems(state)
    items: state.items
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter)

// {/* <Button onClick={this.showMenu}>Category Filter</Button>

// {this.state.showMenu ? (
//   <div
//     className="menu"
//     ref={element => {
//       this.dropdownMenu = element
//     }}
//   >
//     <MenuItem> Menu item 1 </MenuItem>
//     <MenuItem> Menu item 2 </MenuItem>
//     <MenuItem> Menu item 3 </MenuItem>
//   </div>
// ) : null} */}
