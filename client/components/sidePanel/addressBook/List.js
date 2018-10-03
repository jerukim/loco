import React from 'react'
import {connect} from 'react-redux'
import {fetchHomes, fetchPlaces} from '../../../store'
import AddressCard from './AddressCard'
import {sort} from '../../../utilities'

class List extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchHomes(this.props.userId)
      this.props.fetchPlaces(this.props.userId)
    }
  }

  render() {
    const {homes, places} = this.props
    return (
      this.props.userId && (
        <ul className="list homes-list">
          {homes &&
            sort(homes).map(home => {
              return (
                <li className="li-item" key={home.id}>
                  <AddressCard home={home} />
                </li>
              )
            })}
          {places &&
            sort(places).map(place => {
              return (
                <li className="li-item" key={place.id}>
                  <AddressCard place={place} />
                </li>
              )
            })}
        </ul>
      )
    )
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
  homes: state.homes,
  places: state.places
})

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId)),
    fetchPlaces: userId => dispatch(fetchPlaces(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
