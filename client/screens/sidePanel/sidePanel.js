import React from 'react'
import {AddressBook, SelectedCategories, CategoryFilter} from '../../components'
import {Link} from 'react-router-dom'

class ScreensSidePanel extends React.Component {
  constructor() {
    super()
    this.state = {
      addressBook: true
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({addressBook: !this.state.addressBook})
  }

  render() {
    return (
      <div id="side-panel">
        <div>
          <Link to="/addressBook" onClick={this.handleClick}>
            Address Book
          </Link>
          <Link to="/categoryFilter" onClick={this.handleClick}>
            Category Filter
          </Link>
        </div>
        {this.state.addressBook ? (
          <div>
            <AddressBook />
          </div>
        ) : (
          <div>
            <SelectedCategories />
            <CategoryFilter />
          </div>
        )}
      </div>
    )
  }
}

export default ScreensSidePanel
