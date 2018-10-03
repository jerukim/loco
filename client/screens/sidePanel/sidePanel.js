import React from 'react'
import {ScreensAddressBook, ScreensCategories} from '../'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

class ScreensSidePanel extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  render() {
    const {value} = this.state
    return (
      <div id="side-panel">
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Address Book" />
            <Tab label="Filter Nearby" />
          </Tabs>
        </AppBar>

        {value === 0 && <ScreensAddressBook />}
        {value === 1 && <ScreensCategories />}
      </div>
    )
  }
}

export default ScreensSidePanel
