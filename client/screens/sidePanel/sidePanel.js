import React from 'react'
import {AddressBook, SelectedCategories, CategoryFilter} from '../../components'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
          <Button to="/addressBook" onClick={this.handleClick}>
            Address Book
          </Button>
          <Button to="/categoryFilter" onClick={this.handleClick}>
            Category Filter
          </Button>
        </div>
        {this.state.addressBook ? (
          <div>
            <AddressBook />
          </div>
        ) : (
          <div>
            <div>
              <SelectedCategories />
            </div>
            <div>
              <CategoryFilter />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default ScreensSidePanel
