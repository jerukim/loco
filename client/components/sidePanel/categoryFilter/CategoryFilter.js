import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Button from '@material-ui/core/Button'
// import MenuList from '@material-ui/core/MenuList'
// import MenuItem from '@material-ui/core/MenuItem'
import {fetchCategories} from '../../../store/'

class CategoryFilter extends Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.items

    if (this.props.errored) {
      return <p>Sorry! There was an error loading the items</p>
    }

    if (this.props.fetching) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <div>
          <h5>SELECT FILTERS</h5>
        </div>
        <ul>
          {categories &&
            categories.map(category => {
              return <li key={category.id}>{category.type}</li>
            })}
        </ul>
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

//
//
//
//----------VERSION WITH MENU-------------------
//
//
// constructor() {
//   super()
//   this.state = {
//     showMenu: false
//   }

//   this.showMenu = this.showMenu.bind(this)
//   this.closeMenu = this.closeMenu.bind(this)
// }

// showMenu(event) {
//   event.preventDefault()

//   this.setState({showMenu: true}, () => {
//     document.addEventListener('click', this.closeMenu)
//   })
// }

// closeMenu(event) {
//   if (!this.dropdownMenu.contains(event.target)) {
//     this.setState({showMenu: false}, () => {
//       document.removeEventListener('click', this.closeMenu)
//     })
//   }
// }

// render() {
//   console.log('THIS.PROPS: ', this.props)
//   if (this.props.errored) {
//     return <p>Sorry! There was an error loading the categories</p>
//   }
//   if (this.props.fetching) {
//     return <p>Loading...</p>
//   }
//   const categories = this.props.items
//   return (
//     <div>
//       <div>
//         <h5>SELECT FILTERS</h5>
//       </div>
//       <Button onClick={this.showMenu}>Category Filter</Button>
//       {this.state.showMenu ? (
//         <div
//           className="menu"
//           ref={categories.map((category, id) => (
//             <MenuItem value={category.type} key={category.id}>
//               {category}
//             </MenuItem>
//           ))}
//         />
//       ) : null}
//     </div>
//   )
// }

//
//
//
//
//STATIC MENU
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
