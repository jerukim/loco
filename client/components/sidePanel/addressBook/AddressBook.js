import React from 'react'
import Autocomplete from './Autocomplete'
import HomesList from './HomesList'

class AddressBook extends React.Component {
  render() {
    return (
      <div>
        <Autocomplete />
        <HomesList />
      </div>
    )
  }
}

export default AddressBook
