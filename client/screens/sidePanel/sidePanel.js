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
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Address Book" />
            <Tab label="Filter Nearby Places" />
          </Tabs>
        </AppBar>

        {value === 0 && <AddressBook />}
        {value === 1 && <Categories />}
      </div>
    )
  }
}

export default ScreensSidePanel
