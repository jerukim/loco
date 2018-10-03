import React from 'react'
import {connect} from 'react-redux'
import {fetchHomes} from '../../../store'
import AddressCard from './AddressCard'

class List extends React.Component {
  componentDidMount() {
    if (this.props.userId) {
      this.props.fetchHomes(this.props.userId)
    }
  }

  sortHomes() {
    const {homes} = this.props
    return homes.sort((a, b) => a.id - b.id)
  }

  render() {
    return (
      this.props.userId && (
        <ul className="list homes-list">
          {this.sortHomes(this.props.homes).map(home => {
            return (
              <li className="li-item" key={home.id}>
                <AddressCard home={home} />
              </li>
            )
          })}
          {/* {this.sortPlaces(this.props.places).map(place => {
          return (
            <li className="li-item" key={place.id}>

            </li>
          )
        })} */}
        </ul>
      )
    )
  }
}

const mapStateToProps = state => ({userId: state.user.id, homes: state.homes})

const mapDispatchToProps = dispatch => {
  return {
    fetchHomes: userId => dispatch(fetchHomes(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
